import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNodes } from '../components/codegen/renderNodes';

export function tTernaryOperator(node: ts.ConditionalExpression, context: Context<Declaration>) {
  let [condition, ifTrue, ifFalse] = renderNodes([node.condition, node.whenTrue, node.whenFalse], context, false);
  return `${condition} ? ${ifTrue} : ${ifFalse}`;
}