"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isTopLevel_1 = require("../utils/isTopLevel");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var varsUsage_1 = require("../components/unusedCodeElimination/varsUsage");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tForOfStatement(node, context) {
    var initializer = renderNodes_1.renderNode(node.initializer, context);
    var _a = varsUsage_1.collectVars(function () { return renderNodes_1.renderNode(node.expression, context); }, context), usedVars = _a[0], expression = _a[1];
    var initNodeName = pathsAndNames_1.normalizeVarName(initializer
        .replace(/^\$this->/, '')
        .replace(/^\$/, ''));
    context.scope.addUsage(initNodeName, Array.from(usedVars), { dryRun: context.dryRun });
    var statement = renderNodes_1.renderNode(node.statement, context);
    var expr = "foreach (" + expression + " as " + initializer + ") " + statement;
    if (isTopLevel_1.isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
    }
    return expr;
}
exports.tForOfStatement = tForOfStatement;
