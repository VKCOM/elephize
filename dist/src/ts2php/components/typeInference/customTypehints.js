"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var customTypehintsList_1 = require("./customTypehintsList");
function checkCustomTypehints(type, checker) {
    var typeNode = checker.typeToTypeNode(type);
    if (!typeNode) {
        return false;
    }
    if (type.isUnionOrIntersection()) {
        var typesToDrop_1 = [];
        var foundTypes = type.types.map(function (t) {
            var typeNode = checker.typeToTypeNode(t);
            if (!typeNode) {
                return t;
            }
            if (typeNode.kind === ts.SyntaxKind.TypeReference) {
                var sym = t.symbol || t.aliasSymbol;
                var decls = sym.getDeclarations();
                var ifaceDecl = decls.filter(function (d) { return d.kind === ts.SyntaxKind.InterfaceDeclaration; })[0];
                if (!ifaceDecl) {
                    return t;
                }
                var customType = customTypehintsList_1.customTypehints[ifaceDecl.name.getText()];
                if (customType) {
                    typesToDrop_1 = typesToDrop_1.concat(customType.drop);
                    return customType.replacement;
                }
            }
            return t;
        });
        return { foundTypes: foundTypes, typesToDrop: typesToDrop_1 };
    }
    return false;
}
exports.checkCustomTypehints = checkCustomTypehints;
