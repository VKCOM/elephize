"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tTernaryOperator(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = renderSupportedNodes_1.renderSupportedNodes(self.children, context, false), condition = _a[0], ifTrue = _a[2], ifFalse = _a[4];
            return condition + " ? " + ifTrue + " : " + ifFalse;
        }
    };
}
exports.tTernaryOperator = tTernaryOperator;
