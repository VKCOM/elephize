import * as ts from 'typescript';
import * as path from 'path';
import { getClosestParentOfType } from './ast';
import { resolveAliasesAndPaths } from './pathsAndNames';
import { Context } from '../components/context';
import { Declaration } from '../types';

export function handleEnumMemberAccess(node: ts.PropertyAccessExpression, context: Context<Declaration>): string | boolean {
  const symAccessor = context.checker.getSymbolAtLocation(node.name);
  // Note: we check node.name first, because it will be EnumMember in both local and imported enum cases.
  if (symAccessor && symAccessor.valueDeclaration?.kind === ts.SyntaxKind.EnumMember) {
    const symIdent = context.checker.getSymbolAtLocation(node.expression);
    if (symIdent && symIdent.valueDeclaration?.kind === ts.SyntaxKind.EnumDeclaration) { // local enum
      return context.registry.getEnumConst(context.moduleDescriptor.sourceFileName, node.expression.getText(), node.name.getText().toUpperCase());
    }
    if (symIdent && symIdent.declarations[0]?.kind === ts.SyntaxKind.ImportSpecifier) { // imported enum
      const importDecl = getClosestParentOfType(symIdent.declarations[0], ts.SyntaxKind.ImportDeclaration) as ts.ImportDeclaration | null;
      if (!importDecl) {
        context.log.error('Import not found: tried to find specification of %s', [node.expression.getText()], context.log.ctx(node));
        return true; // error, outer code should return ''
      }

      const currentFilePath = node.getSourceFile().fileName;
      const moduleSpec = (importDecl.moduleSpecifier as ts.StringLiteral).text;
      const sourceFilename = resolveAliasesAndPaths({
        originalSourcePath: moduleSpec,
        currentDir: path.dirname(currentFilePath),
        baseDir: context.baseDir,
        tsPaths: context.compilerOptions.paths || {},
        logger: context.log,
        outputAliases: context.registry._aliases,
      });

      if (sourceFilename === null) {
        if (moduleSpec.includes('/')) {
          context.log.error('Module not found: tried to find %s', [moduleSpec], context.log.ctx(node));
        } else {
          context.log.error(
            'Importing arbitrary node modules is not supported. Only "react" module is allowed at the moment.' +
            ' Also you may want to import specific file from module - this is supported.',
            [],
            context.log.ctx(node)
          );
        }
        return true; // error, outer code should return ''
      }

      return context.registry.getEnumConst(sourceFilename, node.expression.getText(), node.name.getText().toUpperCase());
    }
  }

  return false; // no error
}
