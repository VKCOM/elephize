"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../../utils/renderSupportedNodes");
var log_1 = require("../../utils/log");
var index_1 = require("../index");
var _propName_1 = require("./_propName");
var _assert_1 = require("./_assert");
var ast_1 = require("../../utils/ast");
/**
 * String.prototype.split support
 *
 * @param node
 * @param self
 * @param context
 */
exports.stringSplit = function (node, self, context) {
    if (!_propName_1.propNameIs('split', node)) {
        return undefined;
    }
    if (!_assert_1.assertType(node.expression, context.checker, 'string')) {
        log_1.log('Left-hand expression must have string inferred type', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    self.flags.name = 'string_split';
    var _a = ast_1.getChildrenByTree(self, [
        [ts.SyntaxKind.PropertyAccessExpression, [ts.SyntaxKind.Identifier]],
        ts.SyntaxKind.SyntaxList
    ]), varNameNode = _a[0][0], argsNode = _a[1];
    renderSupportedNodes_1.renderSupportedNodes([argsNode], context);
    var args = self.flags.rawNodes;
    if (!args || !args[0]) {
        log_1.log('String.prototype.split: can\'t find separator in call [1].', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    // TODO: Hack
    var _b = args[1]
        ? renderSupportedNodes_1.renderSupportedNodes([
            {
                node: index_1.getNodeInfo(args[0]),
                checker: context.checker,
                compilerOptions: context.compilerOptions,
                children: [],
                flags: {}
            },
            {
                node: index_1.getNodeInfo(args[1]),
                checker: context.checker,
                compilerOptions: context.compilerOptions,
                children: [],
                flags: {}
            }
        ], context)
        : renderSupportedNodes_1.renderSupportedNodes([
            {
                node: index_1.getNodeInfo(args[0]),
                checker: context.checker,
                compilerOptions: context.compilerOptions,
                children: [],
                flags: {}
            }
        ], context), separator = _b[0], limit = _b[1];
    // split can use string or regexp as separator, so we should check inferred type of argument.
    var nd = args[0];
    var type = context.checker.getTypeAtLocation(nd);
    if (type.isStringLiteral() || context.checker.typeToString(type, nd, ts.TypeFormatFlags.None) === 'string') {
        // string literals as separators
        var varName = renderSupportedNodes_1.renderSupportedNodes([varNameNode], context)[0];
        if (limit) {
            return "explode(" + separator + ", " + varName + ", " + limit + ")";
        }
        else {
            return "explode(" + separator + ", " + varName + ")";
        }
    }
    else if (args[0].kind === ts.SyntaxKind.RegularExpressionLiteral) {
        // regexp instances as separators
        var varName = renderSupportedNodes_1.renderSupportedNodes([varNameNode], context)[0];
        if (limit) {
            return "preg_split(" + separator + ", " + varName + ", " + limit + ")";
        }
        else {
            return "preg_split(" + separator + ", " + varName + ")";
        }
    }
    else {
        log_1.log('String.prototype.split: Non-string and non-regexp-literal separators are not supported by transpiler.', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
};
