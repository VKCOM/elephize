"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hasExport_1 = require("../utils/hasExport");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tVariableStatement(node, context) {
    var exported = hasExport_1.hasExport(node);
    var declList = node.declarationList;
    if (exported) {
        renderNodes_1.renderNode(declList, context);
        var flags_1 = context.nodeFlagsStore.get(node);
        return __spreadArrays((flags_1 === null || flags_1 === void 0 ? void 0 : flags_1.addExpressions) || []).join('\n');
    }
    context.nodeFlagsStore.upsert(node, { localsData: { regStatements: [] } });
    var content = renderNodes_1.renderNode(declList, context);
    if (!content || content.length === 0) {
        return '';
    }
    var flags = context.nodeFlagsStore.get(node);
    var additionalExpressions = ((flags === null || flags === void 0 ? void 0 : flags.addExpressions) || []).join('\n');
    return (additionalExpressions ? additionalExpressions + '\n' : '') + content + ';';
}
exports.tVariableStatement = tVariableStatement;
