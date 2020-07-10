"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var reactComponents_1 = require("../components/react/reactComponents");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var hasExport_1 = require("../utils/hasExport");
var ast_1 = require("../utils/ast");
var isTopLevel_1 = require("../utils/isTopLevel");
var functionScope_1 = require("../components/functionScope");
var nodeData_1 = require("../components/unusedCodeElimination/usageGraph/nodeData");
var usageGraph_1 = require("../components/unusedCodeElimination/usageGraph");
var log_1 = require("../utils/log");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tFunctionDeclaration(node, context) {
    var exported = hasExport_1.hasExport(node);
    if (exported === null) {
        return ''; // export default not supported
    }
    var handledContent = reactComponents_1.handleComponent(context, node);
    if (handledContent) {
        // component is written to different file, so we should not output anything here
        return 'null';
    }
    var varName = renderNodes_1.renderNode(node.name, context);
    // Generate method declaration for exported and top-level functions
    if (isTopLevel_1.isTopLevel(node, context)) {
        if (isTopLevel_1.isTopLevelComponent(node, context.nodeFlagsStore)) {
            // Don't render component function in current module
            return '';
        }
        if (node.name) {
            var decl = context.scope.addDeclaration(node.name.getText(), [], { dryRun: context.dryRun });
            if (decl) {
                decl.data.flags = types_1.DeclFlag.HoistedToModule | types_1.DeclFlag.Callable;
            }
            var els = functionScope_1.generateFunctionElements({
                expr: node,
                nodeIdent: node.name.getText(),
                context: context
            });
            if (els) { // should be true for all non-components, this check is only for typescript to be happy
                var syntaxList = els.syntaxList, block = els.block;
                if (!context.dryRun && context.scope.checkUsage(node.name.getText())) {
                    context.moduleDescriptor.addMethod(node.name.getText(), block, syntaxList.join(', '), 'public');
                }
                if (ast_1.isExportedFun(node.name)) {
                    context.scope.terminateCall(node.name.getText(), { traceSourceIdent: usageGraph_1.Scope.tNode, dryRun: context.dryRun });
                    if (decl && decl.ownedScope) {
                        decl.ownedScope.terminateToParentTerminalNode(context.dryRun);
                    }
                }
            }
        }
        return '';
    }
    var funcIdent;
    if (node.name) {
        funcIdent = node.name.getText();
        context.scope.addDeclaration(funcIdent, [], { terminateGlobally: ast_1.isExportedFun(node.name), dryRun: context.dryRun });
    }
    else {
        funcIdent = nodeData_1.identifyAnonymousNode(node);
        // We should terminate anonymous functions locally, unless they are assigned to variable
        context.scope.addDeclaration(funcIdent, [], { terminateLocally: true, dryRun: context.dryRun });
    }
    var initializer = functionScope_1.functionExpressionGen(node, funcIdent)({
        synList: node.parameters,
        blockNode: node.body
    }, context);
    if (!node.name) {
        log_1.log('Function declarations without name are not supported', log_1.LogSeverity.ERROR, log_1.ctx(node));
        return 'null;';
    }
    if (!context.dryRun && context.scope.checkUsage(node.name.getText())) {
        // Render as expression if the function is nested,
        // because php doesn't have scoped closures for function declarations.
        // Also render all other functions as expressions for simplicity
        return pathsAndNames_1.snakify(varName) + " = " + initializer + ";";
    }
    return '';
}
exports.tFunctionDeclaration = tFunctionDeclaration;
