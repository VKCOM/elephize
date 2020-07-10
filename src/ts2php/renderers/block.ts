import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNodes } from '../components/codegen/renderNodes';

export function tBlock(node: ts.Block, context: Context<Declaration>) {
  return ['{', ...renderNodes([...node.statements], context), '}'].join('\n');
}
