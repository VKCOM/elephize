"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _propName_1 = require("./_propName");
var log_1 = require("../../utils/log");
var typeInference_1 = require("../../components/typeInference");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
var functionScope_1 = require("../../components/functionScope");
/**
 * Array.prototype.pop support
 *
 * @param node
 * @param context
 */
exports.arrayPop = function (node, context) {
    if (_propName_1.propNameIs('pop', node)) {
        if (!typeInference_1.hasArrayType(node.expression, context.checker)) {
            log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        functionScope_1.checkModificationInNestedScope(ast_1.getLeftExpr(node.expression), context);
        var varName = renderNodes_1.renderNode(ast_1.getCallExpressionLeftSide(node), context);
        return "array_pop(" + varName + ")";
    }
};
