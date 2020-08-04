import * as path from 'path';
import { resolve as pResolve } from 'path';
import { translateCodeAndWatch } from '../ts2php/components/codegen/translateCode';
import { readFileSync, writeFileSync } from 'fs';
import '../ts2php/utils/log';
import * as diff from 'diff';
import * as rimraf from 'rimraf';
import { log, LogSeverity } from '../ts2php/utils/log';
import ncp = require('ncp');

export type WatcherTestQueueItem = {
  entry: string;
  diff: string;
  checkFiles: string[][]; // src.ts -> target.php
  expectError?: number;
};

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

let lastDiffApplied = 0;
export function runWatcherTests(watcherTestConfig: WatcherTestQueueItem[]) {
  jest.setTimeout(200000);

  return new Promise((resolve) => {
    const bSrc = pResolve(__dirname, 'watchSpecimens');
    const bTgt = pResolve(__dirname, 'watchSpecimens.~');
    rimraf(bTgt, (err) => {
      if (err) {
        throw err;
      }

      ncp(bSrc, bTgt, {}, (err) => {
        if (!err) {
          log('Watcher test files successfully prepared', LogSeverity.INFO);
        } else {
          throw err;
        }

        const files = Array.from(watcherTestConfig.reduce((acc, item) => acc.add(item.entry), new Set<string>()));
        let allFilesCollected = false;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let close = () => {};

        log('Triggering watcher tests for: \n   ' + files.map((f) => f.replace(__dirname, '')).join('\n   '), LogSeverity.INFO);
        translateCodeAndWatch([pResolve(__dirname, 'watchSpecimens.~', 'index.ts')], {
          baseDir,
          aliases: {},
          namespaces,
          customGlobals,
          options: compilerOptions,
          getCloseHandle: (handle) => close = handle,
          onData: (sourceFilename: string, targetFilename: string, content: string, error?: number) => {
            if (allFilesCollected) {
              verifyDiff(sourceFilename, targetFilename, content, error, watcherTestConfig);
            }
          },
          onFinish: () => {
            if (!allFilesCollected) {
              allFilesCollected = true;
              lastDiffApplied = -1;
            }
            lastDiffApplied++;
            applyNextDiff(watcherTestConfig[lastDiffApplied]);

            if (lastDiffApplied === watcherTestConfig.length) {
              close();
              resolve();
            }
          }
        });
      });
    });
  });
}

function applyNextDiff(nextDiff: WatcherTestQueueItem) {
  if (!nextDiff) {
    return;
  }
  log(`Applying diff ${nextDiff.diff} @ ${nextDiff.entry}`, LogSeverity.INFO);
  const diff = pResolve(__dirname, 'watchSpecimens.~', nextDiff.diff);
  const cwd = process.cwd();
  process.chdir(pResolve(__dirname, 'watchSpecimens.~'));
  applyPatch(diff);
  process.chdir(cwd);
}

function verifyDiff(sourceFilename: string, targetFilename: string, content: string, error: number | undefined, conf: WatcherTestQueueItem[]) {
  const diff = conf[lastDiffApplied];
  const checkedFileIndex = diff.checkFiles.findIndex((el) => el[0] === path.basename(sourceFilename));
  if (checkedFileIndex === -1) {
    log(`Not found ${path.basename(sourceFilename)} in ${diff.checkFiles.join(', ')}`, LogSeverity.WARN);
    return;
  }
  const checkedFile = diff.checkFiles[checkedFileIndex];
  const expectedContent = readFileSync(pResolve(__dirname, 'watchSpecimens.~', checkedFile[1]), { encoding: 'utf-8' });
  try {
    expect(content).toEqual(expectedContent);
    if (diff.expectError) {
      expect(error).toEqual(diff.expectError);
    } else {
      expect(error).toBeFalsy();
    }
    log(`[VERIFIED] ${checkedFile[0]} after ${diff.diff}`, LogSeverity.INFO);
  } catch (e) {
    log(`[FAILED] ${checkedFile[0]} after ${diff.diff}`, LogSeverity.ERROR);
    fail({
      name: 'Test failed',
      message: `${checkedFile[0]} after ${diff.diff}\n`,
      stack: e.stack
    });
  }
}

function applyPatch(patchFile: string) {
  let patch = readFileSync(patchFile, { encoding: 'utf8' });

  let sourceFileMatch = /--- ([^ \n\r\t]+).*/.exec(patch);
  let sourceFile;
  if (sourceFileMatch && sourceFileMatch[1]) {
    sourceFile = sourceFileMatch[1];
  } else {
    log(`Unable to find source file in '${patchFile}'`, LogSeverity.ERROR);
    return;
  }
  let destinationFileMatch = /\+\+\+ ([^ \n\r\t]+).*/.exec(patch);
  let destinationFile;
  if (destinationFileMatch && destinationFileMatch[1]) {
    destinationFile = destinationFileMatch[1];
  } else {
    log(`Unable to find destination file in '${patchFile}'`, LogSeverity.ERROR);
    return;
  }

  let original = readFileSync(sourceFile, { encoding: 'utf8' });
  let patched = diff.applyPatch(original, patch);

  if (!patched) {
    log(`Failed to apply patch '${patchFile}' to '${sourceFile}'`, LogSeverity.ERROR);
  }

  writeFileSync(destinationFile, patched);
}
