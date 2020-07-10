"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tJsxAttributes(node, context) {
    var synList = [];
    var toRender = [];
    for (var i = 0; i < node.properties.length; i++) {
        if (node.properties[i].kind === ts.SyntaxKind.JsxSpreadAttribute) {
            var rendered_1 = renderNodes_1.renderNodes(toRender, context);
            if (rendered_1.length > 0) {
                synList = synList.concat('[' + rendered_1.join(', ') + ']');
                toRender = [];
            }
            synList.push(renderNodes_1.renderNode(node.properties[i], context));
        }
        else {
            // We suppose that indexes of children match strictly in original tree and render tree!
            var attr = node.properties[i];
            if (attr.kind === ts.SyntaxKind.JsxAttribute && !attr.name.text.startsWith('on') /* remove event handlers */) {
                toRender.push(node.properties[i]);
            }
        }
    }
    var rendered = renderNodes_1.renderNodes(toRender, context);
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
exports.tJsxAttributes = tJsxAttributes;
