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
var typeInference_1 = require("../../components/typeInference");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * String.prototype.split support
 *
 * @param node
 * @param context
 */
exports.stringSplit = function (node, context) {
    if (!_propName_1.propNameIs('split', node)) {
        return undefined;
    }
    if (!typeInference_1.hasType(node.expression, context.checker, 'string')) {
        log_1.log('Left-hand expression must have string inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    context.nodeFlagsStore.upsert(node, { name: 'string_split' });
    var varNameNode = node.expression.expression;
    var _a = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context), separator = _a[0], limit = _a[1];
    // split can use string or regexp as separator, so we should check inferred type of argument.
    var nd = node.arguments[0];
    var type = context.checker.getTypeAtLocation(nd);
    if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
        // string literals as separators
        var varName = renderNodes_1.renderNode(varNameNode, context);
        if (limit) {
            return "explode(" + separator + ", " + varName + ", " + limit + ")";
        }
        else {
            return "explode(" + separator + ", " + varName + ")";
        }
    }
    else if (nd.kind === ts.SyntaxKind.RegularExpressionLiteral) {
        // regexp instances as separators
        var varName = renderNodes_1.renderNode(varNameNode, context);
        if (limit) {
            return "preg_split(" + separator + ", " + varName + ", " + limit + ")";
        }
        else {
            return "preg_split(" + separator + ", " + varName + ")";
        }
    }
    else {
        log_1.log('String.prototype.split: Non-string and non-regexp-literal separators are not supported by transpiler.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
};
