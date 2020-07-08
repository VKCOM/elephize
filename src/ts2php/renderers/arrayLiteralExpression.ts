import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';

export function tArrayLiteralExpression(node: ts.ArrayLiteralExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      let [/*bracket*/, expr] = self.children;
      let synList: string[] = [];
      let toRender: NodeInfo[] = [];

      for (let i = 0; i < expr.children.length; i++) {
        if (expr.children[i].node.kind === ts.SyntaxKind.SpreadElement) {
          synList = synList.concat('[' + renderSupportedNodes(toRender, context).join(', ') + ']');
          toRender = [];
          synList.push(renderSupportedNodes([expr.children[i]], context)[0]);
        } else {
          toRender.push(expr.children[i]);
        }
      }
      synList = synList.concat('[' + renderSupportedNodes(toRender, context).join(', ') + ']');

      if (synList.length === 1) {
        return synList[0];
      }

      return `array_merge(${synList.join(', ')})`;
    }
  };
}