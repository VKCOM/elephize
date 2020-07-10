"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../utils/ast");
var objectBindingPattern_1 = require("./objectBindingPattern");
var arrayBindingPattern_1 = require("./arrayBindingPattern");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var log_1 = require("../utils/log");
function tParameterDeclaration(node, context) {
    var _a, _b, _c;
    // Object/array destructuring
    if (node.name.kind === ts.SyntaxKind.ObjectBindingPattern || node.name.kind === ts.SyntaxKind.ArrayBindingPattern) {
        var parentFunc = ast_1.getClosestParentOfAnyType(node, [
            ts.SyntaxKind.FunctionExpression,
            ts.SyntaxKind.FunctionDeclaration,
            ts.SyntaxKind.ArrowFunction
        ]);
        if (!parentFunc) {
            log_1.log('No function found for parameters declaration: this is unexpected error', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return '';
        }
        var index = ((_a = context.nodeFlagsStore.get(parentFunc)) === null || _a === void 0 ? void 0 : _a.elIndex) || 1;
        var varName = "__param_destruct_" + index;
        context.nodeFlagsStore.upsert(parentFunc, { elIndex: index + 1 });
        var _d = node.name.kind === ts.SyntaxKind.ObjectBindingPattern
            ? objectBindingPattern_1.renderElements(node.name, varName, context)
            : arrayBindingPattern_1.renderElements(node.name, varName, context), renderedString = _d.renderedString, identList = _d.identList;
        identList.forEach(function (ident) { return context.scope.addDeclaration(ident.getText(), [], { dryRun: context.dryRun }); });
        var vars = ((_c = (_b = context.nodeFlagsStore.get(parentFunc)) === null || _b === void 0 ? void 0 : _b.destructuringInfo) === null || _c === void 0 ? void 0 : _c.vars) || '';
        context.nodeFlagsStore.upsert(parentFunc, {
            destructuringInfo: { vars: [vars, renderedString].filter(function (el) { return !!el; }).join('\n') }
        });
        return "$" + pathsAndNames_1.snakify(varName);
    }
    if (node.dotDotDotToken) {
        return "...$" + node.name.getText();
    }
    return "$" + pathsAndNames_1.snakify(node.name.getText());
}
exports.tParameterDeclaration = tParameterDeclaration;
