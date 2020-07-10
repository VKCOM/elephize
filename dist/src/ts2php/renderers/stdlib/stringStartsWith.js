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
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * String.prototype.startsWith support
 *
 * @param node
 * @param context
 */
exports.stringStartsWith = function (node, context) {
    if (!_propName_1.propNameIs('startsWith', node)) {
        return undefined;
    }
    if (!_assert_1.assertType(node.expression, context.checker, 'string')) {
        log_1.log('Left-hand expression must have string inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var varNameNode = ast_1.getCallExpressionLeftSide(node);
    var args = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context);
    var varName = renderNodes_1.renderNode(varNameNode, context);
    if (!args || !args[0]) {
        log_1.log('String.prototype.startsWith: can\'t find searchable element in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    log_1.log('Converting String.prototype.startsWith to strpos(): check your encodings twice!', log_1.LogSeverity.WARN, log_1.ctx(node));
    if (args[1]) {
        return "strpos(" + varName + ", " + args[0] + ", " + args[1] + ") === 0";
    }
    else {
        return "strpos(" + varName + ", " + args[0] + ") === 0";
    }
};
