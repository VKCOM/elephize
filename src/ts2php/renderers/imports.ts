import * as ts from 'typescript';
import { Declaration, DeclFlag } from '../types';
import { Context } from '../components/context';
import { isExportedVar } from '../utils/ast';
import { ctx, log, LogSeverity } from '../utils/log';
import * as path from 'path';
import { initReact } from '../components/react/reactHooks';
import { resolveAliasesAndPaths } from '../utils/pathsAndNames';
import { renderNodes } from '../components/codegen/renderNodes';

export function tImportDeclaration(node: ts.ImportDeclaration, context: Context<Declaration>) {
  const moduleSpec = (node.moduleSpecifier as ts.StringLiteral).text;
  if (moduleSpec === 'react') {
    if (!initReact(node, context)) {
      log('Importing react with dereferencing is not supported. Use `import * as React from \'react\' instead.', LogSeverity.ERROR, ctx(node));
      return '';
    }
  } else if (moduleSpec) {
    let currentFilePath = node.getSourceFile().fileName;
    let sourceFilename = resolveAliasesAndPaths(moduleSpec, path.dirname(currentFilePath), context.baseDir, context.compilerOptions.paths || {}, context.registry._aliases);

    if (sourceFilename === null) {
      if (moduleSpec.includes('/')) {
        log('Module not found: tried to find ' + moduleSpec, LogSeverity.ERROR, ctx(node));
      } else {
        log('Importing arbitrary node modules is not supported. Only "react" module is allowed at the moment.', LogSeverity.ERROR, ctx(node));
      }
      return '';
    }

    renderNodes([node.importClause, node.moduleSpecifier], context);

    const importBindings = node.importClause?.namedBindings;
    if (importBindings?.kind === ts.SyntaxKind.NamespaceImport) {
      const decl = context.scope.addDeclaration(
        importBindings.name.getText(), [],
        { terminateGlobally: isExportedVar(importBindings.name), dryRun: context.dryRun }
      );
      if (decl) {
        decl.data.flags = DeclFlag.External;
        decl.data.targetModulePath = context.registry.toTargetPath(sourceFilename);
        decl.data.propName = '*';
      }
    } else if (importBindings?.kind === ts.SyntaxKind.NamedImports) {
      for (let imp of importBindings.elements) {
        const searchForComponent = context.registry.isDerivedComponent(sourceFilename, imp.name.escapedText.toString())
          ? imp.name.escapedText.toString()
          : undefined;
        const decl = context.scope.addDeclaration(
          imp.name.getText(), [],
          {terminateGlobally: isExportedVar(imp.name), dryRun: context.dryRun}
        );
        if (decl) {
          decl.data.flags = DeclFlag.DereferencedImport;
          decl.data.targetModulePath = context.registry.toTargetPath(sourceFilename, searchForComponent);
          decl.data.propName = imp.propertyName?.getText() || imp.name.getText();
        }
      }
    }
  }

  return '';
}

export const tImportClause = (node: ts.ImportClause, context: Context<Declaration>) => renderNodes([node.name, node.namedBindings], context).join('');
export const tNamedImports = (node: ts.NamedImports, context: Context<Declaration>) => renderNodes([...node.elements], context).join('');
