import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { ctx, log, LogSeverity } from '../../utils/log';
import { hasArrayType } from '../../components/typeInference';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

/**
 * Array.prototype.join support
 *
 * @param node
 * @param context
 */
export const arrayJoin: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('join', node)) {
    return undefined;
  }
  if (!hasArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  const varNameNode = getCallExpressionLeftSide(node);

  let args = renderNodes([...node.arguments], context);
  let varName = renderNode(varNameNode, context);
  if (!args || !args[0]) {
    return `implode(${varName})`;
  }
  return `implode(${args[0]}, ${varName})`;
};
