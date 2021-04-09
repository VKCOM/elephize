import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { propNameIs } from './_propName';
import { hasArrayType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import {
  flagParentOfType,
  getCallExpressionLeftSide,
  getLeftExpr,
} from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

function isForcedArrayType(context: Context<Declaration>, node: ts.CallExpression) {
  const left = getLeftExpr(node.expression)?.getText();
  if (!left) {
    return false;
  }

  const [decl] = context.scope.findByIdent(left) || [];
  if (!decl) {
    return false;
  }

  return decl.forcedType === 'array';
}

/**
 * String.prototype.slice support
 * Array.prototype.slice support
 *
 * @param node
 * @param context
 */
export const arrayStringSlice: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('slice', node)) {
    return undefined;
  }
  const nd: ts.Node = (node.expression as ts.PropertyAccessExpression).expression;
  const type = context.checker.getTypeAtLocation(nd);
  const varNameNode = getCallExpressionLeftSide(node);
  if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
    const args = renderNodes([...node.arguments], context);
    const varName = renderNode(varNameNode, context);
    if (!args || !args[0]) {
      return varName;
    }
    context.log.warn('Converting String.prototype.substr to substr(): check your encodings twice!', [], context.log.ctx(node));
    if (args[1]) {
      return `substr(${varName}, ${args[0]}, ${args[1]} - ${args[0]})`;
    } else {
      return `substr(${varName}, ${args[0]})`;
    }
  } else {
    const forced = isForcedArrayType(context, node);
    if (!hasArrayType(node.expression, context.checker, context.log) && !forced) {
      context.log.error('Left-hand expression must have string, array-like or iterable inferred type', [], context.log.ctx(node));
      return 'null';
    }

    if (forced) {
      flagParentOfType(node, [ts.SyntaxKind.VariableDeclarationList], { forceType: 'split' }, context.nodeFlagsStore);
    }

    const args = renderNodes([...node.arguments], context);
    const varName = renderNode(varNameNode, context);
    if (!args || !args[0]) {
      return `array_slice(${varName}, 0)`;
    }
    if (args[1]) {
      return `array_slice(${varName}, ${args[0]}, ${args[1]} - ${args[0]})`;
    } else {
      return `array_slice(${varName}, ${args[0]})`;
    }
  }
};
