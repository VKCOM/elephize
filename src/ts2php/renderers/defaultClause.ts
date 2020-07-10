import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNodes } from '../components/codegen/renderNodes';

export function tDefaultClause(node: ts.DefaultClause, context: Context<Declaration>) {
  let expressions = renderNodes([...node.statements], context);
  return `default:\n${expressions.join('\n')}`;
}