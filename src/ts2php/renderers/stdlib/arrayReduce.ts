import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertArrayType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionCallbackArg, getCallExpressionLeftSide, getChildChainByType } from '../../utils/ast';

/**
 * Array.prototype.reduce support
 *
 * @param node
 * @param self
 * @param context
 */
export const arrayReduce: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('reduce', node)) {
    return undefined;
  }
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  self.flags.name = 'array_reduce';

  const funcNode = getCallExpressionCallbackArg(self);
  const varNode = getCallExpressionLeftSide(self);
  const initialValue = getChildChainByType(self, [
    ts.SyntaxKind.SyntaxList,
    [
      ts.SyntaxKind.StringLiteral,
      ts.SyntaxKind.NumericLiteral,
      ts.SyntaxKind.ArrayLiteralExpression,
      ts.SyntaxKind.ObjectLiteralExpression
    ]
  ]);

  let renderedFunction = renderSupportedNodes([funcNode], context).join('');
  let varName = renderSupportedNodes([varNode], context);
  if (!initialValue) {
    log('Array.prototype.reduce should have initial value of the accumulator', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  let accumulator = renderSupportedNodes([initialValue], context);
  if ((self.flags.childCount || 0) > 2) {
    log('Array.prototype.reduce with index in callback is not supported', LogSeverity.ERROR, ctx(node));
    return 'null';
  } else {
    return `array_reduce(${varName}, ${renderedFunction}, ${accumulator})`;
  }
};
