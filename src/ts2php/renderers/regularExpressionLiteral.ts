import * as ts from 'typescript';
export const tRegularExpressionLiteral = (node: ts.RegularExpressionLiteral) => `"${node.getText().replace(/"/g, '\\"')}"`;
