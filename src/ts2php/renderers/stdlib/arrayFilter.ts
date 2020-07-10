import * as ts from 'typescript';
import { CallbackType, Declaration, ExpressionHook } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertArrayType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionCallbackArg, getCallExpressionLeftSide } from '../../utils/ast';
import { renderNodes } from '../../components/codegen/renderNodes';

/**
 * Array.prototype.filter support
 *
 * @param node
 * @param context
 */
export const arrayFilter: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('filter', node)) {
    return undefined;
  }
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  const funcNode: CallbackType = getCallExpressionCallbackArg(node) as CallbackType;
  const varNode = getCallExpressionLeftSide(node);

  if ((funcNode?.parameters.length || 0) > 1) {
    log('Array.prototype.filter with index in callback is not supported', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  let [renderedFunction, varName] = renderNodes([funcNode, varNode], context);
  return `array_filter(${varName}, ${renderedFunction})`;
};
