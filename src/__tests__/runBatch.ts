import { resolve as pResolve } from 'path';
import { translateCode } from '../ts2php/components/codegen/translateCode';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { normalizeFileExt } from '../ts2php/utils/pathsAndNames';
import * as prettier from 'prettier/standalone';
import { phpPrettierOptions } from '../ts2php/internalConfig/phpPrettierOptions';
import { CliOptions } from '../ts2php/types';
import { LogObj } from '../ts2php/utils/log';

const baseDir = pResolve(__dirname, '..', '..');
const serverFilesRoot = pResolve(__dirname, '..', '..', 'src', 'server');
const namespaces = {
  root: 'VK\\Elephize',
  builtins: 'VK\\Elephize\\Builtins',
};
const ignoredImports: CliOptions['ignoreImports'] = new Set([
  'src/__tests__/specimens/misc/__toIgnore.ts',
  'src/__tests__/specimens/misc/__toIgnoreFolder/*.ts',
]);
const replacedImports: CliOptions['replaceImports'] = {
  'src/__tests__/specimens/misc/toReplace.ts': {
    implementationPath: 'src/__tests__/specimens/ToReplace.php',
    implementationClass: 'ToReplace',
  },
};
const compilerOptions = {
  baseUrl: baseDir,
  paths: {
    '#aliasedTestFolder/*': ['src/__tests__/*'],
  },
};

export function runBatch(basePath: string[], testSuite: string[][], log: LogObj) {
  const promises: Array<Promise<any>> = [];

  translateCode(testSuite.map((path) => pResolve(...basePath, ...path)), ignoredImports, replacedImports, compilerOptions.paths, log, {
    baseDir,
    aliases: {},
    namespaces,
    serverFilesRoot,
    encoding: 'utf-8',
    options: compilerOptions,
    onData: (sourceFilename: string, targetFilename: string, content: string) => onData(basePath, promises, targetFilename, content),
  });

  return Promise.all(promises)
    .then(() => new Promise((resolve) => setTimeout(resolve, 500)));
}

function onData(basePath: string[], promises: Array<Promise<any>>, filename: string, content: string) {
  process.stdout.write('[data received] ' + filename + '\n');
  promises.push(new Promise((resolve) => {
    const resultFileName = normalizeFileExt(filename);
    const cont = prettier.format(content, phpPrettierOptions);
    writeFileSync(resultFileName + '.result', cont, 'utf-8');
    expect(cont).toBeTruthy();
    expect(cont, 'Failed in file: ' + filename)
      .toEqual(prettier.format(readFileSync(resultFileName, 'utf-8'), phpPrettierOptions));
    process.stdout.write('[test ok] ' + filename.replace(pResolve(...basePath), '') + '\n');
    unlinkSync(resultFileName + '.result');
    resolve(null);
  }));
}
