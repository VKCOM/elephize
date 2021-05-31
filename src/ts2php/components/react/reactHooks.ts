import * as ts from 'typescript';
import { Declaration, Dict, hooksNames, SpecialVars } from '../../types';
import { Context } from '../context';
import { flagParentOfType } from '../../utils/ast';
import { renderNode } from '../codegen/renderNodes';

// Initialize react module name in current scope
export function initReact(node: ts.ImportDeclaration, context: Context<Declaration>) {
  const bindings = node.importClause?.namedBindings;
  if (bindings?.kind === ts.SyntaxKind.NamespaceImport) {
    context.moduleDescriptor.registerSpecialVar('react', bindings.name.getText());
    return true;
  }

  return false;
}

type HookRenderer = (node: ts.CallExpression, context: Context<Declaration>, nodeIdent: string) => string | null;
type HookRenderers = Dict<HookRenderer>;

const dropRender: HookRenderer = (node, context) => {
  flagParentOfType(node, [
    ts.SyntaxKind.VariableDeclaration,
    ts.SyntaxKind.BinaryExpression, // assignment with no declaration
  ], { drop: true }, context.nodeFlagsStore);
  return null;
};

const hookRenderers: HookRenderers = {
  'useState': (node, context) => {
    const val = renderNode(node.arguments[0], context); // recognize only 1st argument of call
    return `[${val}]`;
  },

  'useContext': (node, context, nodeIdent) => {
    context.log.error('React contexts are not supported in isomorphic components', [], context.log.ctx(node));
    return dropRender(node, context, nodeIdent);
  },

  'useReducer': (node, context) => {
    const val = renderNode(node.arguments[1], context); // recognize only 2nd argument of call, it's initial state
    if (!val) {
      context.log.error('You must provide initial state to useReducer call', [], context.log.ctx(node));
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

export function reactHooksSupport(context: Context<Declaration>, node: ts.CallExpression): string | false {
  if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
    const ex = node.expression as ts.PropertyAccessExpression;
    const isReactMember = context.moduleDescriptor.checkSpecialVarIdentifier(ex.expression, 'react');
    if (!isReactMember) {
      return false;
    }

    if (hooksNames.includes(ex.name.getText())) {
      return hookRenderers[ex.name.getText()](node, context, ex.name.getText()) || false;
    }
    return false;
  }

  return hooksNames.reduce((acc: string | false, hook: keyof SpecialVars) => {
    if (acc !== false) {
      return acc;
    }

    if (context.moduleDescriptor.checkSpecialVarIdentifier(node.expression, hook)) {
      return hookRenderers[hook](node, context, node.expression.getText()) || false;
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
      for (const n of node.name.elements) {
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
