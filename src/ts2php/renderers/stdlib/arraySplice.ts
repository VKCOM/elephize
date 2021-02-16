import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { hasArrayType} from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide, getLeftExpr } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';
import { checkModificationInNestedScope } from '../../components/functionScope';

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
  if (!hasArrayType(node.expression, context.checker, context.log)) {
    context.log.error('Left-hand expression must have array-like or iterable inferred type', [], context.log.ctx(node));
    return 'null';
  }
  checkModificationInNestedScope(getLeftExpr(node.expression), context);
  const varNameNode = getCallExpressionLeftSide(node);
  let args = renderNodes([...node.arguments], context);
  let varName = renderNode(varNameNode, context);
  if (!args || !args[0]) {
    context.log.error('Array.prototype.splice: no index in call.', [], context.log.ctx(node));
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
