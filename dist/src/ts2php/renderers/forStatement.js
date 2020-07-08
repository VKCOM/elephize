"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var isTopLevel_1 = require("../utils/isTopLevel");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
function tForStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = self.children, varInitNode = _a[2], conditionNode = _a[4], incrementorNode = _a[6], statementNode = _a[8];
            // Automatically add usage for declared vars inside for-statement
            var onDecl = function (ident) {
                context.scope.addUsage(ident, [], { terminateLocally: true, dryRun: context.dryRun });
            };
            context.scope.addEventListener(usageGraph_1.Scope.EV_DECL, onDecl);
            var _b = renderSupportedNodes_1.renderSupportedNodes([varInitNode, conditionNode, incrementorNode], context), varInit = _b[0], condition = _b[1], incrementor = _b[2];
            context.scope.removeEventListener(usageGraph_1.Scope.EV_DECL, onDecl);
            var statement = renderSupportedNodes_1.renderSupportedNodes([statementNode], context)[0];
            var expr = "for (" + varInit + "; " + condition + "; " + incrementor + ") " + statement;
            if (isTopLevel_1.isTopLevel(node, context)) {
                context.moduleDescriptor.addStatement(expr);
            }
            return expr;
        }
    };
}
exports.tForStatement = tForStatement;
