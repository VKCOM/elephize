import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { collectVars } from '../components/unusedCodeElimination/varsUsage';

export function tIfStatement(node: ts.IfStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      let [/* if */, /* paren */, conditionNode, /* paren */, ifTrueNode, /* else */, ifFalseNode] = self.children;

      let [usedVars, [condition]] = collectVars(() => renderSupportedNodes([conditionNode], context), context);
      let [ifTrue, ifFalse] = renderSupportedNodes([ifTrueNode, ifFalseNode], context);
      if (self.flags.drop) {
        return '';
      }

      for (let ident of Array.from(usedVars)) {
        context.scope.addUsage(ident, [], { terminateLocally: true, dryRun: context.dryRun });
      }

      let expr;
      if (ifFalse) {
        expr = `if (${condition}) ${ifTrue} else ${ifFalse}`;
      } else {
        expr = `if (${condition}) ${ifTrue}`;
      }

      if (isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
      }
      return expr;
    }
  };
}