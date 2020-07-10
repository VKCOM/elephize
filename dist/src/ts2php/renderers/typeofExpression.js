"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var log_1 = require("../utils/log");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tTypeofExpression(node, context) {
    var type = context.checker.getTypeAtLocation(node.expression);
    var evaluatedType = context.checker.typeToString(type, node.expression, ts.TypeFormatFlags.None);
    if (type.getCallSignatures().length === 0 && evaluatedType !== 'any' && evaluatedType !== 'unknown') {
        var exp = renderNodes_1.renderNode(node.expression, context);
        return "Stdlib::typeof(" + exp + ")";
    }
    log_1.log('Typeof operator does not support `any`/`unknown` and functional arguments ' +
        '(and expressions returning functional types). Ensure that your expression evaluates to ' +
        'non-callable explicit type.', log_1.LogSeverity.ERROR, log_1.ctx(node));
    return 'null';
}
exports.tTypeofExpression = tTypeofExpression;
