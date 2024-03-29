import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';
import { checkModificationInNestedScope } from '../components/functionScope';

export function tPrefixUnaryExpression(node: ts.PrefixUnaryExpression, context: Context<Declaration>) {
  if (node.operand.kind === ts.SyntaxKind.Identifier && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken)) {
    checkModificationInNestedScope(node.operand as ts.Identifier, context);
    const type = context.checker.getTypeAtLocation(node.operand);
    if (context.checker.typeToString(type, node.operand, ts.TypeFormatFlags.None) !== 'number') {
      context.log.error('Trying to apply unary inc/dec operator to non-number variable. This is probably an error.', [], context.log.ctx(node));
    }
  }

  let operator = '';
  switch (node.operator) {
    case ts.SyntaxKind.ExclamationToken:
      operator = '!';
      break;
    case ts.SyntaxKind.MinusMinusToken:
      operator = '--';
      break;
    case ts.SyntaxKind.MinusToken:
      operator = '-';
      break;
    case ts.SyntaxKind.PlusPlusToken:
      operator = '++';
      break;
    case ts.SyntaxKind.PlusToken:
      operator = '+';
      break;
    case ts.SyntaxKind.TildeToken:
      operator = '~';
      break;
  }

  const content = renderNode(node.operand, context);
  return `${operator}${content}`;
}
