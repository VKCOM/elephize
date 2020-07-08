import * as ts from 'typescript';
import { NodeDescription } from '../types';

export function tRegularExpressionLiteral(node: ts.RegularExpressionLiteral): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => `"${node.getText()}"`
  };
}