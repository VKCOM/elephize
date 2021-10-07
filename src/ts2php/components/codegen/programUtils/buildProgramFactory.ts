import * as ts from 'typescript';
import { existsSync } from 'fs';
import { CliOptions, ImportReplacementRule, LogObj } from '../../../types';
import { resolveModules } from '../../cjsModules/resolveModules';
import { compilerHostSourceGetter } from '../sourceFilesHelper';

// internals. Not good thing to import them this way, but it's hard to customize transpileModule the way we want.
const { addRange } = require('typescript');

/**
 * Create typescript `Program` object for one-time build.
 *
 * @param filenames
 * @param ignoredImports
 * @param replacedImports
 * @param baseDir
 * @param tsPaths
 * @param transpileOptions
 * @param writeFile
 * @param log
 */
export function getBuildProgram(
  filenames: string[],
  ignoredImports: CliOptions['ignoreImports'],
  replacedImports: CliOptions['replaceImports'],
  baseDir: string,
  tsPaths: { [key: string]: string[] },
  transpileOptions: ts.TranspileOptions,
  writeFile: ts.WriteFileCallback,
  log: LogObj
): [ts.Program, ImportReplacementRule[]] {
  const diagnostics: ts.Diagnostic[] = [];
  const options: ts.CompilerOptions = { ...transpileOptions.compilerOptions || {} };

  // mix in default options
  const defaultOptions = ts.getDefaultCompilerOptions();
  for (const key in defaultOptions) {
    if (defaultOptions.hasOwnProperty(key) && options[key] === undefined) {
      options[key] = defaultOptions[key];
    }
  }

  // transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between input and output paths.
  options.suppressOutputPathCheck = true;

  // Filename can be non-ts file.
  options.allowNonTsExtensions = true;

  // Create a compilerHost object to allow the compiler to read and write files
  const resolutionFun = resolveModules(options, ignoredImports, replacedImports, baseDir, tsPaths, log);
  let replacements: ImportReplacementRule[] = [];
  const compilerHost: ts.CompilerHost = {
    resolveModuleNames: (moduleNames: string[], containingFile: string) => {
      const [resolvedModules, importReplacements] = resolutionFun(moduleNames, containingFile);
      replacements = replacements.concat(importReplacements);
      return resolvedModules;
    },
    getSourceFile: compilerHostSourceGetter(options.target),
    writeFile,
    getDefaultLibFileName: () => 'lib.d.ts',
    useCaseSensitiveFileNames: () => false,
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => '',
    getNewLine: () => '\n',
    fileExists: (fileName): boolean => {
      return existsSync(fileName);
    },
    readFile: () => '',
    directoryExists: () => true,
    getDirectories: () => [],
  };

  const program = ts.createProgram(filenames, options, compilerHost);

  if (transpileOptions.reportDiagnostics) {
    addRange(/* to*/ diagnostics, /* from*/ program.getSyntacticDiagnostics());
    addRange(/* to*/ diagnostics, /* from*/ program.getOptionsDiagnostics());
  }

  return [program, replacements];
}
