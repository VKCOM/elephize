"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var ast_1 = require("../utils/ast");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var attrs = require("../../../data/domattrs.json");
var intrinsicElements_1 = require("../internalConfig/intrinsicElements");
function tPropertyAssignment(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            // This check should be strictly before render! Otherwise it won't work well with var reference count / unused vars elimination
            var parentCall = ast_1.getClosestParentOfTypeWithFlag(self, ts.SyntaxKind.CallExpression, { name: 'ReactCreateElement' });
            if (parentCall !== null) {
                if (attrs.includes(node.name.getText())) {
                    return '!null'; // special value to omit expression, see renderSupportedNodes
                }
                var intrinsicElAttrs = parentCall.flags.elementName && intrinsicElements_1.intrinsicElements[parentCall.flags.elementName];
                if (intrinsicElAttrs && !intrinsicElAttrs.includes(node.name.getText())) {
                    return '!null'; // special value to omit expression, see renderSupportedNodes
                }
            }
            var _a = renderSupportedNodes_1.renderSupportedNodes(self.children, context), name = _a[0], initializer = _a[1];
            if (!name) {
                throw new Error('Name identifier cannot be empty');
            }
            // Remove quotes - we don't need it in general, but add them back for all except numeric literals.
            name = name.replace(/^["']|["']$/g, '');
            if (!name.match(/^[0-9.]+$/)) {
                name = "\"" + pathsAndNames_1.normalizeVarName(name) + "\"";
            }
            return name + " => " + initializer;
        }
    };
}
exports.tPropertyAssignment = tPropertyAssignment;
