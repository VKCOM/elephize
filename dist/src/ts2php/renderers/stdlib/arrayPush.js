"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var basicTypes_1 = require("../../components/typeInference/basicTypes");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
var functionScope_1 = require("../../components/functionScope");
/**
 * Array.prototype.push support
 *
 * @param node
 * @param context
 */
exports.arrayPush = function (node, context) {
    if (!_propName_1.propNameIs('push', node)) {
        return undefined;
    }
    if (!basicTypes_1.hasArrayType(node.expression, context.checker)) {
        log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    functionScope_1.checkModificationInNestedScope(ast_1.getLeftExpr(node.expression), context);
    var varNameNode = ast_1.getCallExpressionLeftSide(node);
    var args = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context);
    var varName = renderNodes_1.renderNode(varNameNode, context);
    if (!args || !args[0]) {
        log_1.log('Array.prototype.push: no element in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    return "array_push(" + varName + ", " + args.join(', ') + ")";
};
