import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { Context } from '../../components/context';
import { getCallExpressionArg } from '../../utils/ast';
import { renderNode } from '../../components/codegen/renderNodes';

/**
 * Object.values support
 *
 * @param node
 * @param context
 */
export const objectValues: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  const toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression &&
    (node.expression as ts.PropertyAccessExpression).expression.getText() === 'Object' &&
    (node.expression as ts.PropertyAccessExpression).name.escapedText === 'values';

  if (toCheck) {
    const varName = renderNode(getCallExpressionArg(node), context);
    return `array_values(${varName})`;
  }
};
