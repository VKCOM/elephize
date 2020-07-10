"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isTopLevel_1 = require("../utils/isTopLevel");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tForInStatement(node, context) {
    // Automatically add usage for declared vars inside for-statement
    var onDecl = function (ident) {
        context.scope.addUsage(ident, [], { terminateLocally: true, dryRun: context.dryRun });
    };
    context.scope.addEventListener(usageGraph_1.Scope.EV_DECL, onDecl);
    var _a = renderNodes_1.renderNodes([node.initializer, node.expression], context), initializer = _a[0], expression = _a[1];
    context.scope.removeEventListener(usageGraph_1.Scope.EV_DECL, onDecl);
    var statement = renderNodes_1.renderNode(node.statement, context);
    var flags = context.nodeFlagsStore.get(node);
    if (flags === null || flags === void 0 ? void 0 : flags.validated) {
        var expr = "foreach (" + expression + " as " + initializer + " => $_tmpVal) " + statement;
        if (isTopLevel_1.isTopLevel(node, context)) {
            context.moduleDescriptor.addStatement(expr);
        }
        return expr;
    }
    throw new Error('For-In statement should have the .hasOwnProperty check: \n' + node.getFullText().substr(0, 200));
}
exports.tForInStatement = tForInStatement;
