import * as ts from 'typescript';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { Declaration, ExpressionHook, NodeInfo } from '../../types';
import { ctx, log, LogSeverity } from '../../utils/log';
import { Context } from '../../components/context';
import { getCallExpressionArg, getChildByType } from '../../utils/ast';

/**
 * Math.* methods and constants
 *
 * @param node
 * @param self
 * @param context
 */
export const math: ExpressionHook = (node: ts.CallExpression, self: NodeInfo, context: Context<Declaration>) => {
  const toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression
    && (node.expression as ts.PropertyAccessExpression).expression.getText() === 'Math';

  if (!toCheck) {
    return undefined;
  }

  let operation = (node.expression as ts.PropertyAccessExpression).name.escapedText.toString();
  switch (operation) {
    case 'abs':
    case 'round':
    case 'floor':
    case 'ceil':
    case 'sin':
    case 'cos':
    case 'tan':
    case 'asin':
    case 'acos':
    case 'atan':
    case 'exp':
    case 'log':
    case 'sqrt':
      let varName = renderSupportedNodes([getCallExpressionArg(self)], context).join('');
      return `${operation}(${varName})`;
    case 'random':
      return 'mt_rand(0, PHP_INT_MAX) / (float)PHP_INT_MAX';
    case 'pow':
    case 'max':
    case 'min':
      const args = getChildByType(self, ts.SyntaxKind.SyntaxList);
      let nodes = renderSupportedNodes(args?.children || [], context);
      return `${operation}(${nodes.join(', ')})`;
    case 'log2':
      return `log(${renderSupportedNodes([getCallExpressionArg(self)], context).join('')}, 2)`;
    case 'log10':
      return `log(${renderSupportedNodes([getCallExpressionArg(self)], context).join('')}, 10)`;
    default:
      log(`Math: unsupported method (${operation})`, LogSeverity.ERROR, ctx(node));
      return 'null';
  }
};

export const supportedMathMethods = [
  'abs',
  'round',
  'floor',
  'ceil',
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan',
  'exp',
  'log',
  'sqrt',
  'random',
  'pow',
  'max',
  'min',
  'log2',
  'log10',
];