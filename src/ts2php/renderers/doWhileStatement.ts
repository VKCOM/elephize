import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { renderNodes } from '../components/codegen/renderNodes';

export function tDoWhileStatement(node: ts.DoStatement, context: Context<Declaration>) {
  let [statement, expression] = renderNodes([node.statement, node.expression], context);
  const expr = `do ${statement} while (${expression});`;
  if (isTopLevel(node, context)) {
    context.moduleDescriptor.addStatement(expr);
  }
  return expr;
}