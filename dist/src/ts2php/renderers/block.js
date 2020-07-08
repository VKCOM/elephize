"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tBlock(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            // Don't support block-scoped vars for now, as we transpile to es3 first.
            var children = self.children;
            return __spreadArrays(['{'], renderSupportedNodes_1.renderSupportedNodes(children, context), ['}']).join('\n');
        }
    };
}
exports.tBlock = tBlock;
