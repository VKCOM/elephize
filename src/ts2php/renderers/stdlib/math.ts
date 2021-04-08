import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { Context } from '../../components/context';
import { getCallExpressionArg } from '../../utils/ast';
import { renderNode, renderNodes } from '../../components/codegen/renderNodes';

/**
 * Math.* methods and constants
 *
 * @param node
 * @param context
 */
export const math: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  const toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression &&
    (node.expression as ts.PropertyAccessExpression).expression.getText() === 'Math';

  if (!toCheck) {
    return undefined;
  }

  const operation = (node.expression as ts.PropertyAccessExpression).name.escapedText.toString();
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
      const varName = renderNode(getCallExpressionArg(node), context);
      return `${operation}(${varName})`;
    case 'random':
      return '(mt_rand(0, PHP_INT_MAX) / (float)PHP_INT_MAX)';
    case 'pow':
    case 'max':
    case 'min':
      const nodes = renderNodes([...node.arguments], context);
      return `${operation}(${nodes.join(', ')})`;
    case 'log2':
      return `log(${renderNode(getCallExpressionArg(node), context)}, 2)`;
    case 'log10':
      return `log(${renderNode(getCallExpressionArg(node), context)}, 10)`;
    default:
      context.log.error('Math: unsupported method (%s)', [operation], context.log.ctx(node));
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
