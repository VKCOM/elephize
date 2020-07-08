import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertArrayType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionCallbackArg, getCallExpressionLeftSide } from '../../utils/ast';

/**
 * Array.prototype.find support
 *
 * @param node
 * @param self
 * @param context
 */
export const arrayFind: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('find', node)) {
    return undefined;
  }
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  self.flags.name = 'array_find';
  const funcNode = getCallExpressionCallbackArg(self);
  const varNode = getCallExpressionLeftSide(self);
  let renderedFunc = renderSupportedNodes([funcNode], context).join('');
  let varName = renderSupportedNodes([varNode], context).join('');
  if (!self.flags.childCount) {
    log('Array.prototype.find: can\'t find iterable element in call.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  return `Stdlib::arrayFind(${varName}, ${renderedFunc})`;
};
