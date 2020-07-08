import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertCallableType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getChildByType } from '../../utils/ast';

/**
 * Function.prototype.call support
 *
 * @param node
 * @param self
 * @param context
 */
export const funcCall: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('call', node)) {
    return undefined;
  }
  if (!assertCallableType(node.expression, context.checker)) {
    log('Notice: Left-hand expression should have callable inferred type, but was inferred as non-callable.', LogSeverity.INFO, ctx(node));
  }
  const argsNodes = getChildByType(self, ts.SyntaxKind.SyntaxList);
  const funcNameNode = getCallExpressionLeftSide(self);
  let [/*this*/, ...args] = renderSupportedNodes(argsNodes?.children || [], context);
  let funcName = renderSupportedNodes([funcNameNode], context);
  return `${funcName}(...[${args.join(', ')}])`;
};
