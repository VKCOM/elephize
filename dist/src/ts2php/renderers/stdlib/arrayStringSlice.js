"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
function isForcedArrayType(context, node) {
    var _a;
    var left = (_a = ast_1.getLeftExpr(node.expression)) === null || _a === void 0 ? void 0 : _a.getText();
    if (!left) {
        return false;
    }
    var decl = (context.scope.findByIdent(left) || [])[0];
    if (!decl) {
        return false;
    }
    return decl.forcedType === 'array';
}
/**
 * String.prototype.slice support
 * Array.prototype.slice support
 *
 * @param node
 * @param self
 * @param context
 */
exports.arrayStringSlice = function (node, self, context) {
    if (!_propName_1.propNameIs('slice', node)) {
        return undefined;
    }
    var nd = node.expression.expression;
    var type = context.checker.getTypeAtLocation(nd);
    var argsNodes = ast_1.getChildByType(self, ts.SyntaxKind.SyntaxList);
    var varNameNode = ast_1.getCallExpressionLeftSide(self);
    if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
        var args = renderSupportedNodes_1.renderSupportedNodes((argsNodes === null || argsNodes === void 0 ? void 0 : argsNodes.children) || [], context);
        var varName = renderSupportedNodes_1.renderSupportedNodes([varNameNode], context)[0];
        if (!args || !args[0]) {
            return varName;
        }
        log_1.log('Converting String.prototype.substr to substr(): check your encodings twice!', log_1.LogSeverity.WARN, log_1.ctx(node));
        if (args[1]) {
            return "substr(" + varName + ", " + args[0] + ", strlen(" + varName + ") - " + args[1] + " - 1)";
        }
        else {
            return "substr(" + varName + ", " + args[0] + ")";
        }
    }
    else {
        var forced = isForcedArrayType(context, node);
        if (!_assert_1.assertArrayType(node.expression, context.checker) && !forced) {
            log_1.log('Left-hand expression must have string, array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        if (forced) {
            ast_1.flagParentOfType(self, [ts.SyntaxKind.VariableDeclarationList], { forceType: 'split' });
        }
        var args = renderSupportedNodes_1.renderSupportedNodes((argsNodes === null || argsNodes === void 0 ? void 0 : argsNodes.children) || [], context);
        var varName = renderSupportedNodes_1.renderSupportedNodes([varNameNode], context);
        if (!args || !args[0]) {
            return "array_slice(" + varName + ", 0)";
        }
        if (args[1]) {
            return "array_slice(" + varName + ", " + args[0] + ", count(" + varName + ") - " + args[1] + " - 1)";
        }
        else {
            return "array_slice(" + varName + ", " + args[0] + ")";
        }
    }
};
