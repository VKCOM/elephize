"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var _propName_1 = require("./_propName");
var ast_1 = require("../../utils/ast");
/**
 * Anything ().toString() support
 *
 * @param node
 * @param self
 * @param context
 */
exports.toString = function (node, self, context) {
    if (_propName_1.propNameIs('toString', node)) {
        var varNameNode = ast_1.getCallExpressionLeftSide(self);
        return '(string)' + renderSupportedNodes_1.renderSupportedNodes([varNameNode], context).join('');
    }
};
