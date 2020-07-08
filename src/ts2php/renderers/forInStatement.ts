import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { Scope } from '../components/unusedCodeElimination/usageGraph';

export function tForInStatement(node: ts.ForInStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const [/* for */, /* paren */, varInitNode, /* in */, expressionNode, /* paren */, statementNode] = self.children;

      // Automatically add usage for declared vars inside for-statement
      const onDecl = (ident: string) => {
        context.scope.addUsage(ident, [], { terminateLocally: true, dryRun: context.dryRun });
      };
      context.scope.addEventListener(Scope.EV_DECL, onDecl);
      let [initializer, expression] = renderSupportedNodes([varInitNode, expressionNode], context);
      context.scope.removeEventListener(Scope.EV_DECL, onDecl);

      let [statement] = renderSupportedNodes([statementNode], context);
      if (self.flags.validated) {
        const expr = `foreach (${expression} as ${initializer} => $_tmpVal) ${statement}`;
        if (isTopLevel(node, context)) {
          context.moduleDescriptor.addStatement(expr);
        }
        return expr;
      }
      throw new Error('For-In statement should have the .hasOwnProperty check: \n' + node.getFullText().substr(0, 200));
    }
  };
}