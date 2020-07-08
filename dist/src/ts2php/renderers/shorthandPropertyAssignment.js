"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var attrs = require("../../../data/domattrs.json");
var ast_1 = require("../utils/ast");
var intrinsicElements_1 = require("../internalConfig/intrinsicElements");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var _assert_1 = require("./stdlib/_assert");
function tShorthandPropertyAssignment(node) {
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
            var name = renderSupportedNodes_1.renderSupportedNodes(self.children, context)[0];
            name = pathsAndNames_1.normalizeVarName(name);
            var decl = _assert_1.assertLocalModification(node.name, context);
            if (((decl === null || decl === void 0 ? void 0 : decl.flags) || 0) & types_1.DeclFlag.HoistedToModule) {
                return "\"" + name + "\" => $this->" + pathsAndNames_1.snakify(name);
            }
            return "\"" + name + "\" => $" + pathsAndNames_1.snakify(name);
        }
    };
}
exports.tShorthandPropertyAssignment = tShorthandPropertyAssignment;
