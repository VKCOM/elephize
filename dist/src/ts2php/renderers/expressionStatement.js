"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isTopLevel_1 = require("../utils/isTopLevel");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tExpressionStatement(node, context) {
    var content = renderNodes_1.renderNode(node.expression, context);
    var flags = context.nodeFlagsStore.get(node);
    if ((flags === null || flags === void 0 ? void 0 : flags.drop) || content.length === 0) {
        return '';
    }
    var additionalExpressions = ((flags === null || flags === void 0 ? void 0 : flags.addExpressions) || []).join('\n');
    var expr = (additionalExpressions ? additionalExpressions + '\n' : '') +
        content + ((flags === null || flags === void 0 ? void 0 : flags.passthrough) ? '' : ';');
    if (isTopLevel_1.isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
    }
    return expr;
}
exports.tExpressionStatement = tExpressionStatement;
