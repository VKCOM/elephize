import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { Context } from '../../components/context';
import { getCallExpressionArg } from '../../utils/ast';

/**
 * Support for type casting using String(), Number() and Boolean()
 *
 * @param node
 * @param self
 * @param context
 */
export const typecastConstructors: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  const toCheck = node.expression.kind === ts.SyntaxKind.Identifier
    && ['Number', 'String', 'Boolean'].includes(node.expression.getText());

  if (toCheck) {
    let varName = renderSupportedNodes([getCallExpressionArg(self)], context);
    switch (node.expression.getText()) {
      case 'Number':
        return `+${varName}`;
      case 'String':
        return `(string)${varName}`;
      case 'Boolean':
        return `(boolean)${varName}`;
    }
  }
};
