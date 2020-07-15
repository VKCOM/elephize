"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * parseInt/parseFloat support
 *
 * @param node
 * @param context
 */
exports.parse = function (node, context) {
    if (node.expression.getText() === 'parseInt') {
        if (node.arguments.length > 1 && node.arguments[1].getText() !== '10') {
            return "intval(" + renderNodes_1.renderNode(node.arguments[0], context) + ", " + node.arguments[1].getText() + ")";
        }
        return '(int)' + renderNodes_1.renderNode(node.arguments[0], context);
    }
    if (node.expression.getText() === 'parseFloat') {
        return '(float)' + renderNodes_1.renderNode(node.arguments[0], context);
    }
};
