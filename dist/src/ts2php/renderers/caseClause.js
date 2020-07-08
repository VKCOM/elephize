"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tCaseClause(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = renderSupportedNodes_1.renderSupportedNodes(self.children, context), condition = _a[0], expressions = _a.slice(1);
            return "case " + condition + ":\n" + expressions.join('\n');
        }
    };
}
exports.tCaseClause = tCaseClause;
