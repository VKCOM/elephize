import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { propNameIs } from './_propName';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';

/**
 * Anything ().toString() support
 *
 * @param node
 * @param self
 * @param context
 */
export const toString: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (propNameIs('toString', node)) {
    const varNameNode = getCallExpressionLeftSide(self);
    return '(string)' + renderSupportedNodes([varNameNode], context).join('');
  }
};
