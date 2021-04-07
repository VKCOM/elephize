import * as ts from 'typescript';
import { MethodsTypes } from '../../types';
import { checkCustomTypehints } from './customTypehints';
import { typeMap } from './basicTypesMap';
import { mixedTypehintId } from './customTypehintsList';
import { LogObj } from '../../utils/log';

/**
 * Return custom forced type cast clause based on used-defined commentsconst type = getPhpPrimitiveType(el.name, context.checker, context.log);
 *
 * @param node
 */
export function typeCast(node: ts.Identifier): string {
  const trivia = node.getFullText().substr(0, node.getLeadingTriviaWidth());
  if (trivia.includes('@elephizeTypecast')) {
    const matches = trivia.match(/@elephizeTypecast\s+(array|int|float|string|boolean)/i);
    if (matches && matches[1]) {
      return `(${matches[1]})`;
    }
  }
  return '';
}

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
 * @param log
 */
export function hasArrayType(node: ts.Node, checker: ts.TypeChecker, log: LogObj): boolean {
  const nodeIdentForLog = node.getText();
  let nd: ts.Node = (node as ts.PropertyAccessExpression).expression;
  log.typehint('Checking array type of node: %s', [nodeIdentForLog]);
  let type = checker.getTypeAtLocation(nd);
  const foundType = _parseArrayType(type, checker, log, true, nodeIdentForLog);
  return foundType === 'array' || foundType === 'mixed' /* for mixed[] or like that */;
}

/**
 * Get primitive type description as string for use in phpdoc
 *
 * @param node
 * @param checker
 * @param log
 */
export function getPhpPrimitiveType(node: ts.Node, checker: ts.TypeChecker, log: LogObj) {
  let type = checker.getTypeAtLocation(node);
  if (type.flags === ts.TypeFlags.Any) { // error? try another way
    const typeContextual = checker.getContextualType(node as ts.Expression);
    if (typeContextual && typeContextual.flags !== ts.TypeFlags.Any) {
      type = typeContextual;
    }
  }
  return _describeNodeType(node, type, checker, log);
}

/**
 * Get basic type casting clause based on inferred type
 *
 * @param node
 * @param checker
 * @param log
 */
export function getPossibleCastingType(node: ts.Node, checker: ts.TypeChecker, log: LogObj): string {
  const type = getPhpPrimitiveType(node, checker, log);
  if (['array', 'string', 'boolean', 'float'].includes(type)) {
    return `(${type})`;
  }
  return '';
}

/**
 * Get primitive type description as string for use in phpdoc
 *
 * @param node
 * @param argList
 * @param checker
 * @param log
 */
export function getPhpPrimitiveTypeForFunc(node: ts.FunctionExpression | ts.ArrowFunction | ts.FunctionDeclaration, argList: string[], checker: ts.TypeChecker, log: LogObj): MethodsTypes | undefined {
  const signature = checker.getSignatureFromDeclaration(node);
  if (!signature) {
    // Not functional type?
    return;
  }

  const params: { [key: string]: string } = {};
  for (let i = 0; i < node.parameters.length; i++) {
    const param = node.parameters[i].name;
    if (param.kind === ts.SyntaxKind.Identifier) {
      params[argList[i]] = getPhpPrimitiveType(param, checker, log);
    } else {
      params[argList[i]] = 'mixed'; // TODO: more specific typing? (applies for destructured objects too!)
    }
  }

  const returnType = checker.getReturnTypeOfSignature(signature);
  const rettype = _describeNodeType(undefined, returnType, checker, log);

  return {
    args: params,
    return: rettype
  };
}

