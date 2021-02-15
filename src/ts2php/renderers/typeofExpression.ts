import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { ctx, LogSeverity } from '../utils/log';
import { renderNode } from '../components/codegen/renderNodes';

export function tTypeofExpression(node: ts.TypeOfExpression, context: Context<Declaration>) {
  const type = context.checker.getTypeAtLocation(node.expression);
  const evaluatedType = context.checker.typeToString(type, node.expression, ts.TypeFormatFlags.None);
  if (type.getCallSignatures().length === 0 && evaluatedType !== 'any' && evaluatedType !== 'unknown') {
    const exp = renderNode(node.expression, context);
    return `Stdlib::typeof(${exp})`;
  }

  context.log('Typeof operator does not support `any`/`unknown` and functional arguments ' +
    '(and expressions returning functional types). Ensure that your expression evaluates to ' +
    'non-callable explicit type.', LogSeverity.ERROR, ctx(node));
  return 'null';
}