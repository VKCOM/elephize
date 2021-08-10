/* eslint-disable @typescript-eslint/unbound-method */

import * as ts from 'typescript';
import { LogObj } from '../../../utils/log';
import { CliOptions, ImportReplacementRule } from '../../../types';
import { resolveModules } from '../../cjsModules/resolveModules';
import { formatHost } from '##platform-dependent-parts';

let lastDiagCode: number | undefined;

/**
 * Create typescript `Program` object with incremental compilation on any change.
 *
 * @param filenames
 * @param ignoredImports
 * @param replacedImports
 * @param baseDir
 * @param tsPaths
 * @param compilerOptions
 * @param onProgramReady
 * @param log
 * @param getCloseHandle
 */
export function getWatchProgram(
  filenames: string[],
  ignoredImports: CliOptions['ignoreImports'],
  replacedImports: CliOptions['replaceImports'],
  baseDir: string,
  tsPaths: { [key: string]: string[] },
  compilerOptions: ts.CompilerOptions,
  onProgramReady: (p: ts.Program, replacements: ImportReplacementRule[], errcode?: number) => void,
  log: LogObj,
  getCloseHandle?: (closeHandle: () => void) => void
) {
  const options: ts.CompilerOptions = { ...compilerOptions || {} };

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

  // Force disable output
  options.noEmit = true;

  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;
  const host = ts.createWatchCompilerHost(
    filenames,
    options,
    ts.sys,
    createProgram,
    reportDiagnostic(log),
    reportWatchStatusChanged
  );

  // TODO: непонятно как подключить дефолтные либы (которые в buildProgram подключаются через getSourceFile). Скорее всего завалится вывод типов, проверить

  const origCreateProgram = host.createProgram;
  // host.resolveModuleNames() <- // TODO: customize just like in buildProgramFactory
  host.createProgram = (rootNames: readonly string[], options, host, oldProgram) => {
    lastDiagCode = undefined;
    return origCreateProgram(rootNames, options, host, oldProgram);
  };
  const origPostProgramCreate = host.afterProgramCreate;
  const resolutionFun = resolveModules(options, ignoredImports, replacedImports, baseDir, tsPaths, log);
  let replacements: ImportReplacementRule[] = [];
  host.resolveModuleNames = (moduleNames: string[], containingFile: string) => {
    const [resolvedModules, importReplacements] = resolutionFun(moduleNames, containingFile);
    replacements = replacements.concat(importReplacements);
    return resolvedModules;
  };

  host.afterProgramCreate = (program) => {
    setTimeout(() => {
      origPostProgramCreate!(program);
      onProgramReady(program.getProgram(), replacements, lastDiagCode);
      lastDiagCode = undefined;
    }, 100);
  };

  const opt = ts.createWatchProgram(host);
  if (getCloseHandle) {
    getCloseHandle(() => opt.close());
  }
}

function reportDiagnostic(log: LogObj) {
  return (diagnostic: ts.Diagnostic) => {
    lastDiagCode = diagnostic.code;
    log.error(ts.formatDiagnostic(diagnostic, formatHost), []);
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  // Do nothing, just suppress default messages
}
