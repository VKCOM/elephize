import * as ts from 'typescript';
import { Context } from '../../components/context';
import { usedInNestedScope } from '../../components/unusedCodeElimination/usageGraph/nodeData';
import { Declaration, DeclFlag, MethodsTypes } from '../../types';

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
  return _assertArrayTypeFromType(type, checker);
}

function _assertArrayTypeFromType(node: ts.Type, checker: ts.TypeChecker, excludeObjects = true) {
  let typeNode = checker.typeToTypeNode(node);
  if (!typeNode) {
    return false;
  }

  // Support for array-like type aliases and interfaces
  // e.g. type GridChildren = Array<Array<JSX.Element | undefined>>;
  if (typeNode.kind === ts.SyntaxKind.TypeReference) {
    const sym = node.symbol || node.aliasSymbol;
    const decls = sym.getDeclarations() as ts.Declaration[];
    const [ifaceDecl] = decls.filter((d) => d.kind === ts.SyntaxKind.InterfaceDeclaration);
    if (!ifaceDecl) {
      return false;
    }

    let isObjectType = false;
    if (!excludeObjects) {
      isObjectType = (ifaceDecl as ts.InterfaceDeclaration).members.length > 0;
    }
    return isObjectType || (ifaceDecl as ts.InterfaceDeclaration).name.text === 'Array';
  }

  if (!excludeObjects && typeNode.kind === ts.SyntaxKind.TypeLiteral) {
    return true;
  }

  return typeNode.kind === ts.SyntaxKind.ArrayType || typeNode.kind === ts.SyntaxKind.TupleType;
}

export function getPhpPrimitiveType(node: ts.Node, checker: ts.TypeChecker) {
  const type = checker.getTypeAtLocation(node);
  return _getPrimitiveTypeByType(node, type, checker);
}

const typeMap: {[key: string]: string} = {
  'number': 'float', // TODO: check int possibilities?
  'string': 'string',
  'boolean': 'boolean',
  'true': 'boolean',
  'false': 'boolean'
};

function _getPrimitiveTypeByType(node: ts.Node | undefined, type: ts.Type, checker: ts.TypeChecker) {
  if (_assertArrayTypeFromType(type, checker, false)) {
    return 'array';
  }

  const strTypes = checker.typeToString(type, node, ts.TypeFormatFlags.None)
    .split('|')
    .map((t) => t.replace(/^\s+|\s+$/g, ''))
    .map((strType) => typeMap[strType] || 'var');

  if (strTypes.includes('var')) {
    const types = type.isUnionOrIntersection() ? type.types : [type];
    const appStrTypes = types.map((t) => {
      // Check parent types: Number for 1, String for "asd" etc
      const appType = checker.getApparentType(t);
      const appStrType = checker.typeToString(appType).toLowerCase()
        .replace(/^\s+|\s+$/g, '');
      return typeMap[appStrType] || 'var';
    });

    if (appStrTypes.includes('var')) {
      return 'var';
    }

    return Array.from(new Set((<string[]>[])
      .concat(strTypes.filter((t) => t !== 'var'))
      .concat(appStrTypes))).join('|');
  }

  return Array.from(new Set((<string[]>[])
    .concat(strTypes))).join('|');
}

export function getPhpPrimitiveTypeForFunc(node: ts.FunctionExpression | ts.ArrowFunction | ts.FunctionDeclaration, argList: string[], checker: ts.TypeChecker): MethodsTypes | undefined {
  const signature = checker.getSignatureFromDeclaration(node);
  if (!signature) {
    // Not functional type?
    return;
  }

  const params: { [key: string]: string } = {};
  for (let i = 0; i < node.parameters.length; i++) {
    const param = node.parameters[i].name;
    if (param.kind === ts.SyntaxKind.Identifier) {
      params[argList[i]] = getPhpPrimitiveType(param, checker);
    } else {
      params[argList[i]] = 'var'; // TODO: more specific typing? (applies for destructured objects too!)
    }
  }

  const returnType = checker.getReturnTypeOfSignature(signature);
  const rettype = _getPrimitiveTypeByType(undefined, returnType, checker);

  return {
    args: params,
    return: rettype
  };
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
