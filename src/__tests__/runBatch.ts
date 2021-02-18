import * as path from 'path';
import { resolve as pResolve } from 'path';
import { translateCode } from '../ts2php/components/codegen/translateCode';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { normalizeFileExt } from '../ts2php/utils/pathsAndNames';
import * as prettier from 'prettier/standalone';
import { phpPrettierOptions } from '../ts2php/internalConfig/phpPrettierOptions';
import { resolveRulePaths } from '../ts2php/components/cjsModules/resolveModules';
import { CliOptions } from '../ts2php/types';
import { LogObj } from '../ts2php/utils/log';

const baseDir = path.resolve(__dirname, '..', '..');
const namespaces = {
  root: 'VK\\Elephize',
  builtins: 'VK\\Elephize\\Builtins'
};
const importRules: CliOptions['importRules'] = {
  'src/__tests__/specimens/misc/toReplace.ts': {
    ignore: false,
    implementationPath: 'src/__tests__/specimens/ToReplace.php',
    implementationClass: 'ToReplace'
  },
  'src/__tests__/specimens/misc/__toIgnore.ts': {
    ignore: true
  }
};
const compilerOptions = {
  baseUrl: baseDir,
  paths: {
    '#aliasedTestFolder/*': ['src/__tests__/*']
  }
};

export function runBatch(basePath: string[], testSuite: string[][], log: LogObj) {
  let promises: Array<Promise<any>> = [];

  translateCode(testSuite.map((path) => pResolve(...basePath, ...path)), resolveRulePaths(importRules, baseDir), compilerOptions.paths, log, {
    baseDir,
    aliases: {},
    namespaces,
    encoding: 'utf-8',
    options: compilerOptions,
    onData: (sourceFilename: string, targetFilename: string, content: string) => onData(basePath, promises, targetFilename, content)
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
    resolve();
  }));
}
