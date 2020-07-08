"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var ast_1 = require("../../utils/ast");
/**
 * Support for type casting using String(), Number() and Boolean()
 *
 * @param node
 * @param self
 * @param context
 */
exports.typecastConstructors = function (node, self, context) {
    var toCheck = node.expression.kind === ts.SyntaxKind.Identifier
        && ['Number', 'String', 'Boolean'].includes(node.expression.getText());
    if (toCheck) {
        var varName = renderSupportedNodes_1.renderSupportedNodes([ast_1.getCallExpressionArg(self)], context);
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
