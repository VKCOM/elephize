"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var escapeString_1 = require("../utils/escapeString");
var ast_1 = require("../utils/ast");
function tStringLiteral(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self) {
            if (node.text === 'use strict') { // remove use strict; TODO: can affect random strings containing 'use strict'
                ast_1.flagParentOfType(self, [ts.SyntaxKind.ExpressionStatement], { drop: true });
            }
            return '"' + escapeString_1.escapeString(node.text) + '"';
        }
    };
}
exports.tStringLiteral = tStringLiteral;
