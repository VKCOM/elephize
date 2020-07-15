"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var log_1 = require("../utils/log");
var renderNodes_1 = require("../components/codegen/renderNodes");
var functionScope_1 = require("../components/functionScope");
function tPrefixUnaryExpression(node, context) {
    if (node.operand.kind === ts.SyntaxKind.Identifier && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken)) {
        functionScope_1.checkModificationInNestedScope(node.operand, context);
        var type = context.checker.getTypeAtLocation(node.operand);
        if (context.checker.typeToString(type, node.operand, ts.TypeFormatFlags.None) !== 'number') {
            log_1.log('Trying to apply unary inc/dec operator to non-number variable. This is probably an error.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        }
    }
    var operator = '';
    switch (node.operator) {
        case ts.SyntaxKind.ExclamationToken:
            operator = '!';
            break;
        case ts.SyntaxKind.MinusMinusToken:
            operator = '--';
            break;
        case ts.SyntaxKind.MinusToken:
            operator = '-';
            break;
        case ts.SyntaxKind.PlusPlusToken:
            operator = '++';
            break;
        case ts.SyntaxKind.PlusToken:
            operator = '+';
            break;
        case ts.SyntaxKind.TildeToken:
            operator = '~';
            break;
    }
    var content = renderNodes_1.renderNode(node.operand, context);
    return "" + operator + content;
}
exports.tPrefixUnaryExpression = tPrefixUnaryExpression;
