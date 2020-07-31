import * as path from 'path';
import { resolve as pResolve } from 'path';
import { translateCodeAndWatch } from '../ts2php/components/codegen/translateCode';
import { readFileSync } from 'fs';
import ncp = require('ncp');
const { applyPatch } = require('apply-patch');

type WatcherTestEnvConfigEntry = {
  description: string;
  diffs: {
    [key: string]: string;
  };
};

type WatcherTestEnvConfig = { [filename: string]: WatcherTestEnvConfigEntry };

const baseDir = path.resolve(__dirname, '..', '..');
const namespaces = {
  root: 'VK\\Elephize',
  builtins: 'VK\\Elephize\\Builtins'
};
const compilerOptions = {
  baseUrl: baseDir,
  paths: {
    '#aliasedTestFolder/*': ['src/__tests__/*']
  }
};
const customGlobals = {
  // js -> php
  'getLang': 'CustomIso::getLang'
};

const lastAppliedDiffs: { [key: string]: number } = {};
let diffsElapsed = 0;

export function runWatcherTests(watcherTestConfig: WatcherTestEnvConfig) {
  jest.setTimeout(10000);
  return new Promise((resolve) => {
    const bSrc = pResolve(__dirname, 'watchSpecimens');
    const bTgt = pResolve(__dirname, 'watchSpecimens.~');
    ncp(bSrc, bTgt, {}, (err) => {
      if (!err) {
        process.stdout.write('Watcher test files successfully prepared');
      }
    });

    const files = Object.keys(watcherTestConfig).map((entry) => pResolve(__dirname, 'watchSpecimens.~', entry));
    const allAffectedFiles: string[] = [];
    let allFilesCollected = false;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let close = () => {};

    translateCodeAndWatch(files /* here we should pass a single entrypoint! */, {
      baseDir,
      aliases: {},
      namespaces,
      customGlobals,
      options: compilerOptions,
      getCloseHandle: (handle) => close = handle,
      onData: (sourceFilename: string, targetFilename: string, content: string) => {
        if (!allFilesCollected) {
          allAffectedFiles.push(sourceFilename);
        } else {
          verifyLastDiff(sourceFilename, content, watcherTestConfig);
        }
      },
      onFinish: () => {
        if (!allFilesCollected) {
          allFilesCollected = true;
          applyDiffs(allAffectedFiles, watcherTestConfig); // this starts recompilation chain
        }
        if (diffsElapsed === 0) {
          close();
          resolve();
        }
      }
    });
  });
}

function applyDiffs(affectedFiles: string[], watcherTestConfig: WatcherTestEnvConfig) {
  affectedFiles.forEach((filename) => {
    lastAppliedDiffs[filename] = 0;
    const file = path.basename(filename);
    diffsElapsed += Object.keys(watcherTestConfig[file].diffs).length - 1;
    const firstDiff = pResolve(
      __dirname, 'watchSpecimens.~',
      Object.keys(watcherTestConfig[file].diffs)[0]
    );

    if (!firstDiff) {
      return;
    }

    const cwd = process.cwd();
    process.chdir(pResolve(__dirname, 'watchSpecimens.~'));
    applyPatch(firstDiff);
    process.chdir(cwd);
  });
}

function verifyLastDiff(sourceFilename: string, content: string, watcherTestConfig: WatcherTestEnvConfig) {
  const diffToVerify = Object.keys(watcherTestConfig[sourceFilename].diffs)[lastAppliedDiffs[sourceFilename]];
  const expectedContent = readFileSync(watcherTestConfig[sourceFilename].diffs[diffToVerify], { encoding: 'utf-8' });
  expect(expectedContent).toEqual(content);

  const nextDiff = pResolve(
    __dirname, 'watchSpecimens.~',
    Object.keys(watcherTestConfig[sourceFilename].diffs)[lastAppliedDiffs[sourceFilename] + 1]
  );

  if (nextDiff) {
    lastAppliedDiffs[sourceFilename] += 1;
    diffsElapsed -= 1;

    const cwd = process.cwd();
    process.chdir(pResolve(__dirname, 'watchSpecimens.~'));
    applyPatch(nextDiff);
    process.chdir(cwd);
  }
}