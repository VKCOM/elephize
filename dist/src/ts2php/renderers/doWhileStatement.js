"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var isTopLevel_1 = require("../utils/isTopLevel");
function tDoWhileStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = renderSupportedNodes_1.renderSupportedNodes(self.children, context), statement = _a[0], expression = _a[1];
            var expr = "do " + statement + " while (" + expression + ");";
            if (isTopLevel_1.isTopLevel(node, context)) {
                context.moduleDescriptor.addStatement(expr);
            }
            return expr;
        }
    };
}
exports.tDoWhileStatement = tDoWhileStatement;
