"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isTopLevel_1 = require("../utils/isTopLevel");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tSwitchStatement(node, context) {
    var _a = renderNodes_1.renderNodes([node.expression, node.caseBlock], context), arg = _a[0], block = _a[1];
    var argName = pathsAndNames_1.normalizeVarName(arg
        .replace(/^\$this->/, '')
        .replace(/^\$/, ''));
    context.scope.addUsage(argName, [], { terminateLocally: true, dryRun: context.dryRun });
    var expr = "switch (" + arg + ") {\n" + block + "\n}";
    if (isTopLevel_1.isTopLevel(node, context)) {
        context.moduleDescriptor.addStatement(expr);
    }
    return expr;
}
exports.tSwitchStatement = tSwitchStatement;
