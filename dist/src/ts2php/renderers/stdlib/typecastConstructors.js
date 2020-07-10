"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * Support for type casting using String(), Number() and Boolean()
 *
 * @param node
 * @param context
 */
exports.typecastConstructors = function (node, context) {
    var toCheck = node.expression.kind === ts.SyntaxKind.Identifier
        && ['Number', 'String', 'Boolean'].includes(node.expression.getText());
    if (toCheck) {
        var varName = renderNodes_1.renderNode(ast_1.getCallExpressionArg(node), context);
        switch (node.expression.getText()) {
            case 'Number':
                return "+" + varName;
            case 'String':
                return "(string)" + varName;
            case 'Boolean':
                return "(boolean)" + varName;
        }
    }
};
