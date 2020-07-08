import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertType } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getChildByType } from '../../utils/ast';

/**
 * String.prototype.startsWith support
 *
 * @param node
 * @param self
 * @param context
 */
export const stringStartsWith: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('startsWith', node)) {
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
