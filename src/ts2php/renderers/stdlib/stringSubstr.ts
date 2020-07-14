import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { hasType } from '../../components/typeInference';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

/**
 * String.prototype.substr support
 *
 * @param node
 * @param context
 */
export const stringSubstr: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('substr', node)) {
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
    log('String.prototype.substr: can\'t find index in call.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  log('Converting String.prototype.substr to substr(): check your encodings twice!', LogSeverity.WARN, ctx(node));
  return `substr(${varName}, ${args.join(', ')})`;
};
