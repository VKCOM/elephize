import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';
import { renderNode } from '../../components/codegen/renderNodes';

/**
 * Anything ().toString() support
 *
 * @param node
 * @param context
 */
export const toString: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (propNameIs('toString', node)) {
    const varNameNode = getCallExpressionLeftSide(node);
    return '(string)' + renderNode(varNameNode, context);
  }
};
