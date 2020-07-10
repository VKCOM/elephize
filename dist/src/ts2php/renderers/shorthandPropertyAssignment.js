"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var attrs = require("../../../data/domattrs.json");
var ast_1 = require("../utils/ast");
var intrinsicElements_1 = require("../internalConfig/intrinsicElements");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var _assert_1 = require("./stdlib/_assert");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tShorthandPropertyAssignment(node, context) {
    // This check should be strictly before render! Otherwise it won't work well with var reference count / unused vars elimination
    var parentCall = ast_1.getClosestParentOfTypeWithFlag(node, ts.SyntaxKind.CallExpression, { name: 'ReactCreateElement' }, context.nodeFlagsStore);
    if (parentCall !== null) {
        if (attrs.includes(node.name.getText())) {
            return '!null'; // special value to omit expression, see renderSupportedNodes
        }
        var flags = context.nodeFlagsStore.get(parentCall);
        var intrinsicElAttrs = (flags === null || flags === void 0 ? void 0 : flags.elementName) && intrinsicElements_1.intrinsicElements[flags.elementName];
        if (intrinsicElAttrs && !intrinsicElAttrs.includes(node.name.getText())) {
            return '!null'; // special value to omit expression, see renderSupportedNodes
        }
    }
    var name = renderNodes_1.renderNode(node.name, context);
    name = pathsAndNames_1.normalizeVarName(name);
    var decl = _assert_1.assertLocalModification(node.name, context);
    if (((decl === null || decl === void 0 ? void 0 : decl.flags) || 0) & types_1.DeclFlag.HoistedToModule) {
        return "\"" + name + "\" => $this->" + pathsAndNames_1.snakify(name);
    }
    return "\"" + name + "\" => $" + pathsAndNames_1.snakify(name);
}
exports.tShorthandPropertyAssignment = tShorthandPropertyAssignment;
