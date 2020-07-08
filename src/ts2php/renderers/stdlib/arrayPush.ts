import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertArrayType, assertLocalModification } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getChildByType, getLeftExpr } from '../../utils/ast';

/**
 * Array.prototype.push support
 *
 * @param node
 * @param self
 * @param context
 */
export const arrayPush: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('push', node)) {
    return undefined;
  }
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  assertLocalModification(getLeftExpr(node.expression), context);
  const argsNodes = getChildByType(self, ts.SyntaxKind.SyntaxList);
  const varNameNode = getCallExpressionLeftSide(self);
  let args = renderSupportedNodes(argsNodes?.children || [], context);
  let varName = renderSupportedNodes([varNameNode], context);
  if (!args || !args[0]) {
    log('Array.prototype.push: no element in call.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  return `array_push(${varName}, ${args.join(', ')})`;
};
