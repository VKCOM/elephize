import * as ts from 'typescript';
import { defaultOptions } from '../defaultCompilerOptions';

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine
};

/**
 * Create typescript `Program` object with incremental compilation on any change.
 *
 * @param filenames
 * @param compilerOptions
 * @param onProgramReady
 */
export function getWatchProgram(filenames: string[], compilerOptions: ts.CompilerOptions, onProgramReady: (p: ts.Program) => void) {
  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;
  const host = ts.createWatchCompilerHost(
    filenames,
    {...defaultOptions, ...compilerOptions, noEmit: true},
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
    console.time('TS Program created');
    return origCreateProgram(rootNames, options, host, oldProgram);
  };
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const origPostProgramCreate = host.afterProgramCreate;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  host.afterProgramCreate = (program) => {
    console.timeEnd('TS Program created');
    origPostProgramCreate!(program);
    onProgramReady(program.getProgram());
  };

  // `createWatchProgram` creates an initial program, watches files, and updates
  // the program over time.
  ts.createWatchProgram(host);
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  console.error('Error', diagnostic.code, ':', ts.flattenDiagnosticMessageText( diagnostic.messageText, formatHost.getNewLine()));
}

/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  console.info(ts.formatDiagnostic(diagnostic, formatHost));
}