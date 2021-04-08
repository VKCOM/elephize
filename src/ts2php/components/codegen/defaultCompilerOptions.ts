import * as ts from 'typescript';
import * as path from 'path';

export const defaultOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES5,
  lib: [
    'lib.d.ts',
    'lib.dom.d.ts',
    'lib.es5.d.ts',
    'lib.es2015.d.ts',
    'lib.es2016.d.ts',

    path.resolve(__dirname, '..', '..', '..', '..', 'types', 'global', 'index.d.ts'),
  ],
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  module: ts.ModuleKind.CommonJS,
  jsx: ts.JsxEmit.React,
  allowUnreachableCode: true,
  allowJs: true,
  resolveJsonModule: true,
};
