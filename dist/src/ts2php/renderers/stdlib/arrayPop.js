"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _propName_1 = require("./_propName");
var log_1 = require("../../utils/log");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * Array.prototype.pop support
 *
 * @param node
 * @param context
 */
exports.arrayPop = function (node, context) {
    if (_propName_1.propNameIs('pop', node)) {
        if (!_assert_1.assertArrayType(node.expression, context.checker)) {
            log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        _assert_1.assertLocalModification(ast_1.getLeftExpr(node.expression), context);
        var varName = renderNodes_1.renderNode(ast_1.getCallExpressionLeftSide(node), context);
        return "array_pop(" + varName + ")";
    }
};
