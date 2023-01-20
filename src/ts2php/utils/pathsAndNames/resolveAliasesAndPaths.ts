import * as nodePath from 'path';
import * as fs from 'fs';

import { LogObj } from '../../types';

/*
  I think, this function should not add outputAliases.
  The main aim of this function is resolving
  absolute paths to files from import expressions.
  Like webpack or TS compiler does.
 */
export function resolveAliasesAndPaths({
  originalSourcePath,
  currentDir,
  baseDir,
  tsPaths,
  logger,
  outputAliases,
  skipOutputAliases,
}: {
  originalSourcePath: string;
  logger: LogObj;
  currentDir: string;
  baseDir: string;
  tsPaths: Record<string, string[]>;
  outputAliases: Record<string, string>;
  skipOutputAliases?: boolean;
}): string {
  checkTsPath(tsPaths);
  return applyOutputAliases({
    path: resolvePath({
      originalSourcePath,
      currentDir,
      baseDir,
      tsPaths,
      logger,
    }),
    baseDir,
    outputAliases,
    skip: skipOutputAliases,
  });
}

function checkTsPath(tsPaths: Record<string, string[]>) {
  Object.keys(tsPaths).forEach((prefix) => {
    if (prefix === '*') {
      throw new Error('Asterisk-only aliases are not supported');
    }
  });
}

export function resolvePath({
  originalSourcePath,
  currentDir,
  baseDir,
  tsPaths,
  logger,
}: {
  originalSourcePath: string;
  logger: LogObj;
  currentDir: string;
  baseDir: string;
  tsPaths: Record<string, string[]>;
}): string | undefined {
  for (const possibleTsPath of makePossibleTsPaths({ originalSourcePath, tsPaths })) {
    const path = tryToFindFile({
      path: possibleTsPath,
      root: possibleTsPath.startsWith('/') ? '' : baseDir,
      logger,
    });
    if (path !== undefined) {
      return path;
    }
  }

  return tryToFindFile({ path: originalSourcePath, root: currentDir, logger });
}

function makePossibleTsPaths({
  originalSourcePath,
  tsPaths,
}: {
  originalSourcePath: string;
  tsPaths: Record<string, string[]>;
}) {
  return Object.keys(tsPaths)
    .reduce<string[]>(
    (acc, key) => {
      const prefix = removeAsterisk(key);
      if (originalSourcePath.startsWith(prefix)) {
        return acc.concat(
          tsPaths[key]
            .map(removeAsterisk)
            .map((path) => originalSourcePath.replace(prefix, path))
        );
      }
      return acc;
    }, []);
}

function removeAsterisk(path: string) {
  return path.replace(/\*$/g, '');
}

function tryToFindFile({
  path,
  root,
  logger,
}: {
  path: string;
  root: string;
  logger: LogObj;
}): string | undefined {
  const preFullPath = nodePath.resolve(root, path);
  const fullPath = lookupSourceFile(preFullPath);

  if (fs.existsSync(preFullPath) && fs.lstatSync(preFullPath).isDirectory()) {
    const indexPath = nodePath.join(preFullPath, 'index');
    logger.info('Trying non-aliased index path: %s', [indexPath]);
    const fullPathIndex = lookupSourceFile(indexPath);

    if (fullPathIndex) {
      if (fullPath) {
        logger.warn('Found both directory and file with the same basename. It may cause problems: %s', [fullPathIndex]);
      }

      return fullPathIndex;
    }
  }

  return fullPath;
}

function lookupSourceFile(path: string) {
  return [
    path + '.js',
    path + '.jsx',
    path + '.ts',
    path + '.tsx',
    path,
  ].reduce((acc, name) => {
    if (acc) {
      return acc;
    }
    if (fs.existsSync(name)) {
      return name;
    }
    return undefined;
  }, undefined);
}

function applyOutputAliases({
  path = '',
  baseDir,
  outputAliases,
  skip,
}: {
  path?: string;
  baseDir: string;
  outputAliases: Record<string, string>;
  skip?: boolean;
}): string {
  if (!path) {
    return '';
  }

  if (skip) {
    return path;
  }

  return baseDir + Object.keys(outputAliases).reduce((acc, aliasKey) => {
    if (acc.startsWith(aliasKey)) {
      return acc.replace(aliasKey, outputAliases[aliasKey]);
    }
    return acc;
  }, path.replace(baseDir, ''));
}
