import { TranslateOptions } from '../../types';
import { getBuildProgram } from './programUtils/buildProgramFactory';
import { resolveAliasesAndPaths } from '../../utils/pathsAndNames';
import { getSkippedFilesPromiseExec } from '../cjsModules/ignore';
import { NodeFlagStore } from './nodeFlagStore';
import { translateProgram } from './programUtils/translateProgram';
import { defaultOptions } from './defaultCompilerOptions';

export function translateCode(fileNames: string[], {
  onData,
  onBeforeRender = () => undefined,
  baseDir,
  customGlobals = {},
  disableCodeElimination = false,
  aliases = {},
  namespaces,
  options = defaultOptions,
  onFinish = () => undefined
}: TranslateOptions): NodeFlagStore {
  // Enable more logging using env var
  const nodeFlagStore = new NodeFlagStore();

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  Promise.all(
    fileNames.map((fn) => new Promise(getSkippedFilesPromiseExec({entrypoint: fn, baseDir, tsPaths: options.paths || {}, aliases})))
  ).then((fileSet) => fileSet
    .reduce((acc, chunk) => acc.concat(chunk), [])
    .map((fn) => resolveAliasesAndPaths(fn, '', baseDir, options.paths || {}, aliases, true))
    .filter((fn): fn is string => !!fn)
  ).then((skippedFiles) => {
    let program = getBuildProgram(
      fileNames,
      skippedFiles,
      {
        compilerOptions: {...defaultOptions, ...options}
      },
      () => null
    );

    translateProgram(program, nodeFlagStore, { onData, onBeforeRender, baseDir, customGlobals, disableCodeElimination, aliases, namespaces, options, onFinish });
  });

  return nodeFlagStore;
}
