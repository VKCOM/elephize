import * as ts from 'typescript';
import { NodeDescription } from '../types';

export function tNumericLiteral(node: ts.NumericLiteral): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => node.getText()
  };
}