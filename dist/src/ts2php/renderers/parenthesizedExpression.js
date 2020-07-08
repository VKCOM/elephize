"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tParenthesizedExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = self.children, expr = _a[1];
            return '(' + expr.node.gen(expr, context) + ')';
        }
    };
}
exports.tParenthesizedExpression = tParenthesizedExpression;
