"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../utils/ast");
var _assert_1 = require("./stdlib/_assert");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tBinaryExpression(node, context) {
    var _a, _b, _c, _d, _e, _f;
    // Support for modification of vars inside closure
    if (node.left.kind === ts.SyntaxKind.Identifier && [
        ts.SyntaxKind.EqualsToken,
        ts.SyntaxKind.PlusEqualsToken,
        ts.SyntaxKind.MinusEqualsToken,
        ts.SyntaxKind.AsteriskEqualsToken,
        ts.SyntaxKind.SlashEqualsToken,
        ts.SyntaxKind.PercentEqualsToken,
        ts.SyntaxKind.BarEqualsToken,
        ts.SyntaxKind.AmpersandEqualsToken
    ].includes(node.operatorToken.kind)) {
        _assert_1.assertLocalModification(node.left, context);
    }
    // Support for modification of properties inside closure
    if ((node.left.kind === ts.SyntaxKind.PropertyAccessExpression || node.left.kind === ts.SyntaxKind.ElementAccessExpression) && [
        ts.SyntaxKind.EqualsToken,
        ts.SyntaxKind.PlusEqualsToken,
        ts.SyntaxKind.MinusEqualsToken,
        ts.SyntaxKind.AsteriskEqualsToken,
        ts.SyntaxKind.SlashEqualsToken,
        ts.SyntaxKind.PercentEqualsToken,
        ts.SyntaxKind.BarEqualsToken,
        ts.SyntaxKind.AmpersandEqualsToken
    ].includes(node.operatorToken.kind)) {
        _assert_1.assertLocalModification(ast_1.getLeftExpr(node.left), context);
    }
    var replaceLiteral = null;
    if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
        // php needs . for concatenation so we should check inferred types.
        var typeLeft = context.checker.getTypeAtLocation(node.left);
        var typeRight = context.checker.getTypeAtLocation(node.right);
        if (typeLeft.isStringLiteral()
            || typeRight.isStringLiteral()
            || context.checker.typeToString(typeLeft, node.left, ts.TypeFormatFlags.None) === 'string'
            || context.checker.typeToString(typeRight, node.right, ts.TypeFormatFlags.None) === 'string') {
            replaceLiteral = '.';
        }
    }
    // Elvis operator for simple expressions
    if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
        var typeRight = context.checker.getTypeAtLocation(node.right);
        if (context.checker.typeToString(typeRight, node.right, ts.TypeFormatFlags.None) !== 'boolean') {
            var kind = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.kind;
            if (kind === ts.SyntaxKind.SyntaxList) {
                kind = (_c = (_b = node.parent) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.kind;
            }
            if (kind) {
                if (kind === ts.SyntaxKind.BinaryExpression && node.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
                    replaceLiteral = '?:';
                }
                else if ([
                    ts.SyntaxKind.VariableDeclaration,
                    ts.SyntaxKind.ParenthesizedExpression,
                    ts.SyntaxKind.JsxExpression,
                    ts.SyntaxKind.CallExpression
                ].includes(kind)) {
                    replaceLiteral = '?:';
                }
            }
        }
        // TODO: more specific cases?
        // TODO: describe these cases in documentation
    }
    // Make ternary expression from && operator
    if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
        var typeRight = context.checker.getTypeAtLocation(node.right);
        if (context.checker.typeToString(typeRight, node.right, ts.TypeFormatFlags.None) !== 'boolean') {
            var kind = (_d = node.parent) === null || _d === void 0 ? void 0 : _d.kind;
            if (kind === ts.SyntaxKind.SyntaxList) {
                kind = (_f = (_e = node.parent) === null || _e === void 0 ? void 0 : _e.parent) === null || _f === void 0 ? void 0 : _f.kind;
            }
            if (kind) {
                if (kind === ts.SyntaxKind.BinaryExpression && node.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken ||
                    [
                        ts.SyntaxKind.VariableDeclaration,
                        ts.SyntaxKind.ParenthesizedExpression,
                        ts.SyntaxKind.JsxExpression,
                        ts.SyntaxKind.CallExpression
                    ].includes(kind)) {
                    var _g = startVarsCollecting(node, context) || [], usedVars_1 = _g[0], onUsage_1 = _g[1];
                    var _h = renderNodes_1.renderNodes([node.left, node.right], context, false), leftExpr_1 = _h[0], rightExpr_1 = _h[1];
                    markVarsUsage(node, usedVars_1 || new Set(), onUsage_1 || (function () { return new Set(); }), context);
                    return leftExpr_1 + " ? " + rightExpr_1 + " : " + leftExpr_1;
                }
            }
        }
        // TODO: more specific cases?
        // TODO: describe these cases in documentation
    }
    if (node.operatorToken.kind === ts.SyntaxKind.InKeyword) {
        var _j = startVarsCollecting(node, context) || [], usedVars_2 = _j[0], onUsage_2 = _j[1];
        var _k = renderNodes_1.renderNodes([node.left, node.right], context, false), leftExpr_2 = _k[0], rightExpr_2 = _k[1];
        markVarsUsage(node, usedVars_2 || new Set(), onUsage_2 || (function () { return new Set(); }), context);
        return "isset(" + rightExpr_2 + "[" + leftExpr_2 + "])";
    }
    var _l = startVarsCollecting(node, context) || [], usedVars = _l[0], onUsage = _l[1];
    var _m = renderNodes_1.renderNodes([node.left, node.operatorToken, node.right], context), leftExpr = _m[0], operator = _m[1], rightExpr = _m[2];
    markVarsUsage(node, usedVars || new Set(), onUsage || (function () { return new Set(); }), context);
    if (replaceLiteral) { // replace + with . for string-based operations
        operator = replaceLiteral;
    }
    var flags = context.nodeFlagsStore.get(node);
    if ((flags === null || flags === void 0 ? void 0 : flags.forceType) && node.left.kind === ts.SyntaxKind.Identifier) {
        var decl = (context.scope.findByIdent(node.left.getText()) || [])[0];
        if (decl) {
            decl.forcedType = flags.forceType;
        }
    }
    return leftExpr + " " + operator + " " + rightExpr;
}
exports.tBinaryExpression = tBinaryExpression;
var stopOperators = [
    ts.SyntaxKind.EqualsToken,
    ts.SyntaxKind.PlusEqualsToken,
    ts.SyntaxKind.MinusEqualsToken,
    ts.SyntaxKind.AsteriskEqualsToken,
    ts.SyntaxKind.SlashEqualsToken,
    ts.SyntaxKind.AmpersandEqualsToken,
    ts.SyntaxKind.BarEqualsToken,
];
function startVarsCollecting(expr, context) {
    if (stopOperators.includes(expr.operatorToken.kind)) {
        return;
    }
    var usedVars = new Set();
    var onUsage = function (ident) { return usedVars.add(ident); };
    context.scope.addEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
    return [usedVars, onUsage];
}
function markVarsUsage(expr, usedVars, onUsage, context) {
    if (stopOperators.includes(expr.operatorToken.kind)) {
        return;
    }
    context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, onUsage);
    var leftVal = ast_1.getLeftExpr(expr.left);
    if (leftVal) {
        // also connect all used vars to varname node as side-effect usage
        for (var _i = 0, _a = Array.from(usedVars); _i < _a.length; _i++) {
            var ident_1 = _a[_i];
            context.scope.terminateCall(ident_1, { traceSourceIdent: leftVal.getText(), dryRun: context.dryRun });
        }
    }
}
