"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * Array.prototype.reduce support
 *
 * @param node
 * @param context
 */
exports.arrayReduce = function (node, context) {
    if (!_propName_1.propNameIs('reduce', node)) {
        return undefined;
    }
    if (!_assert_1.assertArrayType(node.expression, context.checker)) {
        log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var initialValue = ast_1.getChildChainByType(node, [
        ts.SyntaxKind.SyntaxList,
        [
            ts.SyntaxKind.StringLiteral,
            ts.SyntaxKind.NumericLiteral,
            ts.SyntaxKind.ArrayLiteralExpression,
            ts.SyntaxKind.ObjectLiteralExpression
        ]
    ]);
    var funcNode = ast_1.getCallExpressionCallbackArg(node);
    var funcArgsCount = (funcNode === null || funcNode === void 0 ? void 0 : funcNode.parameters.length) || 0;
    if (funcArgsCount > 2) {
        log_1.log('Array.prototype.reduce with index in callback is not supported', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    if (!initialValue) {
        log_1.log('Array.prototype.reduce should have initial value of the accumulator', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var varNode = ast_1.getCallExpressionLeftSide(node);
    var _a = renderNodes_1.renderNodes([initialValue, funcNode, varNode], context), accumulator = _a[0], renderedFunction = _a[1], varName = _a[2];
    return "array_reduce(" + varName + ", " + renderedFunction + ", " + accumulator + ")";
};
