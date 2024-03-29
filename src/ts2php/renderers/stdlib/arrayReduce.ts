import * as ts from 'typescript';
import { CallbackType, Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { hasArrayType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { getCallExpressionCallbackArg, getCallExpressionLeftSide, getChildChainByType } from '../../utils/ast';
import { renderNodes } from '../../components/codegen/renderNodes';

/**
 * Array.prototype.reduce support
 *
 * @param node
 * @param context
 */
export const arrayReduce: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('reduce', node)) {
    return undefined;
  }
  if (!hasArrayType(node.expression, context.checker, context.log)) {
    context.log.error('Left-hand expression must have array-like or iterable inferred type', [], context.log.ctx(node));
    return 'null';
  }

  const initialValue = getChildChainByType(node, [
    ts.SyntaxKind.SyntaxList,
    [
      ts.SyntaxKind.StringLiteral,
      ts.SyntaxKind.NumericLiteral,
      ts.SyntaxKind.ArrayLiteralExpression,
      ts.SyntaxKind.ObjectLiteralExpression,
    ],
  ]);

  const funcNode: CallbackType = getCallExpressionCallbackArg(node) as CallbackType;
  const funcArgsCount = funcNode?.parameters.length || 0;

  if (funcArgsCount > 2) {
    context.log.error('Array.prototype.reduce with index in callback is not supported', [], context.log.ctx(node));
    return 'null';
  }

  if (!initialValue) {
    context.log.error('Array.prototype.reduce should have initial value of the accumulator', [], context.log.ctx(node));
    return 'null';
  }

  const varNode = getCallExpressionLeftSide(node);
  const [accumulator, renderedFunction, varName] = renderNodes([initialValue, funcNode, varNode], context);
  return `array_reduce(${varName}, ${renderedFunction}, ${accumulator})`;
};
