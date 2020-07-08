"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
/**
 * Array.prototype.filter support
 *
 * @param node
 * @param self
 * @param context
 */
exports.arrayFilter = function (node, self, context) {
    if (!_propName_1.propNameIs('filter', node)) {
        return undefined;
    }
    if (!_assert_1.assertArrayType(node.expression, context.checker)) {
        log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    self.flags.name = 'array_filter';
    var funcNode = ast_1.getCallExpressionCallbackArg(self);
    var varNode = ast_1.getCallExpressionLeftSide(self);
    var renderedFunction = renderSupportedNodes_1.renderSupportedNodes([funcNode], context).join('');
    var varName = renderSupportedNodes_1.renderSupportedNodes([varNode], context).join('');
    if ((self.flags.childCount || 0) > 1) {
        log_1.log('Array.prototype.filter with index in callback is not supported', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    else {
        return "array_filter(" + varName + ", " + renderedFunction + ")";
    }
};
