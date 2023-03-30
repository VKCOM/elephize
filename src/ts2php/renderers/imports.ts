import * as ts from 'typescript';
import * as path from 'path';
import { renderNodes } from '../components/codegen/renderNodes';
import { Context } from '../components/context';
import { initReact } from '../components/react/reactHooks';
import { Declaration } from '../types';
import { isExportedVar } from '../utils/ast';
import { resolveAliasesAndPaths } from '../utils/pathsAndNames';
import { tsSupportExtensions } from '../utils/tsSupportExtensions';

export function tImportDeclaration(node: ts.ImportDeclaration, context: Context<Declaration>) {
  const moduleSpec = (node.moduleSpecifier as ts.StringLiteral).text;

  if (moduleSpec === 'react') {
    if (!initReact(node, context)) {
      context.log.error('Importing react with dereferencing is not supported. Use `import * as React from \'react\' instead.', [], context.log.ctx(node));
      return '';
    }
  } else if (moduleSpec) {
    const currentFilePath = node.getSourceFile().fileName;
    const sourceFilename = resolveAliasesAndPaths({
      originalSourcePath: moduleSpec,
      currentDir: path.dirname(currentFilePath),
      baseDir: context.baseDir,
      tsPaths: context.compilerOptions.paths || {},
      sourceExtensions: tsSupportExtensions(context.compilerOptions),
      outputAliases: context.registry._aliases,
      logger: context.log,
    });

    if (sourceFilename === null) {
      if (moduleSpec.includes('/')) {
        context.log.error('Module not found: tried to find %s', [moduleSpec], context.log.ctx(node));
      } else {
        context.log.warn(
          'Importing arbitrary node modules is not supported. Only "react" module is allowed at the moment.' +
          ' Also you may want to import specific file from module - this is supported.',
          [], context.log.ctx(node)
        );
      }
      return '';
    }

    const supportedExtensions = tsSupportExtensions(context.compilerOptions);

    if (!supportedExtensions.some((ext) => sourceFilename.endsWith(ext))) {
      context.log.info(
        'Module %s was found but ignored: not a source file, expected one of following extensions: %s',
        [moduleSpec, supportedExtensions.join(',')],
        context.log.ctx(node),
      );
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
        decl.data.flags = { External: true };
        decl.data.targetModulePath = context.registry.toTargetPath(sourceFilename);
        decl.data.propName = '*';
      }
    } else if (importBindings?.kind === ts.SyntaxKind.NamedImports) {
      for (const imp of importBindings.elements) {
        const searchForComponent = context.registry.isDerivedComponent(sourceFilename, imp.name.escapedText.toString()) ?
          imp.name.escapedText.toString() :
          undefined;
        const decl = context.scope.addDeclaration(
          imp.name.getText(), [],
          { terminateGlobally: isExportedVar(imp.name), dryRun: context.dryRun }
        );
        let originalMethodName = decl?.data.propName || imp.name.getText();
        context.moduleDescriptor.registerImport(sourceFilename, originalMethodName);

        if (imp.kind === ts.SyntaxKind.ImportSpecifier) {
          // "import { foo as bar }" handle;
          originalMethodName = imp.getChildren().find((child) => child.kind === ts.SyntaxKind.Identifier)?.getText() || originalMethodName;
        }

        const originalModule = context.registry.getModuleMethodSource(context.moduleDescriptor, originalMethodName);
        let impSourceFileName: string = originalModule?.sourceFileName || sourceFilename;

        if (decl) {
          decl.data.flags = { DereferencedImport: true };
          decl.data.targetModulePath = context.registry.toTargetPath(impSourceFileName, searchForComponent);
          decl.data.propName = imp.propertyName?.getText() || imp.name.getText();
        }
      }
    }
  }

  return '';
}

export const tImportClause = (node: ts.ImportClause, context: Context<Declaration>) => renderNodes([node.name, node.namedBindings], context).join('');
export const tNamedImports = (node: ts.NamedImports, context: Context<Declaration>) => renderNodes([...node.elements], context).join('');
