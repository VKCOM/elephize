import { createSourceFile, ScriptTarget, SourceFile } from 'typescript';
import { existsSync, readFileSync } from 'fs';
import { getDtsSourceFile } from '##platform-dependent-parts';

const sourceFiles: { [key: string]: SourceFile | null } = {};

function getSourceFile(path: string, sourceFilesCache: { [key: string]: SourceFile | null }, target?: ScriptTarget) {
  if (sourceFilesCache[path] === undefined) {
    if (existsSync(path)) {
      const input = readFileSync(path, { encoding: 'utf-8' });
      sourceFilesCache[path] = createSourceFile(path, input, target!);
    } else {
      sourceFilesCache[path] = null;
    }
  }

  return sourceFilesCache[path];
}

export const compilerHostSourceGetter = (scriptTarget?: ScriptTarget) => (fileName: string) => {
  if (fileName.endsWith('.d.ts')) {
    return getDtsSourceFile(fileName, sourceFiles, scriptTarget) || undefined;
  }
  return getSourceFile(fileName, sourceFiles, scriptTarget) || undefined;
};
