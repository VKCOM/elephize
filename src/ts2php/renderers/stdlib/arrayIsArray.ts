import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { Context } from '../../components/context';
import { getCallExpressionArg } from '../../utils/ast';
import { renderNodes } from '../../components/codegen/renderNodes';

/**
 * Array.isArray support
 *
 * @param node
 * @param context
 */
export const arrayIsArray: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  const toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression &&
    (node.expression as ts.PropertyAccessExpression).expression.getText() === 'Array' &&
    (node.expression as ts.PropertyAccessExpression).name.escapedText === 'isArray';

  if (toCheck) {
    const varName = renderNodes([getCallExpressionArg(node)], context);
    return `Stdlib::arrayIsArray(${varName})`;
  }
};
