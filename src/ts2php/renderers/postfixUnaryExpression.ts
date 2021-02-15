import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { ctx, LogSeverity } from '../utils/log';
import { renderNode } from '../components/codegen/renderNodes';
import { checkModificationInNestedScope } from '../components/functionScope';

export function tPostfixUnaryExpression(node: ts.PostfixUnaryExpression, context: Context<Declaration>) {
  if (node.operand.kind === ts.SyntaxKind.Identifier) {
    checkModificationInNestedScope(node.operand as ts.Identifier, context);
    let type = context.checker.getTypeAtLocation(node.operand);
    if (context.checker.typeToString(type, node.operand, ts.TypeFormatFlags.None) !== 'number') {
      context.log('Trying to apply unary inc/dec operator to non-number variable. This is probably an error.', LogSeverity.ERROR, ctx(node));
    }
  }

  let operator = '';
  switch (node.operator) {
    case ts.SyntaxKind.MinusMinusToken:
      operator = '--';
      break;
    case ts.SyntaxKind.PlusPlusToken:
      operator = '++';
      break;
  }

  const content = renderNode(node.operand, context);
  return `${content}${operator}`;
}
