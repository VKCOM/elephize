"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isTopLevel_1 = require("../utils/isTopLevel");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tForStatement(node, context) {
    // Automatically add usage for declared vars inside for-statement
    var onDecl = function (ident) {
        context.scope.addUsage(ident, [], { terminateLocally: true, dryRun: context.dryRun });
    };
    context.scope.addEventListener(usageGraph_1.Scope.EV_DECL, onDecl);
    var _a = renderNodes_1.renderNodes([node.initializer, node.condition, node.incrementor], context), varInit = _a[0], condition = _a[1], incrementor = _a[2];
    context.scope.removeEventListener(usageGraph_1.Scope.EV_DECL, onDecl);
    var statement = renderNodes_1.renderNode(node.statement, context);
    var expr = "for (" + varInit + "; " + condition + "; " + incrementor + ") " + statement;
    if (isTopLevel_1.isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
    }
    return expr;
}
exports.tForStatement = tForStatement;
