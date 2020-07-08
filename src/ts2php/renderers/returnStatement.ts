import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { getClosestParentOfType } from '../utils/ast';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { Scope } from '../components/unusedCodeElimination/usageGraph';

export function tReturnStatement(node: ts.ReturnStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const [/* return keyword */, retval] = self.children;
      let content;

      const usedVars = new Set<string>();
      const onUsage = (ident: string) => usedVars.add(ident);
      context.scope.addEventListener(Scope.EV_USAGE, onUsage);
      const ret = retval.node.gen(retval, context);
      context.scope.removeEventListener(Scope.EV_USAGE, onUsage);
      usedVars.forEach((ident) => context.scope.terminateCall(ident, { dryRun: context.dryRun }));

      if (getClosestParentOfType(self, ts.SyntaxKind.CallExpression)?.flags?.name === 'array_foreach') {
        // we convert function to plain loop body, return should be omitted.
        // if there is just single return, we should emit break statement
        content = ret ? `${ret};` : 'break;';
      } else {
        content = `return ${ret};`;
      }

      const additionalExpressions = (self.flags.addExpressions || []).join('\n');
      const expr = (additionalExpressions ? additionalExpressions + '\n' : '') + content;
      if (isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
      }
      return expr;
    }
  };
}