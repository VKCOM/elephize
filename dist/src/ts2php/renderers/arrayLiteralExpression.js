"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tArrayLiteralExpression(node, context) {
    var synList = [];
    var toRender = [];
    for (var i = 0; i < node.elements.length; i++) {
        if (node.elements[i].kind === ts.SyntaxKind.SpreadElement) {
            synList = synList.concat('[' + renderNodes_1.renderNodes(toRender, context).join(', ') + ']');
            toRender = [];
            synList.push(renderNodes_1.renderNode(node.elements[i], context));
        }
        else {
            toRender.push(node.elements[i]);
        }
    }
    synList = synList.concat('[' + renderNodes_1.renderNodes(toRender, context).join(', ') + ']');
    if (synList.length === 1) {
        return synList[0];
    }
    return "array_merge(" + synList.join(', ') + ")";
}
exports.tArrayLiteralExpression = tArrayLiteralExpression;
