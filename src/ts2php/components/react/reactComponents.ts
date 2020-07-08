import * as ts from 'typescript';
import { Declaration, NodeInfo } from '../../types';
import { renderSupportedNodes } from '../../utils/renderSupportedNodes';
import { getClosestOrigParentOfType, getClosestParentOfAnyType } from '../../utils/ast';
import { Context } from '../context';

/**
 * Top-level functions marked with IC prefix are expected to be functional Isomorphic Components
 *
 * @param context
 * @param node
 * @param self
 */
export function handleComponent(context: Context<Declaration>, node: ts.Expression | ts.FunctionDeclaration, self: NodeInfo): boolean {
  const isNestedFunc = getClosestParentOfAnyType(self, [
    ts.SyntaxKind.FunctionDeclaration,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.FunctionExpression
  ]);
  const triviaContainer = node.kind === ts.SyntaxKind.FunctionDeclaration
    ? node
    : getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement);

  const trivia = triviaContainer?.getFullText().substr(0, triviaContainer?.getLeadingTriviaWidth());
  const isElephizedComponent = trivia?.includes('@elephizeTarget');

  const nodeName = node.kind === ts.SyntaxKind.FunctionDeclaration
    ? (node as ts.FunctionDeclaration).name
    : (getClosestOrigParentOfType(node, ts.SyntaxKind.VariableDeclaration) as ts.VariableDeclaration)?.name;

  if (!isNestedFunc && nodeName && nodeName.kind === ts.SyntaxKind.Identifier && isElephizedComponent) {
    const name = nodeName.escapedText.toString();
    const descriptor = context.registry.deriveReactComponent(name, context.moduleDescriptor);
    if (!descriptor) {
      throw new Error();
    }

    const tmpDescriptor = context.moduleDescriptor;
    context.moduleDescriptor = descriptor;
    self.flags.isComponent = true;

    const decl = context.scope.addDeclaration(nodeName.getText(), [], { terminateGlobally: true, dryRun: context.dryRun });

    context.pushScope(nodeName.getText());
    context.scope.ownerNode!.data.isComponent = true;
    let [args, block] = renderSupportedNodes([
      self.children.find((c) => c.node.kind === ts.SyntaxKind.SyntaxList &&
        c.children.length > 0 && c.children[0].node.kind === ts.SyntaxKind.Parameter),
      self.children.find((c) => c.node.kind === ts.SyntaxKind.Block)
    ], context, false);

    if (decl && decl.ownedScope) {
      context.scope.terminateToParentTerminalNode(context.dryRun);
    }
    context.popScope();

    descriptor.setArgs(args);
    descriptor.setBlock(block);
    context.moduleDescriptor = tmpDescriptor;
    return true;
  }

  return false;
}