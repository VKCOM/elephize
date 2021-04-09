import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';

export function tParenthesizedExpression(node: ts.ParenthesizedExpression, context: Context<Declaration>) {
  return '(' + renderNode(node.expression, context) + ')';
}
