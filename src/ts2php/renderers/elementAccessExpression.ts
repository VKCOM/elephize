import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNodes } from '../components/codegen/renderNodes';

export function tElementAccessExpression(node: ts.ElementAccessExpression, context: Context<Declaration>) {
  const [ident, accessor] = renderNodes([node.expression, node.argumentExpression], context);
  return `${ident}[${accessor}]`;
}
