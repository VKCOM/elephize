import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { propNameIs } from './_propName';
import { ctx, log, LogSeverity } from '../../utils/log';
import { assertType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';

/**
 * String.prototype.trim support
 *
 * @param node
 * @param self
 * @param context
 */
export const stringTrim: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (propNameIs('trim', node)) {
    if (!assertType(node.expression, context.checker, 'string')) {
      log('Left-hand expression must have string inferred type', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    const varNameNode = getCallExpressionLeftSide(self);
    let varName = renderSupportedNodes([varNameNode], context);
    return `trim(${varName})`;
  }
};