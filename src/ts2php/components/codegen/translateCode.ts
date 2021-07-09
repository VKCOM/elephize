import { CliOptions, TranslateOptions } from '../../types';
import { getBuildProgram } from './programUtils/buildProgramFactory';
import { NodeFlagStore } from './nodeFlagStore';
import { translateProgram } from './programUtils/translateProgram';
import { defaultOptions } from './defaultCompilerOptions';
import { getWatchProgram } from './programUtils/watchProgramFactory';
import { LogObj } from '../../utils/log';

type TranslatorFunc = (
  filenames: string[],
  ignoredImports: CliOptions['ignoreImports'],
  replacedImports: CliOptions['replaceImports'],
  tsPaths: { [key: string]: string[] },
  log: LogObj,
  opts: TranslateOptions
) => NodeFlagStore;

export const translateCode: TranslatorFunc = (
  fileNames,
  ignoredImports,
  replacedImports,
  tsPaths,
  log,
  {
    aliases = {},
    baseDir,
    disableCodeElimination = false,
    preferTernary,
    namespaces,
    encoding,
    serverFilesRoot,
    builtinsPath,
    onBeforeRender = () => undefined,
    onData,
    onFinish = () => undefined,
    options = defaultOptions,
    jsxPreferences = {},
  }: TranslateOptions
): NodeFlagStore => {
  // Enable more logging using env var
  const nodeFlagStore = new NodeFlagStore();
  const [program, replacements] = getBuildProgram(
    fileNames,
    ignoredImports,
    replacedImports,
    baseDir,
    tsPaths,
    {
      compilerOptions: { ...defaultOptions, ...options },
    },
    () => null,
    log
  );

  translateProgram(
    program,
    replacements,
    nodeFlagStore,
    log,
    {
      onData,
      onBeforeRender,
      baseDir,
      disableCodeElimination,
      preferTernary,
      aliases,
      namespaces,
      serverFilesRoot,
      builtinsPath,
      encoding,
      options,
      jsxPreferences,
      onFinish,
    });
  return nodeFlagStore;
};

export const translateCodeAndWatch: TranslatorFunc = (
  fileNames,
  ignoredImports,
  replacedImports,
  tsPaths,
  log,
  {
    aliases = {},
    baseDir,
    disableCodeElimination = false,
    preferTernary,
    getCloseHandle,
    namespaces,
    encoding,
    onBeforeRender = () => undefined,
    onData,
    serverFilesRoot,
    builtinsPath,
    onFinish = () => undefined,
    options = defaultOptions,
    jsxPreferences,
  }: TranslateOptions
): NodeFlagStore => {
  const nodeFlagStore = new NodeFlagStore(); // TODO: check! this may lead to unforeseen consequences in sequential rebuilds
  getWatchProgram(fileNames, ignoredImports, replacedImports, baseDir, tsPaths, { ...defaultOptions, ...options }, (program, replacements, errcode) => {
    translateProgram(program, replacements, nodeFlagStore, log, {
      aliases,
      baseDir,
      disableCodeElimination,
      preferTernary,
      namespaces,
      serverFilesRoot,
      builtinsPath,
      encoding,
      jsxPreferences,
      onBeforeRender,
      onData: (sourceFilename: string, targetFilename: string, content: string) => onData(sourceFilename, targetFilename, content, errcode),
      onFinish,
      options: { ...defaultOptions, ...options },
    });
  }, log, getCloseHandle);
  return nodeFlagStore;
};
