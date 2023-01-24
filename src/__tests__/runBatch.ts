import { resolve as pResolve, dirname, join } from 'path';
import { translateCode } from '../ts2php/components/codegen/translateCode';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { normalizeFileExt } from '../ts2php/utils/pathsAndNames';
import * as prettier from 'prettier/standalone';
import { phpPrettierOptions } from '../ts2php/internalConfig/phpPrettierOptions';
import { CliOptions, JSXPreferences, LogObj, NodeHooks } from '../ts2php/types';
import { sync as mkdirpSync } from 'mkdirp';

const baseDir = pResolve(__dirname);
const namespaces = {
  root: '',
  builtins: 'VK\\Elephize\\Builtins',
};
const ignoredImports: CliOptions['ignoreImports'] = new Set([
  'specimens/misc/__toIgnore.ts',
  'specimens/misc/__toIgnoreFolder/*.ts',
]);
const replacedImports: CliOptions['replaceImports'] = {
  'specimens/misc/toReplace.ts': {
    implementationPath: 'specimens/ToReplace.php',
    implementationClass: 'ToReplace',
  },
  'specimens/misc/toReplaceIndex/index.ts': {
    implementationPath: 'specimens/ToReplaceSecond.php',
    implementationClass: 'ToReplaceSecond',
  },
};
const compilerOptions = {
  baseUrl: baseDir,
  paths: {
    '#specimens/*': ['specimens/'],
  },
};

interface RunBatchOptions {
  jsxPreferences?: JSXPreferences;
  hooks?: NodeHooks;
}

export function runBatch(basePath: string[], testSuite: string[][], log: LogObj, options?: RunBatchOptions) {
  const promises: Array<Promise<any>> = [];
  const sourceExtensions = ['.ts', '.tsx', '.js', '.jsx'];

  translateCode(testSuite.map((path) => pResolve(...basePath, ...path)), ignoredImports, replacedImports, compilerOptions.paths, log, {
    baseDir,
    aliases: {},
    sourceExtensions,
    namespaces,
    serverFilesRoot: baseDir,
    encoding: 'utf-8',
    printImportTree: false,
    compilerOptions,
    jsxPreferences: options?.jsxPreferences || {},
    hooks: options?.hooks || {},
    onData: (sourceFilename: string, targetFilename: string, content: string) => onData(basePath, sourceExtensions, promises, targetFilename, content),
  });

  return Promise.all(promises)
    .then(() => new Promise((resolve) => setTimeout(resolve, 500)));
}

function onData(basePath: string[], sourceExtensions: string[], promises: Array<Promise<any>>, filename: string, content: string) {
  process.stdout.write('[data received] ' + filename + '\n');
  promises.push(new Promise((resolve) => {
    const resultFileName = join(baseDir, normalizeFileExt(filename, sourceExtensions));
    const prettifiedContent = prettier.format(content, phpPrettierOptions);

    mkdirpSync(dirname(resultFileName));

    // If test fails, unlinkSync (see below) will not execute
    // So, it will be possible to check output in file-name.php.result.
    writeFileSync(resultFileName + '.result', prettifiedContent, 'utf-8');
    expect(prettifiedContent).toBeTruthy();
    expect(prettifiedContent, 'Failed in file: ' + filename)
      .toEqual(prettier.format(readFileSync(resultFileName, 'utf-8'), phpPrettierOptions));
    process.stdout.write('[test ok] ' + filename.replace(pResolve(...basePath), '') + '\n');
    unlinkSync(resultFileName + '.result');
    resolve(null);
  }));
}

