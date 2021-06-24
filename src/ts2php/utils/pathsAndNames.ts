import { Dict } from '../types';
import { LogObj } from './log';
import * as nodePath from 'path';
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

export function classNameFromPath(normalizedPath: string, external = false) {
  const pieces = normalizedPath.split('/');
  let fn = capitalize(pieces.pop()?.split('.')[0] || '');
  if (fn === 'Index') {
    fn = capitalize(pieces.pop() || fn);
  }

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
          nodePath.resolve(baseDir, target);
        log.info('Trying to locate file: %s', [tPath]);

        const fn = lookupFile(tPath);

        if (fs.existsSync(tPath) && fs.lstatSync(tPath).isDirectory) {
          const tIndexPath = nodePath.join(tPath, 'index');
          log.info('Trying to locate index file: %s', [tIndexPath]);
          const fnIndex = lookupFile(tIndexPath);

          if (fnIndex) {
            if (fn) {
              log.warn('Found both directory and file with the same basename. It may cause problems: %s', [fnIndex]);
            }

            return fnIndex;
          }
        }

        if (fn) {
          return fn;
        }
        return undefined;
      }, undefined), baseDir, outputAliases, skipOutputAliases);
    }
  }

  const tPath = nodePath.resolve(currentDir, originalSourcePath);

  log.info('Trying non-aliased path: %s', [tPath.replace(baseDir, '[base]')]);
  const fn = lookupFile(tPath);
  if (fs.existsSync(tPath) && fs.lstatSync(tPath).isDirectory) {
    const tIndexPath = nodePath.join(tPath, 'index');
    log.info('Trying non-aliased index path: %s', [tIndexPath]);
    const fnIndex = lookupFile(tIndexPath);

    if (fnIndex) {
      if (fn) {
        log.warn('Found both directory and file with the same basename. It may cause problems: %s', [fnIndex]);
      }

      return applyOutputAliases(fnIndex, baseDir, outputAliases, skipOutputAliases);
    }
  }

  return applyOutputAliases(fn, baseDir, outputAliases, skipOutputAliases);
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
