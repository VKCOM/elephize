import * as ts from 'typescript';
import { Declaration, Dict, hooksNames, NodeInfo, SpecialVars } from '../../types';
import { Context } from '../context';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { ctx, log, LogSeverity } from '../../utils/log';
import { flagParentOfType } from '../../utils/ast';

// Initialize react module name in current scope
export function initReact(self: NodeInfo, context: Context<Declaration>) {
  if (self.flags.imports && self.flags.imports[0].propName === '*') {
    context.moduleDescriptor.registerSpecialVar('react', self.flags.imports[0].identNode.getText());
    return true;
  }

  return false;
}

type HookRenderer = (node: ts.Node, self: NodeInfo, context: Context<Declaration>, nodeIdent: string) => string | null;
type HookRenderers = Dict<HookRenderer>;

const dropRender: HookRenderer = (node, self) => {
  flagParentOfType(self, [
    ts.SyntaxKind.VariableDeclaration,
    ts.SyntaxKind.BinaryExpression // assignment with no declaration
  ], { drop: true });
  return null;
};

const hookRenderers: HookRenderers = {
  'useState': (node, self, context, nodeIdent) => {
    context.scope.addDeclaration(nodeIdent, [], { terminateGlobally: true, dryRun: context.dryRun });
    const [val] = renderSupportedNodes([
      self.children.find((c) => c.node.kind === ts.SyntaxKind.SyntaxList)
        ?.children[0] // recognize only 1st argument of call
    ], context);
    return `[${val}]`;
  },

  'useContext': (node, self, context, nodeIdent) => {
    log('React contexts are not supported in isomorphic components', LogSeverity.ERROR, ctx(node));
    return dropRender(node, self, context, nodeIdent);
  },

  'useReducer': (node, self, context, nodeIdent) => {
    context.scope.addDeclaration(nodeIdent, [], { terminateGlobally: true, dryRun: context.dryRun });
    const [val] = renderSupportedNodes([
      self.children.find((c) => c.node.kind === ts.SyntaxKind.SyntaxList)
        ?.children[2] // recognize only 2nd argument of call, it's initial state
    ], context);

    if (!val) {
      log('You must provide initial state to useReducer call', LogSeverity.ERROR, ctx(node));
    }
    return `[${val}]`;
  },

  'useCallback': dropRender,
  'useMemo': dropRender,
  'useRef': dropRender,

  'useEffect': () => '!null',
  'useImperativeHandle': () => '!null',
  'useLayoutEffect': () => '!null',
  'useDebugValue': () => '!null',
};

export function reactHooksSupport(context: Context<Declaration>, node: ts.CallExpression, self: NodeInfo): string | false {
  if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
    const ex = node.expression as ts.PropertyAccessExpression;
    const isReactMember = context.moduleDescriptor.checkSpecialVarIdentifier(ex.expression, 'react');
    if (!isReactMember) {
      return false;
    }

    if (hooksNames.includes(ex.name.getText())) {
      return hookRenderers[ex.name.getText()](node, self, context, ex.name.getText()) || false;
    }
    return false;
  }

  return hooksNames.reduce((acc: string | false, hook: keyof SpecialVars) => {
    if (acc !== false) {
      return acc;
    }

    if (context.moduleDescriptor.checkSpecialVarIdentifier(node.expression, hook)) {
      return hookRenderers[hook](node, self, context, node.expression.getText()) || false;
    }

    return false;
  }, false) || false;
}

function registerHookInContext(name: string, expr: string, context: Context<Declaration>, node: ts.Node) {
  hooksNames.some((hook: keyof SpecialVars) => {
    if (name === hook) {
      context.moduleDescriptor.registerSpecialVar(hook, expr, node);
      return true;
    }
  });
}

export function checkReactAssignment(node: ts.VariableDeclaration, context: Context<Declaration>) {
  // Check dereferenced assignment
  if (context.moduleDescriptor.checkSpecialVarIdentifier(node.initializer, 'react')) {
    if (node.name.kind === ts.SyntaxKind.ObjectBindingPattern) {
      for (let n of node.name.elements) {
        registerHookInContext((n.propertyName || n.name).getText(), n.name.getText(), context, node);
      }
    }
    return true;
  }

  // Check property assignment
  if (node.initializer?.kind === ts.SyntaxKind.PropertyAccessExpression && node.name.kind === ts.SyntaxKind.Identifier) {
    const { name, expression } = node.initializer as ts.PropertyAccessExpression;
    if (context.moduleDescriptor.checkSpecialVarIdentifier(expression, 'react')) {
      registerHookInContext(name.getText(), node.name.getText(), context, node);
      return true;
    }
  }

  return false;
}