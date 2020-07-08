"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_1 = require("../utils/ast");
var reactComponents_1 = require("../components/react/reactComponents");
var functionScope_1 = require("../components/functionScope");
var nodeData_1 = require("../components/unusedCodeElimination/usageGraph/nodeData");
function tFunctionExpression(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (nodeInfo, context) {
            var parentStmt = ast_1.getClosestOrigParentOfType(node, ts.SyntaxKind.VariableStatement);
            if (parentStmt) {
                var handledContent = reactComponents_1.handleComponent(context, node, nodeInfo);
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
            }
            var synListNode = ast_1.getChildByType(nodeInfo, ts.SyntaxKind.SyntaxList); // may be undefined
            var blockNode = ast_1.getChildByType(nodeInfo, ts.SyntaxKind.Block);
            return functionScope_1.functionExpressionGen(node, funcIdent, nodeInfo)({
                synListNode: synListNode,
                blockNode: blockNode
            }, context);
        }
    };
}
exports.tFunctionExpression = tFunctionExpression;
