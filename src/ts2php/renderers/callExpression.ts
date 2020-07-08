import * as ts from 'typescript';
import { Declaration, DeclFlag, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { hookStdlib } from './stdlib';
import {
  flagParentOfType,
  getLeftExpr
} from '../utils/ast';
import { Context } from '../components/context';
import { intrinsicElements } from '../internalConfig/intrinsicElements';
import { ctx, log, LogSeverity } from '../utils/log';
import { reactHooksSupport } from '../components/react/reactHooks';
import { insideComponent } from '../components/unusedCodeElimination/usageGraph/nodeData';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { markUsedVars } from '../components/unusedCodeElimination/varsUsage';
import { isBound } from '../components/unusedCodeElimination/usageGraph/node';

export function tCallExpression(node: ts.CallExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const children = self.children;

      // Support js stdlib objects methods, see stdlibSupport for details
      let hookResult = hookStdlib(node, self, context);
      if (hookResult !== undefined) {
        return hookResult;
      }

      let [identNode, /*openParen*/, syntaxList, /*closeParen*/] = children;
      let ident = identNode.node.gen(identNode, context);

      let args: string[];

      let reactHooks = reactHooksSupport(context, node, self);
      if (reactHooks) {
        if (reactHooks === '!null') {
          return ''; // drop current statement in this special case
        }
        return reactHooks;
      }

      const usedVars = new Set<string>();
      const onUsage = (ident: string) => usedVars.add(ident);
      context.scope.addEventListener(Scope.EV_USAGE, onUsage);

      if (ident === '$this->h') {
        ident = '\n' + '$this->h';
        self.flags.name = 'ReactCreateElement';

        let [componentName, /*comma*/, attrs, /*comma*/, ...children] = syntaxList.children;
        let componentNameRendered;
        let attrsRendered;
        let childrenRendered;

        if (componentName.node.kind === ts.SyntaxKind.StringLiteral) { // intrinsic element
          componentNameRendered = renderSupportedNodes([componentName], context)[0];
          const componentNameUnquoted = componentNameRendered.replace(/"/g, '');
          if (!intrinsicElements[componentNameUnquoted]) {
            log(`Unknown intrinsic tag ${componentNameUnquoted}`, LogSeverity.ERROR, ctx(node));
            return 'null';
          }
          // This will be used in propertyAssignment visitor to check attrs
          self.flags.elementName = componentNameUnquoted;
          attrsRendered = renderSupportedNodes([attrs], context)[0] || '[]';
          childrenRendered = renderSupportedNodes(children, context);
        } else { // react component
          componentNameRendered = renderSupportedNodes([componentName], context)[0];
          attrsRendered = renderSupportedNodes([attrs], context)[0] || '[]';
          childrenRendered = renderSupportedNodes(children, context);
        }
        args = [
          componentNameRendered,
          attrsRendered,
          '[' + childrenRendered.join(', ') + ']' // convert child nodes to explicit array
        ];
      } else if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression
        && (node.expression as ts.PropertyAccessExpression).name.escapedText === 'hasOwnProperty') {
        // Object {}.hasOwnProperty() support for For-In loops; not a general support!
        flagParentOfType(self, [ts.SyntaxKind.IfStatement], { drop: true });
        flagParentOfType(self, [ts.SyntaxKind.ForInStatement], { validated: true });
        args = renderSupportedNodes([...syntaxList.children], context);
      } else {
        args = renderSupportedNodes([...syntaxList.children], context);
      }

      context.scope.removeEventListener(Scope.EV_USAGE, onUsage);

      // Check for spread in the middle
      const callChildren = node.arguments.slice();
      const spread = callChildren.findIndex((v) => v.kind === ts.SyntaxKind.SpreadElement);
      if (spread !== -1) {
        if (spread !== callChildren.length - 1) {
          // specific situation: php does not allow spreads in middle of argument list.
          // So we use array_merge + spread. Kphp will not be really happy with it though.
          log('Using array_merge to create parameters array for function, it may fail type inference', LogSeverity.WARN, ctx(node));
          args = [`...${makeCallArgs(callChildren, args)}`];
        } else {
          // ok, it's last one, so just add ... to spread element.
          args[args.length - 1] = '...' + args[args.length - 1];
        }
      }

      let lExp = getLeftExpr(node.expression);
      if (!lExp) {
        log('Calls of non-identifier expressions are not supported', LogSeverity.ERROR, ctx(node));
        return 'null';
      }

      let [decl, declScope, declNode] = context.scope.findByIdent(lExp.getText()) || [];
      if (!context.dryRun) {
        if (!decl || (declNode && !isBound(declNode))) {
          log('Call of undeclared or dropped identifier: ' + lExp.getText(), LogSeverity.ERROR, ctx(node));
        }
      }
      markUsedVars(node, lExp, usedVars, context);

      // Similar logic for similar cases, but with slight differences >_<
      if (decl && decl.flags & DeclFlag.External) {
        let prop = (node.expression as ts.PropertyAccessExpression).name.getText();
        return context.registry.callExportedCallable(context.moduleDescriptor, decl.targetModulePath!, prop, args);
      } else if (
        (decl && decl.flags & DeclFlag.DereferencedImport) ||
        (decl && (decl.flags & DeclFlag.Local && (insideComponent(context.scope) || declScope?.isRoot() )))
      ) {
        return context.registry.callExportedCallable(context.moduleDescriptor, decl.targetModulePath!, decl.propName!, args);
      }
      return `${ident}(${args.join(', ')})`;
    }
  };
}

function makeCallArgs(nodes: ts.Node[], args: string[]) {
  let toRender = [];
  let synList: string[] = [];
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].kind === ts.SyntaxKind.SpreadElement) {
      synList = synList.concat('[' + toRender.join(', ') + ']');
      toRender = [];
      synList.push(args[i]);
    } else {
      toRender.push(args[i]);
    }
  }
  synList = synList.concat('[' + toRender.join(', ') + ']');
  return `array_merge(${synList.join(', ')})`;
}
