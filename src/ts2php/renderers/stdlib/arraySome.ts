import * as ts from 'typescript';
import { CallbackType, Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { hasArrayType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { getCallExpressionCallbackArg, getCallExpressionLeftSide } from '../../utils/ast';
import { renderNodes } from '../../components/codegen/renderNodes';

/**
 * Array.prototype.some support
 *
 * @param node
 * @param context
 */
export const arraySome: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('some', node)) {
    return undefined;
  }
  if (!hasArrayType(node.expression, context.checker, context.log)) {
    context.log.error('Left-hand expression must have array-like or iterable inferred type', [], context.log.ctx(node));
    return 'null';
  }

  const funcNode: CallbackType = getCallExpressionCallbackArg(node) as CallbackType;
  const funcArgsCount = funcNode?.parameters.length || 0;
  if (!funcArgsCount) {
    context.log.error('Array.prototype.some: can\'t find iterable element in call.', [], context.log.ctx(node));
    return 'null';
  }

  const varNode = getCallExpressionLeftSide(node);
  const [renderedFunc, varName] = renderNodes([funcNode, varNode], context);
  return `Stdlib::arraySome(${varName}, ${renderedFunc})`;
};
