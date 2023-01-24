import { CliOptions, TranslateOptions, LogObj } from '../../types';
import { getBuildProgram } from './programUtils/buildProgramFactory';
import { NodeFlagStore } from './nodeFlagStore';
import { translateProgram } from './programUtils/translateProgram';
import { defaultCompilerOptions } from './defaultCompilerOptions';
import { getWatchProgram } from './programUtils/watchProgramFactory';

type TranslatorFunc = (
  filenames: string[],
  ignoredImports: CliOptions['ignoreImports'],
  replacedImports: CliOptions['replaceImports'],
  tsPaths: Record<string, string[]>,
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
    sourceExtensions,
    baseDir,
    disableCodeElimination = false,
    namespaces,
    encoding,
    printImportTree,
    serverFilesRoot,
    builtinsPath,
    onBeforeRender = () => undefined,
    onData,
    onFinish = () => undefined,
    compilerOptions,
    jsxPreferences = {},
    hooks = {},
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
    sourceExtensions,
    {
      compilerOptions: { ...defaultCompilerOptions, ...compilerOptions },
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
      aliases,
      sourceExtensions,
      namespaces,
      printImportTree,
      serverFilesRoot,
      builtinsPath,
      encoding,
      compilerOptions: { ...defaultCompilerOptions, ...compilerOptions },
      jsxPreferences,
      hooks,
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
    sourceExtensions,
    baseDir,
    disableCodeElimination = false,
    getCloseHandle,
    namespaces,
    encoding,
    printImportTree,
    onBeforeRender = () => undefined,
    onData,
    serverFilesRoot,
    builtinsPath,
    onFinish = () => undefined,
    compilerOptions,
    jsxPreferences,
    hooks,
  }: TranslateOptions
): NodeFlagStore => {
  const nodeFlagStore = new NodeFlagStore(); // TODO: check! this may lead to unforeseen consequences in sequential rebuilds
  getWatchProgram(
    fileNames,
    ignoredImports,
    replacedImports,
    baseDir,
    tsPaths,
    sourceExtensions,
    { ...defaultCompilerOptions, ...compilerOptions },
    (program, replacements, errcode) => {
      translateProgram(program, replacements, nodeFlagStore, log, {
        aliases,
        sourceExtensions,
        baseDir,
        disableCodeElimination,
        namespaces,
        serverFilesRoot,
        builtinsPath,
        encoding,
        printImportTree,
        jsxPreferences,
        hooks,
        onBeforeRender,
        onData: (sourceFilename: string, targetFilename: string, content: string) => onData(sourceFilename, targetFilename, content, errcode),
        onFinish,
        compilerOptions: { ...defaultCompilerOptions, ...compilerOptions },
      });
    }, log, getCloseHandle);
  return nodeFlagStore;
};
