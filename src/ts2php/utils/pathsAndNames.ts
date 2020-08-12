import { Dict } from '../types';
import { log, LogSeverity } from './log';
import * as path from 'path';
import * as fs from 'fs';

export function camelize(ident: string): string {
  return ident.replace(
    /([a-z])_([a-z])/g,
    (substring: string, let1: string, let2: string) => `${let1}${let2.toUpperCase()}`
  );
}

export function snakify(ident: string): string {
  return ident.replace(
    /([a-z])([A-Z])/g,
    (substring: string, let1: string, let2: string) => `${let1}_${let2.toLowerCase()}`
  );
}

export function normalizeVarName(ident: string) {
  return ident.startsWith('$') ? camelize(ident.substr(1)) : ident;
}

export function normalizeFileExt(filename: string, replaceWith = '.php') {
  return filename.replace(/(\.php)?\.(ts|tsx|js|jsx)$/g, replaceWith);
}

/**
 * Output: no leading slash!
 *
 * @param filename
 * @param baseDir
 * @param aliases
 */
export function normalizeBasePath(filename: string, baseDir: string, aliases?: Dict<string>) {
  const nrm = filename
    .replace(new RegExp('^' + baseDir), '')
    .replace(/^\/+/, '');

  if (aliases) {
    for (let path in aliases) {
      if (!aliases.hasOwnProperty(path)) {
        continue;
      }

      const alias = aliases[path];
      path = path.replace(/^\/+/, '');
      if (nrm.startsWith(path)) {
        return nrm.replace(path, alias.replace(/^\/+/, ''));
      }
    }
  }

  return nrm;
}

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function classNameFromPath(normalizedPath: string) {
  const pieces = normalizedPath.split('/');
  const fn = capitalize(pieces.pop()?.split('.')[0] || '');
  return fn.replace(/\./g, '_') + 'Module';
}

export function resolveAliasesAndPaths(
  targetPath: string,
  currentDir: string,
  baseDir: string,
  tsPaths: { [key: string]: string [] },
  outputAliases: { [key: string]: string },
  skipOutputAliases?: boolean
): string | null {
  targetPath = targetPath.replace(/\.[jt]sx?$/, '');
  for (const pathOrig in tsPaths) {
    if (pathOrig === '*') {
      throw new Error('Asterisk-only aliases are not supported');
    }

    const pathToTry = pathOrig.replace(/\*$/g, '');

    if (targetPath.startsWith(pathToTry)) {
      log('Trying paths for location: ' + pathToTry, LogSeverity.INFO);
      return _applyOutputAliases(tsPaths[pathOrig].reduce((acc, name) => {
        if (acc) {
          return acc;
        }
        const target = targetPath.replace(pathToTry, name.replace(/\*$/g, ''));
        const tPath = target.startsWith('/')
          ? target // absolute path, no need to resolve
          : path.resolve(baseDir, target);
        log('Trying to locate file: ' + tPath, LogSeverity.INFO);
        const fn = _lookupFile(tPath);
        if (fn) {
          return fn;
        }
        return undefined;
      }, undefined), baseDir, outputAliases, skipOutputAliases);
    }
  }

  log('Trying non-aliased path: ' + path.resolve(currentDir, targetPath).replace(baseDir, '[base]'), LogSeverity.INFO);
  return _applyOutputAliases(_lookupFile(path.resolve(currentDir, targetPath)), baseDir, outputAliases, skipOutputAliases);
}

function _applyOutputAliases(path = '', baseDir: string, outputAliases: { [key: string]: string }, skip?: boolean): string {
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

function _lookupFile(path: string) {
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