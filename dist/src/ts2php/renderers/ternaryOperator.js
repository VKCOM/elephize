"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderNodes_1 = require("../components/codegen/renderNodes");
function tTernaryOperator(node, context) {
    var _a = renderNodes_1.renderNodes([node.condition, node.whenTrue, node.whenFalse], context, false), condition = _a[0], ifTrue = _a[1], ifFalse = _a[2];
    return condition + " ? " + ifTrue + " : " + ifFalse;
}
exports.tTernaryOperator = tTernaryOperator;
