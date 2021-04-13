import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { hasExport } from '../utils/hasExport';
import { renderNode } from '../components/codegen/renderNodes';

export function tVariableStatement(node: ts.VariableStatement, context: Context<Declaration>) {
  const exported = hasExport(node, context.log);
  const declList = node.declarationList;

  if (exported) {
    renderNode(declList, context);
    const flags = context.nodeFlagsStore.get(node);

    return [
      ...flags?.addExpressions || [],
    ].join('\n');
  }

  const content = renderNode(declList, context);
  if (!content || content.length === 0) {
    return '';
  }

  const flags = context.nodeFlagsStore.get(node);
  const additionalExpressions = (flags?.addExpressions || []).join('\n');
  return (additionalExpressions ? additionalExpressions + '\n' : '') + content + ';';
}
