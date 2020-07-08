"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tAsExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            return renderSupportedNodes_1.renderSupportedNodes([self.children[0]], context)[0];
        }
    };
}
exports.tAsExpression = tAsExpression;
