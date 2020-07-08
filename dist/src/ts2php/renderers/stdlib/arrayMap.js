"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var _propName_1 = require("./_propName");
var log_1 = require("../../utils/log");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
/**
 * Array.prototype.map support
 *
 * @param node
 * @param self
 * @param context
 */
exports.arrayMap = function (node, self, context) {
    if (!_propName_1.propNameIs('map', node)) {
        return undefined;
    }
    if (!_assert_1.assertArrayType(node.expression, context.checker)) {
        log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    self.flags.name = 'array_map';
    var funcNode = ast_1.getCallExpressionCallbackArg(self);
    var varNode = ast_1.getCallExpressionLeftSide(self);
    var renderedFunction = renderSupportedNodes_1.renderSupportedNodes([funcNode], context).join('');
    var funcArgsCount = self.flags.childCount || 0;
    if (funcArgsCount !== 1 && funcArgsCount !== 2) {
        log_1.log('Unsupported argument count for Array.prototype.map', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var varName = renderSupportedNodes_1.renderSupportedNodes([varNode], context).join('');
    return "Stdlib::arrayMap" + funcArgsCount + "(" + varName + ", " + renderedFunction + ")";
};
