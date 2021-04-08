import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { Context } from '../../components/context';
import { getCallExpressionArg } from '../../utils/ast';
import { renderNode } from '../../components/codegen/renderNodes';

/**
 * Support for type casting using String(), Number() and Boolean()
 *
 * @param node
 * @param context
 */
export const typecastConstructors: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  const toCheck = node.expression.kind === ts.SyntaxKind.Identifier &&
    ['Number', 'String', 'Boolean'].includes(node.expression.getText());

  if (toCheck) {
    const varName = renderNode(getCallExpressionArg(node), context);
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
