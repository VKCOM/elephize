"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var typeInference_1 = require("../../components/typeInference");
var ast_1 = require("../../utils/ast");
var nodeData_1 = require("../../components/unusedCodeElimination/usageGraph/nodeData");
var functionScope_1 = require("../../components/functionScope");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * Array.prototype.forEach support
 *
 * @param node
 * @param context
 */
exports.arrayForeach = function (node, context) {
    if (!_propName_1.propNameIs('forEach', node)) {
        return undefined;
    }
    if (!typeInference_1.hasArrayType(node.expression, context.checker)) {
        log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    ast_1.flagParentOfType(node, [ts.SyntaxKind.ExpressionStatement], { passthrough: true }, context.nodeFlagsStore);
    var funcBlockNode = ast_1.getCallExpressionCallbackArg(node);
    if (!funcBlockNode) {
        log_1.log('Array.prototype.forEach: can\'t find callable argument in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    var cbArgs = funcBlockNode.parameters;
    var cbBlock = funcBlockNode.body;
    var nodeIdent = nodeData_1.identifyAnonymousNode(node);
    var block = functionScope_1.getRenderedBlock(context, nodeIdent, node, cbArgs, cbBlock).block;
    var varNameNode = ast_1.getCallExpressionLeftSide(node);
    var renderedBlock = functionScope_1.unwrapArrowBody(block, cbBlock, true);
    var varName = renderNodes_1.renderNodes([varNameNode], context).join('');
    if (!cbArgs || !cbArgs[0]) {
        log_1.log('Array.prototype.forEach: can\'t find iterable element in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    if (cbArgs[0].name.kind !== ts.SyntaxKind.Identifier) {
        log_1.log('Array.prototype.forEach: parameter destructuring in foreach is not supported.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    if (cbArgs[1]) {
        if (cbArgs[1].name.kind !== ts.SyntaxKind.Identifier) {
            log_1.log('Array.prototype.forEach: parameter destructuring in foreach is not supported.', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return 'null';
        }
        return "foreach (" + varName + " as $" + cbArgs[1].getText() + " => $" + cbArgs[0].getText() + ") " + renderedBlock;
    }
    else {
        return "foreach (" + varName + " as $" + cbArgs[0].getText() + ") " + renderedBlock;
    }
};
