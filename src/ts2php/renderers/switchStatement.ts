import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { normalizeVarName } from '../utils/pathsAndNames';

export function tSwitchStatement(node: ts.SwitchStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      let [arg, block] = renderSupportedNodes(self.children, context);
      const argName = normalizeVarName(arg
        .replace(/^\$this->/, '')
        .replace(/^\$/, ''));
      context.scope.addUsage(argName, [], { terminateLocally: true, dryRun: context.dryRun });
      const expr = `switch (${arg}) {\n${block}\n}`;
      if (isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
      }
      return expr;
    }
  };
}