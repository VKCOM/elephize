"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * Array.isArray support
 *
 * @param node
 * @param context
 */
exports.arrayIsArray = function (node, context) {
    var toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression
        && node.expression.expression.getText() === 'Array'
        && node.expression.name.escapedText === 'isArray';
    if (toCheck) {
        var varName = renderNodes_1.renderNodes([ast_1.getCallExpressionArg(node)], context);
        return "Stdlib::arrayIsArray(" + varName + ")";
    }
};
