"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tJsxFragment(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) { return '$this->frg([\n' + renderSupportedNodes_1.renderSupportedNodes(self.children, context).join(',\n') + '\n])'; }
    };
}
exports.tJsxFragment = tJsxFragment;
