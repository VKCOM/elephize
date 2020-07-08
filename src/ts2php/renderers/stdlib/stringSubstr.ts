import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getChildByType } from '../../utils/ast';

/**
 * String.prototype.substr support
 *
 * @param node
 * @param self
 * @param context
 */
export const stringSubstr: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('substr', node)) {
    return undefined;
  }
  if (!assertType(node.expression, context.checker, 'string')) {
    log('Left-hand expression must have string inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  const argsNodes = getChildByType(self, ts.SyntaxKind.SyntaxList);
  const varNameNode = getCallExpressionLeftSide(self);
  let args = renderSupportedNodes(argsNodes?.children || [], context);
  let varName = renderSupportedNodes([varNameNode], context);
  if (!args || !args[0]) {
    log('String.prototype.substr: can\'t find index in call.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  log('Converting String.prototype.substr to substr(): check your encodings twice!', LogSeverity.WARN, ctx(node));
  return `substr(${varName}, ${args.join(', ')})`;
};
