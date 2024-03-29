import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { hasArrayType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getLeftExpr } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';
import { checkModificationInNestedScope } from '../../components/functionScope';

/**
 * Array.prototype.push support
 *
 * @param node
 * @param context
 */
export const arrayPush: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('push', node)) {
    return undefined;
  }
  if (!hasArrayType(node.expression, context.checker, context.log)) {
    context.log.error('Left-hand expression must have array-like or iterable inferred type', [], context.log.ctx(node));
    return 'null';
  }
  checkModificationInNestedScope(getLeftExpr(node.expression), context);
  const varNameNode = getCallExpressionLeftSide(node);
  const args = renderNodes([...node.arguments], context);
  const varName = renderNode(varNameNode, context);
  if (!args || !args[0]) {
    context.log.error('Array.prototype.push: no element in call.', [], context.log.ctx(node));
    return 'null';
  }
  return `array_push(${varName}, ${args.join(', ')})`;
};
