"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var isTopLevel_1 = require("../utils/isTopLevel");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var varsUsage_1 = require("../components/unusedCodeElimination/varsUsage");
function tForOfStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = self.children, varInitNode = _a[2], expressionNode = _a[4], statementNode = _a[6];
            var initializer = renderSupportedNodes_1.renderSupportedNodes([varInitNode], context)[0];
            var _b = varsUsage_1.collectVars(function () { return renderSupportedNodes_1.renderSupportedNodes([expressionNode], context); }, context), usedVars = _b[0], expression = _b[1][0];
            var initNodeName = pathsAndNames_1.normalizeVarName(initializer
                .replace(/^\$this->/, '')
                .replace(/^\$/, ''));
            context.scope.addUsage(initNodeName, Array.from(usedVars), { dryRun: context.dryRun });
            var statement = renderSupportedNodes_1.renderSupportedNodes([statementNode], context)[0];
            var expr = "foreach (" + expression + " as " + initializer + ") " + statement;
            if (isTopLevel_1.isTopLevel(node, context)) {
                context.moduleDescriptor.addStatement(expr);
            }
            return expr;
        }
    };
}
exports.tForOfStatement = tForOfStatement;
