import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { hasType } from '../../components/typeInference/basicTypes';
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
    context.log.error('Left-hand expression must have string inferred type', [], context.log.ctx(node));
    return 'null';
  }
  const varNameNode = getCallExpressionLeftSide(node);
  const args = renderNodes([...node.arguments], context);
  const varName = renderNode(varNameNode, context);
  if (!args || !args[0]) {
    context.log.error('String.prototype.startsWith: can\'t find searchable element in call.', [], context.log.ctx(node));
    return 'null';
  }
  context.log.warn('Converting String.prototype.startsWith to strpos(): check your encodings twice!', [], context.log.ctx(node));
  if (args[1]) {
    return `strpos(${varName}, ${args[0]}, ${args[1]}) === 0`;
  } else {
    return `strpos(${varName}, ${args[0]}) === 0`;
  }
};
