"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isTopLevel_1 = require("../utils/isTopLevel");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tDoWhileStatement(node, context) {
    var _a = renderNodes_1.renderNodes([node.statement, node.expression], context), statement = _a[0], expression = _a[1];
    var expr = "do " + statement + " while (" + expression + ");";
    if (isTopLevel_1.isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
    }
    return expr;
}
exports.tDoWhileStatement = tDoWhileStatement;
