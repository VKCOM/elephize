import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { propNameIs } from './_propName';
import { ctx, log, LogSeverity } from '../../utils/log';
import { assertArrayType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getChildByType } from '../../utils/ast';

/**
 * Array.prototype.join support
 *
 * @param node
 * @param self
 * @param context
 */
export const arrayJoin: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('join', node)) {
    return undefined;
  }
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  const argsNodes = getChildByType(self, ts.SyntaxKind.SyntaxList);
  const varNameNode = getCallExpressionLeftSide(self);

  let args = renderSupportedNodes(argsNodes?.children || [], context);
  let varName = renderSupportedNodes([varNameNode], context);
  if (!args || !args[0]) {
    return `implode(${varName})`;
  }
  return `implode(${args[0]}, ${varName})`;
};
