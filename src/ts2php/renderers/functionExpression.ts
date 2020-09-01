import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { getClosestParentOfType } from '../utils/ast';
import { handleComponent } from '../components/react/reactComponents';
import { functionExpressionGen } from '../components/functionScope';
import { identifyAnonymousNode } from '../components/unusedCodeElimination/usageGraph/nodeData';

export function tFunctionExpression(node: ts.FunctionExpression, context: Context<Declaration>) {
  const parentStmt = getClosestParentOfType(node, ts.SyntaxKind.VariableStatement);
  if (parentStmt) {
    let handledContent = handleComponent(context, node);
    if (handledContent) {
      // component is written to different file, so we should not output anything here
      return 'null';
    }
  }

  const parentDecl = getClosestParentOfType(node, ts.SyntaxKind.VariableDeclaration);
  let funcIdent: string;
  if (parentDecl && (parentDecl as ts.VariableDeclaration).initializer === node) {
    funcIdent = (parentDecl as ts.VariableDeclaration).name.getText();
    context.scope.addDeclaration(funcIdent, [], { dryRun: context.dryRun });
  } else {
    funcIdent = identifyAnonymousNode(node);
    // We should terminate anonymous functions locally, unless they are assigned to variable
    context.scope.addDeclaration(funcIdent, [], { terminateLocally: true, dryRun: context.dryRun });
  }

  return functionExpressionGen(node, funcIdent)({
    synList: node.parameters,
    blockNode: node.body
  }, context);
}
