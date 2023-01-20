import { Dict } from '../../types';

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
