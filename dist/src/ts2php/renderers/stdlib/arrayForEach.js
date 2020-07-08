"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var _propName_1 = require("./_propName");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
var nodeData_1 = require("../../components/unusedCodeElimination/usageGraph/nodeData");
var functionScope_1 = require("../../components/functionScope");
/**
 * Array.prototype.forEach support
 *
 * @param node
 * @param self
 * @param context
 */
exports.arrayForeach = function (node, self, context) {
    if (!_propName_1.propNameIs('forEach', node)) {
        return undefined;
    }
    if (!_assert_1.assertArrayType(node.expression, context.checker)) {
        log_1.log('Left-hand expression must have array-like or iterable inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    self.flags.name = 'array_foreach';
    ast_1.flagParentOfType(self, [ts.SyntaxKind.ExpressionStatement], { passthrough: true });
    var funcBlockNode = ast_1.getCallExpressionCallbackArg(self);
    var synListNode = funcBlockNode && ast_1.getChildByType(funcBlockNode, ts.SyntaxKind.SyntaxList);
    // There may be a lot of expressions in [4]th child of arrow function node...
    var blockNode = funcBlockNode === null || funcBlockNode === void 0 ? void 0 : funcBlockNode.children[4];
    var nodeIdent = nodeData_1.identifyAnonymousNode(node);
    var block = functionScope_1.getRenderedBlock(context, nodeIdent, node, undefined, [synListNode, blockNode]).block;
    var callArgs = self.flags.rawNodes;
    var varNameNode = ast_1.getCallExpressionLeftSide(self);
    var renderedBlock = functionScope_1.unwrapArrowBody(block, blockNode, true);
    var varName = renderSupportedNodes_1.renderSupportedNodes([varNameNode], context).join('');
    if (!callArgs || !callArgs[0]) {
        log_1.log('Array.prototype.forEach: can\'t find iterable element in call.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    if (callArgs[1]) {
        return "foreach (" + varName + " as $" + callArgs[1].getText() + " => $" + callArgs[0].getText() + ") " + renderedBlock;
    }
    else {
        return "foreach (" + varName + " as $" + callArgs[0].getText() + ") " + renderedBlock;
    }
};
