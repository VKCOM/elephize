import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { getPhpPrimitiveType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import { getCallExpressionLeftSide } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

/**
 * Object.prototype.hasOwnProperty support
 *
 * @param node
 * @param context
 */
export const hasOwnProperty: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('hasOwnProperty', node)) {
    return undefined;
  }

  const primitiveType = getPhpPrimitiveType(node.expression, context.checker, context.log);
  if (primitiveType !== 'array' && primitiveType !== 'mixed') {
    context.log.error('Left-hand expression must have object-like inferred type', [], context.log.ctx(node));
    return 'null';
  }
  const varNameNode = getCallExpressionLeftSide(node);
  let args = renderNodes([...node.arguments], context);
  let varName = renderNode(varNameNode, context);
  if (!args || !args[0]) {
    context.log.error('Object.prototype.hasOwnProperty: missing argument in call.', [], context.log.ctx(node));
    return 'null';
  }

  return `array_key_exists(${args[0]}, ${varName})`;
};
