"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tObjectLiteralExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = self.children, syntaxList = _a[1];
            if (syntaxList.children.length === 0) {
                return '[]';
            }
            var synList = [];
            var toRender = [];
            for (var i = 0; i < syntaxList.children.length; i++) {
                if (syntaxList.children[i].node.kind === ts.SyntaxKind.SpreadAssignment) {
                    var nodes_1 = renderSupportedNodes_1.renderSupportedNodes(toRender, context).join(',\n');
                    synList = synList.concat(nodes_1.length > 0 ? '[\n' + nodes_1 + '\n]' : '[]');
                    toRender = [];
                    synList.push(renderSupportedNodes_1.renderSupportedNodes([syntaxList.children[i]], context)[0]);
                }
                else {
                    toRender.push(syntaxList.children[i]);
                }
            }
            var nodes = renderSupportedNodes_1.renderSupportedNodes(toRender, context).join(',\n');
            synList = synList.concat(nodes.length > 0 ? '[\n' + nodes + '\n]' : '[]');
            if (synList.length === 0) {
                return '[]';
            }
            if (synList.length === 1) {
                return synList[0];
            }
            return "array_merge(" + synList.join(', ') + ")";
        }
    };
}
exports.tObjectLiteralExpression = tObjectLiteralExpression;
