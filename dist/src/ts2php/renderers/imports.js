"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var types_1 = require("../types");
var renderSupportedNodes_1 = require("../utils/renderSupportedNodes");
var ast_1 = require("../utils/ast");
var log_1 = require("../utils/log");
var path = require("path");
var reactHooks_1 = require("../components/react/reactHooks");
function tImportDeclaration(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) {
            var moduleSpec = node.moduleSpecifier.text;
            renderSupportedNodes_1.renderSupportedNodes(self.children, context);
            if (moduleSpec === 'react') {
                if (!reactHooks_1.initReact(self, context)) {
                    log_1.log('Importing react with dereferencing is not supported. Use `import * as React from \'react\' instead.', log_1.LogSeverity.ERROR, log_1.ctx(node));
                    return '';
                }
            }
            else if (moduleSpec) {
                var currentFilePath = node.getSourceFile().fileName;
                var sourceFilename = context.registry.resolveAliasesAndPaths(moduleSpec, path.dirname(currentFilePath), context.baseDir, context.compilerOptions.paths || {});
                if (sourceFilename === null) {
                    if (moduleSpec.includes('/')) {
                        log_1.log('Module not found: tried to find ' + moduleSpec, log_1.LogSeverity.ERROR, log_1.ctx(node));
                    }
                    else {
                        log_1.log('Importing arbitrary node modules is not supported. Only "react" module is allowed at the moment.', log_1.LogSeverity.ERROR, log_1.ctx(node));
                    }
                    return '';
                }
                if (self.flags.imports) {
                    for (var _i = 0, _a = self.flags.imports; _i < _a.length; _i++) {
                        var imp = _a[_i];
                        if (imp.propName === '*') { // namespace import
                            var decl = context.scope.addDeclaration(imp.identNode.getText(), [], { terminateGlobally: ast_1.isExportedVar(imp.identNode), dryRun: context.dryRun });
                            if (decl) {
                                decl.data.flags = types_1.DeclFlag.External;
                                decl.data.targetModulePath = context.registry.toTargetPath(sourceFilename);
                                decl.data.propName = imp.propName;
                            }
                        }
                        else {
                            if (context.registry.isDerivedComponent(sourceFilename, imp.identNode.escapedText.toString())) {
                                var decl = context.scope.addDeclaration(imp.identNode.getText(), [], { terminateGlobally: ast_1.isExportedVar(imp.identNode), dryRun: context.dryRun });
                                if (decl) {
                                    decl.data.flags = types_1.DeclFlag.DereferencedImport;
                                    decl.data.targetModulePath = context.registry.toTargetPath(sourceFilename, imp.identNode.escapedText.toString());
                                    decl.data.propName = imp.propName;
                                }
                            }
                            else {
                                var decl = context.scope.addDeclaration(imp.identNode.getText(), [], { terminateGlobally: ast_1.isExportedVar(imp.identNode), dryRun: context.dryRun });
                                if (decl) {
                                    decl.data.flags = types_1.DeclFlag.DereferencedImport;
                                    decl.data.targetModulePath = context.registry.toTargetPath(sourceFilename);
                                    decl.data.propName = imp.propName || imp.identNode.getText();
                                }
                            }
                        }
                    }
                }
            }
            return '';
        }
    };
}
exports.tImportDeclaration = tImportDeclaration;
function tImportClause(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) { return renderSupportedNodes_1.renderSupportedNodes(self.children, context).join(''); }
    };
}
exports.tImportClause = tImportClause;
function tNamedImports(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self, context) { return renderSupportedNodes_1.renderSupportedNodes(self.children, context).join(''); }
    };
}
exports.tNamedImports = tNamedImports;
function tImportSpecifier(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self) {
            var _a;
            var decl = ast_1.getClosestParentOfType(self, ts.SyntaxKind.ImportDeclaration);
            if (decl) {
                ast_1.flagParentOfType(self, [ts.SyntaxKind.ImportDeclaration], {
                    imports: (decl.flags.imports || []).concat([{
                            identNode: node.name,
                            propName: (_a = node.propertyName) === null || _a === void 0 ? void 0 : _a.getText()
                        }])
                });
            }
            return '';
        }
    };
}
exports.tImportSpecifier = tImportSpecifier;
function tNamespaceImport(node) {
    return {
        kind: node.kind,
        supported: true,
        gen: function (self) {
            var decl = ast_1.getClosestParentOfType(self, ts.SyntaxKind.ImportDeclaration);
            if (decl) {
                ast_1.flagParentOfType(self, [ts.SyntaxKind.ImportDeclaration], {
                    imports: (decl.flags.imports || []).concat([{
                            identNode: node.name,
                            propName: '*'
                        }])
                });
            }
            return '';
        }
    };
}
exports.tNamespaceImport = tNamespaceImport;
