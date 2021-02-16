import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';
import { getPhpPrimitiveType } from '../components/typeInference/basicTypes';

export const tComputedPropertyName = (node: ts.ComputedPropertyName, context: Context<Declaration>) => {
  const type = getPhpPrimitiveType(node.expression, context.checker, context.log);
  if (type !== 'string') {
    context.log.error('Computed property expression type should be inferred as "string", but got "%s" (%s)',
      [type, node.expression.getText()], context.log.ctx(node.expression));
  }
  return renderNode(node.expression, context);
};
