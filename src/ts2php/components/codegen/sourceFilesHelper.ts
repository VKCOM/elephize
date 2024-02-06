import { createSourceFile, ScriptTarget, SourceFile } from 'typescript';
import { existsSync, readFileSync } from 'fs';

const sourceFiles: { [key: string]: SourceFile | null } = {};

// Try find d.ts source in typescript folder
function getDtsSourceFile(name: string, target?: ScriptTarget) {
  if (sourceFiles[name] === undefined) {
    let path;
    try {
      path = name.startsWith('/') ? name : require.resolve('typescript/lib/' + name);
    } catch (e) {
      const nameWithoutNodeModules = name.replace(/^node_modules\//, '');

      /**
       * There is an exports field in @types/react@^18.0.0 package.
       * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9bbff85ffe3d5f31394e324e3cb4cb57a4d37599/types/react/package.json#L8
       * So require.resolve can't resolve index.d.ts and we try to resolve package.json and replace it with index.d.ts.
       */
      if (nameWithoutNodeModules.startsWith('@types/react/')) {
        const nameWithoutLibrary = nameWithoutNodeModules.replace('@types/react/', '');
        path = require.resolve('@types/react/package.json').replace('package.json', nameWithoutLibrary);
      } else {
        path = require.resolve(nameWithoutNodeModules);
      }
    }
    if (existsSync(path)) {
      const input = readFileSync(path, { encoding: 'utf-8' });
      sourceFiles[name] = createSourceFile(name, input, target!);
    } else {
      sourceFiles[name] = null;
    }
  }

  return sourceFiles[name];
}

function getSourceFile(path: string, target?: ScriptTarget) {
  if (sourceFiles[path] === undefined) {
    if (existsSync(path)) {
      const input = readFileSync(path, { encoding: 'utf-8' });
      sourceFiles[path] = createSourceFile(path, input, target!);
    } else {
      sourceFiles[path] = null;
    }
  }

  return sourceFiles[path];
}

export const compilerHostSourceGetter = (scriptTarget?: ScriptTarget) => (fileName: string) => {
  if (fileName.endsWith('.d.ts')) {
    return getDtsSourceFile(fileName, scriptTarget) || undefined;
  }
  return getSourceFile(fileName, scriptTarget) || undefined;
};
