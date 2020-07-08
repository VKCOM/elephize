import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';

export function tTernaryOperator(node: ts.ConditionalExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      let [condition, /* questionMark */, ifTrue, /* colonMark */, ifFalse] = renderSupportedNodes(self.children, context, false);
      return `${condition} ? ${ifTrue} : ${ifFalse}`;
    }
  };
}