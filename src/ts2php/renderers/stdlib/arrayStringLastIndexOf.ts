import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertArrayType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getChildByType } from '../../utils/ast';

/**
 * String.prototype.lastIndexOf support
 * Array.prototype.lastIndexOf support
 *
 * @param node
 * @param self
 * @param context
 */
export const arrayStringLastIndexOf: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('lastIndexOf', node)) {
    return undefined;
  }
  let nd: ts.Node = (node.expression as ts.PropertyAccessExpression).expression;
  let type = context.checker.getTypeAtLocation(nd);
  const argsNodes = getChildByType(self, ts.SyntaxKind.SyntaxList);
  const varNameNode = getCallExpressionLeftSide(self);
  if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
    let args = renderSupportedNodes(argsNodes?.children || [], context);
    let varName = renderSupportedNodes([varNameNode], context);
    if (!args || !args[0]) {
      log('String.prototype.lastIndexOf: can\'t find searchable element in call.', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    if (args[1]) { // strrpos looks from the beginning, add unary minus to search from the end
      args[1] = '-' + args[1];
    }
    return `strrpos(${varName}, ${args.join(', ')})`;
  } else {
    if (!assertArrayType(node.expression, context.checker)) {
      log('Left-hand expression must have string, array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    let args = renderSupportedNodes(argsNodes?.children || [], context);
    let varName = renderSupportedNodes([varNameNode], context);
    if (!args || !args[0]) {
      log('Array.prototype.lastIndexOf: can\'t find searchable element in call.', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    if (args[1]) {
      return `Stdlib::arrayLastIndexOf(${args[0]}, ${varName}, ${args[1]})`;
    } else {
      return `Stdlib::arrayLastIndexOf(${args[0]}, ${varName})`;
    }
  }
};
