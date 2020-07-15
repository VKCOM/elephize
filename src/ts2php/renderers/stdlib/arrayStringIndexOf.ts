import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { hasArrayType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

/**
 * String.prototype.indexOf support
 * Array.prototype.indexOf support
 *
 * @param node
 * @param context
 */
export const arrayStringIndexOf: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('indexOf', node)) {
    return undefined;
  }
  let nd: ts.Node = (node.expression as ts.PropertyAccessExpression).expression;
  let type = context.checker.getTypeAtLocation(nd);
  const varNameNode = getCallExpressionLeftSide(node);

  if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
    let args = renderNodes([...node.arguments], context);
    let varName = renderNode(varNameNode, context);
    if (!args || !args[0]) {
      log('String.prototype.indexOf: can\'t find searchable element in call.', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    return `strpos(${varName}, ${args.join(', ')})`;
  } else {
    if (!hasArrayType(node.expression, context.checker)) {
      log('Left-hand expression must have string, array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    let args = renderNodes([...node.arguments], context);
    let varName = renderNode(varNameNode, context);
    if (!args || !args[0]) {
      log('Array.prototype.indexOf: can\'t find searchable element in call.', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    if (args[1]) {
      return `Stdlib::arrayIndexOf(${args[0]}, ${varName}, ${args[1]})`;
    } else {
      return `Stdlib::arrayIndexOf(${args[0]}, ${varName})`;
    }
  }
};
