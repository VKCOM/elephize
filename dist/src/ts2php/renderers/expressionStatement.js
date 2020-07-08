"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isTopLevel_1 = require("../utils/isTopLevel");
function tExpressionStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var children = self.children;
            var content = children[0].node.gen(children[0], context);
            if (self.flags.drop || content.length === 0) {
                return '';
            }
            var additionalExpressions = (self.flags.addExpressions || []).join('\n');
            var expr = (additionalExpressions ? additionalExpressions + '\n' : '') +
                content + (self.flags.passthrough ? '' : ';');
            if (isTopLevel_1.isTopLevel(node, context)) {
                context.moduleDescriptor.addStatement(expr);
            }
            return expr;
        }
    };
}
exports.tExpressionStatement = tExpressionStatement;
