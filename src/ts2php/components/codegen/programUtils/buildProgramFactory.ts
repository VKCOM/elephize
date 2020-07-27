import {
  CompilerHost,
  CompilerOptions,
  createProgram,
  Diagnostic,
  getDefaultCompilerOptions,
  Program,
  TranspileOptions,
  WriteFileCallback
} from 'typescript';
import { existsSync } from 'fs';
import { getDtsSourceFile, getSourceFile } from '../sourceFilesHelper';

// internals. Not good thing to import them this way, but it's hard to customize transpileModule the way we want.
const { addRange } = require('typescript');

/**
 * Create typescript `Program` object for one-time build.
 *
 * @param filenames
 * @param skippedFiles
 * @param transpileOptions
 * @param writeFile
 */
export function getBuildProgram(filenames: string[], skippedFiles: string[], transpileOptions: TranspileOptions, writeFile: WriteFileCallback): Program {
  const diagnostics: Diagnostic[] = [];
  const options: CompilerOptions = {...transpileOptions.compilerOptions || {}};

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

  // Create a compilerHost object to allow the compiler to read and write files
  const compilerHost: CompilerHost = {
    getSourceFile: (fileName) => {
      if (skippedFiles.includes(fileName)) {
        // Use this hack to prevent typescript resolver from getting into files we don't want to parse.
        return undefined;
      }
      if (fileName.endsWith('.d.ts')) {
        return getDtsSourceFile(fileName, options.target) || undefined;
      }
      return getSourceFile(fileName, options.target) || undefined;
    },
    writeFile,
    getDefaultLibFileName: () => 'lib.d.ts',
    useCaseSensitiveFileNames: () => false,
    getCanonicalFileName: fileName => fileName,
    getCurrentDirectory: () => '',
    getNewLine: () => '\n',
    fileExists: (fileName): boolean => existsSync(fileName),
    readFile: () => '',
    directoryExists: () => true,
    getDirectories: () => []
  };

  const program = createProgram(filenames, options, compilerHost);

  if (transpileOptions.reportDiagnostics) {
    addRange(/*to*/ diagnostics, /*from*/ program.getSyntacticDiagnostics());
    addRange(/*to*/ diagnostics, /*from*/ program.getOptionsDiagnostics());
  }

  return program;
}
