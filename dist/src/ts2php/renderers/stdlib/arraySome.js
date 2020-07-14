"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var typeInference_1 = require("../../components/typeInference");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * Array.prototype.some support
 *
 * @param node
 * @param context
 */
exports.arraySome = function (node, context) {
    if (!_propName_1.propNameIs('some', node)) {
        return undefined;
    }
    if (!typeInference_1.hasArrayType(node.expression, context.checker)) {
        log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var funcNode = ast_1.getCallExpressionCallbackArg(node);
    var funcArgsCount = (funcNode === null || funcNode === void 0 ? void 0 : funcNode.parameters.length) || 0;
    if (!funcArgsCount) {
        log_1.log('Array.prototype.some: can\'t find iterable element in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var varNode = ast_1.getCallExpressionLeftSide(node);
    var _a = renderNodes_1.renderNodes([funcNode, varNode], context), renderedFunc = _a[0], varName = _a[1];
    return "Stdlib::arraySome(" + varName + ", " + renderedFunc + ")";
};
