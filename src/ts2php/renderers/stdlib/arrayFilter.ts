import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertArrayType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionCallbackArg, getCallExpressionLeftSide } from '../../utils/ast';

/**
 * Array.prototype.filter support
 *
 * @param node
 * @param self
 * @param context
 */
export const arrayFilter: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('filter', node)) {
    return undefined;
  }
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  self.flags.name = 'array_filter';

  const funcNode = getCallExpressionCallbackArg(self);
  const varNode = getCallExpressionLeftSide(self);

  let renderedFunction = renderSupportedNodes([funcNode], context).join('');
  let varName = renderSupportedNodes([varNode], context).join('');
  if ((self.flags.childCount || 0) > 1) {
    log('Array.prototype.filter with index in callback is not supported', LogSeverity.ERROR, ctx(node));
    return 'null';
  } else {
    return `array_filter(${varName}, ${renderedFunction})`;
  }
};
