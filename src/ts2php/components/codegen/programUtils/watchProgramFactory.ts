/* eslint-disable @typescript-eslint/unbound-method */

import * as ts from 'typescript';
import { getDefaultCompilerOptions } from 'typescript';
import { log, LogSeverity } from '../../../utils/log';
// import { watcherHostSourceGetter } from '../sourceFilesHelper';

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine
};
let lastDiagCode: number | undefined;

/**
 * Create typescript `Program` object with incremental compilation on any change.
 *
 * @param filenames
 * @param skippedFiles
 * @param compilerOptions
 * @param onProgramReady
 * @param getCloseHandle
 */
export function getWatchProgram(
  filenames: string[],
  skippedFiles: string[],
  compilerOptions: ts.CompilerOptions,
  onProgramReady: (p: ts.Program, errcode?: number) => void,
  getCloseHandle?: (closeHandle: () => void) => void
) {
  const options: ts.CompilerOptions = {...compilerOptions || {}};

  // mix in default options
  const defaultOptions = getDefaultCompilerOptions();
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
    reportDiagnostic
  );

  const origCreateProgram = host.createProgram;
  host.createProgram = (rootNames: readonly string[], options, host, oldProgram) => {
    lastDiagCode = undefined;
    return origCreateProgram(rootNames, options, host, oldProgram);
  };
  const origPostProgramCreate = host.afterProgramCreate;

  host.afterProgramCreate = (program) => {
    setTimeout(() => {
      origPostProgramCreate!(program);
      onProgramReady(program.getProgram(), lastDiagCode);
      lastDiagCode = undefined;
    }, 100);
  };

  const opt = ts.createWatchProgram(host);
  if (getCloseHandle) {
    getCloseHandle(() => opt.close());
  }
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  lastDiagCode = diagnostic.code;
  log(ts.formatDiagnostic(diagnostic, formatHost), LogSeverity.ERROR);
}
