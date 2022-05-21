import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { Context } from '../../components/context';
import { getCallExpressionArg } from '../../utils/ast';
import { renderNode } from '../../components/codegen/renderNodes';

/**
 * Object.keys support
 *
 * @param node
 * @param context
 */
export const json: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  const toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression &&
    (node.expression as ts.PropertyAccessExpression).expression.getText() === 'JSON' &&
    ['parse', 'stringify'].includes((node.expression as ts.PropertyAccessExpression).name.getText());

  if (toCheck) {
    const method = (node.expression as ts.PropertyAccessExpression).name.getText();
    const varName = renderNode(getCallExpressionArg(node), context);
    if (method === 'stringify') {
      return `json_encode(${varName})`;
    }
    if (method === 'parse') {
      return `json_decode(${varName}, true)`;
    }
  }
};
