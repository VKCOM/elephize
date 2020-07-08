import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { propNameIs } from './_propName';
import { ctx, log, LogSeverity } from '../../utils/log';
import { assertArrayType, assertLocalModification } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getLeftExpr } from '../../utils/ast';

/**
 * Array.prototype.pop support
 *
 * @param node
 * @param self
 * @param context
 */
export const arrayPop: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (propNameIs('pop', node)) {
    if (!assertArrayType(node.expression, context.checker)) {
      log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    assertLocalModification(getLeftExpr(node.expression), context);
    const varNode = getCallExpressionLeftSide(self);
    let varName = renderSupportedNodes([varNode], context);
    return `array_pop(${varName})`;
  }
};
