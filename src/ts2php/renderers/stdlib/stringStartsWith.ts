import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { hasType } from '../../components/typeInference';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

/**
 * String.prototype.startsWith support
 *
 * @param node
 * @param context
 */
export const stringStartsWith: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('startsWith', node)) {
    return undefined;
  }
  if (!hasType(node.expression, context.checker, 'string')) {
    log('Left-hand expression must have string inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  const varNameNode = getCallExpressionLeftSide(node);
  let args = renderNodes([...node.arguments], context);
  let varName = renderNode(varNameNode, context);
  if (!args || !args[0]) {
    log('String.prototype.startsWith: can\'t find searchable element in call.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  log('Converting String.prototype.startsWith to strpos(): check your encodings twice!', LogSeverity.WARN, ctx(node));
  if (args[1]) {
    return `strpos(${varName}, ${args[0]}, ${args[1]}) === 0`;
  } else {
    return `strpos(${varName}, ${args[0]}) === 0`;
  }
};
