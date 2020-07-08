import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { propNameIs } from './_propName';
import { assertArrayType } from './_assert';
import { Context } from '../../components/context';
import {
  flagParentOfType,
  getCallExpressionCallbackArg,
  getCallExpressionLeftSide,
  getChildByType
} from '../../utils/ast';
import { identifyAnonymousNode } from '../../components/unusedCodeElimination/usageGraph/nodeData';
import { getRenderedBlock, unwrapArrowBody } from '../../components/functionScope';

/**
 * Array.prototype.forEach support
 *
 * @param node
 * @param self
 * @param context
 */
export const arrayForeach: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  if (!propNameIs('forEach', node)) {
    return undefined;
  }
  if (!assertArrayType(node.expression, context.checker)) {
    log('Left-hand expression must have array-like or iterable inferred type', LogSeverity.ERROR, ctx(node));
    return 'null';
  }

  self.flags.name = 'array_foreach';
  flagParentOfType(self, [ts.SyntaxKind.ExpressionStatement], { passthrough: true });

  const funcBlockNode = getCallExpressionCallbackArg(self);
  const synListNode = funcBlockNode && getChildByType(funcBlockNode, ts.SyntaxKind.SyntaxList);
  // There may be a lot of expressions in [4]th child of arrow function node...
  const blockNode = funcBlockNode?.children[4];

  const nodeIdent = identifyAnonymousNode(node);
  const { block } = getRenderedBlock(context, nodeIdent, node, undefined, [synListNode, blockNode]);
  const callArgs = self.flags.rawNodes;
  const varNameNode = getCallExpressionLeftSide(self);
  const renderedBlock = unwrapArrowBody(block, blockNode, true);

  let varName = renderSupportedNodes([varNameNode], context).join('');
  if (!callArgs || !callArgs[0]) {
    log('Array.prototype.forEach: can\'t find iterable element in call.', LogSeverity.ERROR, ctx(node));
    return 'null';
  }
  if (callArgs[1]) {
    return `foreach (${varName} as $${callArgs[1].getText()} => $${callArgs[0].getText()}) ${renderedBlock}`;
  } else {
    return `foreach (${varName} as $${callArgs[0].getText()}) ${renderedBlock}`;
  }
};
