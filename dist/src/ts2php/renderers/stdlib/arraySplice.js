"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
/**
 * Array.prototype.splice support
 *
 * @param node
 * @param self
 * @param context
 */
exports.arraySplice = function (node, self, context) {
    if (!_propName_1.propNameIs('splice', node)) {
        return undefined;
    }
    if (!_assert_1.assertArrayType(node.expression, context.checker)) {
        log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    _assert_1.assertLocalModification(ast_1.getLeftExpr(node.expression), context);
    var argsNodes = ast_1.getChildByType(self, ts.SyntaxKind.SyntaxList);
    var varNameNode = ast_1.getCallExpressionLeftSide(self);
    var args = renderSupportedNodes_1.renderSupportedNodes((argsNodes === null || argsNodes === void 0 ? void 0 : argsNodes.children) || [], context);
    var varName = renderSupportedNodes_1.renderSupportedNodes([varNameNode], context);
    if (!args || !args[0]) {
        log_1.log('Array.prototype.splice: no index in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var startOffset = args[0], deleteLength = args[1], elementsToAdd = args.slice(2);
    if (!deleteLength) {
        return "array_splice(" + varName + ", " + startOffset + ")";
    }
    if (elementsToAdd.length === 0) {
        return "array_splice(" + varName + ", " + startOffset + ", " + deleteLength + ")";
    }
    return "array_splice(" + varName + ", " + startOffset + ", " + deleteLength + ", [" + elementsToAdd.join(', ') + "])";
};
