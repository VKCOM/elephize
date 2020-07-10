"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("./ast");
function isTopLevel(node, context) {
    if (!context.scope.isRoot()) {
        return false;
    }
    if (node.parent.kind === ts.SyntaxKind.SourceFile) {
        return true;
    }
    if (node.parent.kind === ts.SyntaxKind.SyntaxList) {
        return node.parent.parent.kind === ts.SyntaxKind.SourceFile;
    }
    if (node.parent.kind === ts.SyntaxKind.VariableDeclarationList ||
        node.parent.kind === ts.SyntaxKind.VariableDeclaration ||
        node.parent.kind === ts.SyntaxKind.ArrayBindingPattern ||
        node.parent.kind === ts.SyntaxKind.ObjectBindingPattern ||
        node.parent.kind === ts.SyntaxKind.BindingElement) {
        var stmt = ast_1.getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement)
            || ast_1.getClosestOrigParentOfType(node, ts.SyntaxKind.FirstStatement)
            || ast_1.getClosestOrigParentOfType(node, ts.SyntaxKind.LastStatement);
        // DeclarationList always wrapped into VariableStatement, check it's parent
        return (stmt === null || stmt === void 0 ? void 0 : stmt.parent.kind) === ts.SyntaxKind.SourceFile;
    }
    return false;
}
exports.isTopLevel = isTopLevel;
function isTopLevelComponent(node, nodeFlagStore) {
    var _a;
    var func = ast_1.getClosestParentOfType(node, ts.SyntaxKind.FunctionExpression, true)
        || ast_1.getClosestParentOfType(node, ts.SyntaxKind.ArrowFunction, true)
        || ast_1.getClosestParentOfType(node, ts.SyntaxKind.FunctionDeclaration, true);
    return func && ((_a = nodeFlagStore.get(func)) === null || _a === void 0 ? void 0 : _a.isComponent);
}
exports.isTopLevelComponent = isTopLevelComponent;
