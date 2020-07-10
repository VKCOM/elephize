import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertArrayType, assertLocalModification } from './_assert';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getLeftExpr } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

/**
 * Array.prototype.splice support
 *
 * @param node
 * @param context
 */
export const arraySplice: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('splice', node)) {
    return undefined;
  }
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  assertLocalModification(getLeftExpr(node.expression), context);
  const varNameNode = getCallExpressionLeftSide(node);
  let args = renderNodes([...node.arguments], context);
  let varName = renderNode(varNameNode, context);
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
