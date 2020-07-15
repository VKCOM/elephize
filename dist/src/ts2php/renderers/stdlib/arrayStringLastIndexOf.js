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
/**
 * String.prototype.lastIndexOf support
 * Array.prototype.lastIndexOf support
 *
 * @param node
 * @param context
 */
exports.arrayStringLastIndexOf = function (node, context) {
    if (!_propName_1.propNameIs('lastIndexOf', node)) {
        return undefined;
    }
    var nd = node.expression.expression;
    var type = context.checker.getTypeAtLocation(nd);
    var varNameNode = ast_1.getCallExpressionLeftSide(node);
    if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
        var args = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context);
        var varName = renderNodes_1.renderNode(varNameNode, context);
        if (!args || !args[0]) {
            log_1.log('String.prototype.lastIndexOf: can\'t find searchable element in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        if (args[1]) { // strrpos looks from the beginning, add unary minus to search from the end
            args[1] = '-' + args[1];
        }
        return "strrpos(" + varName + ", " + args.join(', ') + ")";
    }
    else {
        if (!basicTypes_1.hasArrayType(node.expression, context.checker)) {
            log_1.log('Left-hand expression must have string, array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        var args = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context);
        var varName = renderNodes_1.renderNode(varNameNode, context);
        if (!args || !args[0]) {
            log_1.log('Array.prototype.lastIndexOf: can\'t find searchable element in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        if (args[1]) {
            return "Stdlib::arrayLastIndexOf(" + args[0] + ", " + varName + ", " + args[1] + ")";
        }
        else {
            return "Stdlib::arrayLastIndexOf(" + args[0] + ", " + varName + ")";
        }
    }
};
