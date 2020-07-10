import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertArrayType, assertLocalModification } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getLeftExpr } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

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
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  assertLocalModification(getLeftExpr(node.expression), context);
  const varNameNode = getCallExpressionLeftSide(node);
  let args = renderNodes([...node.arguments], context);
  let varName = renderNode(varNameNode, context);
  if (!args || !args[0]) {
    log('Array.prototype.push: no element in call.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  return `array_push(${varName}, ${args.join(', ')})`;
};
