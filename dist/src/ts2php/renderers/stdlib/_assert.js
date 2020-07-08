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
    var typeNode = checker.typeToTypeNode(type);
    if (!typeNode) {
        return false;
    }
    // Support for array-like type aliases and interfaces
    // e.g. type GridChildren = Array<Array<JSX.Element | undefined>>;
    if (typeNode.kind === ts.SyntaxKind.TypeReference) {
        var type_1 = checker.getTypeAtLocation(nd);
        var sym = type_1.symbol || type_1.aliasSymbol;
        var decls = sym.getDeclarations();
        var ifaceDecl = decls.filter(function (d) { return d.kind === ts.SyntaxKind.InterfaceDeclaration; })[0];
        if (!ifaceDecl) {
            return false;
        }
        return ifaceDecl.name.text === 'Array';
    }
    return typeNode.kind === ts.SyntaxKind.ArrayType || typeNode.kind === ts.SyntaxKind.TupleType;
}
exports.assertArrayType = assertArrayType;
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
