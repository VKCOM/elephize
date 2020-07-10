import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { normalizeVarName } from '../utils/pathsAndNames';
import { renderNodes } from '../components/codegen/renderNodes';

export function tSwitchStatement(node: ts.SwitchStatement, context: Context<Declaration>) {
  let [arg, block] = renderNodes([node.expression, node.caseBlock], context);
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