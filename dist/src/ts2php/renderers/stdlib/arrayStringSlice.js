"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var basicTypes_1 = require("../../components/typeInference/basicTypes");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
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
 * @param context
 */
exports.arrayStringSlice = function (node, context) {
    if (!_propName_1.propNameIs('slice', node)) {
        return undefined;
    }
    var nd = node.expression.expression;
    var type = context.checker.getTypeAtLocation(nd);
    var varNameNode = ast_1.getCallExpressionLeftSide(node);
    if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
        var args = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context);
        var varName = renderNodes_1.renderNode(varNameNode, context);
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
        if (!basicTypes_1.hasArrayType(node.expression, context.checker) && !forced) {
            log_1.log('Left-hand expression must have string, array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        if (forced) {
            ast_1.flagParentOfType(node, [ts.SyntaxKind.VariableDeclarationList], { forceType: 'split' }, context.nodeFlagsStore);
        }
        var args = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context);
        var varName = renderNodes_1.renderNode(varNameNode, context);
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
