import * as ts from 'typescript';
export const tNumericLiteral = (node: ts.NumericLiteral) => node.getText();
