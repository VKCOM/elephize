"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var _propName_1 = require("./_propName");
var log_1 = require("../../utils/log");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
/**
 * Array.prototype.pop support
 *
 * @param node
 * @param self
 * @param context
 */
exports.arrayPop = function (node, self, context) {
    if (_propName_1.propNameIs('pop', node)) {
        if (!_assert_1.assertArrayType(node.expression, context.checker)) {
            log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        _assert_1.assertLocalModification(ast_1.getLeftExpr(node.expression), context);
        var varNode = ast_1.getCallExpressionLeftSide(self);
        var varName = renderSupportedNodes_1.renderSupportedNodes([varNode], context);
        return "array_pop(" + varName + ")";
    }
};
