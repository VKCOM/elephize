import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { Scope } from '../components/unusedCodeElimination/usageGraph';

export function tForStatement(node: ts.ForStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const [
        /* for */, /* paren */, varInitNode, /* semicolon */,
        conditionNode, /* semicolon */,
        incrementorNode, /* paren */,
        statementNode
      ] = self.children;

      // Automatically add usage for declared vars inside for-statement
      const onDecl = (ident: string) => {
        context.scope.addUsage(ident, [], { terminateLocally: true, dryRun: context.dryRun });
      };
      context.scope.addEventListener(Scope.EV_DECL, onDecl);
      let [varInit, condition, incrementor] = renderSupportedNodes([varInitNode, conditionNode, incrementorNode], context);
      context.scope.removeEventListener(Scope.EV_DECL, onDecl);

      let [statement] = renderSupportedNodes([statementNode], context);
      const expr = `for (${varInit}; ${condition}; ${incrementor}) ${statement}`;
      if (isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
      }
      return expr;
    }
  };
}