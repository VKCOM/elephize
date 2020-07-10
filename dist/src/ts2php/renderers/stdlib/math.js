"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var log_1 = require("../../utils/log");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * Math.* methods and constants
 *
 * @param node
 * @param context
 */
exports.math = function (node, context) {
    var toCheck = node.expression.kind === ts.SyntaxKind.PropertyAccessExpression
        && node.expression.expression.getText() === 'Math';
    if (!toCheck) {
        return undefined;
    }
    var operation = node.expression.name.escapedText.toString();
    switch (operation) {
        case 'abs':
        case 'round':
        case 'floor':
        case 'ceil':
        case 'sin':
        case 'cos':
        case 'tan':
        case 'asin':
        case 'acos':
        case 'atan':
        case 'exp':
        case 'log':
        case 'sqrt':
            var varName = renderNodes_1.renderNode(ast_1.getCallExpressionArg(node), context);
            return operation + "(" + varName + ")";
        case 'random':
            return 'mt_rand(0, PHP_INT_MAX) / (float)PHP_INT_MAX';
        case 'pow':
        case 'max':
        case 'min':
            var nodes = renderNodes_1.renderNodes(__spreadArrays(node.arguments), context);
            return operation + "(" + nodes.join(', ') + ")";
        case 'log2':
            return "log(" + renderNodes_1.renderNode(ast_1.getCallExpressionArg(node), context) + ", 2)";
        case 'log10':
            return "log(" + renderNodes_1.renderNode(ast_1.getCallExpressionArg(node), context) + ", 10)";
        default:
            log_1.log("Math: unsupported method (" + operation + ")", log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
    }
};
exports.supportedMathMethods = [
    'abs',
    'round',
    'floor',
    'ceil',
    'sin',
    'cos',
    'tan',
    'asin',
    'acos',
    'atan',
    'exp',
    'log',
    'sqrt',
    'random',
    'pow',
    'max',
    'min',
    'log2',
    'log10',
];
