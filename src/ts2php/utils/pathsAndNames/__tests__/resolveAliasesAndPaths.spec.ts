import * as path from 'path';

import { configureLogging } from '../../../components/cli/configureLogging';

import { resolveAliasesAndPaths } from '../resolveAliasesAndPaths';

const baseDir = path.resolve(__dirname, 'specimens');
const currentDir = path.resolve(baseDir, 'module');

let logger: ReturnType<typeof configureLogging>;
type Warn = (typeof logger)['warn'];
let warnSpy: jest.SpyInstance<ReturnType<Warn>, Parameters<Warn>>;
let baseParams: Parameters<typeof resolveAliasesAndPaths>[0];

beforeEach(() => {
  logger = configureLogging({
    baseDir,
    outDir: '',
    verbose: true,
  });
  warnSpy = jest.spyOn(logger, 'warn');
  baseParams = {
    originalSourcePath: '',
    currentDir,
    baseDir,
    tsPaths: {},
    sourceExtensions: ['.ts', '.tsx', '.js', '.jsx'],
    logger,
    outputAliases: {},
    skipOutputAliases: true,
  };
});

describe('resolveAliasesAndPaths', () => {
  describe('file in the same folder', () => {
    test('JavaScript file with extension. It could be js, ts, jsx or tsx', () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: './fileInSameFolder.ts',
      })).toEqual(path.resolve(currentDir, 'fileInSameFolder.ts'));
    });

    test('JavaScript file without extension. It could be js, ts, jsx or tsx', () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: './fileInSameFolder',
      })).toEqual(path.resolve(currentDir, 'fileInSameFolder.ts'));
    });

    test('Not a JavaScript file. Styles or pictures can be imported.', () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: './fileInSameFolder.css',
      })).toEqual(path.resolve(currentDir, 'fileInSameFolder.css'));
    });
  });

  describe('file in a subfolder', () => {
    test('JavaScript file with extension. It could be js, ts, jsx or tsx', () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: './subfolder/fileInSubfolder.ts',
      })).toEqual(path.resolve(currentDir, 'subfolder', 'fileInSubfolder.ts'));
    });

    test('JavaScript file without extension. It could be js, ts, jsx or tsx', () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: './subfolder/fileInSubfolder',
      })).toEqual(path.resolve(currentDir, 'subfolder', 'fileInSubfolder.ts'));
    });

    test('Not a JavaScript file. Styles or pictures can be imported.', () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: './subfolder/fileInSubfolder.css',
      })).toEqual(path.resolve(currentDir, 'subfolder', 'fileInSubfolder.css'));
    });
  });

  describe('file in a root folder', () => {
    test('JavaScript file with extension. It could be js, ts, jsx or tsx', () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: './../fileInRootFolder.ts',
      })).toEqual(path.resolve(currentDir, '..', 'fileInRootFolder.ts'));
    });

    test('JavaScript file without extension. It could be js, ts, jsx or tsx', () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: './../fileInRootFolder',
      })).toEqual(path.resolve(currentDir, '..', 'fileInRootFolder.ts'));
    });

    test('Not a JavaScript file. Styles or pictures can be imported.', () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: './../fileInRootFolder.css',
      })).toEqual(path.resolve(currentDir, '..', 'fileInRootFolder.css'));
    });
  });

  test('Should try to find an index file, if originalSourcePath is a folder', () => {
    expect(resolveAliasesAndPaths({
      ...baseParams,
      originalSourcePath: './otherModule',
    })).toEqual(path.resolve(currentDir, 'otherModule', 'index.ts'));
  });

  test('If there are a script file and a folder with an index file, warning should be printed.', () => {
    resolveAliasesAndPaths({
      ...baseParams,
      originalSourcePath: './oneMoreModule',
    });
    expect(warnSpy).toBeCalled();
  });

  test('Should return empty string, if file is not exist', () => {
    expect(resolveAliasesAndPaths({
      ...baseParams,
      originalSourcePath: './notExistFile',
    })).toEqual('');
  });

  /*
  * see https://www.typescriptlang.org/tsconfig#paths
  * https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
  */
  describe('tsconfig paths', () => {
    test(('Should resolve ts-aliases'), () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: '#first/moduleInTsFirstPath',
        tsPaths: {
          '#first/*': ['fromTsPaths_first/*'],
        },
      })).toEqual(path.resolve(baseDir, 'fromTsPaths_first', 'moduleInTsFirstPath.ts'));
    });

    test(('Should resolve ts-aliases (index file)'), () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: '#first/subModule',
        tsPaths: {
          '#first/*': ['fromTsPaths_first/*'],
        },
      })).toEqual(path.resolve(baseDir, 'fromTsPaths_first', 'subModule', 'index.ts'));
    });

    test(('Should resolve ts-aliases (several paths)'), () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: '#second/moduleInTsSecondPath',
        tsPaths: {
          '#first/*': ['fromTsPaths_first/*'],
          '#second/*': ['fromTsPaths_second/*'],
        },
      })).toEqual(path.resolve(baseDir, 'fromTsPaths_second', 'moduleInTsSecondPath.ts'));
    });

    test(('Should resolve ts-alias with first suitable path'), () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: '#module/moduleInTsSecondPath',
        tsPaths: {
          '#module/*': ['fromTsPaths_first/*', 'fromTsPaths_second/*', 'fromTsPaths_other/*'],
        },
      })).toEqual(path.resolve(baseDir, 'fromTsPaths_second', 'moduleInTsSecondPath.ts'));
    });

    test('Should throw an error if tsPaths contains *', () => {
      expect(() => resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: '#module/moduleInTsSecondPath',
        tsPaths: {
          '*': ['fromTsPaths_second/*'],
        },
      })).toThrowError();
    });

    test(('Should resolve ts-alias with absolute path'), () => {
      expect(resolveAliasesAndPaths({
        ...baseParams,
        originalSourcePath: '#module/moduleInTsSecondPath',
        tsPaths: {
          '#module/*': [`${path.resolve(baseDir, 'fromTsPaths_second')}/*`],
        },
      })).toEqual(path.resolve(baseDir, 'fromTsPaths_second', 'moduleInTsSecondPath.ts'));
    });
  });
  // Add test for outputAliases
});
