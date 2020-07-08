"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var escapeString_1 = require("../utils/escapeString");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
function tTemplateExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            return renderSupportedNodes_1.renderSupportedNodes(self.children, context).join(' . ');
        }
    };
}
exports.tTemplateExpression = tTemplateExpression;
function tTemplateSpan(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = renderSupportedNodes_1.renderSupportedNodes(self.children, context), expr = _a[0], literal = _a[1];
            return "(" + expr + ")" + (literal && literal !== '""' ? ' . ' + literal : '');
        }
    };
}
exports.tTemplateSpan = tTemplateSpan;
function tTemplateStatic(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () {
            var str = escapeString_1.escapeString(node.text);
            if (str) {
                return '"' + str + '"';
            }
            return '';
        }
    };
}
exports.tTemplateStatic = tTemplateStatic;
