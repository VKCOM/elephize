"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var isTopLevel_1 = require("../utils/isTopLevel");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
function tForInStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = self.children, varInitNode = _a[2], expressionNode = _a[4], statementNode = _a[6];
            // Automatically add usage for declared vars inside for-statement
            var onDecl = function (ident) {
                context.scope.addUsage(ident, [], { terminateLocally: true, dryRun: context.dryRun });
            };
            context.scope.addEventListener(usageGraph_1.Scope.EV_DECL, onDecl);
            var _b = renderSupportedNodes_1.renderSupportedNodes([varInitNode, expressionNode], context), initializer = _b[0], expression = _b[1];
            context.scope.removeEventListener(usageGraph_1.Scope.EV_DECL, onDecl);
            var statement = renderSupportedNodes_1.renderSupportedNodes([statementNode], context)[0];
            if (self.flags.validated) {
                var expr = "foreach (" + expression + " as " + initializer + " => $_tmpVal) " + statement;
                if (isTopLevel_1.isTopLevel(node, context)) {
                    context.moduleDescriptor.addStatement(expr);
                }
                return expr;
            }
            throw new Error('For-In statement should have the .hasOwnProperty check: \n' + node.getFullText().substr(0, 200));
        }
    };
}
exports.tForInStatement = tForInStatement;
