import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { ctx, log, LogSeverity } from '../../utils/log';
import { assertType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';
import { renderNode } from '../../components/codegen/renderNodes';

/**
 * String.prototype.trim support
 *
 * @param node
 * @param context
 */
export const stringTrim: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (propNameIs('trim', node)) {
    if (!assertType(node.expression, context.checker, 'string')) {
      log('Left-hand expression must have string inferred type', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    const varNameNode = getCallExpressionLeftSide(node);
    let varName = renderNode(varNameNode, context);
    return `trim(${varName})`;
  }
};