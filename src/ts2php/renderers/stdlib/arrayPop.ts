import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { ctx, log, LogSeverity } from '../../utils/log';
import { hasArrayType} from '../../components/typeInference';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getLeftExpr } from '../../utils/ast';
import { renderNode } from '../../components/codegen/renderNodes';
import { checkModificationInNestedScope } from '../../components/functionScope';

/**
 * Array.prototype.pop support
 *
 * @param node
 * @param context
 */
export const arrayPop: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (propNameIs('pop', node)) {
    if (!hasArrayType(node.expression, context.checker)) {
      log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    checkModificationInNestedScope(getLeftExpr(node.expression), context);
    let varName = renderNode(getCallExpressionLeftSide(node), context);
    return `array_pop(${varName})`;
  }
};
