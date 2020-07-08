"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tTypeAssertionExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            // Type assertion is always 3 elements (e.g. <, any, >), and 4th is expression to evaluate:
            return renderSupportedNodes_1.renderSupportedNodes([self.children[3]], context)[0];
        }
    };
}
exports.tTypeAssertionExpression = tTypeAssertionExpression;
