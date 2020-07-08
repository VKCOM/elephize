"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
/**
 * Function.prototype.bind support
 *
 * @param node
 * @param self
 * @param context
 */
exports.funcBind = function (node, self, context) {
    if (!_propName_1.propNameIs('bind', node)) {
        return undefined;
    }
    if (!_assert_1.assertCallableType(node.expression, context.checker)) {
        log_1.log('Notice: Left-hand expression should have callable inferred type, but was inferred as non-callable.', log_1.LogSeverity.INFO, log_1.ctx(node));
    }
    var funcNameNode = ast_1.getCallExpressionLeftSide(self);
    var argsNode = ast_1.getChildChainByType(self, [
        ts.SyntaxKind.SyntaxList,
        ts.SyntaxKind.ArrayLiteralExpression
    ]);
    var args = renderSupportedNodes_1.renderSupportedNodes([argsNode], context);
    var funcName = renderSupportedNodes_1.renderSupportedNodes([funcNameNode], context);
    if (!args) {
        log_1.log('Function.prototype.bind: no arguments found. Only currying is supported at the moment.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    return "\\" + context.namespaces.builtins + "\\Functional::bind(" + funcName + ", " + args + ")";
};
