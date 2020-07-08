"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tCaseBlock(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) { return renderSupportedNodes_1.renderSupportedNodes(self.children, context).join('\n'); }
    };
}
exports.tCaseBlock = tCaseBlock;
