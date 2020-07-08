import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertCallableType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getChildChainByType } from '../../utils/ast';

/**
 * Function.prototype.apply support
 *
 * @param node
 * @param self
 * @param context
 */
export const funcApply: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('apply', node)) {
    return undefined;
  }
  if (!assertCallableType(node.expression, context.checker)) {
    log('Notice: Left-hand expression should have callable inferred type, but was inferred as non-callable.', LogSeverity.INFO, ctx(node));
  }

  const funcNameNode = getCallExpressionLeftSide(self);
  const argsNode = getChildChainByType(self, [
    ts.SyntaxKind.SyntaxList,
    ts.SyntaxKind.ArrayLiteralExpression
  ]);
  let [args] = renderSupportedNodes([argsNode], context);
  let funcName = renderSupportedNodes([funcNameNode], context);
  if (!args) {
    return `${funcName}()`;
  }
  return `${funcName}(...${args})`;
};
