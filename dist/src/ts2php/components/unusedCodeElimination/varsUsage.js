"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../../utils/ast");
var log_1 = require("../../utils/log");
var usageGraph_1 = require("./usageGraph");
function markUsedVars(node, lExp, usedVars, context) {
    // Unused vars elimination related:
    var stopExpressions = [
        ts.SyntaxKind.FunctionExpression,
        ts.SyntaxKind.FunctionDeclaration,
        ts.SyntaxKind.VariableDeclaration,
        ts.SyntaxKind.ArrowFunction,
        ts.SyntaxKind.SourceFile
    ];
    var upperStatement = ast_1.getClosestOrigParentByPredicate(node, function (p) { return stopExpressions.includes(p.kind); });
    if (upperStatement) {
        switch (upperStatement.kind) {
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.SourceFile:
                // connect expression terminal node to scope terminal node
                context.scope.terminateCall(lExp.getText(), { dryRun: context.dryRun });
                // also connect all used vars to scope terminal node as side-effect usage
                usedVars.forEach(function (ident) { return context.scope.terminateCall(ident, { dryRun: context.dryRun }); });
                break;
            case ts.SyntaxKind.VariableDeclaration:
                var bindings = ast_1.fetchAllBindingIdents(upperStatement.name);
                for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
                    var binding = bindings_1[_i];
                    // connect expression terminal node to varname node (assigned var name)
                    context.scope.terminateCall(lExp.getText(), { traceSourceIdent: binding.getText(), dryRun: context.dryRun });
                    // also connect all used vars to varname node as side-effect usage
                    for (var _a = 0, _b = Array.from(usedVars); _a < _b.length; _a++) {
                        var ident_1 = _b[_a];
                        context.scope.terminateCall(ident_1, { traceSourceIdent: binding.getText(), dryRun: context.dryRun });
                    }
                }
                break;
            default:
                log_1.log('Unsupported expression kind; this may lead to unexpected behavior od dead code elimination, check your result', log_1.LogSeverity.INFO);
        }
    }
    // end of unused vars elimination related
}
exports.markUsedVars = markUsedVars;
/**
 * This helper collects vars that are added with addUsage when running `runner` callable.
 *
 * @param runner
 * @param context
 */
function collectVars(runner, context) {
    var usedVars = new Set();
    var onUsage = function (ident) { return usedVars.add(ident); };
    context.scope.addEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
    var retval = runner();
    context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
    return [usedVars, retval];
}
exports.collectVars = collectVars;
