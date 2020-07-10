"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isTopLevel_1 = require("../utils/isTopLevel");
var varsUsage_1 = require("../components/unusedCodeElimination/varsUsage");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tIfStatement(node, context) {
    var _a = varsUsage_1.collectVars(function () { return renderNodes_1.renderNode(node.expression, context); }, context), usedVars = _a[0], condition = _a[1];
    var _b = renderNodes_1.renderNodes([node.thenStatement, node.elseStatement], context), ifTrue = _b[0], ifFalse = _b[1];
    var flags = context.nodeFlagsStore.get(node);
    if (flags === null || flags === void 0 ? void 0 : flags.drop) {
        return '';
    }
    for (var _i = 0, _c = Array.from(usedVars); _i < _c.length; _i++) {
        var ident_1 = _c[_i];
        context.scope.addUsage(ident_1, [], { terminateLocally: true, dryRun: context.dryRun });
    }
    var expr;
    if (ifFalse) {
        expr = "if (" + condition + ") " + ifTrue + " else " + ifFalse;
    }
    else {
        expr = "if (" + condition + ") " + ifTrue;
    }
    if (isTopLevel_1.isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
    }
    return expr;
}
exports.tIfStatement = tIfStatement;
