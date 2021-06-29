import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { resolveAliasesAndPaths } from '../utils/pathsAndNames';
import * as path from 'path';

export function tExportDeclaration(node: ts.ExportDeclaration, context: Context<Declaration>) {
  const exportedVars = node.exportClause?.kind === ts.SyntaxKind.NamespaceExport
    ? []
    : node.exportClause?.elements?.map((child) => child.name.getText());

  const currentFilePath = node.getSourceFile().fileName;

  const sourceFilename = resolveAliasesAndPaths(
    context.log,
    currentFilePath,
    path.dirname(currentFilePath),
    context.baseDir,
    context.compilerOptions.paths || {},
    context.registry._aliases
  );

  if (!sourceFilename) {
    return;
  }

  exportedVars?.forEach((varName) => {
    context.registry.isDerivedComponent(sourceFilename, varName);
  });

  return node;
}