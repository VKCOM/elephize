"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderNodes_1 = require("../components/codegen/renderNodes");
function tElementAccessExpression(node, context) {
    var _a = renderNodes_1.renderNodes([node.expression, node.argumentExpression], context), ident = _a[0], accessor = _a[1];
    return ident + "[" + accessor + "]";
}
exports.tElementAccessExpression = tElementAccessExpression;
