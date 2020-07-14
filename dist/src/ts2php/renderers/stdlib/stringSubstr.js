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
var typeInference_1 = require("../../components/typeInference");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * String.prototype.substr support
 *
 * @param node
 * @param context
 */
exports.stringSubstr = function (node, context) {
    if (!_propName_1.propNameIs('substr', node)) {
        return undefined;
    }
    if (!typeInference_1.hasType(node.expression, context.checker, 'string')) {
        log_1.log('Left-hand expression must have string inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var varNameNode = ast_1.getCallExpressionLeftSide(node);
    var args = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context);
    var varName = renderNodes_1.renderNode(varNameNode, context);
    if (!args || !args[0]) {
        log_1.log('String.prototype.substr: can\'t find index in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    log_1.log('Converting String.prototype.substr to substr(): check your encodings twice!', log_1.LogSeverity.WARN, log_1.ctx(node));
    return "substr(" + varName + ", " + args.join(', ') + ")";
};
