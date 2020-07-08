import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';

export function tObjectLiteralExpression(node: ts.ObjectLiteralExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const [/* brace */, syntaxList] = self.children;
      if (syntaxList.children.length === 0) {
        return '[]';
      }

      let synList: string[] = [];
      let toRender: NodeInfo[] = [];

      for (let i = 0; i < syntaxList.children.length; i++) {
        if (syntaxList.children[i].node.kind === ts.SyntaxKind.SpreadAssignment) {
          const nodes = renderSupportedNodes(toRender, context).join(',\n');
          synList = synList.concat(nodes.length > 0 ? '[\n' + nodes + '\n]' : '[]');
          toRender = [];
          synList.push(renderSupportedNodes([syntaxList.children[i]], context)[0]);
        } else {
          toRender.push(syntaxList.children[i]);
        }
      }

      const nodes = renderSupportedNodes(toRender, context).join(',\n');
      synList = synList.concat(nodes.length > 0 ? '[\n' + nodes + '\n]' : '[]');

      if (synList.length === 0) {
        return '[]';
      }

      if (synList.length === 1) {
        return synList[0];
      }

      return `array_merge(${synList.join(', ')})`;
    }
  };
}