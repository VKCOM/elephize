import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNodes } from '../components/codegen/renderNodes';

export function tCaseClause(node: ts.CaseClause, context: Context<Declaration>) {
  const [condition, ...expressions] = renderNodes([node.expression, ...node.statements], context);
  return `case ${condition}:\n${expressions.join('\n')}`;
}
