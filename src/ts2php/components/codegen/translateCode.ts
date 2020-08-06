import { TranslateOptions } from '../../types';
import { getBuildProgram } from './programUtils/buildProgramFactory';
import { resolveAliasesAndPaths } from '../../utils/pathsAndNames';
import { getSkippedFilesPromiseExec } from '../cjsModules/ignore';
import { NodeFlagStore } from './nodeFlagStore';
import { translateProgram } from './programUtils/translateProgram';
import { defaultOptions } from './defaultCompilerOptions';
import { getWatchProgram } from './programUtils/watchProgramFactory';

type TranslatorFunc = (filenames: string[], opts: TranslateOptions) => NodeFlagStore;

export const translateCode: TranslatorFunc = (fileNames: string[], {
  onData,
  onBeforeRender = () => undefined,
  baseDir,
  customGlobals = {},
  disableCodeElimination = false,
  aliases = {},
  namespaces,
  options = defaultOptions,
  onFinish = () => undefined
}: TranslateOptions): NodeFlagStore => {
  // Enable more logging using env var
  const nodeFlagStore = new NodeFlagStore();

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  Promise.all(
    fileNames.map((fn) => new Promise(getSkippedFilesPromiseExec({ entrypoint: fn, baseDir, tsPaths: options.paths || {}, aliases })))
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
};

export const translateCodeAndWatch: TranslatorFunc = (fileNames: string[], {
  onData,
  onBeforeRender = () => undefined,
  baseDir,
  customGlobals = {},
  disableCodeElimination = false,
  aliases = {},
  namespaces,
  options = defaultOptions,
  onFinish = () => undefined,
  getCloseHandle
}: TranslateOptions): NodeFlagStore => {
  // Enable more logging using env var
  const nodeFlagStore = new NodeFlagStore(); // TODO: check! this may lead to unforeseen consequences in sequential rebuilds
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  Promise.all(
    fileNames.map((fn) => new Promise(getSkippedFilesPromiseExec({entrypoint: fn, baseDir, tsPaths: options.paths || {}, aliases})))
  ).then((fileSet) => fileSet
    .reduce((acc, chunk) => acc.concat(chunk), [])
    .map((fn) => resolveAliasesAndPaths(fn, '', baseDir, options.paths || {}, aliases, true))
    .filter((fn): fn is string => !!fn)
  )
    .then((skippedFiles) => {
      getWatchProgram(fileNames, skippedFiles, {...defaultOptions, ...options}, (program, errcode) => {
        translateProgram(program, nodeFlagStore, {
          baseDir,
          onBeforeRender,
          customGlobals,
          aliases,
          namespaces,
          disableCodeElimination,
          options: {...defaultOptions, ...options},
          onData: (sourceFilename: string, targetFilename: string, content: string) => onData(sourceFilename, targetFilename, content, errcode),
          onFinish
        });
      }, getCloseHandle);
    });

  return nodeFlagStore;
};
