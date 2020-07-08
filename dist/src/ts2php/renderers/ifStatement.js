"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var isTopLevel_1 = require("../utils/isTopLevel");
var varsUsage_1 = require("../components/unusedCodeElimination/varsUsage");
function tIfStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = self.children, conditionNode = _a[2], ifTrueNode = _a[4], ifFalseNode = _a[6];
            var _b = varsUsage_1.collectVars(function () { return renderSupportedNodes_1.renderSupportedNodes([conditionNode], context); }, context), usedVars = _b[0], condition = _b[1][0];
            var _c = renderSupportedNodes_1.renderSupportedNodes([ifTrueNode, ifFalseNode], context), ifTrue = _c[0], ifFalse = _c[1];
            if (self.flags.drop) {
                return '';
            }
            for (var _i = 0, _d = Array.from(usedVars); _i < _d.length; _i++) {
                var ident_1 = _d[_i];
                context.scope.addUsage(ident_1, [], { terminateLocally: true, dryRun: context.dryRun });
            }
            var expr;
            if (ifFalse) {
                expr = "if (" + condition + ") " + ifTrue + " else " + ifFalse;
            }
            else {
                expr = "if (" + condition + ") " + ifTrue;
            }
            if (isTopLevel_1.isTopLevel(node, context)) {
                context.moduleDescriptor.addStatement(expr);
            }
            return expr;
        }
    };
}
exports.tIfStatement = tIfStatement;
