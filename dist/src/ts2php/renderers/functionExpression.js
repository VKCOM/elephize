"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../utils/ast");
var reactComponents_1 = require("../components/react/reactComponents");
var functionScope_1 = require("../components/functionScope");
var nodeData_1 = require("../components/unusedCodeElimination/usageGraph/nodeData");
function tFunctionExpression(node, context) {
    var parentStmt = ast_1.getClosestParentOfType(node, ts.SyntaxKind.VariableStatement);
    if (parentStmt) {
        var handledContent = reactComponents_1.handleComponent(context, node);
        if (handledContent) {
            // component is written to different file, so we should not output anything here
            return 'null';
        }
    }
    var parentDecl = ast_1.getClosestParentOfType(node, ts.SyntaxKind.VariableDeclaration);
    var funcIdent;
    if (parentDecl && parentDecl.initializer === node) {
        funcIdent = parentDecl.name.getText();
    }
    else {
        funcIdent = nodeData_1.identifyAnonymousNode(node);
        // We should terminate anonymous functions locally, unless they are assigned to variable
        context.scope.addDeclaration(funcIdent, [], { terminateLocally: true, dryRun: context.dryRun });
    }
    return functionScope_1.functionExpressionGen(node, funcIdent)({
        synList: node.parameters,
        blockNode: node.body
    }, context);
}
exports.tFunctionExpression = tFunctionExpression;
