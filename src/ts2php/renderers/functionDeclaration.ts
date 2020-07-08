import * as ts from 'typescript';
import { Declaration, DeclFlag, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { handleComponent } from '../components/react/reactComponents';
import { Context } from '../components/context';
import { snakify } from '../utils/pathsAndNames';
import { hasExport } from '../utils/hasExport';
import {
  getChildByType,
  getChildOfAnyTypeAfterSelected,
  isExportedFun
} from '../utils/ast';
import { isTopLevel, isTopLevelComponent } from '../utils/isTopLevel';
import { functionExpressionGen, generateFunctionElements } from '../components/functionScope';
import { identifyAnonymousNode } from '../components/unusedCodeElimination/usageGraph/nodeData';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { ctx, log, LogSeverity } from '../utils/log';

export function tFunctionDeclaration(node: ts.FunctionDeclaration): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const exported = hasExport(node);
      if (exported === null) {
        return ''; // export default not supported
      }

      let handledContent = handleComponent(context, node, self);
      if (handledContent) {
        // component is written to different file, so we should not output anything here
        return 'null';
      }

      const varNameNode = getChildByType(self, ts.SyntaxKind.Identifier);
      const varName = renderSupportedNodes([varNameNode], context)[0];

      // used to wrap vars in closureProxies, but should NOT be used for top-level declarations
      const additionalExpressions = (self.flags.addExpressions || []).join('\n');

      // Generate method declaration for exported and top-level functions
      if (isTopLevel(node, context)) {
        if (isTopLevelComponent(self)) {
          // Don't render component function in current module
          return '';
        }

        if (node.name) {
          const decl = context.scope.addDeclaration(node.name.getText(), [], { dryRun: context.dryRun });
          if (decl) {
            decl.data.flags = DeclFlag.HoistedToModule | DeclFlag.Callable;
          }

          const els = generateFunctionElements({
            statement: self,
            expr: self,
            nodeIdent: node.name.getText(),
            context
          });

          if (els) { // should be true for all non-components, this check is only for typescript to be happy
            const { syntaxList, block } = els;
            if (!context.dryRun && context.scope.checkUsage(node.name.getText())) {
              context.moduleDescriptor.addMethod(node.name.getText(), block, syntaxList, 'public');
            }

            if (isExportedFun(node.name)) {
              context.scope.terminateCall(node.name.getText(), {traceSourceIdent: Scope.tNode, dryRun: context.dryRun});
              if (decl && decl.ownedScope) {
                decl.ownedScope.terminateToParentTerminalNode(context.dryRun);
              }
            }
          }
        }
        return '';
      }

      let funcIdent: string;
      if (node.name) {
        funcIdent = node.name.getText();
        context.scope.addDeclaration(
          funcIdent, [],
          { terminateGlobally: isExportedFun(node.name), dryRun: context.dryRun }
        );
      } else {
        funcIdent = identifyAnonymousNode(node);
        // We should terminate anonymous functions locally, unless they are assigned to variable
        context.scope.addDeclaration(funcIdent, [], { terminateLocally: true, dryRun: context.dryRun });
      }

      const synListNode = getChildOfAnyTypeAfterSelected(self, ts.SyntaxKind.OpenParenToken, [ts.SyntaxKind.SyntaxList]);
      const blockNode = getChildByType(self, ts.SyntaxKind.Block);
      const initializer = functionExpressionGen(node, funcIdent, self)({
        synListNode: synListNode,
        blockNode: blockNode as NodeInfo
      }, context);

      if (!node.name) {
        log('Function declarations without name are not supported', LogSeverity.ERROR, ctx(node));
        return 'null;';
      }

      if (!context.dryRun && context.scope.checkUsage(node.name.getText())) {
        // Render as expression if the function is nested,
        // because php doesn't have scoped closures for function declarations.
        // Also render all other functions as expressions for simplicity
        return (additionalExpressions ? additionalExpressions + '\n' : '') + `${snakify(varName)} = ${initializer};`;
      }

      return '';
    }
  };
}