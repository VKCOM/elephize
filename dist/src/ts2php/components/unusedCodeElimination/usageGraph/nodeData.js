"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sha1_1 = require("../../../utils/sha1");
var types_1 = require("../../../types");
function insideComponent(scope) {
    var _a;
    while (scope) {
        if ((_a = scope.ownerNode) === null || _a === void 0 ? void 0 : _a.data.isComponent) {
            return true;
        }
        scope = scope.parentScope;
    }
    return false;
}
exports.insideComponent = insideComponent;
function usedInNestedScope(decl, declScope, currentScope) {
    var flags = (decl === null || decl === void 0 ? void 0 : decl.flags) || 0;
    var noOtherFlags = !(flags & types_1.DeclFlag.External) && !(flags & types_1.DeclFlag.Local) && !(flags & types_1.DeclFlag.DereferencedImport) && !(flags & types_1.DeclFlag.HoistedToModule);
    return !!decl && !currentScope.isRoot() && declScope !== currentScope && noOtherFlags;
}
exports.usedInNestedScope = usedInNestedScope;
function identifyAnonymousNode(node) {
    return '_' + sha1_1.sha1(node.getText()).substr(0, 7);
}
exports.identifyAnonymousNode = identifyAnonymousNode;
