import * as ts from 'typescript';
import { Declaration, DeclFlag } from '../types';
import { handleComponent } from '../components/react/reactComponents';
import { Context } from '../components/context';
import { snakify } from '../utils/pathsAndNames';
import { hasExport } from '../utils/hasExport';
import { isExportedFun } from '../utils/ast';
import { isTopLevel, isTopLevelComponent } from '../utils/isTopLevel';
import { functionExpressionGen, generateFunctionElements } from '../components/functionScope';
import { identifyAnonymousNode } from '../components/unusedCodeElimination/usageGraph/nodeData';
import { Scope } from '../components/unusedCodeElimination/usageGraph';
import { renderNode } from '../components/codegen/renderNodes';
import { getPhpPrimitiveTypeForFunc } from '../components/typeInference/basicTypes';

export function tFunctionDeclaration(node: ts.FunctionDeclaration, context: Context<Declaration>) {
  const exported = hasExport(node, context.log);
  if (exported === null) {
    return ''; // export default not supported
  }

  const handledContent = handleComponent(context, node);
  if (handledContent) {
    // component is written to different file, so we should not output anything here
    return 'null';
  }

  const varName = renderNode(node.name, context);

  // Generate method declaration for exported and top-level functions
  if (isTopLevel(node, context)) {
    if (isTopLevelComponent(node, context.nodeFlagsStore)) {
      // Don't render component function in current module
      return '';
    }

    if (node.name) {
      const decl = context.scope.addDeclaration(node.name.getText(), [], { dryRun: context.dryRun });
      if (decl) {
        decl.data.flags = DeclFlag.HoistedToModule | DeclFlag.Callable;
      }

      const els = generateFunctionElements({
        expr: node,
        nodeIdent: node.name.getText(),
        context,
      });

      if (els) { // should be true for all non-components, this check is only for typescript to be happy
        const { syntaxList, block } = els;
        if (!context.dryRun && context.scope.checkUsage(node.name.getText())) {
          context.moduleDescriptor.addMethod(node.name.getText(), block, syntaxList.join(', '),
            getPhpPrimitiveTypeForFunc(node, syntaxList, context.checker, context.log), 'public');
        }

        if (isExportedFun(node.name)) {
          context.scope.terminateCall(node.name.getText(), { traceSourceIdent: Scope.tNode, dryRun: context.dryRun });
          context.moduleDescriptor.registerExport(context.moduleDescriptor.sourceFileName, node.name.getText());
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

  const initializer = functionExpressionGen(node, funcIdent)({
    synList: node.parameters,
    blockNode: node.body,
  }, context);

  if (!node.name) {
    context.log.error('Function declarations without name are not supported', [], context.log.ctx(node));
    return 'null;';
  }

  if (!context.dryRun && context.scope.checkUsage(node.name.getText())) {
    // Render as expression if the function is nested,
    // because php doesn't have scoped closures for function declarations.
    // Also render all other functions as expressions for simplicity
    return `${snakify(varName)} = ${initializer};`;
  }

  return '';
}
