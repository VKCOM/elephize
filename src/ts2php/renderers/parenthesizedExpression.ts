import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';

export function tParenthesizedExpression(node: ts.ParenthesizedExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      let [/*bracket*/, expr] = self.children;
      return '(' + expr.node.gen(expr, context) + ')';
    }
  };
}