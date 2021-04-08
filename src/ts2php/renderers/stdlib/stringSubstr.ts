import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { hasType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

/**
 * String.prototype.substr support
 *
 * @param node
 * @param context
 */
export const stringSubstr: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('substr', node)) {
    return undefined;
  }
  if (!hasType(node.expression, context.checker, 'string')) {
    context.log.error('Left-hand expression must have string inferred type', [], context.log.ctx(node));
    return 'null';
  }

  const varNameNode = getCallExpressionLeftSide(node);
  const args = renderNodes([...node.arguments], context);
  const varName = renderNode(varNameNode, context);
  if (!args || !args[0]) {
    context.log.error('String.prototype.substr: can\'t find index in call.', [], context.log.ctx(node));
    return 'null';
  }
  context.log.warn('Converting String.prototype.substr to substr(): check your encodings twice!', [], context.log.ctx(node));
  return `substr(${varName}, ${args.join(', ')})`;
};
