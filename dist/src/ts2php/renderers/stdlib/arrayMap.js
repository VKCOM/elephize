"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _propName_1 = require("./_propName");
var log_1 = require("../../utils/log");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * Array.prototype.map support
 *
 * @param node
 * @param context
 */
exports.arrayMap = function (node, context) {
    if (!_propName_1.propNameIs('map', node)) {
        return undefined;
    }
    if (!_assert_1.assertArrayType(node.expression, context.checker)) {
        log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var funcNode = ast_1.getCallExpressionCallbackArg(node);
    var funcArgsCount = (funcNode === null || funcNode === void 0 ? void 0 : funcNode.parameters.length) || 0;
    if (funcArgsCount !== 1 && funcArgsCount !== 2) {
        log_1.log('Unsupported callback argument count for Array.prototype.map', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var varNode = ast_1.getCallExpressionLeftSide(node);
    var _a = renderNodes_1.renderNodes([funcNode, varNode], context), renderedFunction = _a[0], varName = _a[1];
    return "Stdlib::arrayMap" + funcArgsCount + "(" + varName + ", " + renderedFunction + ")";
};
