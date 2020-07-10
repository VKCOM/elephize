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
var types_1 = require("../types");
var ast_1 = require("../utils/ast");
var log_1 = require("../utils/log");
var path = require("path");
var reactHooks_1 = require("../components/react/reactHooks");
var pathsAndNames_1 = require("../utils/pathsAndNames");
var renderNodes_1 = require("../components/codegen/renderNodes");
function tImportDeclaration(node, context) {
    var _a, _b;
    var moduleSpec = node.moduleSpecifier.text;
    if (moduleSpec === 'react') {
        if (!reactHooks_1.initReact(node, context)) {
            log_1.log('Importing react with dereferencing is not supported. Use `import * as React from \'react\' instead.', log_1.LogSeverity.ERROR, log_1.ctx(node));
            return '';
        }
    }
    else if (moduleSpec) {
        var currentFilePath = node.getSourceFile().fileName;
        var sourceFilename = pathsAndNames_1.resolveAliasesAndPaths(moduleSpec, path.dirname(currentFilePath), context.baseDir, context.compilerOptions.paths || {}, context.registry._aliases);
        if (sourceFilename === null) {
            if (moduleSpec.includes('/')) {
                log_1.log('Module not found: tried to find ' + moduleSpec, log_1.LogSeverity.ERROR, log_1.ctx(node));
            }
            else {
                log_1.log('Importing arbitrary node modules is not supported. Only "react" module is allowed at the moment.', log_1.LogSeverity.ERROR, log_1.ctx(node));
            }
            return '';
        }
        renderNodes_1.renderNodes([node.importClause, node.moduleSpecifier], context);
        var importBindings = (_a = node.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings;
        if ((importBindings === null || importBindings === void 0 ? void 0 : importBindings.kind) === ts.SyntaxKind.NamespaceImport) {
            var decl = context.scope.addDeclaration(importBindings.name.getText(), [], { terminateGlobally: ast_1.isExportedVar(importBindings.name), dryRun: context.dryRun });
            if (decl) {
                decl.data.flags = types_1.DeclFlag.External;
                decl.data.targetModulePath = context.registry.toTargetPath(sourceFilename);
                decl.data.propName = '*';
            }
        }
        else if ((importBindings === null || importBindings === void 0 ? void 0 : importBindings.kind) === ts.SyntaxKind.NamedImports) {
            for (var _i = 0, _c = importBindings.elements; _i < _c.length; _i++) {
                var imp = _c[_i];
                var searchForComponent = context.registry.isDerivedComponent(sourceFilename, imp.name.escapedText.toString())
                    ? imp.name.escapedText.toString()
                    : undefined;
                var decl = context.scope.addDeclaration(imp.name.getText(), [], { terminateGlobally: ast_1.isExportedVar(imp.name), dryRun: context.dryRun });
                if (decl) {
                    decl.data.flags = types_1.DeclFlag.DereferencedImport;
                    decl.data.targetModulePath = context.registry.toTargetPath(sourceFilename, searchForComponent);
                    decl.data.propName = ((_b = imp.propertyName) === null || _b === void 0 ? void 0 : _b.getText()) || imp.name.getText();
                }
            }
        }
    }
    return '';
}
exports.tImportDeclaration = tImportDeclaration;
exports.tImportClause = function (node, context) { return renderNodes_1.renderNodes([node.name, node.namedBindings], context).join(''); };
exports.tNamedImports = function (node, context) { return renderNodes_1.renderNodes(__spreadArrays(node.elements), context).join(''); };
