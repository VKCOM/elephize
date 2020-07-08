"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
/**
 * String.prototype.substr support
 *
 * @param node
 * @param self
 * @param context
 */
exports.stringSubstr = function (node, self, context) {
    if (!_propName_1.propNameIs('substr', node)) {
        return undefined;
    }
    if (!_assert_1.assertType(node.expression, context.checker, 'string')) {
        log_1.log('Left-hand expression must have string inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var argsNodes = ast_1.getChildByType(self, ts.SyntaxKind.SyntaxList);
    var varNameNode = ast_1.getCallExpressionLeftSide(self);
    var args = renderSupportedNodes_1.renderSupportedNodes((argsNodes === null || argsNodes === void 0 ? void 0 : argsNodes.children) || [], context);
    var varName = renderSupportedNodes_1.renderSupportedNodes([varNameNode], context);
    if (!args || !args[0]) {
        log_1.log('String.prototype.substr: can\'t find index in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    log_1.log('Converting String.prototype.substr to substr(): check your encodings twice!', log_1.LogSeverity.WARN, log_1.ctx(node));
    return "substr(" + varName + ", " + args.join(', ') + ")";
};
