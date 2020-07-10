"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var log_1 = require("../utils/log");
var _assert_1 = require("./stdlib/_assert");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tPostfixUnaryExpression(node, context) {
    if (node.operand.kind === ts.SyntaxKind.Identifier) {
        _assert_1.assertLocalModification(node.operand, context);
        var type = context.checker.getTypeAtLocation(node.operand);
        if (context.checker.typeToString(type, node.operand, ts.TypeFormatFlags.None) !== 'number') {
            log_1.log('Trying to apply unary inc/dec operator to non-number variable. This is probably an error.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        }
    }
    var operator = '';
    switch (node.operator) {
        case ts.SyntaxKind.MinusMinusToken:
            operator = '--';
            break;
        case ts.SyntaxKind.PlusPlusToken:
            operator = '++';
            break;
    }
    var content = renderNodes_1.renderNode(node.operand, context);
    return "" + content + operator;
}
exports.tPostfixUnaryExpression = tPostfixUnaryExpression;
