import * as ts from 'typescript';
import { existsSync, readFileSync } from 'fs';

// Try find d.ts source in typescript folder
// For sourceFilesHelper.ts
export function getDtsSourceFile(name: string, sourceFilesCache: { [key: string]: ts.SourceFile | null }, target?: ts.ScriptTarget) {
  if (sourceFilesCache[name] === undefined) {
    let path;
    try {
      path = name.startsWith('/') ? name : require.resolve('typescript/lib/' + name);
    } catch (e) {
      path = require.resolve(name.replace(/^node_modules\//, ''));
    }
    if (existsSync(path)) {
      const input = readFileSync(path, { encoding: 'utf-8' });
      sourceFilesCache[name] = ts.createSourceFile(name, input, target!);
    } else {
      sourceFilesCache[name] = null;
    }
  }

  return sourceFilesCache[name];
}

export const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
  getNewLine: () => ts.sys.newLine,
};

export function fileExists(fileName: string): boolean {
  return ts.sys.fileExists(fileName);
}

export function readFile(fileName: string): string | undefined {
  return ts.sys.readFile(fileName);
}