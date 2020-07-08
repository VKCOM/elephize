"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tJsxAttribute(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = self.children, exprNode = _a[2];
            var expr = renderSupportedNodes_1.renderSupportedNodes([exprNode], context)[0];
            return "\"" + node.name.getText() + "\" => " + expr;
        }
    };
}
exports.tJsxAttribute = tJsxAttribute;
