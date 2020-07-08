"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
/**
 * Function.prototype.call support
 *
 * @param node
 * @param self
 * @param context
 */
exports.funcCall = function (node, self, context) {
    if (!_propName_1.propNameIs('call', node)) {
        return undefined;
    }
    if (!_assert_1.assertCallableType(node.expression, context.checker)) {
        log_1.log('Notice: Left-hand expression should have callable inferred type, but was inferred as non-callable.', log_1.LogSeverity.INFO, log_1.ctx(node));
    }
    var argsNodes = ast_1.getChildByType(self, ts.SyntaxKind.SyntaxList);
    var funcNameNode = ast_1.getCallExpressionLeftSide(self);
    var _a = renderSupportedNodes_1.renderSupportedNodes((argsNodes === null || argsNodes === void 0 ? void 0 : argsNodes.children) || [], context), args = _a.slice(1);
    var funcName = renderSupportedNodes_1.renderSupportedNodes([funcNameNode], context);
    return funcName + "(...[" + args.join(', ') + "])";
};
