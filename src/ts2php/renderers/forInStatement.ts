import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';

export function tForInStatement(node: ts.ForInStatement, context: Context<Declaration>) {
  // Automatically add usage for declared vars inside for-statement
  const onDecl = (ident: string) => {
    context.scope.addUsage(ident, [], { terminateLocally: true, dryRun: context.dryRun });
  };
  context.scope.addEventListener(Scope.EV_DECL, onDecl);
  let [initializer, expression] = renderNodes([node.initializer, node.expression], context);
  context.scope.removeEventListener(Scope.EV_DECL, onDecl);

  let statement = renderNode(node.statement, context);
  const flags = context.nodeFlagsStore.get(node);
  if (flags?.validated) {
    const expr = `foreach (${expression} as ${initializer} => $_tmpVal) ${statement}`;
    if (isTopLevel(node, context)) {
      context.moduleDescriptor.addStatement(expr);
    }
    return expr;
  }
  throw new Error('For-In statement should have the .hasOwnProperty check: \n' + node.getFullText().substr(0, 200));
}
