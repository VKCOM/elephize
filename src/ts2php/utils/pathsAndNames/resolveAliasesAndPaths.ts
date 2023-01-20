import * as nodePath from 'path';
import * as fs from 'fs';

import { LogObj } from '../../types';

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
  originalSourcePath = originalSourcePath.replace(/\.[jt]sx?$/, '');
  for (const pathOrig in tsPaths) {
    if (!tsPaths.hasOwnProperty(pathOrig)) {
      continue;
    }

    if (pathOrig === '*') {
      throw new Error('Asterisk-only aliases are not supported');
    }

    const pathToTry = pathOrig.replace(/\*$/g, '');

    if (originalSourcePath.startsWith(pathToTry)) {
      logger.info('Trying paths for location: %s', [pathToTry]);
      return applyOutputAliases({ path: tsPaths[pathOrig].reduce((acc, name) => {
        if (acc) {
          return acc;
        }
        const target = originalSourcePath.replace(pathToTry, name.replace(/\*$/g, ''));
        const tPath = target.startsWith('/') ?
          target : // absolute path, no need to resolve
          nodePath.resolve(baseDir, target);
        logger.info('Trying to locate file: %s', [tPath]);

        const fn = lookupSourceFile(tPath);

        if (fs.existsSync(tPath) && fs.lstatSync(tPath).isDirectory) {
          const tIndexPath = nodePath.join(tPath, 'index');
          logger.info('Trying to locate index file: %s', [tIndexPath]);
          const fnIndex = lookupSourceFile(tIndexPath);

          if (fnIndex) {
            if (fn) {
              logger.warn('Found both directory and file with the same basename. It may cause problems: %s', [fnIndex]);
            }

            return fnIndex;
          }
        }

        if (fn) {
          return fn;
        }
        return undefined;
      }, undefined), baseDir, outputAliases, skip: skipOutputAliases });
    }
  }

  const tPath = nodePath.resolve(currentDir, originalSourcePath);

  logger.info('Trying non-aliased path: %s', [tPath.replace(baseDir, '[base]')]);
  const fn = lookupSourceFile(tPath);
  if (fs.existsSync(tPath) && fs.lstatSync(tPath).isDirectory) {
    const tIndexPath = nodePath.join(tPath, 'index');
    logger.info('Trying non-aliased index path: %s', [tIndexPath]);
    const fnIndex = lookupSourceFile(tIndexPath);

    if (fnIndex) {
      if (fn) {
        logger.warn('Found both directory and file with the same basename. It may cause problems: %s', [fnIndex]);
      }

      return applyOutputAliases({ path: fnIndex, baseDir, outputAliases, skip: skipOutputAliases });
    }
  }

  return applyOutputAliases({ path: fn, baseDir, outputAliases, skip: skipOutputAliases } );
}

function lookupSourceFile(path: string) {
  return [
    path + '.js',
    path + '.jsx',
    path + '.ts',
    path + '.tsx',
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
