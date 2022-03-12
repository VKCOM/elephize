import { resolve as pResolve, basename as pBasename } from 'path';
import { translateCodeAndWatch } from '../ts2php/components/codegen/translateCode';
import { configureLogging } from '../ts2php/components/cli/configureLogging';
import { readFileSync, writeFileSync } from 'fs';
import * as diff from 'diff';
import * as rimraf from 'rimraf';
import ncp = require('ncp');
import DoneCallback = jest.DoneCallback;

export type WatcherTestQueueItem = {
  entry: string;
  diff: string;
  checkFiles: string[][]; // src.ts -> target.php
  expectError?: number;
};

const testResultPostfix = '___'; // This must contain only valid symbols for namespace naming

const baseDir = pResolve(__dirname);
const serverFilesRoot = pResolve(__dirname, '..', '..', 'src', 'server');
const namespaces = {
  root: '',
  builtins: 'VK\\Elephize\\Builtins',
};
const ignoreImportRules: Set<string> = new Set();
const replaceImportRules = { };
const compilerOptions = {
  baseUrl: baseDir,
  paths: {
    '#specimens/*': ['specimens'],
  },
};

const log = configureLogging({
  baseDir, outDir: '',
});

let lastDiffApplied = 0;
export function runWatcherTests(watcherTestConfig: WatcherTestQueueItem[], done: DoneCallback) {
  jest.setTimeout(200000);

  return new Promise((resolve) => {
    const bSrc = pResolve(__dirname, 'watchSpecimens');
    const bTgt = pResolve(__dirname, 'watchSpecimens' + testResultPostfix);
    rimraf(bTgt, (err) => {
      if (err) {
        throw err;
      }

      ncp(bSrc, bTgt, {}, (err) => {
        if (!err) {
          console.info('Watcher test files successfully prepared');
        } else {
          throw err;
        }

        const files = Array.from(watcherTestConfig.reduce((acc, item) => acc.add(item.entry), new Set<string>()));
        let allFilesCollected = false;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let close = () => {};

        console.info('Triggering watcher tests for: \n   %s', [files.map((f) => f.replace(__dirname, '')).join('\n   ')]);
        translateCodeAndWatch(files.map((f) => pResolve(__dirname, 'watchSpecimens' + testResultPostfix, f)), ignoreImportRules, replaceImportRules, compilerOptions.paths, log, {
          baseDir,
          aliases: {},
          namespaces,
          serverFilesRoot,
          encoding: 'utf-8',
          printImportTree: false,
          options: compilerOptions,
          jsxPreferences: {},
          hooks: {},
          getCloseHandle: (handle) => close = handle,
          onData: (sourceFilename: string, targetFilename: string, content: string, error?: number) => {
            if (allFilesCollected) {
              verifyDiff(targetFilename, content, error, watcherTestConfig, done);
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
              resolve(null);
              done();
            }
          },
        });
      });
    });
  });
}

function applyNextDiff(nextDiff: WatcherTestQueueItem) {
  if (!nextDiff) {
    return;
  }
  console.info('Applying diff %s @ %s', nextDiff.diff, nextDiff.entry);
  const diff = pResolve(__dirname, 'watchSpecimens' + testResultPostfix, nextDiff.diff);
  const cwd = process.cwd();
  process.chdir(pResolve(__dirname, 'watchSpecimens' + testResultPostfix));
  applyPatch(diff);
  process.chdir(cwd);
}

function verifyDiff(targetFilename: string, content: string, error: number | undefined, conf: WatcherTestQueueItem[], done: DoneCallback) {
  const diff = conf[lastDiffApplied];
  const checkedFileIndex = diff.checkFiles.findIndex((el) => el[0] === pBasename(targetFilename));
  if (checkedFileIndex === -1) {
    console.warn('Not found %s in %s', pBasename(targetFilename), diff.checkFiles.join(', '));
    return;
  }
  const checkedFile = diff.checkFiles[checkedFileIndex];
  const expectedContent = readFileSync(pResolve(__dirname, 'watchSpecimens' + testResultPostfix, checkedFile[1]), { encoding: 'utf-8' });
  try {
    expect(content).toEqual(expectedContent);
    if (diff.expectError) {
      expect(error).toEqual(diff.expectError);
    } else {
      expect(error).toBeFalsy();
    }
    console.info('[VERIFIED] %s after %s', checkedFile[0], diff.diff);
  } catch (e) {
    console.error('[FAILED] %s after %s', checkedFile[0], diff.diff);
    done.fail(e);
  }
}

function applyPatch(patchFile: string) {
  const patch = readFileSync(patchFile, { encoding: 'utf8' });

  const sourceFileMatch = /--- ([^ \n\r\t]+).*/.exec(patch);
  let sourceFile;
  if (sourceFileMatch && sourceFileMatch[1]) {
    sourceFile = sourceFileMatch[1];
  } else {
    console.error('Unable to find source file in "%s"', patchFile);
    return;
  }
  const destinationFileMatch = /\+\+\+ ([^ \n\r\t]+).*/.exec(patch);
  let destinationFile;
  if (destinationFileMatch && destinationFileMatch[1]) {
    destinationFile = destinationFileMatch[1];
  } else {
    console.error('Unable to find destination file in "%s"', patchFile);
    return;
  }

  const original = readFileSync(sourceFile, { encoding: 'utf8' });
  const patched = diff.applyPatch(original, patch);

  if (!patched) {
    console.error('Failed to apply patch "%s" to "%s"', patchFile, sourceFile);
  }

  writeFileSync(destinationFile, patched);
}
