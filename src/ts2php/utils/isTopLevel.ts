import * as ts from 'typescript';
import { Context } from '../components/context';
import { getClosestOrigParentOfType, getClosestParentOfType } from './ast';
import { Declaration, NodeInfo } from '../types';

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

export function isTopLevelComponent(nodeInfo: NodeInfo) {
  const func = getClosestParentOfType(nodeInfo, ts.SyntaxKind.FunctionExpression, true)
    || getClosestParentOfType(nodeInfo, ts.SyntaxKind.ArrowFunction, true)
    || getClosestParentOfType(nodeInfo, ts.SyntaxKind.FunctionDeclaration, true);

  return func && func.flags.isComponent;
}