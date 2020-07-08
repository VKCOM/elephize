"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var log_1 = require("./log");
function hasExport(node) {
    if (node.modifiers) {
        for (var _i = 0, _a = node.modifiers; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.kind === ts.SyntaxKind.DefaultKeyword) {
                log_1.log('Do not use `export default` in transpiled code (and preferably anywhere else). Use named exports.', log_1.LogSeverity.ERROR, log_1.ctx(node));
                return null;
            }
            if (m.kind === ts.SyntaxKind.ExportKeyword) {
                return true;
            }
        }
    }
}
exports.hasExport = hasExport;
