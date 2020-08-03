/* eslint-disable @typescript-eslint/unbound-method */

import * as ts from 'typescript';
import { watcherHostSourceGetter } from '../sourceFilesHelper';
import { getDefaultCompilerOptions } from 'typescript';

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine
};

// TODO:
/*
 - Check functionality: prevent typescript resolver from getting into files we don't want to parse.
 - NodeFlagStore check and review - if there is any unnecessary caching
 ---------
 - Unit tests:
   - Create entrypoint file
   - Delete file (file or entrypoint, used and unused)
   - Modify file
   - Import new file
   - Delete import of file
   - Broken TS code (typing)
   - Broken TS code (syntax)
   - Restored TS code (typing)
   - Restored TS code (syntax)
   - Added/removed unused variable
   - Added/removed usage of variable
   - Added/removed usage of undeclared variable
   - Added/removed @elephize* annotations
 */

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
  onProgramReady: (p: ts.Program) => void,
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
    reportDiagnostic,
    reportWatchStatusChanged
  );

  // You can technically override any given hook on the host, though you probably
  // don't need to.
  // Note that we're assuming `origCreateProgram` and `origPostProgramCreate`
  // doesn't use `this` at all.
  const origCreateProgram = host.createProgram;
  host.createProgram = (rootNames: readonly string[], options, host, oldProgram) => {
    return origCreateProgram(rootNames, options, host, oldProgram);
  };
  const origPostProgramCreate = host.afterProgramCreate;

  // TODO: skipped files resolver
  //host.readFile = watcherHostSourceGetter(skippedFiles, compilerOptions.target);
  host.afterProgramCreate = (program) => {
    setTimeout(() => {
      origPostProgramCreate!(program);
      onProgramReady(program.getProgram());
    }, 100);
  };

  // `createWatchProgram` creates an initial program, watches files, and updates
  // the program over time.
  const opt = ts.createWatchProgram(host);
  if (getCloseHandle) {
    getCloseHandle(() => opt.close());
  }
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  console.error('Error', diagnostic.code, ':', ts.flattenDiagnosticMessageText( diagnostic.messageText, formatHost.getNewLine()));
}

/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  switch (diagnostic.code) {
    case 6031: // started compilation in watch mode
      // console.info('Started comp');
      break;
    case 6194: // finished compilation
      // console.info('Finished comp');
      break;
  }
}