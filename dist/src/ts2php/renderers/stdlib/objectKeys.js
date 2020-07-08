"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var ast_1 = require("../../utils/ast");
/**
 * Object.keys support
 *
 * @param node
 * @param self
 * @param context
 */
exports.objectKeys = function (node, self, context) {
    var toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression
        && node.expression.expression.getText() === 'Object'
        && node.expression.name.escapedText === 'keys';
    if (toCheck) {
        var varName = renderSupportedNodes_1.renderSupportedNodes([ast_1.getCallExpressionArg(self)], context);
        return "array_keys(" + varName + ")";
    }
};
