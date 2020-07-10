import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { renderNode } from '../components/codegen/renderNodes';

export function tExpressionStatement(node: ts.ExpressionStatement, context: Context<Declaration>) {
  const content = renderNode(node.expression, context);
  const flags = context.nodeFlagsStore.get(node);
  if (flags?.drop || content.length === 0) {
    return '';
  }

  const additionalExpressions = (flags?.addExpressions || []).join('\n');
  const expr = (additionalExpressions ? additionalExpressions + '\n' : '') +
    content + (flags?.passthrough ? '' : ';');

  if (isTopLevel(node, context)) {
    context.moduleDescriptor.addStatement(expr);
  }
  return expr;
}
