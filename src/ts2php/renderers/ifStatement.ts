import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { collectVars } from '../components/unusedCodeElimination/varsUsage';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';

export function tIfStatement(node: ts.IfStatement, context: Context<Declaration>) {

  let [usedVars, condition] = collectVars(() => renderNode(node.expression, context), context);
  let [ifTrue, ifFalse] = renderNodes([node.thenStatement, node.elseStatement], context);

  const flags = context.nodeFlagsStore.get(node);
  if (flags?.drop) {
    return '';
  }

  for (let ident of Array.from(usedVars)) {
    context.scope.addUsage(ident, [], {terminateLocally: true, dryRun: context.dryRun});
  }

  let expr;
  if (ifFalse) {
    expr = `if (${condition}) ${ifTrue} else ${ifFalse}`;
  } else {
    expr = `if (${condition}) ${ifTrue}`;
  }

  if (isTopLevel(node, context)) {
    context.moduleDescriptor.addStatement(expr);
  }
  return expr;
}