"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tNumericLiteral(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function () { return node.getText(); }
    };
}
exports.tNumericLiteral = tNumericLiteral;
