import { Dict } from '../types';
import { LogObj } from './log';
import * as path from 'path';
import * as fs from 'fs';

const PHP_KEYWORDS = [
  '__halt_compiler', 'abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch', 'class',
  'clone', 'const', 'continue', 'declare', 'default', 'die', 'do', 'echo', 'else', 'elseif', 'empty',
  'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile', 'eval', 'exit', 'extends',
  'final', 'for', 'foreach', 'function', 'global', 'goto', 'if', 'implements', 'include', 'include_once',
  'instanceof', 'insteadof', 'interface', 'isset', 'list', 'namespace', 'new', 'or', 'print', 'private',
  'protected', 'public', 'require', 'require_once', 'return', 'static', 'switch', 'throw', 'trait', 'try',
  'unset', 'use', 'var', 'while', 'xor',
];

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

export function escapeKeyword(s: string) {
  const keywordIndex = PHP_KEYWORDS.indexOf(s.toLowerCase());
  if (keywordIndex === -1) {
    return s;
  }

  return `elephize_${s}`;
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
    .replace(/^\/+/, '')
    .split('/')
    .map((n) => escapeKeyword(n))
    .join('/');

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

export function classNameFromPath(normalizedPath: string, external = false) {
  const pieces = normalizedPath.split('/');
  const fn = capitalize(pieces.pop()?.split('.')[0] || '');
  return fn.replace(/\./g, '_') + (external ? 'CjsWrapper' : 'Module');
}

export function resolveAliasesAndPaths(
  log: LogObj,
  originalSourcePath: string,
  currentDir: string,
  baseDir: string,
  tsPaths: { [key: string]: string[] },
  outputAliases: { [key: string]: string },
  skipOutputAliases?: boolean
): string | null {
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
      log.info('Trying paths for location: %s', [pathToTry]);
      return applyOutputAliases(tsPaths[pathOrig].reduce((acc, name) => {
        if (acc) {
          return acc;
        }
        const target = originalSourcePath.replace(pathToTry, name.replace(/\*$/g, ''));
        const tPath = target.startsWith('/') ?
          target : // absolute path, no need to resolve
          path.resolve(baseDir, target);
        log.info('Trying to locate file: %s', [tPath]);
        const fn = lookupFile(tPath);
        if (fn) {
          return fn;
        }
        return undefined;
      }, undefined), baseDir, outputAliases, skipOutputAliases);
    }
  }

  log.info('Trying non-aliased path: %s', [path.resolve(currentDir, originalSourcePath).replace(baseDir, '[base]')]);
  return applyOutputAliases(lookupFile(path.resolve(currentDir, originalSourcePath)), baseDir, outputAliases, skipOutputAliases);
}

function applyOutputAliases(path = '', baseDir: string, outputAliases: { [key: string]: string }, skip?: boolean): string {
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

function lookupFile(path: string) {
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
