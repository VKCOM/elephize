"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var escapeString_1 = require("../utils/escapeString");
var ast_1 = require("../utils/ast");
function tStringLiteral(node, context) {
    if (node.text === 'use strict') { // remove use strict; TODO: can affect random strings containing 'use strict'
        ast_1.flagParentOfType(node, [ts.SyntaxKind.ExpressionStatement], { drop: true }, context.nodeFlagsStore);
    }
    return '"' + escapeString_1.escapeString(node.text) + '"';
}
exports.tStringLiteral = tStringLiteral;
