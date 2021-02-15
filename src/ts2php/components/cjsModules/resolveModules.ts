import * as ts from 'typescript';
import { CliOptions, ImportReplacementRule, ImportRule } from '../../types';
import * as path from 'path';
import { log, LogSeverity } from '../../utils/log';
import { resolveAliasesAndPaths } from '../../utils/pathsAndNames';

/*
  TODO:
 - Сейчас пока что сделано так, что нужно проверять соответствия типов и сигнатур вручную. Как можно автоматизировать и обеспечить fail-early?
   - При вызове функций заменяемого модуля можно проверять соответствие по выведенным типам аргументов и по количеству аргументов, а также
     по типу возвращаемого значения и выводить ошибку в случае несоответствия.
   - Нужно где-то иметь список возможных php/kphp типов и соответствия их типам ts (по крайней мере примитивам).

 */

export function resolveRulePaths(rules: CliOptions['importRules'], baseDir: string): CliOptions['importRules'] {
  const resolvedRules: CliOptions['importRules'] = {};
  Object.keys(rules).forEach((key) => {
    const p = path.resolve(baseDir, key);
    if (fileExists(p)) {
      resolvedRules[p] = rules[key];
    } else {
      resolvedRules[key] = rules[key];
    }
  });
  return resolvedRules;
}

function fileExists(fileName: string): boolean {
  return ts.sys.fileExists(fileName);
}

function readFile(fileName: string): string | undefined {
  return ts.sys.readFile(fileName);
}

function resolveModulePath(name: string, containingFile: string, baseDir: string, tsPaths: { [key: string]: string[] }): string {
  const localPath = resolveAliasesAndPaths(log, name, path.dirname(containingFile), baseDir, tsPaths, {}, true);
  if (localPath) { // relative or aliased path found
    return localPath;
  }

  // we get here if we have node module import, just output as is
  return name;
}

function findImportRule(importRules: CliOptions['importRules'], baseDir: string, path?: string): ImportRule | undefined {
  if (!path) {
    return undefined;
  }
  log(`Checking import override rules for ${path}`, LogSeverity.INFO);
  return importRules[path];
}

const emptyModule = { resolvedFileName: path.resolve(__dirname, '__empty.ts') };
export const resolveModules = (options: ts.CompilerOptions, importRules: CliOptions['importRules'], baseDir: string, tsPaths: { [key: string]: string[] }) => (
  moduleNames: string[],
  containingFile: string
): [ts.ResolvedModule[], ImportReplacementRule[]] => {
  log(`Trying to resolve module names [${moduleNames.join(', ')}] found in ${containingFile}`, LogSeverity.INFO);
  const resolvedModules: ts.ResolvedModule[] = [];
  const replacements: ImportReplacementRule[] = [];

  for (const moduleName of moduleNames) {
    const mPath = resolveModulePath(moduleName, containingFile, baseDir, tsPaths);
    const rule = findImportRule(importRules, baseDir, mPath);
    if (rule) {
      resolvedModules.push(emptyModule);
      if (!rule.ignore) {
        log(`Module ${moduleName} was replaced with implementation ${rule.implementationClass} according to library settings`, LogSeverity.INFO);
        replacements.push({ modulePath: mPath, ...rule });
      } else {
        log(`Module ${moduleName} was ignored according to library settings`, LogSeverity.INFO);
      }
    } else {
      // try to use standard resolution
      let result = ts.resolveModuleName(moduleName, containingFile, options, {
        fileExists,
        readFile
      });
      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule);
      } else {
        if (!containingFile.endsWith('.d.ts')) {
          // there may be false-positive errors in .d.ts files belonging to node typings
          log(`Module ${moduleName} was not found while parsing imports of ${containingFile}`, LogSeverity.ERROR);
        }
        resolvedModules.push(emptyModule);
      }
    }
  }

  return [resolvedModules, replacements];
};
