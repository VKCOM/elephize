import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { hasArrayType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

/**
 * String.prototype.lastIndexOf support
 * Array.prototype.lastIndexOf support
 *
 * @param node
 * @param context
 */
export const arrayStringLastIndexOf: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('lastIndexOf', node)) {
    return undefined;
  }
  const nd: ts.Node = (node.expression as ts.PropertyAccessExpression).expression;
  const type = context.checker.getTypeAtLocation(nd);
  const varNameNode = getCallExpressionLeftSide(node);
  if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
    const args = renderNodes([...node.arguments], context);
    const varName = renderNode(varNameNode, context);
    if (!args || !args[0]) {
      context.log.error('String.prototype.lastIndexOf: can\'t find searchable element in call.', [], context.log.ctx(node));
      return 'null';
    }
    if (args[1]) { // strrpos looks from the beginning, add unary minus to search from the end
      args[1] = '-' + args[1];
    }
    return `strrpos(${varName}, ${args.join(', ')})`;
  } else {
    if (!hasArrayType(node.expression, context.checker, context.log)) {
      context.log.error('Left-hand expression must have string, array-like or iterable inferred type', [], context.log.ctx(node));
      return 'null';
    }
    const args = renderNodes([...node.arguments], context);
    const varName = renderNode(varNameNode, context);
    if (!args || !args[0]) {
      context.log.error('Array.prototype.lastIndexOf: can\'t find searchable element in call.', [], context.log.ctx(node));
      return 'null';
    }
    if (args[1]) {
      return `Stdlib::arrayLastIndexOf(${args[0]}, ${varName}, ${args[1]})`;
    } else {
      return `Stdlib::arrayLastIndexOf(${args[0]}, ${varName})`;
    }
  }
};
