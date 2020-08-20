import * as ts from 'typescript';
import { MethodsTypes } from '../../types';
import { checkCustomTypehints } from './customTypehints';
import { typeMap } from './basicTypesMap';
import { mixedTypehintId } from './customTypehintsList';
import { log, LogSeverity } from '../../utils/log';

/**
 * Check if node has proper inferred type identified by typeString
 *
 * @param node
 * @param checker
 * @param typeString
 */
export function hasType(node: ts.Node, checker: ts.TypeChecker, typeString: string): boolean {
  let nd: ts.Node = (node as ts.PropertyAccessExpression).expression;
  let type = checker.getTypeAtLocation(nd);
  return typeString === checker.typeToString(type, nd, ts.TypeFormatFlags.None);
}

/**
 * Check if node has inferred type identified as iterable
 *
 * @param node
 * @param checker
 */
export function hasArrayType(node: ts.Node, checker: ts.TypeChecker): boolean {
  const nodeIdentForLog = node.getText();
  let nd: ts.Node = (node as ts.PropertyAccessExpression).expression;
  log(`Checking array type of node: ${nodeIdentForLog}`, LogSeverity.TYPEHINT);
  let type = checker.getTypeAtLocation(nd);
  const foundType = _parseArrayType(type, checker, true, nodeIdentForLog);
  return foundType === 'array' || foundType === 'mixed' /* for mixed[] or like that */;
}

/**
 * Get primitive type description as string for use in phpdoc
 *
 * @param node
 * @param checker
 */
export function getPhpPrimitiveType(node: ts.Node, checker: ts.TypeChecker) {
  const type = checker.getTypeAtLocation(node);
  return _describeNodeType(node, type, checker);
}

/**
 * Get primitive type description as string for use in phpdoc
 *
 * @param node
 * @param argList
 * @param checker
 */
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
  const rettype = _describeNodeType(undefined, returnType, checker);

  return {
    args: params,
    return: rettype
  };
}

function _parseArrayType(node: ts.Type, checker: ts.TypeChecker, excludeObjects = true, nodeIdentForLog?: string) {
  let typeNode = checker.typeToTypeNode(node, undefined, undefined);
  if (!typeNode) {
    log(`No type node found for symbol: ${nodeIdentForLog}`, LogSeverity.TYPEHINT);
    return false;
  }

  // Support for array-like type aliases and interfaces
  // e.g. type GridChildren = Array<Array<JSX.Element | undefined>>;
  if (typeNode.kind === ts.SyntaxKind.TypeReference) {
    const sym = node.symbol || node.aliasSymbol;
    const decls = sym.getDeclarations() as ts.Declaration[];
    const [ifaceDecl] = decls.filter((d) => d.kind === ts.SyntaxKind.InterfaceDeclaration);
    if (!ifaceDecl) {
      log(`No interface declaration found for symbol: ${nodeIdentForLog}`, LogSeverity.TYPEHINT);
      return false;
    }

    let isObjectType = false;
    if (!excludeObjects) {
      isObjectType = (ifaceDecl as ts.InterfaceDeclaration).members.length > 0;
    }
    if (isObjectType || (ifaceDecl as ts.InterfaceDeclaration).name.text === 'Array') {
      log(`Found array-like interface declaration for symbol: ${nodeIdentForLog}`, LogSeverity.TYPEHINT);
      return 'array';
    }
  }

  if (!excludeObjects && typeNode.kind === ts.SyntaxKind.TypeLiteral) {
    log(`Found array literal declaration for symbol: ${nodeIdentForLog}`, LogSeverity.TYPEHINT);
    return 'array';
  }

  if (typeNode.kind === ts.SyntaxKind.ArrayType) {
    if (checkArrMixedNode(typeNode)) {
      log(`Found MIXED in array type declaration for symbol: ${nodeIdentForLog}`, LogSeverity.TYPEHINT);
      return 'mixed';
    }
    log(`Found array type declaration for symbol: ${nodeIdentForLog}`, LogSeverity.TYPEHINT);
    return 'array';
  }

  if (typeNode.kind === ts.SyntaxKind.TupleType) {
    if (checkArrMixedNode(typeNode)) {
      log(`Found MIXED in tuple type declaration for symbol: ${nodeIdentForLog}`, LogSeverity.TYPEHINT);
      return 'mixed';
    }
    log(`Found tuple type declaration for symbol: ${nodeIdentForLog}`, LogSeverity.TYPEHINT);
    return 'array';
  }

  return false;
}

