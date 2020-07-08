"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var log_1 = require("../utils/log");
var _assert_1 = require("./stdlib/_assert");
function tPrefixUnaryExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            if (node.operand.kind === ts.SyntaxKind.Identifier && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken)) {
                _assert_1.assertLocalModification(node.operand, context);
                var type = context.checker.getTypeAtLocation(node.operand);
                if (context.checker.typeToString(type, node.operand, ts.TypeFormatFlags.None) !== 'number') {
                    log_1.log('Trying to apply unary inc/dec operator to non-number variable. This is probably an error.', log_1.LogSeverity.ERROR, log_1.ctx(node));
                }
            }
            var _a = renderSupportedNodes_1.renderSupportedNodes(self.children, context), operator = _a[0], content = _a[1];
            return "" + operator + content;
        }
    };
}
exports.tPrefixUnaryExpression = tPrefixUnaryExpression;
