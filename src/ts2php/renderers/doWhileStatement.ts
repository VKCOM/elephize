import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';

export function tDoWhileStatement(node: ts.DoStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      let [statement, expression] = renderSupportedNodes(self.children, context);
      const expr = `do ${statement} while (${expression});`;
      if (isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
      }
      return expr;
    }
  };
}