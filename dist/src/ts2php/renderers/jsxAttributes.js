"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tJsxAttributes(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var synList = [];
            var toRender = [];
            var syntaxList = self.children[0];
            for (var i = 0; i < syntaxList.children.length; i++) {
                if (syntaxList.children[i].node.kind === ts.SyntaxKind.JsxSpreadAttribute) {
                    var rendered_1 = renderSupportedNodes_1.renderSupportedNodes(toRender, context);
                    if (rendered_1.length > 0) {
                        synList = synList.concat('[' + rendered_1.join(', ') + ']');
                        toRender = [];
                    }
                    synList.push(renderSupportedNodes_1.renderSupportedNodes(syntaxList.children[i].children, context)[0]);
                }
                else {
                    // We suppose that indexes of children match strictly in original tree and render tree!
                    var attr = node.properties[i];
                    if (attr.kind === ts.SyntaxKind.JsxAttribute && !attr.name.text.startsWith('on') /* remove event handlers */) {
                        toRender.push(syntaxList.children[i]);
                    }
                }
            }
            var rendered = renderSupportedNodes_1.renderSupportedNodes(toRender, context);
            if (rendered.length > 0) {
                synList = synList.concat('[' + rendered.join(', ') + ']');
            }
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
exports.tJsxAttributes = tJsxAttributes;
