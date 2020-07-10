"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isTopLevel_1 = require("../utils/isTopLevel");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tWhileStatement(node, context) {
    var _a = renderNodes_1.renderNodes([node.expression, node.statement], context), expression = _a[0], statement = _a[1];
    var expr = "while (" + expression + ") " + statement;
    if (isTopLevel_1.isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
    }
    return expr;
}
exports.tWhileStatement = tWhileStatement;
