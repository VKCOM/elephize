import * as ts from 'typescript';
import { fetchAllBindingIdents, getClosestOrigParentByPredicate } from '../../utils/ast';
import { log, LogSeverity } from '../../utils/log';
import { Context } from '../context';
import { Scope } from './usageGraph';
import { Declaration } from '../../types';

export function markUsedVars(node: ts.CallExpression, lExp: ts.Identifier, usedVars: Set<string>, context: Context<Declaration>) {
  // Unused vars elimination related:
  const stopExpressions = [
    ts.SyntaxKind.FunctionExpression,
    ts.SyntaxKind.FunctionDeclaration,
    ts.SyntaxKind.VariableDeclaration,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.SourceFile
  ];
  const upperStatement = getClosestOrigParentByPredicate(node, (p: ts.Node) => stopExpressions.includes(p.kind));
  if (upperStatement) {
    switch (upperStatement.kind) {
      case ts.SyntaxKind.FunctionDeclaration:
      case ts.SyntaxKind.ArrowFunction:
      case ts.SyntaxKind.FunctionExpression:
      case ts.SyntaxKind.SourceFile:
        // connect expression terminal node to scope terminal node
        context.scope.terminateCall(lExp.getText(), { dryRun: context.dryRun });
        // also connect all used vars to scope terminal node as side-effect usage
        usedVars.forEach((ident) => context.scope.terminateCall(ident, { dryRun: context.dryRun }));
        break;
      case ts.SyntaxKind.VariableDeclaration:
        const bindings = fetchAllBindingIdents((upperStatement as ts.VariableDeclaration).name);
        for (let binding of bindings) {
          // connect expression terminal node to varname node (assigned var name)
          context.scope.terminateCall(lExp.getText(), { traceSourceIdent: binding.getText(), dryRun: context.dryRun });
          // also connect all used vars to varname node as side-effect usage
          for (let ident of Array.from(usedVars)) {
            context.scope.terminateCall(ident, { traceSourceIdent: binding.getText(), dryRun: context.dryRun });
          }
        }
        break;
      default:
        log('Unsupported expression kind; this may lead to unexpected behavior od dead code elimination, check your result', LogSeverity.INFO);
    }
  }
  // end of unused vars elimination related
}

/**
 * This helper collects vars that are added with addUsage when running `runner` callable.
 *
 * @param runner
 * @param context
 */
export function collectVars<RET>(runner: () => RET, context: Context<Declaration>): [Set<string>, RET] {
  const usedVars = new Set<string>();
  const onUsage = (ident: string) => usedVars.add(ident);
  context.scope.addEventListener(Scope.EV_USAGE, onUsage);
  const retval: RET = runner();
  context.scope.removeEventListener(Scope.EV_USAGE, onUsage);
  return [usedVars, retval];
}
