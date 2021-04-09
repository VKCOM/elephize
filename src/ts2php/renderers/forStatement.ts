import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';

export function tForStatement(node: ts.ForStatement, context: Context<Declaration>) {
  // Automatically add usage for declared vars inside for-statement
  const onDecl = (ident: string) => {
    context.scope.addUsage(ident, [], { terminateLocally: true, dryRun: context.dryRun });
  };
  context.scope.addEventListener(Scope.EV_DECL, onDecl);
  const [varInit, condition, incrementor] = renderNodes([node.initializer, node.condition, node.incrementor], context);
  context.scope.removeEventListener(Scope.EV_DECL, onDecl);

  const statement = renderNode(node.statement, context);
  const expr = `for (${varInit}; ${condition}; ${incrementor}) ${statement}`;
  if (isTopLevel(node, context)) {
    context.moduleDescriptor.addStatement(expr);
  }
  return expr;
}
