"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../utils/ast");
var isTopLevel_1 = require("../utils/isTopLevel");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
function tReturnStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a, _b;
            var _c = self.children, retval = _c[1];
            var content;
            var usedVars = new Set();
            var onUsage = function (ident) { return usedVars.add(ident); };
            context.scope.addEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
            var ret = retval.node.gen(retval, context);
            context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
            usedVars.forEach(function (ident) { return context.scope.terminateCall(ident, { dryRun: context.dryRun }); });
            if (((_b = (_a = ast_1.getClosestParentOfType(self, ts.SyntaxKind.CallExpression)) === null || _a === void 0 ? void 0 : _a.flags) === null || _b === void 0 ? void 0 : _b.name) === 'array_foreach') {
                // we convert function to plain loop body, return should be omitted.
                // if there is just single return, we should emit break statement
                content = ret ? ret + ";" : 'break;';
            }
            else {
                content = "return " + ret + ";";
            }
            var additionalExpressions = (self.flags.addExpressions || []).join('\n');
            var expr = (additionalExpressions ? additionalExpressions + '\n' : '') + content;
            if (isTopLevel_1.isTopLevel(node, context)) {
                context.moduleDescriptor.addStatement(expr);
            }
            return expr;
        }
    };
}
exports.tReturnStatement = tReturnStatement;
