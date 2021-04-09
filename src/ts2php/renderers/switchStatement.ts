import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { isTopLevel } from '../utils/isTopLevel';
import { renderNodes } from '../components/codegen/renderNodes';
import { getIdentities } from '../utils/ast';

export function tSwitchStatement(node: ts.SwitchStatement, context: Context<Declaration>) {
  const [arg, block] = renderNodes([node.expression, node.caseBlock], context);
  getIdentities(node.expression).forEach((usageIdent) => {
    context.scope.addUsage(usageIdent.getText(), [], { terminateLocally: true, dryRun: context.dryRun });
  });

  const expr = `switch (${arg}) {\n${block}\n}`;
  if (isTopLevel(node, context)) {
    context.moduleDescriptor.addStatement(expr);
  }
  return expr;
}
