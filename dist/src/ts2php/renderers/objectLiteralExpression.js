"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tObjectLiteralExpression(node, context) {
    if (node.properties.length === 0) {
        return '[]';
    }
    var synList = [];
    var toRender = [];
    for (var i = 0; i < node.properties.length; i++) {
        if (node.properties[i].kind === ts.SyntaxKind.SpreadAssignment) {
            var nodes_1 = renderNodes_1.renderNodes(toRender, context).join(',\n');
            synList = synList.concat(nodes_1.length > 0 ? '[\n' + nodes_1 + '\n]' : '[]');
            toRender = [];
            synList.push(renderNodes_1.renderNode(node.properties[i], context));
        }
        else {
            toRender.push(node.properties[i]);
        }
    }
    var nodes = renderNodes_1.renderNodes(toRender, context).join(',\n');
    synList = synList.concat(nodes.length > 0 ? '[\n' + nodes + '\n]' : '[]');
    if (synList.length === 0) {
        return '[]';
    }
    if (synList.length === 1) {
        return synList[0];
    }
    return "array_merge(" + synList.join(', ') + ")";
}
exports.tObjectLiteralExpression = tObjectLiteralExpression;
