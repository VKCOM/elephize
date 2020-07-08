import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { Context } from '../../components/context';
import { getCallExpressionArg } from '../../utils/ast';

/**
 * Object.keys support
 *
 * @param node
 * @param self
 * @param context
 */
export const objectKeys: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  const toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression
    && (node.expression as ts.PropertyAccessExpression).expression.getText() === 'Object'
    && (node.expression as ts.PropertyAccessExpression).name.escapedText === 'keys';

  if (toCheck) {
    let varName = renderSupportedNodes([getCallExpressionArg(self)], context);
    return `array_keys(${varName})`;
  }
};
