import * as ts from 'typescript';
import { Declaration, DeclFlag, NodeDescription, NodeInfo } from '../types';
import { renderSupportedNodes } from '../utils/renderSupportedNodes';
import { Context } from '../components/context';
import { flagParentOfType, getClosestParentOfType, isExportedVar } from '../utils/ast';
import { ctx, log, LogSeverity } from '../utils/log';
import * as path from 'path';
import { initReact } from '../components/react/reactHooks';

export function tImportDeclaration(node: ts.ImportDeclaration): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => {
      const moduleSpec = (node.moduleSpecifier as ts.StringLiteral).text;
      renderSupportedNodes(self.children, context);
      if (moduleSpec === 'react') {
        if (!initReact(self, context)) {
          log('Importing react with dereferencing is not supported. Use `import * as React from \'react\' instead.', LogSeverity.ERROR, ctx(node));
          return '';
        }
      } else if (moduleSpec) {
        let currentFilePath = node.getSourceFile().fileName;
        let sourceFilename = context.registry.resolveAliasesAndPaths(moduleSpec, path.dirname(currentFilePath), context.baseDir, context.compilerOptions.paths || {});

        if (sourceFilename === null) {
          if (moduleSpec.includes('/')) {
            log('Module not found: tried to find ' + moduleSpec, LogSeverity.ERROR, ctx(node));
          } else {
            log('Importing arbitrary node modules is not supported. Only "react" module is allowed at the moment.', LogSeverity.ERROR, ctx(node));
          }
          return '';
        }

        if (self.flags.imports) {
          for (let imp of self.flags.imports) {
            if (imp.propName === '*') { // namespace import
              const decl = context.scope.addDeclaration(
                imp.identNode.getText(), [],
                { terminateGlobally: isExportedVar(imp.identNode), dryRun: context.dryRun }
              );
              if (decl) {
                decl.data.flags = DeclFlag.External;
                decl.data.targetModulePath = context.registry.toTargetPath(sourceFilename);
                decl.data.propName = imp.propName;
              }
            } else {
              if (context.registry.isDerivedComponent(sourceFilename, imp.identNode.escapedText.toString())) {
                const decl = context.scope.addDeclaration(
                  imp.identNode.getText(), [],
                  { terminateGlobally: isExportedVar(imp.identNode), dryRun: context.dryRun }
                );
                if (decl) {
                  decl.data.flags = DeclFlag.DereferencedImport;
                  decl.data.targetModulePath = context.registry.toTargetPath(sourceFilename, imp.identNode.escapedText.toString());
                  decl.data.propName = imp.propName;
                }
              } else {
                const decl = context.scope.addDeclaration(
                  imp.identNode.getText(), [],
                  { terminateGlobally: isExportedVar(imp.identNode), dryRun: context.dryRun }
                );
                if (decl) {
                  decl.data.flags = DeclFlag.DereferencedImport;
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

export function tImportClause(node: ts.ImportClause): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => renderSupportedNodes(self.children, context).join('')
  };
}

export function tNamedImports(node: ts.NamedImports): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo, context: Context<Declaration>) => renderSupportedNodes(self.children, context).join('')
  };
}

export function tImportSpecifier(node: ts.ImportSpecifier): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo) => {
      const decl = getClosestParentOfType(self, ts.SyntaxKind.ImportDeclaration);
      if (decl) {
        flagParentOfType(self, [ts.SyntaxKind.ImportDeclaration], {
          imports: (decl.flags.imports || []).concat([{
            identNode: node.name,
            propName: node.propertyName?.getText()
          }])
        });
      }
      return '';
    }
  };
}

export function tNamespaceImport(node: ts.NamespaceImport): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo) => {
      const decl = getClosestParentOfType(self, ts.SyntaxKind.ImportDeclaration);
      if (decl) {
        flagParentOfType(self, [ts.SyntaxKind.ImportDeclaration], {
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
