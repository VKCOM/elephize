"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var ast_1 = require("../../utils/ast");
/**
 * Top-level functions marked with IC prefix are expected to be functional Isomorphic Components
 *
 * @param context
 * @param node
 * @param self
 */
function handleComponent(context, node, self) {
    var _a;
    var isNestedFunc = ast_1.getClosestParentOfAnyType(self, [
        ts.SyntaxKind.FunctionDeclaration,
        ts.SyntaxKind.ArrowFunction,
        ts.SyntaxKind.FunctionExpression
    ]);
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
        self.flags.isComponent = true;
        var decl = context.scope.addDeclaration(nodeName.getText(), [], { terminateGlobally: true, dryRun: context.dryRun });
        context.pushScope(nodeName.getText());
        context.scope.ownerNode.data.isComponent = true;
        var _b = renderSupportedNodes_1.renderSupportedNodes([
            self.children.find(function (c) { return c.node.kind === ts.SyntaxKind.SyntaxList &&
                c.children.length > 0 && c.children[0].node.kind === ts.SyntaxKind.Parameter; }),
            self.children.find(function (c) { return c.node.kind === ts.SyntaxKind.Block; })
        ], context, false), args = _b[0], block = _b[1];
        if (decl && decl.ownedScope) {
            context.scope.terminateToParentTerminalNode(context.dryRun);
        }
        context.popScope();
        descriptor.setArgs(args);
        descriptor.setBlock(block);
        context.moduleDescriptor = tmpDescriptor;
        return true;
    }
    return false;
}
exports.handleComponent = handleComponent;
