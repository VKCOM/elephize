import { CliOptions, TranslateOptions } from '../../types';
import { getBuildProgram } from './programUtils/buildProgramFactory';
import { NodeFlagStore } from './nodeFlagStore';
import { translateProgram } from './programUtils/translateProgram';
import { defaultOptions } from './defaultCompilerOptions';
import { getWatchProgram } from './programUtils/watchProgramFactory';

type TranslatorFunc = (
  filenames: string[],
  importRules: CliOptions['importRules'],
  tsPaths: { [key: string]: string[] },
  opts: TranslateOptions
) => NodeFlagStore;

export const translateCode: TranslatorFunc = (
  fileNames,
  importRules,
  tsPaths,
  {
    aliases = {},
    baseDir,
    disableCodeElimination = false,
    namespaces,
    onBeforeRender = () => undefined,
    onData,
    onFinish = () => undefined,
    options = defaultOptions,
  }: TranslateOptions
): NodeFlagStore => {
  // Enable more logging using env var
  const nodeFlagStore = new NodeFlagStore();
  let [program, replacements] = getBuildProgram(
    fileNames,
    importRules,
    baseDir,
    tsPaths,
    {
      compilerOptions: {...defaultOptions, ...options}
    },
    () => null
  );

  translateProgram(program, replacements, nodeFlagStore, { onData, onBeforeRender, baseDir, disableCodeElimination, aliases, namespaces, options, onFinish });
  return nodeFlagStore;
};

export const translateCodeAndWatch: TranslatorFunc = (
  fileNames,
  importRules,
  tsPaths,
  {
    aliases = {},
    baseDir,
    disableCodeElimination = false,
    getCloseHandle,
    namespaces,
    onBeforeRender = () => undefined,
    onData,
    onFinish = () => undefined,
    options = defaultOptions,
  }: TranslateOptions
): NodeFlagStore => {
  const nodeFlagStore = new NodeFlagStore(); // TODO: check! this may lead to unforeseen consequences in sequential rebuilds
  getWatchProgram(fileNames, importRules, baseDir, tsPaths, {...defaultOptions, ...options}, (program, replacements, errcode) => {
    translateProgram(program, replacements, nodeFlagStore, {
      aliases,
      baseDir,
      disableCodeElimination,
      namespaces,
      onBeforeRender,
      onData: (sourceFilename: string, targetFilename: string, content: string) => onData(sourceFilename, targetFilename, content, errcode),
      onFinish,
      options: {...defaultOptions, ...options},
    });
  }, getCloseHandle);
  return nodeFlagStore;
};
