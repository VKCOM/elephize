"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tArrayLiteralExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = self.children, expr = _a[1];
            var synList = [];
            var toRender = [];
            for (var i = 0; i < expr.children.length; i++) {
                if (expr.children[i].node.kind === ts.SyntaxKind.SpreadElement) {
                    synList = synList.concat('[' + renderSupportedNodes_1.renderSupportedNodes(toRender, context).join(', ') + ']');
                    toRender = [];
                    synList.push(renderSupportedNodes_1.renderSupportedNodes([expr.children[i]], context)[0]);
                }
                else {
                    toRender.push(expr.children[i]);
                }
            }
            synList = synList.concat('[' + renderSupportedNodes_1.renderSupportedNodes(toRender, context).join(', ') + ']');
            if (synList.length === 1) {
                return synList[0];
            }
            return "array_merge(" + synList.join(', ') + ")";
        }
    };
}
exports.tArrayLiteralExpression = tArrayLiteralExpression;
