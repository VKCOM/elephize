import * as ts from 'typescript';
import { TranslateOptions } from '../../types';
import { getProgram } from '../../utils/programFromString';
import { log, LogSeverity, LogVerbosity } from '../../utils/log';
import * as prettier from 'prettier/standalone';
import { phpPrettierOptions } from '../../internalConfig/phpPrettierOptions';
import { ModuleRegistry } from '../cjsModules/moduleRegistry';
import { CommonjsModule } from '../cjsModules/commonjsModule';
import { resolveAliasesAndPaths } from '../../utils/pathsAndNames';
import { getSkippedFilesPromiseExec } from '../cjsModules/ignore';
import { renderModule } from './renderModule';
import { NodeFlagStore } from './nodeFlagStore';
import * as path from 'path';

export const defaultOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES5,
  lib: [
    'lib.d.ts',
    'lib.dom.d.ts',
    'lib.es5.d.ts',
    'lib.es2015.d.ts',
    'lib.es2016.d.ts',

    path.resolve(__dirname, '..', '..', 'types', 'global', 'index.d.ts')
  ],
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  module: ts.ModuleKind.CommonJS,
  jsx: ts.JsxEmit.React,
  allowUnreachableCode: true,
  allowJs: true,
  isolatedModules: true,
  resolveJsonModule: true,
};

export function translateCode({
  fileNames,
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
  log.verbosity = process.env.VERBOSE ? LogVerbosity.ALL : 0;
  const nodeFlagStore = new NodeFlagStore();

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  Promise.all(
    fileNames.map((fn) => new Promise(getSkippedFilesPromiseExec({entrypoint: fn, baseDir, tsPaths: options.paths || {}, aliases})))
  ).then((fileSet) => fileSet
    .reduce((acc, chunk) => acc.concat(chunk), [])
    .map((fn) => resolveAliasesAndPaths(fn, '', baseDir, options.paths || {}, aliases, true))
    .filter((fn): fn is string => !!fn)
  ).then((skippedFiles) => {
    let program = getProgram(
      fileNames,
      skippedFiles,
      {
        compilerOptions: {...defaultOptions, ...options}
      },
      () => null
    );

    let registry = new ModuleRegistry(baseDir, aliases, options.paths || {}, namespaces);
    let checker = program.getTypeChecker();
    for (const sourceFile of program.getSourceFiles()) {
      if (!sourceFile.isDeclarationFile) { // skip .d.ts if any
        let currentModule = registry.registerClass(sourceFile.fileName);
        if (!currentModule) {
          continue;
        }

        onBeforeRender(sourceFile.fileName, sourceFile);
        renderModule(checker, options, sourceFile, nodeFlagStore, baseDir, namespaces, registry, currentModule, disableCodeElimination, customGlobals);
      }
    }

    registry.forEachModule((mod: CommonjsModule) => {
      if (mod.isEmpty()) {
        // Do not emit empty modules
        log(`Dropping module ${mod.className} (${mod.targetFileName}) because it's empty`, LogSeverity.INFO);
        return;
      }
      let content = mod.generateContent();
      try {
        content = prettier.format(content, phpPrettierOptions);
      } catch (e) {
        console.error('Prettier failed to parse & prettify generated code. Here is raw code:');
        console.log(content);
      }

      onData(mod.targetFileName, content);
    });

    onFinish(registry);
  });

  return nodeFlagStore;
}
