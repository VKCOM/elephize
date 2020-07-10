"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _propName_1 = require("./_propName");
var ast_1 = require("../../utils/ast");
var renderNodes_1 = require("../../components/codegen/renderNodes");
/**
 * Anything ().toString() support
 *
 * @param node
 * @param context
 */
exports.toString = function (node, context) {
    if (_propName_1.propNameIs('toString', node)) {
        var varNameNode = ast_1.getCallExpressionLeftSide(node);
        return '(string)' + renderNodes_1.renderNode(varNameNode, context);
    }
};
