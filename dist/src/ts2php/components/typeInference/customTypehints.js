"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var customTypehintsList_1 = require("./customTypehintsList");
function checkCustomTypehints(type, checker) {
    var typeNode = checker.typeToTypeNode(type);
    if (!typeNode) {
        return false;
    }
    var typeRefs = traverseReferences(type, checker);
    if (typeRefs.length === 1 && typeRefs[0] === type) {
        return false;
    }
    var typesToDrop = [];
    var foundTypes = typeRefs.map(function (t) {
        var typeNode = checker.typeToTypeNode(t);
        if (!typeNode) {
            return t;
        }
        var sym = t.symbol || t.aliasSymbol;
        if (!sym) {
            return t;
        }
        var decls = sym.getDeclarations();
        var ifaceDecl = decls.filter(function (d) { return d.kind === ts.SyntaxKind.InterfaceDeclaration; })[0];
        if (!ifaceDecl) {
            return t;
        }
        var customType = customTypehintsList_1.customTypehints[ifaceDecl.name.getText()];
        if (customType) {
            typesToDrop = typesToDrop.concat(customType.drop);
            return customType.replacement;
        }
        return t;
    });
    return { foundTypes: foundTypes, typesToDrop: typesToDrop };
}
exports.checkCustomTypehints = checkCustomTypehints;
function traverseReferences(type, checker) {
    if (!type.isUnionOrIntersection()) {
        return [type];
    }
    var types = [];
    for (var _i = 0, _a = type.types; _i < _a.length; _i++) {
        var t_1 = _a[_i];
        var typeNode = checker.typeToTypeNode(t_1);
        if (typeNode) {
            if (typeNode.kind === ts.SyntaxKind.TypeReference || typeNode.kind === ts.SyntaxKind.TypeAliasDeclaration) {
                types = types.concat(traverseReferences(t_1, checker));
            }
            else {
                types.push(t_1);
            }
        }
    }
    return types;
}
