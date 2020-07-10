"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../codegen/renderNodes");
/**
 * Top-level functions marked with IC prefix are expected to be functional Isomorphic Components
 *
 * @param context
 * @param node
 */
function handleComponent(context, node) {
    var _a;
    var funcNode = ast_1.getClosestParentOfAnyType(node, [
        ts.SyntaxKind.FunctionDeclaration,
        ts.SyntaxKind.ArrowFunction,
        ts.SyntaxKind.FunctionExpression
    ], true);
    var isNestedFunc = !!ast_1.getClosestParentOfAnyType(node, [
        ts.SyntaxKind.FunctionDeclaration,
        ts.SyntaxKind.ArrowFunction,
        ts.SyntaxKind.FunctionExpression
    ]); // note difference: not including self
    var triviaContainer = node.kind === ts.SyntaxKind.FunctionDeclaration
        ? node
        : ast_1.getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement);
    var trivia = triviaContainer === null || triviaContainer === void 0 ? void 0 : triviaContainer.getFullText().substr(0, triviaContainer === null || triviaContainer === void 0 ? void 0 : triviaContainer.getLeadingTriviaWidth());
    var isElephizedComponent = trivia === null || trivia === void 0 ? void 0 : trivia.includes('@elephizeTarget');
    var nodeName = node.kind === ts.SyntaxKind.FunctionDeclaration
        ? node.name
        : (_a = ast_1.getClosestOrigParentOfType(node, ts.SyntaxKind.VariableDeclaration)) === null || _a === void 0 ? void 0 : _a.name;
    if (!isNestedFunc && nodeName && nodeName.kind === ts.SyntaxKind.Identifier && isElephizedComponent) {
        var name_1 = nodeName.escapedText.toString();
        var descriptor = context.registry.deriveReactComponent(name_1, context.moduleDescriptor);
        if (!descriptor) {
            throw new Error();
        }
        var tmpDescriptor = context.moduleDescriptor;
        context.moduleDescriptor = descriptor;
        context.nodeFlagsStore.upsert(node, { isComponent: true });
        var decl = context.scope.addDeclaration(nodeName.getText(), [], { terminateGlobally: true, dryRun: context.dryRun });
        context.pushScope(nodeName.getText());
        context.scope.ownerNode.data.isComponent = true;
        var args = renderNodes_1.renderNodes(__spreadArrays(funcNode.parameters), context);
        var block = renderNodes_1.renderNode(funcNode.body, context);
        if (decl && decl.ownedScope) {
            context.scope.terminateToParentTerminalNode(context.dryRun);
        }
        context.popScope();
        descriptor.setArgs(args.join(', '));
        descriptor.setBlock(block);
        context.moduleDescriptor = tmpDescriptor;
        return true;
    }
    return false;
}
exports.handleComponent = handleComponent;
