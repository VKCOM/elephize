"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var ast_1 = require("../../utils/ast");
/**
 * Math.* methods and constants
 *
 * @param node
 * @param self
 * @param context
 */
exports.math = function (node, self, context) {
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
            var varName = renderSupportedNodes_1.renderSupportedNodes([ast_1.getCallExpressionArg(self)], context).join('');
            return operation + "(" + varName + ")";
        case 'random':
            return 'mt_rand(0, PHP_INT_MAX) / (float)PHP_INT_MAX';
        case 'pow':
        case 'max':
        case 'min':
            var args = ast_1.getChildByType(self, ts.SyntaxKind.SyntaxList);
            var nodes = renderSupportedNodes_1.renderSupportedNodes((args === null || args === void 0 ? void 0 : args.children) || [], context);
            return operation + "(" + nodes.join(', ') + ")";
        case 'log2':
            return "log(" + renderSupportedNodes_1.renderSupportedNodes([ast_1.getCallExpressionArg(self)], context).join('') + ", 2)";
        case 'log10':
            return "log(" + renderSupportedNodes_1.renderSupportedNodes([ast_1.getCallExpressionArg(self)], context).join('') + ", 10)";
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
