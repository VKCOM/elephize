"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../utils/ast");
var isTopLevel_1 = require("../utils/isTopLevel");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tReturnStatement(node, context) {
    var usedVars = new Set();
    var onUsage = function (ident) { return usedVars.add(ident); };
    context.scope.addEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
    var ret = renderNodes_1.renderNode(node.expression, context);
    context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
    usedVars.forEach(function (ident) { return context.scope.terminateCall(ident, { dryRun: context.dryRun }); });
    var closestParent = ast_1.getClosestParentOfType(node, ts.SyntaxKind.CallExpression);
    // Check foreach
    var isPropAccess = closestParent && closestParent.expression.kind === ts.SyntaxKind.PropertyAccessExpression;
    var isForeach = isPropAccess && closestParent.expression.name.getText() === 'forEach';
    var content = isForeach
        ? (ret ? ret + ";" : 'break;')
        // ^ we convert function to plain loop body, return should be omitted.
        // ^ if there is just single return, we should emit break statement
        : "return " + ret + ";";
    var flags = context.nodeFlagsStore.get(node);
    var additionalExpressions = ((flags === null || flags === void 0 ? void 0 : flags.addExpressions) || []).join('\n');
    var expr = (additionalExpressions ? additionalExpressions + '\n' : '') + content;
    if (isTopLevel_1.isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
    }
    return expr;
}
exports.tReturnStatement = tReturnStatement;
