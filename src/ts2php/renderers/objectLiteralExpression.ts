import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';

export function tObjectLiteralExpression(node: ts.ObjectLiteralExpression, context: Context<Declaration>) {
  if (node.properties.length === 0) {
    return '[]';
  }

  let synList: string[] = [];
  let toRender: ts.Node[] = [];

  for (let i = 0; i < node.properties.length; i++) {
    if (node.properties[i].kind === ts.SyntaxKind.SpreadAssignment) {
      const nodes = renderNodes(toRender, context).join(',\n');
      synList = synList.concat(nodes.length > 0 ? '[\n' + nodes + '\n]' : '[]');
      toRender = [];
      synList.push('(' + renderNode(node.properties[i], context) + ') ?: []');
    } else {
      toRender.push(node.properties[i]);
    }
  }

  const nodes = renderNodes(toRender, context).join(',\n');
  synList = synList.concat(nodes.length > 0 ? '[\n' + nodes + '\n]' : '[]');

  if (synList.length === 0) {
    return '[]';
  }

  if (synList.length === 1) {
    return synList[0];
  }

  return `array_merge(${synList.join(', ')})`;
}