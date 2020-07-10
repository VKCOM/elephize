"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var escapeString_1 = require("../utils/escapeString");
var renderNodes_1 = require("../components/codegen/renderNodes");
exports.tTemplateExpression = function (node, context) {
    return renderNodes_1.renderNodes(__spreadArrays([node.head], node.templateSpans), context).join(' . ');
};
function tTemplateSpan(node, context) {
    var _a = renderNodes_1.renderNodes([node.expression, node.literal], context), expr = _a[0], literal = _a[1];
    return "(" + expr + ")" + (literal && literal !== '""' ? ' . ' + literal : '');
}
exports.tTemplateSpan = tTemplateSpan;
function tTemplateStatic(node) {
    var str = escapeString_1.escapeString(node.text);
    if (str) {
        return '"' + str + '"';
    }
    return '';
}
exports.tTemplateStatic = tTemplateStatic;
