"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var reactHooks_1 = require("../components/react/reactHooks");
var ast_1 = require("../utils/ast");
var log_1 = require("../utils/log");
var isTopLevel_1 = require("../utils/isTopLevel");
var functionScope_1 = require("../components/functionScope");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var renderNodes_1 = require("../components/codegen/renderNodes");
var typeInference_1 = require("../components/typeInference");
function tVariableDeclaration(node, context) {
    var _a;
    var identifierNode = node.name;
    var initializerNode = node.initializer;
    if (reactHooks_1.checkReactAssignment(node, context)) {
        return '';
    }
    // TODO: don't support `export const { ... } = {}` for now, but maybe later...
    if (node.name.kind === ts.SyntaxKind.ArrayBindingPattern || node.name.kind === ts.SyntaxKind.ObjectBindingPattern) {
        return renderNodes_1.renderNodes([identifierNode], context)[0]; // render only binding form, it will take all names from parent
    }
    var identifier = renderNodes_1.renderNodes([identifierNode], context)[0];
    var parentStatement = ast_1.getClosestParentOfType(node, ts.SyntaxKind.VariableStatement);
    var isTop = isTopLevel_1.isTopLevel(node, context);
    var isFuncDeclaration = [ts.SyntaxKind.FunctionExpression, ts.SyntaxKind.ArrowFunction].includes(((_a = node.initializer) === null || _a === void 0 ? void 0 : _a.kind) || 1);
    var usedIdents = new Set();
    var addIdent = function (ident) { return usedIdents.add(ident); };
    context.scope.addEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
    // Register local vars for use inside non-closure usages, like class methods
    if (parentStatement && isTop) {
        return topStatements(node, initializerNode, addIdent, usedIdents, !!isFuncDeclaration, context);
    }
    // Declaration-only
    if (!node.initializer) { // Single var declaration without initialization
        var decl_1 = context.scope.addDeclaration(node.name.getText(), [], { terminateGlobally: ast_1.isExportedVar(node.name), dryRun: context.dryRun });
        if (decl_1) {
            decl_1.data.targetModulePath = context.moduleDescriptor.targetFileName;
        }
        return "" + identifier;
    }
    // If we reach here, we have full declaration with initializer that's not in top scope.
    var initializer = renderNodes_1.renderNode(initializerNode, context);
    context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
    var flags = context.nodeFlagsStore.get(node);
    if (flags === null || flags === void 0 ? void 0 : flags.drop) {
        return '';
    }
    var decl = null;
    if (!isFuncDeclaration) {
        decl = context.scope.addDeclaration(node.name.getText(), [], { terminateGlobally: ast_1.isExportedVar(node.name), dryRun: context.dryRun });
    }
    else {
        var _b = context.scope.findByIdent(node.name.getText()) || [], declScope = _b[1];
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
    if (!isFuncDeclaration) {
        context.scope.addUsage(node.name.getText(), Array.from(usedIdents), { dryRun: context.dryRun });
    }
    return identifier + " = " + initializer;
}
exports.tVariableDeclaration = tVariableDeclaration;
function topStatements(node, initializerNode, addIdent, usedIdents, isFuncDeclaration, context) {
    if (!node.initializer) {
        context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
        log_1.log('Module scope variables should have initializers to ensure proper type detection', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null';
    }
    // Declaration of arrow func / func expression, NOT CALL
    if (isFuncDeclaration) {
        var expr = node.initializer;
        if (expr) {
            var els = functionScope_1.generateFunctionElements({
                expr: node.initializer,
                nodeIdent: node.name.getText(),
                context: context,
                origDecl: node,
                origStatement: node.initializer
            });
            // Previous call sets isComponent flag, so it's required for this check to be exactly after generate..()
            if (isTopLevel_1.isTopLevelComponent(expr, context.nodeFlagsStore) || !els) {
                context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
                // Don't render component function in current module
                return '';
            }
            var syntaxList = els.syntaxList, block = els.block;
            var flags_1 = context.nodeFlagsStore.get(node);
            if (!context.dryRun && context.scope.checkUsage(node.name.getText()) && !(flags_1 === null || flags_1 === void 0 ? void 0 : flags_1.drop)) {
                context.moduleDescriptor.addMethod(node.name.getText(), block, syntaxList.join(', '), typeInference_1.getPhpPrimitiveTypeForFunc(node.initializer, syntaxList, context.checker), 'public');
            }
        }
    }
    else {
        var initializer = renderNodes_1.renderNodes([initializerNode], context)[0];
        var nameIdent = node.name;
        // We expect plain identifier as name here
        if (nameIdent.kind !== ts.SyntaxKind.Identifier) {
            log_1.log('Top-level variable identifier should not be a binding expression', log_1.LogSeverity.ERROR, log_1.ctx(node));
            context.scope.removeEventListener(usageGraph_1.Scope.EV_USAGE, addIdent);
            return '';
        }
        var ident_1 = pathsAndNames_1.snakify(nameIdent.getText());
        var flags_2 = context.nodeFlagsStore.get(node);
        if (!context.dryRun && context.scope.checkUsage(nameIdent.getText()) && !(flags_2 === null || flags_2 === void 0 ? void 0 : flags_2.drop)) {
            context.moduleDescriptor.addProperty('$' + ident_1, typeInference_1.getPhpPrimitiveType(nameIdent, context.checker), 'public');
            context.moduleDescriptor.addStatement("$this->" + ident_1 + " = " + initializer + ";");
        }
    }
    var flags = context.nodeFlagsStore.get(node);
    if (flags === null || flags === void 0 ? void 0 : flags.drop) {
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
