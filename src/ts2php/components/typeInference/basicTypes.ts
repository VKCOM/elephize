import * as ts from 'typescript';
import { MethodsTypes, LogObj } from '../../types';
import { checkCustomTypehints } from './customTypehints';
import { typeCastFuncForType, typeMap } from './basicTypesMap';
import { mixedTypehintId } from './customTypehintsList';

/**
 * Return custom forced type cast clause based on used-defined commentsconst type = getPhpPrimitiveType(el.name, context.checker, context.log);
 *
 * @param node
 */
export function typeCast(node: ts.Identifier): string {
  const trivia = node.getFullText().substr(0, node.getLeadingTriviaWidth());
  if (trivia.includes('@elephizeTypecast')) {
    const matches = trivia.match(/@elephizeTypecast\s+(array|int|float|string|boolean|bool)/i);
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
  const nd: ts.Node = (node as ts.PropertyAccessExpression).expression;
  const type = checker.getTypeAtLocation(nd);
  const baseType = checker.getBaseTypeOfLiteralType(type);

  return (
    checker.typeToString(type, nd, ts.TypeFormatFlags.None) === typeString ||
    checker.typeToString(baseType, nd, ts.TypeFormatFlags.None) === typeString
  );
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
  const nd: ts.Node = (node as ts.PropertyAccessExpression).expression;
  log.typehint('Checking array type of node: %s', [nodeIdentForLog]);
  const type = checker.getTypeAtLocation(nd);
  const foundType = parseArrayType(type, node, checker, log, true, nodeIdentForLog);
  return foundType
    ? (foundType.includes('[]') || foundType.includes('mixed'))
    : false;
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
  return describeNodeType(node, type, checker, log);
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
  let typeCastFunc = typeCastFuncForType(type);
  if (typeCastFunc) {
    return `(${typeCastFunc})`;
  }
  if (type.includes('[]')) {
    return '(array)';
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
export function getPhpPrimitiveTypeForFunc(
  node: ts.FunctionExpression | ts.ArrowFunction | ts.FunctionDeclaration | ts.MethodDeclaration,
  argList: string[],
  checker: ts.TypeChecker,
  log: LogObj
): MethodsTypes | undefined {
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
  const rettype = describeNodeType(undefined, returnType, checker, log);

  return {
    args: params,
    return: rettype,
  };
}

function parseArrayType(node: ts.Type, baseNode: ts.Node, checker: ts.TypeChecker, log: LogObj, excludeObjects = true, nodeIdentForLog?: string) {
  const typeNode = checker.typeToTypeNode(node, undefined, undefined);
  if (!typeNode) {
    log.typehint('No type node found for symbol: %s', [nodeIdentForLog || '']);
    return false;
  }

  // Support for array-like type aliases and interfaces
  // e.g. type GridChildren = Array<Array<JSX.Element | undefined>>;
  if (typeNode.kind === ts.SyntaxKind.TypeReference) {
    const sym = node.symbol || node.aliasSymbol;
    const decls = sym.getDeclarations() || [];
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
      return 'mixed[]';
    }
  }

  if (!excludeObjects && typeNode.kind === ts.SyntaxKind.TypeLiteral) {
    const valueType = checker.getTypeAtLocation(baseNode)?.getStringIndexType();
    const literalType = checkComplexLiteralType(valueType, checker);
    if (literalType) {
      log.typehint('Found array literal declaration of type %s for symbol: %s', [literalType, nodeIdentForLog || '']);
      return literalType;
    } else {
      log.typehint('Failed to infer array type, using MIXED for symbol: %s', [nodeIdentForLog || '']);
      return 'mixed[]';
    }
  }

  if (typeNode.kind === ts.SyntaxKind.ArrayType || typeNode.kind === ts.SyntaxKind.TupleType) {
    if (checkArrMixedNode(typeNode)) {
      log.typehint('Found MIXED in array/tuple type declaration for symbol: %s', [nodeIdentForLog || '']);
      return 'mixed';
    }

    const valueType = checker.getTypeAtLocation(baseNode)?.getNumberIndexType();
    const literalType = checkComplexLiteralType(valueType, checker);
    if (literalType) {
      log.typehint('Found array/tuple literal declaration of type %s for symbol: %s', [literalType, nodeIdentForLog || '']);
      return literalType;
    } else {
      log.typehint('Failed to infer array/tuple type, using MIXED for symbol: %s', [nodeIdentForLog || '']);
      return 'mixed[]';
    }
  }

  return false;
}

const checkComplexLiteralType = (valueType: ts.Type | undefined, checker: ts.TypeChecker) => {
  if (!valueType) {
    return;
  }

  if (valueType.isUnionOrIntersection()) { // union type
    const apparentTypes = valueType.types
      .map((tp: ts.Type) => checker.getApparentType(tp))
      .map((tp: ts.Type) => checker.typeToString(tp))
      .map((tp: string) => {
        if (['String', 'Boolean', 'Number'].includes(tp)) { // constructor names to primitive names
          return tp.toLowerCase();
        }
        return tp;
      });
    const uniq = new Set(apparentTypes);
    if (uniq.size === 1) { // all apparent types of union are the same
      return `${typeMap[apparentTypes[0]] || 'mixed'}[]`;
    } else {
      return; // have more than one different apparent type.
    }
  }
  const typeStr = checker.typeToString(valueType);
  return `${typeMap[typeStr] || 'mixed'}[]`;
};

// Such kludge, much bugs, wow.
// Workaround for proper mixed hint recognition.
const checkArrMixedNode = (typeNode: ts.TypeNode) => {
  if (typeNode.kind === ts.SyntaxKind.TupleType) {
    // For [mixed, any]
    const types = (typeNode as any).elementTypes /* ts < 4 */ || (typeNode as any).elements;
    if (types && types.some((t: any) => t.typeName?.symbol?.declarations[0].type?.types?.some((t: any) => t.typeName?.escapedText === mixedTypehintId))) {
      return true;
    }
  }

  if (typeNode.kind === ts.SyntaxKind.ArrayType) {
    // for mixed[]
    if ((typeNode as any)?.elementType?.typeName?.symbol?.declarations[0].type?.types?.some((t: any) => t.typeName?.escapedText === mixedTypehintId)) {
      return true;
    }

    // for Array<mixed>
    if ((typeNode as any)?.elementType?.type?.types?.some((t: any) => t.typeName?.escapedText === mixedTypehintId)) {
      return true;
    }
  }

  return false;
};

const transformTypeName = (type: ts.Type, node: ts.Node, checker: ts.TypeChecker, log: LogObj, nodeIdentForLog?: string) => (t: string) => {
  const arrType = parseArrayType(type, node, checker, log, false, nodeIdentForLog);
  if (arrType) {
    return arrType;
  }
  if (t === 'Element' && (type.symbol as any)?.parent?.escapedName === 'JSX') { // Workaround; jsx elements are rendered to strings
    return 'string';
  }
  return typeMap[t] || 'mixed';
};

function describeNodeType(node: ts.Node | undefined, type: ts.Type, checker: ts.TypeChecker, log: LogObj) {
  const nodeIdentForLog = node?.getText();
  let optionalMark = (node?.parent.kind === ts.SyntaxKind.Parameter && (
    (node.parent as ts.ParameterDeclaration).initializer ||
    (node.parent as ts.ParameterDeclaration).questionToken
  )) ? '?' : '';

  if (node && ts.isStringLiteral(node)) {
    log.typehint('Inferred type of literal node: %s -> %s [5]', [nodeIdentForLog || '', 'string']);
    return optionalMark + 'string';
  }

  if (node && ts.isNumericLiteral(node)) {
    log.typehint('Inferred type of literal node: %s -> %s [5]', [nodeIdentForLog || '', 'float']);
    return optionalMark + 'float';
  }

  const customTypehints = checkCustomTypehints(type, checker);
  if (customTypehints) {
    if (!optionalMark) {
      optionalMark = customTypehints.foundTypes.find(
        (t) => typeof t !== 'string' && t.getFlags() & ts.TypeFlags.Undefined
      )
        ? '?'
        : '';
    }

    const types = customTypehints.foundTypes
      .filter(
        (t) => typeof t === 'string' || !(t.getFlags() & ts.TypeFlags.Undefined)
      )
      .map((t) => {
        if (typeof t === 'string') {
          return optionalMark + t;
        }
        // Some of union members may be literal types
        return (
          optionalMark +
          describeAsApparentType(t, node!, checker, log, nodeIdentForLog)
        );
      })
      .filter((t) => !customTypehints.typesToDrop.includes(t));
    const typehint = Array.from(new Set((<string[]>[]).concat(types))).join(
      '|'
    );
    log.typehint('Inferred type of node: %s -> %s [1]', [nodeIdentForLog || '', typehint]);
    return typehint;
  }

  const strTypes = checker.typeToString(type, node, ts.TypeFormatFlags.None)
    .split('|')
    .map((t) => t.replace(/^\s+|\s+$/g, ''))
    .map(transformTypeName(type, node!, checker, log, nodeIdentForLog));

  if (strTypes.includes('mixed')) {
    const types = type.isUnionOrIntersection() ? type.types : [type];

    const appStrTypes = types.map((t) => {
      return describeAsApparentType(t, node!, checker, log, nodeIdentForLog);
    });

    if (appStrTypes.includes('mixed')) {
      log.typehint('Inferred type of node: %s -> mixed [2]', [nodeIdentForLog || '']);
      return 'mixed';
    }

    const typehint = Array.from(new Set((<string[]>[])
      .concat(strTypes.filter((t) => t !== 'mixed'))
      .concat(appStrTypes)))
      .map((hint) => optionalMark + hint)
      .join('|');

    log.typehint('Inferred type of node: %s -> %s [3]', [nodeIdentForLog || '', typehint]);
    return typehint;
  }

  const typehint = Array.from(new Set((<string[]>[])
    .concat(strTypes)))
    .map((hint) => optionalMark + hint)
    .join('|');
  log.typehint('Inferred type of node: %s -> %s [4]', [nodeIdentForLog || '', typehint]);
  return typehint;
}

// Check parent types: Number for 1, String for "asd" etc
function describeAsApparentType(t: ts.Type, node: ts.Node, checker: ts.TypeChecker, log: LogObj, nodeIdentForLog?: string) {
  log.typehint('Failed to describe node: %s, checking apparent type', [nodeIdentForLog || '']);
  const appType = t.symbol ? checker.getApparentType(t) : checker.getBaseTypeOfLiteralType(t);
  const appStrType = checker.typeToString(appType).toLowerCase()
    .replace(/^\s+|\s+$/g, '');
  return transformTypeName(t, node, checker, log, nodeIdentForLog)(appStrType);
}