// Such kludge, much bugs, wow.
// Workaround for proper mixed hint recognition.
const checkArrMixedNode = (typeNode: ts.TypeNode) => {
  if (typeNode.kind === ts.SyntaxKind.TupleType) {
    // For [mixed, any]
    const types = (typeNode as any).elementTypes /* ts < 4 */ || (typeNode as any).elements /* ts 4+ */;
    if (types.some((t: any) => t.typeName?.symbol?.declarations[0].type?.types.some((t: any) => t.typeName?.escapedText === mixedTypehintId))) {
      return true;
    }
  }

  if (typeNode.kind === ts.SyntaxKind.ArrayType) {
    // for mixed[]
    if ((typeNode as any)?.elementType?.typeName?.symbol?.declarations[0].type?.types.some((t: any) => t.typeName?.escapedText === mixedTypehintId)) {
      return true;
    }

    // for Array<mixed>
    if ((typeNode as any)?.elementType?.type?.types.some((t: any) => t.typeName?.escapedText === mixedTypehintId)) {
      return true;
    }
  }

  return false;
};

const _transformTypeName = (type: ts.Type, checker: ts.TypeChecker, nodeIdentForLog?: string) => (t: string) => {
  const arrType = _parseArrayType(type, checker, false, nodeIdentForLog);
  if (arrType) {
    return arrType;
  }
  if (t === 'Element' && (type.symbol as any)?.parent?.escapedName === 'JSX') { // Workaround; jsx elements are rendered to strings
    return 'string';
  }
  return typeMap[t] || 'var';
};

function _describeNodeType(node: ts.Node | undefined, type: ts.Type, checker: ts.TypeChecker) {
  const nodeIdentForLog = node?.getText();
  const customTypehints = checkCustomTypehints(type, checker);
  if (customTypehints) {
    const types = customTypehints.foundTypes.map((t) => {
      if (typeof t === 'string') {
        return t;
      }
      // Some of union members may be literal types
      return _describeAsApparentType(t, checker, nodeIdentForLog);
    }).filter((t) => !customTypehints.typesToDrop.includes(t));
    const typehint = Array.from(new Set((<string[]>[])
      .concat(types)))
      .join('|');
    log(`Inferred type of node: ${nodeIdentForLog} -> ${typehint} [1]`, LogSeverity.TYPEHINT);
    return typehint;
  }

  const strTypes = checker.typeToString(type, node, ts.TypeFormatFlags.None)
    .split('|')
    .map((t) => t.replace(/^\s+|\s+$/g, ''))
    .map(_transformTypeName(type, checker, nodeIdentForLog));

  if (strTypes.includes('var')) {
    const types = type.isUnionOrIntersection() ? type.types : [type];

    const appStrTypes = types.map((t) => {
      return _describeAsApparentType(t, checker, nodeIdentForLog);
    });

    if (appStrTypes.includes('var')) {
      log(`Inferred type of node: ${nodeIdentForLog} -> var [2]`, LogSeverity.TYPEHINT);
      return 'var';
    }

    const typehint = Array.from(new Set((<string[]>[])
      .concat(strTypes.filter((t) => t !== 'var'))
      .concat(appStrTypes)))
      .join('|');

    log(`Inferred type of node: ${nodeIdentForLog} -> ${typehint} [3]`, LogSeverity.TYPEHINT);
    return typehint;
  }

  const typehint = Array.from(new Set((<string[]>[])
    .concat(strTypes)))
    .join('|');
  log(`Inferred type of node: ${nodeIdentForLog} -> ${typehint} [4]`, LogSeverity.TYPEHINT);
  return typehint;
}

// Check parent types: Number for 1, String for "asd" etc
function _describeAsApparentType(t: ts.Type, checker: ts.TypeChecker, nodeIdentForLog?: string) {
  log(`Failed to describe node: ${nodeIdentForLog}, checking apparent type`, LogSeverity.TYPEHINT);
  const appType = t.symbol ? checker.getApparentType(t) : checker.getBaseTypeOfLiteralType(t);
  const appStrType = checker.typeToString(appType).toLowerCase()
    .replace(/^\s+|\s+$/g, '');
  return _transformTypeName(t, checker, nodeIdentForLog)(appStrType);
}
