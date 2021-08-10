import * as ts from 'typescript';
import { existsSync, readFileSync } from 'fs';

// Try find d.ts source in typescript folder
// For sourceFilesHelper.ts
export function getDtsSourceFile(name: string, sourceFilesCache: { [key: string]: ts.SourceFile | null }, target?: ts.ScriptTarget) {
  // if (sourceFilesCache[name] === undefined) {
  //   let path;
  //   try {
  //     // TODO: this fails in browser: webpack drags ALL typescript files into build, but we really dont want this
  //     // идея: заменить весь этот файл в сборке плейграунда на совместимый с браузером. Скопировать node_modules/typescript в memfs и оттуда брать?
  //     path = name.startsWith('/') ? name : require.resolve('typescript/lib/' + name);
  //   } catch (e) {
  //     path = require.resolve(name.replace(/^node_modules\//, ''));
  //   }
  //   if (existsSync(path)) {
  //     const input = readFileSync(path, { encoding: 'utf-8' });
  //     sourceFilesCache[name] = ts.createSourceFile(name, input, target!);
  //   } else {
  //     sourceFilesCache[name] = null;
  //   }
  // }
  //
  // return sourceFilesCache[name];
  return null;
}

export const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: () => '',
  getNewLine: () => '',
};

export function fileExists(fileName: string): boolean {
  return true;
}

export function readFile(fileName: string): string | undefined {
  return undefined;
}