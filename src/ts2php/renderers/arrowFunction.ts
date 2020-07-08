import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { getChildByType, getClosestOrigParentOfType } from '../utils/ast';
import { handleComponent } from '../components/react/reactComponents';
import { functionExpressionGen } from '../components/functionScope';
import { identifyAnonymousNode } from '../components/unusedCodeElimination/usageGraph/nodeData';

export function tArrowFunction(node: ts.ArrowFunction): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      // For module-scope see also variableDeclaration transformer and its isCallable section
      const parentStmt = getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement);
      if (parentStmt) {
        let handledContent = handleComponent(context, node, self);
        if (handledContent) {
          // component is written to different file, so we should not output anything here
          return 'null';
        }
      }
      const parentDecl = getClosestOrigParentOfType(node, ts.SyntaxKind.VariableDeclaration);
      let funcIdent: string;
      if (parentDecl && (parentDecl as ts.VariableDeclaration).initializer === node) {
        funcIdent = (parentDecl as ts.VariableDeclaration).name.getText();
      } else {
        funcIdent = identifyAnonymousNode(node);
        // We should terminate anonymous functions locally, unless they are assigned to variable
        context.scope.addDeclaration(funcIdent, [], { terminateLocally: true, dryRun: context.dryRun });
        context.scope.addUsage(funcIdent, [], { dryRun: context.dryRun });
      }

      const synListNode = getChildByType(self, ts.SyntaxKind.SyntaxList); // may be undefined
      const blockNode = self.children[4]; // this may be BlockNode or any other expression!

      // Render as expression if the function is nested,
      // because php doesn't have scoped closures for function declarations.
      // Also render all other functions as expressions for simplicity
      return `${functionExpressionGen(node, funcIdent, self)({
        synListNode,
        blockNode
      }, context)}`;
    }
  };
}