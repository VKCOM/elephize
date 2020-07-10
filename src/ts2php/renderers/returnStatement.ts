import * as ts from 'typescript';
import { Declaration } from '../types';
import { getClosestParentOfType } from '../utils/ast';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { renderNode } from '../components/codegen/renderNodes';

export function tReturnStatement(node: ts.ReturnStatement, context: Context<Declaration>) {
  const usedVars = new Set<string>();
  const onUsage = (ident: string) => usedVars.add(ident);
  context.scope.addEventListener(Scope.EV_USAGE, onUsage);
  const ret = renderNode(node.expression, context);
  context.scope.removeEventListener(Scope.EV_USAGE, onUsage);
  usedVars.forEach((ident) => context.scope.terminateCall(ident, { dryRun: context.dryRun }));

  const closestParent = getClosestParentOfType(node, ts.SyntaxKind.CallExpression);

  // Check foreach
  const isPropAccess = closestParent && (closestParent as ts.CallExpression).expression.kind === ts.SyntaxKind.PropertyAccessExpression;
  const isForeach = isPropAccess && ((closestParent as ts.CallExpression).expression as ts.PropertyAccessExpression).name.getText() === 'forEach';

  let content = isForeach
    ? (ret ? `${ret};` : 'break;')
    // ^ we convert function to plain loop body, return should be omitted.
    // ^ if there is just single return, we should emit break statement
    : `return ${ret};`;

  const flags = context.nodeFlagsStore.get(node);
  const additionalExpressions = (flags?.addExpressions || []).join('\n');
  const expr = (additionalExpressions ? additionalExpressions + '\n' : '') + content;
  if (isTopLevel(node, context)) {
    context.moduleDescriptor.addStatement(expr);
  }
  return expr;
}