import * as ts from 'typescript';

// see https://www.typescriptlang.org/tsconfig#include
export const tsSupportExtensions = (compilerOptions: ts.CompilerOptions) =>
  compilerOptions.allowJs ? ['.js', '.jsx', '.ts', '.tsx'] : ['.ts', '.tsx'];
