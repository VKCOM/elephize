import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { getClosestOrigParentOfType } from '../utils/ast';
import { handleComponent } from '../components/react/reactComponents';
import { functionExpressionGen } from '../components/functionScope';
import { identifyAnonymousNode } from '../components/unusedCodeElimination/usageGraph/nodeData';

export function tArrowFunction(node: ts.ArrowFunction, context: Context<Declaration>) {
  // For module-scope see also variableDeclaration transformer and its isCallable section
  const parentStmt = getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement);
  if (parentStmt) {
    const handledContent = handleComponent(context, node);
    if (handledContent) {
      // component is written to different file, so we should not output anything here
      return 'null';
    }
  }
  const parentDecl = getClosestOrigParentOfType(node, ts.SyntaxKind.VariableDeclaration);
  let funcIdent: string;
  if (parentDecl && (parentDecl as ts.VariableDeclaration).initializer === node) {
    funcIdent = (parentDecl as ts.VariableDeclaration).name.getText();
    context.scope.addDeclaration(funcIdent, [], { dryRun: context.dryRun });
  } else {
    funcIdent = identifyAnonymousNode(node);
    // We should terminate anonymous functions locally, unless they are assigned to variable
    context.scope.addDeclaration(funcIdent, [], { terminateLocally: true, dryRun: context.dryRun });
    context.scope.addUsage(funcIdent, [], { dryRun: context.dryRun });
  }

  // Render as expression if the function is nested,
  // because php doesn't have scoped closures for function declarations.
  // Also render all other functions as expressions for simplicity
  return `${functionExpressionGen(node, funcIdent)({
    synList: node.parameters,
    blockNode: node.body,
  }, context)}`;
}
