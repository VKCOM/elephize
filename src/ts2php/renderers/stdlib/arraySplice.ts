import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertArrayType, assertLocalModification } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getChildByType, getLeftExpr } from '../../utils/ast';

/**
 * Array.prototype.splice support
 *
 * @param node
 * @param self
 * @param context
 */
export const arraySplice: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('splice', node)) {
    return undefined;
  }
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  assertLocalModification(getLeftExpr(node.expression), context);
  const argsNodes = getChildByType(self, ts.SyntaxKind.SyntaxList);
  const varNameNode = getCallExpressionLeftSide(self);
  let args = renderSupportedNodes(argsNodes?.children || [], context);
  let varName = renderSupportedNodes([varNameNode], context);
  if (!args || !args[0]) {
    log('Array.prototype.splice: no index in call.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  let [startOffset, deleteLength, ...elementsToAdd] = args;
  if (!deleteLength) {
    return `array_splice(${varName}, ${startOffset})`;
  }
  if (elementsToAdd.length === 0) {
    return `array_splice(${varName}, ${startOffset}, ${deleteLength})`;
  }
  return `array_splice(${varName}, ${startOffset}, ${deleteLength}, [${elementsToAdd.join(', ')}])`;
};
