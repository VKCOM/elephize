"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var reactHooks_1 = require("../components/react/reactHooks");
var ast_1 = require("../utils/ast");
var log_1 = require("../utils/log");
var isTopLevel_1 = require("../utils/isTopLevel");
var functionScope_1 = require("../components/functionScope");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
var pathsAndNames_1 = require("../utils/pathsAndNames");
function isCallable(node, checker) {
    return checker.getTypeAtLocation(node).getCallSignatures().length > 0;
}
function tVariableDeclaration(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var identifierNode = self.children[0];
            var initializerNode = ast_1.getChildOfAnyTypeAfterSelected(self, ts.SyntaxKind.EqualsToken, ast_1.RightHandExpressionLike);
            if (reactHooks_1.checkReactAssignment(node, context)) {
                return '';
            }
            // TODO: don't support `export const { ... } = {}` for now, but maybe later...
            if (node.name.kind === ts.SyntaxKind.ArrayBindingPattern || node.name.kind === ts.SyntaxKind.ObjectBindingPattern) {
                return renderSupportedNodes_1.renderSupportedNodes([identifierNode], context)[0]; // render only binding form, it will take all names from parent
            }
            var identifier = renderSupportedNodes_1.renderSupportedNodes([identifierNode], context)[0];
            var parentStatement = ast_1.getClosestParentOfType(self, ts.SyntaxKind.VariableStatement);
            var isTop = isTopLevel_1.isTopLevel(node, context);
            var isFuncDeclaration = node.initializer && isCallable(node.initializer, context.checker);
            var usedIdents = new Set();
            var addIdent = function (ident) { return usedIdents.add(ident); };
            context.scope.addEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
            // Register local vars for use inside non-closure usages, like class methods
            if (parentStatement && isTop) {
                return topStatements(node, self, initializerNode, addIdent, usedIdents, !!isFuncDeclaration, context);
            }
            // Declaration-only
            if (self.children.length === 1) { // Single var declaration without initialization
                var decl_1 = context.scope.addDeclaration(node.name.getText(), [], { terminateGlobally: ast_1.isExportedVar(node.name), dryRun: context.dryRun });
                if (decl_1) {
                    decl_1.data.targetModulePath = context.moduleDescriptor.targetFileName;
                }
                return "" + identifier;
            }
            // If we reach here, we have full declaration with initializer that's not in top scope.
            var initializer = renderSupportedNodes_1.renderSupportedNodes([initializerNode], context)[0];
            context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
            if (self.flags.drop) {
                return '';
            }
            var decl = null;
            if (!isFuncDeclaration) {
                decl = context.scope.addDeclaration(node.name.getText(), [], { terminateGlobally: ast_1.isExportedVar(node.name), dryRun: context.dryRun });
            }
            else {
                var _a = context.scope.findByIdent(node.name.getText()) || [], declScope = _a[1];
                if (declScope) {
                    decl = declScope.declarations.get(node.name.getText());
                }
            }
            if (decl) {
                if (isFuncDeclaration) {
                    decl.data.flags |= types_1.DeclFlag.Callable;
                }
                decl.data.targetModulePath = context.moduleDescriptor.targetFileName;
            }
            if (!isFuncDeclaration) {
                context.scope.addUsage(node.name.getText(), Array.from(usedIdents), { dryRun: context.dryRun });
            }
            return identifier + " = " + initializer;
        }
    };
}
exports.tVariableDeclaration = tVariableDeclaration;
function topStatements(node, self, initializerNode, addIdent, usedIdents, isFuncDeclaration, context) {
    if (!node.initializer) {
        context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
        log_1.log('Module scope variables should have initializers to ensure proper type detection', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    // Declaration of arrow func / func expression, NOT CALL
    if (isFuncDeclaration) {
        var expr = ast_1.getChildByAnyType(self, [ts.SyntaxKind.ArrowFunction, ts.SyntaxKind.FunctionExpression]);
        if (expr) {
            var els = functionScope_1.generateFunctionElements({
                expr: expr,
                statement: self,
                nodeIdent: node.name.getText(),
                context: context,
                origDecl: node,
                origStatement: node.initializer
            });
            // Previous call sets isComponent flag, so it's required for this check to be exactly after generate..()
            if (isTopLevel_1.isTopLevelComponent(expr) || !els) {
                context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
                // Don't render component function in current module
                return '';
            }
            var syntaxList = els.syntaxList, block = els.block;
            if (!context.dryRun && context.scope.checkUsage(node.name.getText()) && !self.flags.drop) {
                context.moduleDescriptor.addMethod(node.name.getText(), block, syntaxList, 'public');
            }
        }
    }
    else {
        var initializer = renderSupportedNodes_1.renderSupportedNodes([initializerNode], context)[0];
        var nameIdent = node.name;
        // We expect plain identifier as name here
        if (nameIdent.kind !== ts.SyntaxKind.Identifier) {
            log_1.log('Top-level variable identifier should not be a binding expression', log_1.LogSeverity.ERROR, log_1.ctx(node));
            context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
            return '';
        }
        var ident_1 = pathsAndNames_1.snakify(nameIdent.getText());
        if (!context.dryRun && context.scope.checkUsage(nameIdent.getText()) && !self.flags.drop) {
            context.moduleDescriptor.addProperty('$' + ident_1, 'public');
            context.moduleDescriptor.addStatement("$this->" + ident_1 + " = " + initializer + ";");
        }
    }
    if (self.flags.drop) {
        context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
        return '';
    }
    var decl = null;
    if (!isFuncDeclaration) {
        decl = context.scope.addDeclaration(node.name.getText(), [], { terminateGlobally: ast_1.isExportedVar(node.name), dryRun: context.dryRun });
    }
    else {
        var _a = context.scope.findByIdent(node.name.getText()) || [], declScope = _a[1];
        if (declScope) {
            decl = declScope.declarations.get(node.name.getText());
        }
    }
    if (decl) {
        if (isFuncDeclaration) {
            decl.data.flags |= types_1.DeclFlag.Callable;
        }
        decl.data.flags |= types_1.DeclFlag.HoistedToModule;
        decl.data.targetModulePath = context.moduleDescriptor.targetFileName;
    }
    context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
    if (!isFuncDeclaration) {
        context.scope.addUsage(node.name.getText(), Array.from(usedIdents), { dryRun: context.dryRun });
    }
    return '';
}
