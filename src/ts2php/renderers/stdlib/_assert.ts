import * as ts from 'typescript';
import { Context } from '../../components/context';
import { usedInNestedScope } from '../../components/unusedCodeElimination/usageGraph/nodeData';
import { Declaration, DeclFlag } from '../../types';

/**
 * Check if node has proper inferred type identified by typeString
 *
 * @param node
 * @param checker
 * @param typeString
 */
export function assertType(node: ts.Node, checker: ts.TypeChecker, typeString: string): boolean {
  let nd: ts.Node = (node as ts.PropertyAccessExpression).expression;
  let type = checker.getTypeAtLocation(nd);
  return typeString === checker.typeToString(type, nd, ts.TypeFormatFlags.None);
}

/**
 * If node value looks like modified in current context, add declaration flag
 * @param node
 * @param context
 */
export function assertLocalModification(node: ts.Identifier | null, context: Context<Declaration>) {
  if (!node) {
    return null;
  }
  const nodeText = node.escapedText.toString();
  const [decl, declScope] = context.scope.findByIdent(nodeText) || [];
  if (decl && declScope) {
    const modifiedInLowerScope = usedInNestedScope(decl, declScope, context.scope);
    if (modifiedInLowerScope && decl) {
      decl.flags = decl.flags | DeclFlag.ModifiedInLowerScope;
    }
    return decl;
  }

  return null;
}

/**
 * Check if node has inferred type identified as iterable
 *
 * @param node
 * @param checker
 */
export function assertArrayType(node: ts.Node, checker: ts.TypeChecker): boolean {
  let nd: ts.Node = (node as ts.PropertyAccessExpression).expression;
  let type = checker.getTypeAtLocation(nd);
  let typeNode = checker.typeToTypeNode(type);
  if (!typeNode) {
    return false;
  }

  // Support for array-like type aliases and interfaces
  // e.g. type GridChildren = Array<Array<JSX.Element | undefined>>;
  if (typeNode.kind === ts.SyntaxKind.TypeReference) {
    const type = checker.getTypeAtLocation(nd);
    const sym = type.symbol || type.aliasSymbol;
    const decls = sym.getDeclarations() as ts.Declaration[];
    const [ifaceDecl] = decls.filter((d) => d.kind === ts.SyntaxKind.InterfaceDeclaration);
    if (!ifaceDecl) {
      return false;
    }
    return (ifaceDecl as ts.InterfaceDeclaration).name.text === 'Array';
  }

  return typeNode.kind === ts.SyntaxKind.ArrayType || typeNode.kind === ts.SyntaxKind.TupleType;
}

/**
 * Check if node has inferred type identified as callable
 *
 * @param node
 * @param checker
 */
export function assertCallableType(node: ts.Node, checker: ts.TypeChecker): boolean {
  let nd: ts.Node = (node as ts.PropertyAccessExpression).expression;
  let type = checker.getTypeAtLocation(nd);
  let typeNode = checker.typeToTypeNode(type);
  return !!(typeNode && typeNode.kind === ts.SyntaxKind.FunctionType);
}
