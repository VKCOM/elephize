import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';

export function tElementAccessExpression(node: ts.ElementAccessExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const children = self.children;
      let [ident, accessor] = renderSupportedNodes(children, context);
      return `${ident}[${accessor}]`;
    }
  };
}