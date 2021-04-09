import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';

export function tArrayLiteralExpression(node: ts.ArrayLiteralExpression, context: Context<Declaration>) {
  let synList: string[] = [];
  let toRender: ts.Node[] = [];

  for (let i = 0; i < node.elements.length; i++) {
    if (node.elements[i].kind === ts.SyntaxKind.SpreadElement) {
      synList = synList.concat('[' + renderNodes(toRender, context).join(', ') + ']');
      toRender = [];
      synList.push(renderNode(node.elements[i], context));
    } else {
      toRender.push(node.elements[i]);
    }
  }
  synList = synList.concat('[' + renderNodes(toRender, context).join(', ') + ']');

  if (synList.length === 1) {
    return synList[0];
  }

  return `array_merge(${synList.join(', ')})`;
}
