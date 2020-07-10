"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _propName_1 = require("./_propName");
var log_1 = require("../../utils/log");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * String.prototype.trim support
 *
 * @param node
 * @param context
 */
exports.stringTrim = function (node, context) {
    if (_propName_1.propNameIs('trim', node)) {
        if (!_assert_1.assertType(node.expression, context.checker, 'string')) {
            log_1.log('Left-hand expression must have string inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        var varNameNode = ast_1.getCallExpressionLeftSide(node);
        var varName = renderNodes_1.renderNode(varNameNode, context);
        return "trim(" + varName + ")";
    }
};
