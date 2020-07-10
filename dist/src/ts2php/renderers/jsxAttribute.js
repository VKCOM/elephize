"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderNodes_1 = require("../components/codegen/renderNodes");
function tJsxAttribute(node, context) {
    var expr = renderNodes_1.renderNode(node.initializer, context);
    return "\"" + node.name.getText() + "\" => " + expr;
}
exports.tJsxAttribute = tJsxAttribute;
