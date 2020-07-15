import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { hasArrayType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

/**
 * String.prototype.includes support
 * Array.prototype.includes support
 *
 * @param node
 * @param context
 */
export const arrayStringIncludes: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('includes', node)) {
    return undefined;
  }
  let nd: ts.Node = (node.expression as ts.PropertyAccessExpression).expression;
  let type = context.checker.getTypeAtLocation(nd);
  const varNameNode = getCallExpressionLeftSide(node);

  if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
    let args = renderNodes([...node.arguments], context);
    let varName = renderNode(varNameNode, context);
    if (!args || !args[0]) {
      log('String.prototype.includes: can\'t find searchable element in call.', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    if (args[1]) {
      return `strpos(${varName}, ${args[0]}, ${args[1]}) !== -1`;
    } else {
      return `strpos(${varName}, ${args[0]}) !== -1`;
    }
  } else {
    if (!hasArrayType(node.expression, context.checker)) {
      log('Left-hand expression must have string, array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    let args = renderNodes([...node.arguments], context);
    let varName = renderNode(varNameNode, context);
    if (!args || !args[0]) {
      log('Array.prototype.includes: can\'t find searchable element in call.', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    if (args[1]) {
      return `in_array(${args[0]}, array_slice(${varName}, ${args[1]}), true)`;
    } else {
      return `in_array(${args[0]}, ${varName}, true)`;
    }
  }
};
