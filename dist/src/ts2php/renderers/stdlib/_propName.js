"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
exports.propNameIs = function (name, node) { return node.expression.kind === ts.SyntaxKind.PropertyAccessExpression && node.expression.name.escapedText === name; };
