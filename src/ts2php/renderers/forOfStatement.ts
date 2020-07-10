import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { normalizeVarName } from '../utils/pathsAndNames';
import { collectVars } from '../components/unusedCodeElimination/varsUsage';
import { renderNode } from '../components/codegen/renderNodes';

export function tForOfStatement(node: ts.ForOfStatement, context: Context<Declaration>) {
  let initializer = renderNode(node.initializer, context);
  const [usedVars, expression] = collectVars(() => renderNode(node.expression, context), context);
  const initNodeName = normalizeVarName(initializer
    .replace(/^\$this->/, '')
    .replace(/^\$/, ''));
  context.scope.addUsage(initNodeName, Array.from(usedVars), { dryRun: context.dryRun });

  let statement = renderNode(node.statement, context);

  const expr = `foreach (${expression} as ${initializer}) ${statement}`;
  if (isTopLevel(node, context)) {
    context.moduleDescriptor.addStatement(expr);
  }
  return expr;
}