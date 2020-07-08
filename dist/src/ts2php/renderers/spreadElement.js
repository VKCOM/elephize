"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tSpreadElement(node) {
    return {
        kind: node.kind,
        supported: true,
        // Do not add ... here because it's not really needed in some cases
        gen: function (self, context) { return renderSupportedNodes_1.renderSupportedNodes(self.children, context)[0]; }
    };
}
exports.tSpreadElement = tSpreadElement;
