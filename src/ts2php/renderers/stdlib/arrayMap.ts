import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { propNameIs } from './_propName';
import { ctx, log, LogSeverity } from '../../utils/log';
import { assertArrayType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionCallbackArg, getCallExpressionLeftSide } from '../../utils/ast';

/**
 * Array.prototype.map support
 *
 * @param node
 * @param self
 * @param context
 */
export const arrayMap: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('map', node)) {
    return undefined;
  }
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  self.flags.name = 'array_map';

  const funcNode = getCallExpressionCallbackArg(self);
  const varNode = getCallExpressionLeftSide(self);

  let renderedFunction = renderSupportedNodes([funcNode], context).join('');
  const funcArgsCount = self.flags.childCount || 0;
  if (funcArgsCount !== 1 && funcArgsCount !== 2) {
    log('Unsupported argument count for Array.prototype.map', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  let varName = renderSupportedNodes([varNode], context).join('');
  return `Stdlib::arrayMap${funcArgsCount}(${varName}, ${renderedFunction})`;
};
