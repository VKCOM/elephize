import { CliOptions, TranslateOptions } from '../../types';
import { getBuildProgram } from './programUtils/buildProgramFactory';
import { NodeFlagStore } from './nodeFlagStore';
import { translateProgram } from './programUtils/translateProgram';
import { defaultOptions } from './defaultCompilerOptions';
import { getWatchProgram } from './programUtils/watchProgramFactory';
import { LogObj } from '../../utils/log';

type TranslatorFunc = (
  filenames: string[],
  importRules: CliOptions['importRules'],
  tsPaths: { [key: string]: string[] },
  log: LogObj,
  opts: TranslateOptions
) => NodeFlagStore;

export const translateCode: TranslatorFunc = (
  fileNames,
  importRules,
  tsPaths,
  log,
  {
    aliases = {},
    baseDir,
    disableCodeElimination = false,
    namespaces,
    encoding,
    serverFilesRoot,
    onBeforeRender = () => undefined,
    onData,
    onFinish = () => undefined,
    options = defaultOptions,
  }: TranslateOptions
): NodeFlagStore => {
  // Enable more logging using env var
  const nodeFlagStore = new NodeFlagStore();
  const [program, replacements] = getBuildProgram(
    fileNames,
    importRules,
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
      aliases,
      namespaces,
      serverFilesRoot,
      encoding,
      options,
      onFinish,
    });
  return nodeFlagStore;
};

export const translateCodeAndWatch: TranslatorFunc = (
  fileNames,
  importRules,
  tsPaths,
  log,
  {
    aliases = {},
    baseDir,
    disableCodeElimination = false,
    getCloseHandle,
    namespaces,
    encoding,
    onBeforeRender = () => undefined,
    onData,
    serverFilesRoot,
    onFinish = () => undefined,
    options = defaultOptions,
  }: TranslateOptions
): NodeFlagStore => {
  const nodeFlagStore = new NodeFlagStore(); // TODO: check! this may lead to unforeseen consequences in sequential rebuilds
  getWatchProgram(fileNames, importRules, baseDir, tsPaths, { ...defaultOptions, ...options }, (program, replacements, errcode) => {
    translateProgram(program, replacements, nodeFlagStore, log, {
      aliases,
      baseDir,
      disableCodeElimination,
      namespaces,
      serverFilesRoot,
      encoding,
      onBeforeRender,
      onData: (sourceFilename: string, targetFilename: string, content: string) => onData(sourceFilename, targetFilename, content, errcode),
      onFinish,
      options: { ...defaultOptions, ...options },
    });
  }, log, getCloseHandle);
  return nodeFlagStore;
};
