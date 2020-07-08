"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../utils/ast");
var objectBindingPattern_1 = require("./objectBindingPattern");
var arrayBindingPattern_1 = require("./arrayBindingPattern");
var pathsAndNames_1 = require("../utils/pathsAndNames");
function tParameterDeclaration(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a, _b, _c;
            // Object/array destructuring
            if (node.name.kind === ts.SyntaxKind.ObjectBindingPattern || node.name.kind === ts.SyntaxKind.ArrayBindingPattern) {
                // Expression, make dummy var
                var index = ((_a = ast_1.getClosestParentOfType(self, ts.SyntaxKind.SyntaxList)) === null || _a === void 0 ? void 0 : _a.flags.elIndex) || 0;
                var varName = "__param_destruct_" + index;
                ast_1.flagParentOfType(self, [ts.SyntaxKind.SyntaxList], { elIndex: index + 1 });
                var _d = node.name.kind === ts.SyntaxKind.ObjectBindingPattern
                    ? objectBindingPattern_1.renderElements(node.name, varName, context)
                    : arrayBindingPattern_1.renderElements(node.name, varName, context), renderedString = _d.renderedString, identList = _d.identList;
                identList.forEach(function (ident) { return context.scope.addDeclaration(ident.getText(), [], { dryRun: context.dryRun }); });
                // renderedVars may be non-empty if there are more than 1 destructured parameter
                var vars = ((_c = (_b = ast_1.getClosestParentOfAnyType(self, [
                    ts.SyntaxKind.FunctionExpression,
                    ts.SyntaxKind.FunctionDeclaration,
                    ts.SyntaxKind.ArrowFunction
                ])) === null || _b === void 0 ? void 0 : _b.flags.destructuringInfo) === null || _c === void 0 ? void 0 : _c.vars) || '';
                ast_1.flagParentOfType(self, [
                    ts.SyntaxKind.FunctionExpression,
                    ts.SyntaxKind.FunctionDeclaration,
                    ts.SyntaxKind.ArrowFunction
                ], { destructuringInfo: { vars: [vars, renderedString].filter(function (el) { return !!el; }).join('\n') } });
                return "$" + pathsAndNames_1.snakify(varName);
            }
            if (node.dotDotDotToken) {
                return "...$" + node.name.getText();
            }
            return "$" + pathsAndNames_1.snakify(node.name.getText());
        }
    };
}
exports.tParameterDeclaration = tParameterDeclaration;
