"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
/**
 * Array.prototype.reduce support
 *
 * @param node
 * @param self
 * @param context
 */
exports.arrayReduce = function (node, self, context) {
    if (!_propName_1.propNameIs('reduce', node)) {
        return undefined;
    }
    if (!_assert_1.assertArrayType(node.expression, context.checker)) {
        log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    self.flags.name = 'array_reduce';
    var funcNode = ast_1.getCallExpressionCallbackArg(self);
    var varNode = ast_1.getCallExpressionLeftSide(self);
    var initialValue = ast_1.getChildChainByType(self, [
        ts.SyntaxKind.SyntaxList,
        [
            ts.SyntaxKind.StringLiteral,
            ts.SyntaxKind.NumericLiteral,
            ts.SyntaxKind.ArrayLiteralExpression,
            ts.SyntaxKind.ObjectLiteralExpression
        ]
    ]);
    var renderedFunction = renderSupportedNodes_1.renderSupportedNodes([funcNode], context).join('');
    var varName = renderSupportedNodes_1.renderSupportedNodes([varNode], context);
    if (!initialValue) {
        log_1.log('Array.prototype.reduce should have initial value of the accumulator', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var accumulator = renderSupportedNodes_1.renderSupportedNodes([initialValue], context);
    if ((self.flags.childCount || 0) > 2) {
        log_1.log('Array.prototype.reduce with index in callback is not supported', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    else {
        return "array_reduce(" + varName + ", " + renderedFunction + ", " + accumulator + ")";
    }
};
