"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * Object.keys support
 *
 * @param node
 * @param context
 */
exports.objectKeys = function (node, context) {
    var toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression
        && node.expression.expression.getText() === 'Object'
        && node.expression.name.escapedText === 'keys';
    if (toCheck) {
        var varName = renderNodes_1.renderNode(ast_1.getCallExpressionArg(node), context);
        return "array_keys(" + varName + ")";
    }
};
