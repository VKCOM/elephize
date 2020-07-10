import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { renderNodes } from '../components/codegen/renderNodes';

export function tWhileStatement(node: ts.WhileStatement, context: Context<Declaration>) {
  let [expression, statement] = renderNodes([node.expression, node.statement], context);
  const expr = `while (${expression}) ${statement}`;
  if (isTopLevel(node, context)) {
    context.moduleDescriptor.addStatement(expr);
  }
  return expr;
}