function _parseArrayType(node: ts.Type, checker: ts.TypeChecker, log: LogObj, excludeObjects = true, nodeIdentForLog?: string) {
  let typeNode = checker.typeToTypeNode(node, undefined, undefined);
  if (!typeNode) {
    log.typehint('No type node found for symbol: %s', [nodeIdentForLog || '']);
    return false;
  }

  // Support for array-like type aliases and interfaces
  // e.g. type GridChildren = Array<Array<JSX.Element | undefined>>;
  if (typeNode.kind === ts.SyntaxKind.TypeReference) {
    const sym = node.symbol || node.aliasSymbol;
    const decls = sym.getDeclarations() as ts.Declaration[];
    const [ifaceDecl] = decls.filter((d) => d.kind === ts.SyntaxKind.InterfaceDeclaration);
    if (!ifaceDecl) {
      log.typehint('No interface declaration found for symbol: %s', [nodeIdentForLog || '']);
      return false;
    }

    let isObjectType = false;
    if (!excludeObjects) {
      isObjectType = (ifaceDecl as ts.InterfaceDeclaration).members.length > 0;
    }
    if (isObjectType || (ifaceDecl as ts.InterfaceDeclaration).name.text === 'Array') {
      log.typehint('Found array-like interface declaration for symbol: %s', [nodeIdentForLog || '']);
      return 'array';
    }
  }

  if (!excludeObjects && typeNode.kind === ts.SyntaxKind.TypeLiteral) {
    log.typehint('Found array literal declaration for symbol: %s', [nodeIdentForLog || '']);
    return 'array';
  }

  if (typeNode.kind === ts.SyntaxKind.ArrayType) {
    if (checkArrMixedNode(typeNode)) {
      log.typehint('Found MIXED in array type declaration for symbol: %s', [nodeIdentForLog || '']);
      return 'mixed';
    }
    log.typehint('Found array type declaration for symbol: %s', [nodeIdentForLog || '']);
    return 'array';
  }

  if (typeNode.kind === ts.SyntaxKind.TupleType) {
    if (checkArrMixedNode(typeNode)) {
      log.typehint('Found MIXED in tuple type declaration for symbol: %s', [nodeIdentForLog || '']);
      return 'mixed';
    }
    log.typehint('Found tuple type declaration for symbol: %s', [nodeIdentForLog || '']);
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

const _transformTypeName = (type: ts.Type, checker: ts.TypeChecker, log: LogObj, nodeIdentForLog?: string) => (t: string) => {
  const arrType = _parseArrayType(type, checker, log, false, nodeIdentForLog);
  if (arrType) {
    return arrType;
  }
  if (t === 'Element' && (type.symbol as any)?.parent?.escapedName === 'JSX') { // Workaround; jsx elements are rendered to strings
    return 'string';
  }
  return typeMap[t] || 'mixed';
};

function _describeNodeType(node: ts.Node | undefined, type: ts.Type, checker: ts.TypeChecker, log: LogObj) {
  const nodeIdentForLog = node?.getText();

  if (node && ts.isStringLiteral(node)) {
    log.typehint('Inferred type of literal node: %s -> %s [5]', [nodeIdentForLog || '', 'string']);
    return 'string';
  }

  if (node && ts.isNumericLiteral(node)) {
    log.typehint('Inferred type of literal node: %s -> %s [5]', [nodeIdentForLog || '', 'float']);
    return 'float';
  }

  const customTypehints = checkCustomTypehints(type, checker);
  if (customTypehints) {
    const types = customTypehints.foundTypes.map((t) => {
      if (typeof t === 'string') {
        return t;
      }
      // Some of union members may be literal types
      return _describeAsApparentType(t, checker, log, nodeIdentForLog);
    }).filter((t) => !customTypehints.typesToDrop.includes(t));
    const typehint = Array.from(new Set((<string[]>[])
      .concat(types)))
      .join('|');
    log.typehint('Inferred type of node: %s -> %s [1]', [nodeIdentForLog || '', typehint]);
    return typehint;
  }

  const strTypes = checker.typeToString(type, node, ts.TypeFormatFlags.None)
    .split('|')
    .map((t) => t.replace(/^\s+|\s+$/g, ''))
    .map(_transformTypeName(type, checker, log, nodeIdentForLog));

  if (strTypes.includes('mixed')) {
    const types = type.isUnionOrIntersection() ? type.types : [type];

    const appStrTypes = types.map((t) => {
      return _describeAsApparentType(t, checker, log, nodeIdentForLog);
    });

    if (appStrTypes.includes('mixed')) {
      log.typehint('Inferred type of node: %s -> mixed [2]', [nodeIdentForLog || '']);
      return 'mixed';
    }

    const typehint = Array.from(new Set((<string[]>[])
      .concat(strTypes.filter((t) => t !== 'mixed'))
      .concat(appStrTypes)))
      .join('|');

    log.typehint('Inferred type of node: %s -> %s [3]', [nodeIdentForLog || '', typehint]);
    return typehint;
  }

  const typehint = Array.from(new Set((<string[]>[])
    .concat(strTypes)))
    .join('|');
  log.typehint('Inferred type of node: %s -> %s [4]', [nodeIdentForLog || '', typehint]);
  return typehint;
}

// Check parent types: Number for 1, String for "asd" etc
function _describeAsApparentType(t: ts.Type, checker: ts.TypeChecker, log: LogObj, nodeIdentForLog?: string) {
  log.typehint('Failed to describe node: %s, checking apparent type', [nodeIdentForLog || '']);
  const appType = t.symbol ? checker.getApparentType(t) : checker.getBaseTypeOfLiteralType(t);
  const appStrType = checker.typeToString(appType).toLowerCase()
    .replace(/^\s+|\s+$/g, '');
  return _transformTypeName(t, checker, log, nodeIdentForLog)(appStrType);
}
