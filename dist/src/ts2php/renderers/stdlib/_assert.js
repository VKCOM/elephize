"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var nodeData_1 = require("../../components/unusedCodeElimination/usageGraph/nodeData");
var types_1 = require("../../types");
/**
 * Check if node has proper inferred type identified by typeString
 *
 * @param node
 * @param checker
 * @param typeString
 */
function assertType(node, checker, typeString) {
    var nd = node.expression;
    var type = checker.getTypeAtLocation(nd);
    return typeString === checker.typeToString(type, nd, ts.TypeFormatFlags.None);
}
exports.assertType = assertType;
/**
 * If node value looks like modified in current context, add declaration flag
 * @param node
 * @param context
 */
function assertLocalModification(node, context) {
    if (!node) {
        return null;
    }
    var nodeText = node.escapedText.toString();
    var _a = context.scope.findByIdent(nodeText) || [], decl = _a[0], declScope = _a[1];
    if (decl && declScope) {
        var modifiedInLowerScope = nodeData_1.usedInNestedScope(decl, declScope, context.scope);
        if (modifiedInLowerScope && decl) {
            decl.flags = decl.flags | types_1.DeclFlag.ModifiedInLowerScope;
        }
        return decl;
    }
    return null;
}
exports.assertLocalModification = assertLocalModification;
/**
 * Check if node has inferred type identified as iterable
 *
 * @param node
 * @param checker
 */
function assertArrayType(node, checker) {
    var nd = node.expression;
    var type = checker.getTypeAtLocation(nd);
    return _assertArrayTypeFromType(type, checker);
}
exports.assertArrayType = assertArrayType;
function _assertArrayTypeFromType(node, checker, excludeObjects) {
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
        return isObjectType || ifaceDecl.name.text === 'Array';
    }
    if (!excludeObjects && typeNode.kind === ts.SyntaxKind.TypeLiteral) {
        return true;
    }
    return typeNode.kind === ts.SyntaxKind.ArrayType || typeNode.kind === ts.SyntaxKind.TupleType;
}
function getPhpPrimitiveType(node, checker) {
    var type = checker.getTypeAtLocation(node);
    return _getPrimitiveTypeByType(node, type, checker);
}
exports.getPhpPrimitiveType = getPhpPrimitiveType;
function _getPrimitiveTypeByType(node, type, checker) {
    if (_assertArrayTypeFromType(type, checker, false)) {
        return 'array';
    }
    var strTypes = checker.typeToString(type, node, ts.TypeFormatFlags.UseFullyQualifiedType)
        .split('|')
        .map(function (t) { return t.replace(/^\s+|\s+$/g, ''); })
        .map(function (strType) {
        switch (strType) {
            case 'number':
                return 'float'; // TODO: check int possibilities?
            case 'string':
                return 'string';
            case 'boolean':
            case 'true':
            case 'false':
                return 'boolean';
            default:
                return 'var';
        }
    });
    if (strTypes.includes('var')) {
        // Check parent types: Number for 1, String for "asd" etc
        var appType = checker.getApparentType(type);
        var appStrTypes = checker.typeToString(appType).toLowerCase().split('|')
            .map(function (t) { return t.replace(/^\s+|\s+$/g, ''); })
            .map(function (appStrType) {
            switch (appStrType) {
                case 'number':
                    return 'float'; // TODO: check int possibilities?
                case 'string':
                    return 'string';
                case 'boolean':
                    return 'boolean';
                default:
                    return 'var'; // TODO: more specific typing?
            }
        });
        if (appStrTypes.includes('var')) {
            return 'var';
        }
        return Array.from(new Set([]
            .concat(strTypes.filter(function (t) { return t !== 'var'; }))
            .concat(appStrTypes))).join('|');
    }
    return Array.from(new Set([]
        .concat(strTypes))).join('|');
}
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
    var rettype = _getPrimitiveTypeByType(undefined, returnType, checker);
    return {
        args: params,
        return: rettype
    };
}
exports.getPhpPrimitiveTypeForFunc = getPhpPrimitiveTypeForFunc;
/**
 * Check if node has inferred type identified as callable
 *
 * @param node
 * @param checker
 */
function assertCallableType(node, checker) {
    var nd = node.expression;
    var type = checker.getTypeAtLocation(nd);
    var typeNode = checker.typeToTypeNode(type);
    return !!(typeNode && typeNode.kind === ts.SyntaxKind.FunctionType);
}
exports.assertCallableType = assertCallableType;
