"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var escapeString_1 = require("../utils/escapeString");
function tJsxText(node) {
    var str = escapeString_1.escapeString(node.text).replace(/^\s+|\s+$/g, ' ');
    if (str !== ' ' && str !== '  ') {
        return '"' + str + '"';
    }
    return '';
}
exports.tJsxText = tJsxText;
