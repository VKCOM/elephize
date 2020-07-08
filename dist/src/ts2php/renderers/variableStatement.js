"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var hasExport_1 = require("../utils/hasExport");
var ast_1 = require("../utils/ast");
function tVariableStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var exported = hasExport_1.hasExport(node);
            var declList = ast_1.getChildByType(self, ts.SyntaxKind.VariableDeclarationList);
            if (exported) {
                declList === null || declList === void 0 ? void 0 : declList.node.gen(declList, context);
                return __spreadArrays(self.flags.addExpressions || []).join('\n');
            }
            self.flags.localsData = { regStatements: [] };
            var content = declList === null || declList === void 0 ? void 0 : declList.node.gen(declList, context);
            if (!content || content.length === 0) {
                return '';
            }
            var additionalExpressions = (self.flags.addExpressions || []).join('\n');
            return (additionalExpressions ? additionalExpressions + '\n' : '') + content + ';';
        }
    };
}
exports.tVariableStatement = tVariableStatement;
