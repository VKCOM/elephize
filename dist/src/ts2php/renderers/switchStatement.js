"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var isTopLevel_1 = require("../utils/isTopLevel");
var pathsAndNames_1 = require("../utils/pathsAndNames");
function tSwitchStatement(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var _a = renderSupportedNodes_1.renderSupportedNodes(self.children, context), arg = _a[0], block = _a[1];
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
    };
}
exports.tSwitchStatement = tSwitchStatement;
