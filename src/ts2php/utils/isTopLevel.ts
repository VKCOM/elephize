import * as ts from 'typescript';
import { Context } from '../components/context';
import { getClosestOrigParentOfType, getClosestParentOfType } from './ast';
import { Declaration } from '../types';
import { NodeFlagStore } from '../components/codegen/nodeFlagStore';

export function isTopLevel(node: ts.Node, context: Context<Declaration>) {
  if (!context.scope.isRoot()) {
    return false;
  }

  if (node.parent.kind === ts.SyntaxKind.SourceFile) {
    return true;
  }

  if (node.parent.kind === ts.SyntaxKind.SyntaxList) {
    return node.parent.parent.kind === ts.SyntaxKind.SourceFile;
  }

  if (
    node.parent.kind === ts.SyntaxKind.VariableDeclarationList ||
    node.parent.kind === ts.SyntaxKind.VariableDeclaration ||
    node.parent.kind === ts.SyntaxKind.ArrayBindingPattern ||
    node.parent.kind === ts.SyntaxKind.ObjectBindingPattern ||
    node.parent.kind === ts.SyntaxKind.BindingElement
  ) {
    const stmt = getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement)
      || getClosestOrigParentOfType(node, ts.SyntaxKind.FirstStatement)
      || getClosestOrigParentOfType(node, ts.SyntaxKind.LastStatement);
    // DeclarationList always wrapped into VariableStatement, check it's parent
    return stmt?.parent.kind === ts.SyntaxKind.SourceFile;
  }

  return false;
}

export function isTopLevelComponent(node: ts.Node, nodeFlagStore: NodeFlagStore) {
  const func = getClosestParentOfType(node, ts.SyntaxKind.FunctionExpression, true)
    || getClosestParentOfType(node, ts.SyntaxKind.ArrowFunction, true)
    || getClosestParentOfType(node, ts.SyntaxKind.FunctionDeclaration, true);

  return func && nodeFlagStore.get(func)?.isComponent;
}