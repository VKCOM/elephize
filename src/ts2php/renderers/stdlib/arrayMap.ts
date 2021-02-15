import * as ts from 'typescript';
import { CallbackType, Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { ctx, LogSeverity } from '../../utils/log';
import { hasArrayType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { getCallExpressionCallbackArg, getCallExpressionLeftSide } from '../../utils/ast';
import { renderNodes } from '../../components/codegen/renderNodes';

/**
 * Array.prototype.map support
 *
 * @param node
 * @param context
 */
export const arrayMap: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('map', node)) {
    return undefined;
  }
  if (!hasArrayType(node.expression, context.checker)) {
    context.log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  const funcNode: CallbackType = getCallExpressionCallbackArg(node) as CallbackType;
  const funcArgsCount = funcNode?.parameters.length || 0;
  if (funcArgsCount !== 1 && funcArgsCount !== 2) {
    context.log('Unsupported callback argument count for Array.prototype.map', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  const varNode = getCallExpressionLeftSide(node);
  let [renderedFunction, varName] = renderNodes([funcNode, varNode], context);
  return `Stdlib::arrayMap${funcArgsCount}(${varName}, ${renderedFunction})`;
};
