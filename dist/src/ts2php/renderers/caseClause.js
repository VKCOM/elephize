"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var renderNodes_1 = require("../components/codegen/renderNodes");
function tCaseClause(node, context) {
    var _a = renderNodes_1.renderNodes(__spreadArrays([node.expression], node.statements), context), condition = _a[0], expressions = _a.slice(1);
    return "case " + condition + ":\n" + expressions.join('\n');
}
exports.tCaseClause = tCaseClause;
