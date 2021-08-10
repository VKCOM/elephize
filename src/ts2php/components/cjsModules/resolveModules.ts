import * as ts from 'typescript';
import { CliOptions, ImportReplacementRule } from '../../types';
import * as path from 'path';
import { LogObj } from '../../utils/log';
import { resolveAliasesAndPaths } from '../../utils/pathsAndNames';
import * as glob from 'glob';
import { fileExists, readFile } from '##platform-dependent-parts';

/*
  TODO:
 - Сейчас пока что сделано так, что нужно проверять соответствия типов и сигнатур вручную. Как можно автоматизировать и обеспечить fail-early?
   - При вызове функций заменяемого модуля можно проверять соответствие по выведенным типам аргументов и по количеству аргументов, а также
     по типу возвращаемого значения и выводить ошибку в случае несоответствия.
   - Нужно где-то иметь список возможных php/kphp типов и соответствия их типам ts (по крайней мере примитивам).

 */

function resolveModulePath(name: string, containingFile: string, baseDir: string, tsPaths: { [key: string]: string[] }, log: LogObj): string {
  const localPath = resolveAliasesAndPaths(log, name, path.dirname(containingFile), baseDir, tsPaths, {}, true);
  if (localPath) { // relative or aliased path found
    return localPath;
  }

  // we get here if we have node module import, just output as is
  return name;
}

type ReplacedImportRule = {
  ignore: false;
  implementationPath: ImportReplacementRule['implementationPath'];
  implementationClass: ImportReplacementRule['implementationClass'];
};
type IgnoredImportRule = {
  ignore: true;
};
type ImportRule = ReplacedImportRule | IgnoredImportRule;

const resolvedReplaceRules: { [key: string]: ReplacedImportRule } = {};
const resolvedIgnoreRules: { [key: string]: IgnoredImportRule } = {};
let lastIgnoredRulesRef: CliOptions['ignoreImports'];
let lastReplacedRulesRef: CliOptions['replaceImports'];
function getRules(ignoredImportRules: CliOptions['ignoreImports'], replacedImportRules: CliOptions['replaceImports'], baseDir: string) {
  if (lastReplacedRulesRef !== replacedImportRules) {
    Object.keys(replacedImportRules).forEach((key) => {
      const p = path.resolve(baseDir, key);
      resolvedReplaceRules[fileExists(p) ? p : key] = { ...replacedImportRules[key], ignore: false };
    });
    lastReplacedRulesRef = replacedImportRules;
  }

  if (lastIgnoredRulesRef !== ignoredImportRules) {
    ignoredImportRules.forEach((key) => {
      glob.sync(baseDir + '/' + key)
        .forEach((fn) => resolvedIgnoreRules[fn] = { ignore: true });
    });
    lastIgnoredRulesRef = ignoredImportRules;
  }

  return { resolvedIgnoreRules, resolvedReplaceRules };
}

function findImportRule(
  ignoredImportRules: CliOptions['ignoreImports'],
  replacedImportRules: CliOptions['replaceImports'],
  baseDir: string,
  log: LogObj,
  filepath?: string
): ImportRule | undefined {
  if (!filepath) {
    return undefined;
  }
  log.info('Checking import override rules for %s', [filepath]);
  const { resolvedIgnoreRules, resolvedReplaceRules } = getRules(ignoredImportRules, replacedImportRules, baseDir);
  return resolvedIgnoreRules[filepath] || resolvedReplaceRules[filepath] || undefined;
}

const emptyModule = { resolvedFileName: path.resolve(__dirname, '__empty.ts') };
export const resolveModules = (
  options: ts.CompilerOptions,
  ignoredImports: CliOptions['ignoreImports'],
  replacedImports: CliOptions['replaceImports'],
  baseDir: string,
  tsPaths: { [key: string]: string[] },
  log: LogObj
) => (
  moduleNames: string[],
  containingFile: string
): [ts.ResolvedModule[], ImportReplacementRule[]] => {
  log.info('Trying to resolve module names [%s] found in %s', [moduleNames.join(', '), containingFile]);
  const resolvedModules: ts.ResolvedModule[] = [];
  const replacements: ImportReplacementRule[] = [];

  for (const moduleName of moduleNames) {
    const mPath = resolveModulePath(moduleName, containingFile, baseDir, tsPaths, log);
    const rule = findImportRule(ignoredImports, replacedImports, baseDir, log, mPath);
    if (rule) {
      resolvedModules.push(emptyModule);
      if (!rule.ignore) {
        log.info('Module %s was replaced with implementation %s according to library settings', [moduleName, rule.implementationClass]);
        replacements.push({ modulePath: mPath, ...rule });
      } else {
        log.info('Module %s was ignored according to library settings', [moduleName]);
      }
    } else {
      // try to use standard resolution
      const result = ts.resolveModuleName(moduleName, containingFile, options, {
        fileExists,
        readFile,
      });
      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule);
      } else {
        if (!containingFile.endsWith('.d.ts')) {
          // there may be false-positive errors in .d.ts files belonging to node typings
          log.error('Module %s was not found while parsing imports of %s', [moduleName, containingFile]);
        }
        resolvedModules.push(emptyModule);
      }
    }
  }

  return [resolvedModules, replacements];
};
