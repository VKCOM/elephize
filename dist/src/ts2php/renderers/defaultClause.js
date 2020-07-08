"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tDefaultClause(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var expressions = renderSupportedNodes_1.renderSupportedNodes(self.children, context);
            return "default:\n" + expressions.join('\n');
        }
    };
}
exports.tDefaultClause = tDefaultClause;
