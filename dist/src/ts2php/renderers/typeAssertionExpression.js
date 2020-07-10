"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderNodes_1 = require("../components/codegen/renderNodes");
function tTypeAssertionExpression(node, context) {
    // Type assertion is always 3 elements (e.g. <, any, >), and 4th is expression to evaluate:
    return renderNodes_1.renderNode(node.expression, context);
}
exports.tTypeAssertionExpression = tTypeAssertionExpression;
