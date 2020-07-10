"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../utils/ast");
var reactComponents_1 = require("../components/react/reactComponents");
var functionScope_1 = require("../components/functionScope");
var nodeData_1 = require("../components/unusedCodeElimination/usageGraph/nodeData");
function tArrowFunction(node, context) {
    // For module-scope see also variableDeclaration transformer and its isCallable section
    var parentStmt = ast_1.getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement);
    if (parentStmt) {
        var handledContent = reactComponents_1.handleComponent(context, node);
        if (handledContent) {
            // component is written to different file, so we should not output anything here
            return 'null';
        }
    }
    var parentDecl = ast_1.getClosestOrigParentOfType(node, ts.SyntaxKind.VariableDeclaration);
    var funcIdent;
    if (parentDecl && parentDecl.initializer === node) {
        funcIdent = parentDecl.name.getText();
    }
    else {
        funcIdent = nodeData_1.identifyAnonymousNode(node);
        // We should terminate anonymous functions locally, unless they are assigned to variable
        context.scope.addDeclaration(funcIdent, [], { terminateLocally: true, dryRun: context.dryRun });
        context.scope.addUsage(funcIdent, [], { dryRun: context.dryRun });
    }
    // Render as expression if the function is nested,
    // because php doesn't have scoped closures for function declarations.
    // Also render all other functions as expressions for simplicity
    return "" + functionScope_1.functionExpressionGen(node, funcIdent)({
        synList: node.parameters,
        blockNode: node.body
    }, context);
}
exports.tArrowFunction = tArrowFunction;
