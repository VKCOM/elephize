import * as ts from 'typescript';
export const propNameIs = (name: string, node: ts.CallExpression) => {
  return node.expression.kind === ts.SyntaxKind.PropertyAccessExpression &&
    (node.expression as ts.PropertyAccessExpression).name.escapedText === name;
};
