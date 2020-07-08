"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tElementAccessExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var children = self.children;
            var _a = renderSupportedNodes_1.renderSupportedNodes(children, context), ident = _a[0], accessor = _a[1];
            return ident + "[" + accessor + "]";
        }
    };
}
exports.tElementAccessExpression = tElementAccessExpression;
