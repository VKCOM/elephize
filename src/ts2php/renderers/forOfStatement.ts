import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { normalizeVarName } from '../utils/pathsAndNames';
import { collectVars } from '../components/unusedCodeElimination/varsUsage';

export function tForOfStatement(node: ts.ForOfStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const [/* for */, /* paren */, varInitNode, /* of */, expressionNode, /* paren */, statementNode] = self.children;
      let [initializer] = renderSupportedNodes([varInitNode], context);
      const [usedVars, [expression]] = collectVars(() => renderSupportedNodes([expressionNode], context), context);
      const initNodeName = normalizeVarName(initializer
        .replace(/^\$this->/, '')
        .replace(/^\$/, ''));
      context.scope.addUsage(initNodeName, Array.from(usedVars), { dryRun: context.dryRun });

      let [statement] = renderSupportedNodes([statementNode], context);

      const expr = `foreach (${expression} as ${initializer}) ${statement}`;
      if (isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
      }
      return expr;
    }
  };
}