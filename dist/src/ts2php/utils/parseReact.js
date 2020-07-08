"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var fs = require("fs");
var path = require("path");
function generateDocumentation(fileNames, options) {
    // Build a program using the set of root file names in fileNames
    var program = ts.createProgram(fileNames, options);
    // Get the checker, we will use it to find more about classes
    var checker = program.getTypeChecker();
    var result = {
        tags: [],
        attrs: []
    };
    // Visit every sourceFile in the program
    for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
        var sourceFile = _a[_i];
        if (sourceFile.isDeclarationFile) {
            ts.forEachChild(sourceFile, visit);
        }
    }
    // print out the doc
    fs.writeFileSync(path.resolve(__dirname, '..', '..', '..', 'data', 'intrinsicElements.json'), JSON.stringify(result.tags, undefined, 4));
    fs.writeFileSync(path.resolve(__dirname, '..', '..', '..', 'data', 'domattrs.json'), JSON.stringify(result.attrs, undefined, 4));
    return;
    function visit(node) {
        if (ts.isModuleDeclaration(node)) {
            var symbol = checker.getSymbolAtLocation(node.name);
            if (symbol) {
                if (symbol.getName() === 'React') {
                    ts.forEachChild(node, visit);
                }
            }
        }
        else if (ts.isInterfaceDeclaration(node) && node.name) {
            // This is a top level class, get its symbol
            var symbol = checker.getSymbolAtLocation(node.name);
            if (symbol) {
                if (symbol.getName() === 'ReactDOM') { // Found root element for internal html elements!
                    result.tags = getElements(checker.getTypeAtLocation(node), checker);
                }
                if (symbol.getName() === 'DOMAttributes') { // Found root element for internal html elements!
                    result.attrs = getCallbackAttrs(checker.getTypeAtLocation(node));
                }
            }
        }
        else {
            ts.forEachChild(node, visit);
        }
    }
}
function getCallbackAttrs(interfaceType) {
    var attrs = interfaceType.getApparentProperties();
    return attrs.map(function (symbol) { return symbol.getName(); }).filter(function (name) { return name.startsWith('on'); });
}
function getElements(interfaceType, checker) {
    var intrinsicTags = interfaceType.getApparentProperties();
    return intrinsicTags.map(function (symbol) {
        var symType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
        var memberProps = [];
        var inheritedProps = [];
        if (symType.resolvedTypeArguments && symType.resolvedTypeArguments[0]) {
            // member props
            symType.resolvedTypeArguments[0].symbol.members.forEach(function (val) { return memberProps.push(val); });
            // inferred props
            var attrsSym = symType.resolvedTypeArguments[0].symbol;
            var attrSymDecl = attrsSym.declarations[0].heritageClauses[0].types[0].expression;
            inheritedProps = checker.getTypeAtLocation(attrSymDecl).getApparentProperties();
        }
        return {
            'tagName': symbol.escapedName,
            'props': __spreadArrays(inheritedProps, memberProps, symType.getApparentProperties()).map(function (s) { return s.escapedName; }).sort()
        };
    });
}
generateDocumentation(['./node_modules/@types/react/index.d.ts'], {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
});
