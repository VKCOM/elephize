import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';

export function tTypeAssertionExpression(node: ts.TypeAssertion, context: Context<Declaration>) {
  // Type assertion is always 3 elements (e.g. <, any, >), and 4th is expression to evaluate:
  return renderNode(node.expression, context);
}
