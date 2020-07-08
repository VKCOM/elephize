"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var jsBuiltins_1 = require("../internalConfig/jsBuiltins");
var ast_1 = require("../utils/ast");
var log_1 = require("../utils/log");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var nodeData_1 = require("../components/unusedCodeElimination/usageGraph/nodeData");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
function tIdentifier(node) {
    var builtin = node.escapedText && jsBuiltins_1.builtins.has(node.escapedText.toString());
    return {
        kind: node.kind,
        supported: true,
        builtin: builtin,
        gen: function (self, context) {
            var _a;
            var isCallableIdent = node.parent.kind === ts.SyntaxKind.CallExpression && node.parent.expression === node;
            if (builtin) {
                if (node.parent.kind === ts.SyntaxKind.PropertyAccessExpression && node.parent.expression === node
                    || isCallableIdent) {
                    if (node.escapedText === 'console') {
                        return "\\" + context.namespaces.builtins + "\\Console"; // to make more consistent classes on server side
                    }
                    return "\\" + context.namespaces.builtins + "\\" + node.escapedText;
                }
            }
            var _b = context.scope.findByIdent(node.escapedText.toString()) || [], decl = _b[0], scope = _b[1];
            // Custom isomorphic plugins support
            if (context.customGlobals[node.escapedText.toString()]) {
                if (decl && scope && scope.tNodeLocal !== usageGraph_1.Scope.tNode) {
                    log_1.log("Detected shadowing of global variable " + node.escapedText.toString() + " - probably a bug", log_1.LogSeverity.WARN, log_1.ctx(node));
                }
                else {
                    return context.customGlobals[node.escapedText.toString()];
                }
            }
            if (decl && decl.flags & types_1.DeclFlag.DereferencedImport) {
                return context.registry.getExportedIdentifier(context.moduleDescriptor, decl.targetModulePath, decl.propName || node.escapedText.toString(), !isCallableIdent);
            }
            if (node.escapedText.toString() === 'undefined' || node.escapedText.toString() === 'null') {
                return 'null';
            }
            // Mark require expressions to process them in CallExpression visitor
            if (node.escapedText.toString() === 'require') {
                log_1.log('You should use `import` instead of `require`', log_1.LogSeverity.ERROR, log_1.ctx(node));
                return 'null';
            }
            if ( // assignment inside object literal
            node.parent.kind === ts.SyntaxKind.PropertyAssignment && node.parent.name === node
                || node.parent.kind === ts.SyntaxKind.ShorthandPropertyAssignment && node.parent.name === node) {
                return node.escapedText.toString();
            }
            if (decl && decl.flags & types_1.DeclFlag.HoistedToModule) {
                if (nodeData_1.insideComponent(context.scope)) {
                    context.scope.addUsage(decl.propName || node.escapedText.toString(), [], { dryRun: context.dryRun });
                    return context.registry.getExportedIdentifier(context.moduleDescriptor, ((_a = context.moduleDescriptor.ancestorModule) === null || _a === void 0 ? void 0 : _a.targetFileName) || context.moduleDescriptor.targetFileName, decl.propName || node.escapedText.toString(), !isCallableIdent);
                }
                if (isCallableIdent) {
                    return "$this->" + (decl.propName || node.escapedText.toString());
                }
                var varName = decl.propName || node.escapedText.toString();
                context.scope.addUsage(node.getText(), [], { dryRun: context.dryRun });
                return "$this->" + pathsAndNames_1.snakify(varName);
            }
            if (isCallableIdent // called func name
                || node.parent.kind === ts.SyntaxKind.FunctionDeclaration // declared func name
            ) {
                // if it's function call, don't add to closure and just return the identifier
                return "$" + pathsAndNames_1.snakify((decl === null || decl === void 0 ? void 0 : decl.propName) || node.escapedText.toString());
            }
            if (node.parent.kind === ts.SyntaxKind.PropertyAccessExpression) {
                if (node.parent.expression !== node) {
                    // For all other parts of property access expression we don't add contexts and don't add $ in beginning.
                    return node.escapedText.toString();
                }
            }
            var isDeclaration = node.parent.kind === ts.SyntaxKind.VariableDeclaration && node.parent.name === node;
            if (!context.dryRun && isDeclaration && !context.scope.checkUsage(node.getText())) {
                // Remove unused vars declarations
                log_1.log("Dropped unused var $" + node.escapedText + " from [out]/" + context.moduleDescriptor.targetFileName, log_1.LogSeverity.INFO, log_1.ctx(node));
                ast_1.flagParentOfType(self, [ts.SyntaxKind.VariableDeclaration], { drop: true });
            }
            if (!isDeclaration) {
                context.scope.addUsage(node.getText(), [], { dryRun: context.dryRun });
            }
            return "$" + pathsAndNames_1.snakify(node.escapedText.toString());
        }
    };
}
exports.tIdentifier = tIdentifier;
