"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var log_1 = require("../utils/log");
function tTypeofExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var type = context.checker.getTypeAtLocation(node.expression);
            var evaluatedType = context.checker.typeToString(type, node.expression, ts.TypeFormatFlags.None);
            if (type.getCallSignatures().length === 0 && evaluatedType !== 'any' && evaluatedType !== 'unknown') {
                var exp = renderSupportedNodes_1.renderSupportedNodes(self.children, context)[0];
                return "Stdlib::typeof(" + exp + ")";
            }
            log_1.log('Typeof operator does not support `any`/`unknown` and functional arguments ' +
                '(and expressions returning functional types). Ensure that your expression evaluates to ' +
                'non-callable explicit type.', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
    };
}
exports.tTypeofExpression = tTypeofExpression;
