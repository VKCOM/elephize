import * as ts from 'typescript';
import { Declaration, NodeDescription, NodeInfo } from '../types';
import { Context } from '../components/context';
import { getChildByType, getClosestOrigParentOfType } from '../utils/ast';
import { handleComponent } from '../components/react/reactComponents';
import { functionExpressionGen } from '../components/functionScope';
import { identifyAnonymousNode } from '../components/unusedCodeElimination/usageGraph/nodeData';

export function tFunctionExpression(node: ts.FunctionExpression): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (nodeInfo: NodeInfo, context: Context<Declaration>) => {
      const parentStmt = getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement);
      if (parentStmt) {
        let handledContent = handleComponent(context, node, nodeInfo);
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
      }

      const synListNode = getChildByType(nodeInfo, ts.SyntaxKind.SyntaxList); // may be undefined
      const blockNode = getChildByType(nodeInfo, ts.SyntaxKind.Block);

      return functionExpressionGen(node, funcIdent, nodeInfo)({
        synListNode: synListNode as NodeInfo,
        blockNode: blockNode as NodeInfo
      }, context);
    }
  };
}
