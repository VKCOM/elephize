"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escapeString(str) {
    return str
        .replace(/"/g, '\\"')
        .replace(/\$/g, '\\$')
        .replace(/\0/g, '\\0')
        .replace(/\\/g, '\\');
}
exports.escapeString = escapeString;
