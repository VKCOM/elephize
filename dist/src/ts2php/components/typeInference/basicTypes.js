"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var customTypehints_1 = require("./customTypehints");
var basicTypesMap_1 = require("./basicTypesMap");
/**
 * Check if node has proper inferred type identified by typeString
 *
 * @param node
 * @param checker
 * @param typeString
 */
function hasType(node, checker, typeString) {
    var nd = node.expression;
    var type = checker.getTypeAtLocation(nd);
    return typeString === checker.typeToString(type, nd, ts.TypeFormatFlags.None);
}
exports.hasType = hasType;
/**
 * Check if node has inferred type identified as iterable
 *
 * @param node
 * @param checker
 */
function hasArrayType(node, checker) {
    var nd = node.expression;
    var type = checker.getTypeAtLocation(nd);
    return _parseArrayType(type, checker) === 'array';
}
exports.hasArrayType = hasArrayType;
/**
 * Get primitive type description as string for use in phpdoc
 *
 * @param node
 * @param checker
 */
function getPhpPrimitiveType(node, checker) {
    var type = checker.getTypeAtLocation(node);
    return _describeNodeType(node, type, checker);
}
exports.getPhpPrimitiveType = getPhpPrimitiveType;
/**
 * Get primitive type description as string for use in phpdoc
 *
 * @param node
 * @param argList
 * @param checker
 */
function getPhpPrimitiveTypeForFunc(node, argList, checker) {
    var signature = checker.getSignatureFromDeclaration(node);
    if (!signature) {
        // Not functional type?
        return;
    }
    var params = {};
    for (var i = 0; i < node.parameters.length; i++) {
        var param = node.parameters[i].name;
        if (param.kind === ts.SyntaxKind.Identifier) {
            params[argList[i]] = getPhpPrimitiveType(param, checker);
        }
        else {
            params[argList[i]] = 'var'; // TODO: more specific typing? (applies for destructured objects too!)
        }
    }
    var returnType = checker.getReturnTypeOfSignature(signature);
    var rettype = _describeNodeType(undefined, returnType, checker);
    return {
        args: params,
        return: rettype
    };
}
exports.getPhpPrimitiveTypeForFunc = getPhpPrimitiveTypeForFunc;
function _parseArrayType(node, checker, excludeObjects) {
    if (excludeObjects === void 0) { excludeObjects = true; }
    var typeNode = checker.typeToTypeNode(node);
    if (!typeNode) {
        return false;
    }
    // Support for array-like type aliases and interfaces
    // e.g. type GridChildren = Array<Array<JSX.Element | undefined>>;
    if (typeNode.kind === ts.SyntaxKind.TypeReference) {
        var sym = node.symbol || node.aliasSymbol;
        var decls = sym.getDeclarations();
        var ifaceDecl = decls.filter(function (d) { return d.kind === ts.SyntaxKind.InterfaceDeclaration; })[0];
        if (!ifaceDecl) {
            return false;
        }
        var isObjectType = false;
        if (!excludeObjects) {
            isObjectType = ifaceDecl.members.length > 0;
        }
        if (isObjectType || ifaceDecl.name.text === 'Array') {
            return 'array';
        }
    }
    if (!excludeObjects && typeNode.kind === ts.SyntaxKind.TypeLiteral) {
        return 'array';
    }
    if (typeNode.kind === ts.SyntaxKind.ArrayType || typeNode.kind === ts.SyntaxKind.TupleType) {
        return 'array';
    }
    return false;
}
var _transformTypeName = function (type, checker) { return function (t) {
    var arrType = _parseArrayType(type, checker, false);
    if (arrType) {
        return arrType;
    }
    return basicTypesMap_1.typeMap[t] || 'var';
}; };
function _describeNodeType(node, type, checker) {
    var customTypehints = customTypehints_1.checkCustomTypehints(type, checker);
    if (customTypehints) {
        var types = customTypehints.foundTypes.map(function (t) {
            if (typeof t === 'string') {
                return t;
            }
            // Some of union members may be literal types
            return _describeAsApparentType(t, checker);
        }).filter(function (t) { return !customTypehints.typesToDrop.includes(t); });
        return Array.from(new Set([]
            .concat(types)))
            .join('|');
    }
    var strTypes = checker.typeToString(type, node, ts.TypeFormatFlags.None)
        .split('|')
        .map(function (t) { return t.replace(/^\s+|\s+$/g, ''); })
        .map(_transformTypeName(type, checker));
    if (strTypes.includes('var')) {
        var types = type.isUnionOrIntersection() ? type.types : [type];
        var appStrTypes = types.map(function (t) {
            return _describeAsApparentType(t, checker);
        });
        if (appStrTypes.includes('var')) {
            return 'var';
        }
        return Array.from(new Set([]
            .concat(strTypes.filter(function (t) { return t !== 'var'; }))
            .concat(appStrTypes)))
            .join('|');
    }
    return Array.from(new Set([]
        .concat(strTypes)))
        .join('|');
}
// Check parent types: Number for 1, String for "asd" etc
function _describeAsApparentType(t, checker) {
    var appType = checker.getApparentType(t);
    var appStrType = checker.typeToString(appType).toLowerCase()
        .replace(/^\s+|\s+$/g, '');
    return _transformTypeName(t, checker)(appStrType);
}
