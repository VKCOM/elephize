"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var ast_1 = require("../../utils/ast");
/**
 * Array.isArray support
 *
 * @param node
 * @param self
 * @param context
 */
exports.arrayIsArray = function (node, self, context) {
    var toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression
        && node.expression.expression.getText() === 'Array'
        && node.expression.name.escapedText === 'isArray';
    if (toCheck) {
        var varName = renderSupportedNodes_1.renderSupportedNodes([ast_1.getCallExpressionArg(self)], context);
        return "Stdlib::arrayIsArray(" + varName + ")";
    }
};
