import * as ts from 'typescript';
import { CallbackType, Declaration, ExpressionHook } from '../../types';
import { ctx, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { hasArrayType } from '../../components/typeInference/basicTypes';
import { Context } from '../../components/context';
import {
  flagParentOfType,
  getCallExpressionCallbackArg,
  getCallExpressionLeftSide
} from '../../utils/ast';
import { identifyAnonymousNode } from '../../components/unusedCodeElimination/usageGraph/nodeData';
import { getRenderedBlock, unwrapArrowBody } from '../../components/functionScope';
import { renderNodes } from '../../components/codegen/renderNodes';

/**
 * Array.prototype.forEach support
 *
 * @param node
 * @param context
 */
export const arrayForeach: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  if (!propNameIs('forEach', node)) {
    return undefined;
  }
  if (!hasArrayType(node.expression, context.checker)) {
    context.log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  flagParentOfType(node, [ts.SyntaxKind.ExpressionStatement], { passthrough: true }, context.nodeFlagsStore);

  const funcBlockNode: CallbackType = getCallExpressionCallbackArg(node) as CallbackType;
  if (!funcBlockNode) {
    context.log('Array.prototype.forEach: can\'t find callable argument in call.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  let cbArgs: ts.NodeArray<ts.ParameterDeclaration> = funcBlockNode.parameters;
  let cbBlock: ts.Node = funcBlockNode.body;

  const nodeIdent = identifyAnonymousNode(node);
  const { block } = getRenderedBlock(context, nodeIdent, node, cbArgs, cbBlock);
  const varNameNode = getCallExpressionLeftSide(node);
  const renderedBlock = unwrapArrowBody(block, cbBlock, true);

  let varName = renderNodes([varNameNode], context).join('');
  if (!cbArgs || !cbArgs[0]) {
    context.log('Array.prototype.forEach: can\'t find iterable element in call.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  if (cbArgs[0].name.kind !== ts.SyntaxKind.Identifier) {
    context.log('Array.prototype.forEach: parameter destructuring in foreach is not supported.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  if (cbArgs[1]) {
    if (cbArgs[1].name.kind !== ts.SyntaxKind.Identifier) {
      context.log('Array.prototype.forEach: parameter destructuring in foreach is not supported.', LogSeverity.ERROR, ctx(node));
      return 'null';
    }
    return `foreach (${varName} as $${cbArgs[1].name.getText()} => $${cbArgs[0].name.getText()}) ${renderedBlock}`;
  } else {
    return `foreach (${varName} as $${cbArgs[0].name.getText()}) ${renderedBlock}`;
  }
};
