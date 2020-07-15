import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { Context } from '../../components/context';
import { renderNode } from '../../components/codegen/renderNodes';

/**
 * parseInt/parseFloat support
 *
 * @param node
 * @param context
 */
export const parse: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (node.expression.getText() === 'parseInt') {
    if (node.arguments.length > 1 && node.arguments[1].getText() !== '10') {
      return `intval(${renderNode(node.arguments[0], context)}, ${node.arguments[1].getText()})`;
    }
    return '(int)' + renderNode(node.arguments[0], context);
  }
  if (node.expression.getText() === 'parseFloat') {
    return '(float)' + renderNode(node.arguments[0], context);
  }
};
