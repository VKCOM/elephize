import * as path from 'path';
import { resolve as pResolve } from 'path';
import { translateCodeAndWatch } from '../ts2php/components/codegen/translateCode';
import { readFileSync, writeFileSync } from 'fs';
import ncp = require('ncp');
import * as diff from 'diff';

type WatcherTestEnvConfigEntry = {
  description: string;
  seeAlso?: string[];
  diffs: {
    // Note: file name of specimen must match output file name that elephize suggests. Extension may vary.
    [key: string]: string[];
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
const seeAlsoMap: { [key: string]: string } = {};

export function runWatcherTests(watcherTestConfig: WatcherTestEnvConfig) {
  jest.setTimeout(20000);
  Object.keys(watcherTestConfig).forEach((key) => {
    watcherTestConfig[key].seeAlso?.forEach((val) => {
      seeAlsoMap[pResolve(__dirname, 'watchSpecimens.~', val)] = pResolve(__dirname, 'watchSpecimens.~', key);
    });
  });

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
          const elapsed = verifyLastDiff(sourceFilename, targetFilename, content, watcherTestConfig);
          if (elapsed === 0) {
            close();
            resolve();
          }
        }
      },
      onFinish: () => {
        if (!allFilesCollected) {
          allFilesCollected = true;
          applyDiffs(allAffectedFiles, watcherTestConfig); // this starts recompilation chain
        }
      }
    });
  });
}

function applyDiffs(affectedFiles: string[], watcherTestConfig: WatcherTestEnvConfig) {
  affectedFiles.forEach((filename) => {
    const file = path.basename(filename);
    if (!watcherTestConfig[file]) {
      return;
    }
    lastAppliedDiffs[file] = 0;
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

function verifyLastDiff(sourceFilename: string, targetFilename: string, content: string, watcherTestConfig: WatcherTestEnvConfig) {
  let name = path.basename(sourceFilename);
  if (!watcherTestConfig[name]) {
    name = path.basename(seeAlsoMap[sourceFilename]);
    if (!watcherTestConfig[name]) {
      throw new Error(`Failed to get watcher test config for filename ${name}`);
    }
  }
  const diffToVerify = Object.keys(watcherTestConfig[name].diffs)[lastAppliedDiffs[name]];

  let checkedAtLeastOneFile = false;
  watcherTestConfig[name].diffs[diffToVerify].forEach((fn) => {
    if (path.basename(fn).split('.')[0] !== path.basename(targetFilename).split('.')[0]) {
      return;
    }

    const expectedContent = readFileSync(
      pResolve(__dirname, 'watchSpecimens.~', fn),
      { encoding: 'utf-8' }
    );
    expect(expectedContent).toEqual(content);
    process.stdout.write('[VERIFIED] ' + fn + '\n');
    checkedAtLeastOneFile = true;
  });

  expect(checkedAtLeastOneFile).toEqual(true);

  const nextDiffFn = Object.keys(watcherTestConfig[name].diffs)[lastAppliedDiffs[name] + 1];
  const nextDiff = nextDiffFn && pResolve(__dirname, 'watchSpecimens.~', nextDiffFn);

  const currentDiffsElapsed = diffsElapsed;
  if (nextDiff) {
    lastAppliedDiffs[name] += 1;
    diffsElapsed -= 1;

    const cwd = process.cwd();
    process.chdir(pResolve(__dirname, 'watchSpecimens.~'));
    applyPatch(nextDiff);
    process.chdir(cwd);
  }
  return currentDiffsElapsed;
}

function applyPatch(patchFile: string) {
  let patch = readFileSync(patchFile, { encoding: 'utf8' });

  let sourceFileMatch = /--- ([^ \n\r\t]+).*/.exec(patch);
  let sourceFile;
  if (sourceFileMatch && sourceFileMatch[1]) {
    sourceFile = sourceFileMatch[1];
  } else {
    throw Error(`Unable to find source file in '${patchFile}'`);
  }
  let destinationFileMatch = /\+\+\+ ([^ \n\r\t]+).*/.exec(patch);
  let destinationFile;
  if (destinationFileMatch && destinationFileMatch[1]) {
    destinationFile = destinationFileMatch[1];
  } else {
    throw Error(`Unable to find destination file in '${patchFile}'`);
  }

  let original = readFileSync(sourceFile, { encoding: 'utf8' });
  let patched = diff.applyPatch(original, patch);

  if (!patched) {
    throw Error(`Failed to apply patch '${patchFile}' to '${sourceFile}'`);
  }

  writeFileSync(destinationFile, patched);
}
