import * as ts from 'typescript';
import { NodeDescription, NodeInfo } from '../types';
import { escapeString } from '../utils/escapeString';
import { flagParentOfType } from '../utils/ast';

export function tStringLiteral(node: ts.StringLiteral): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: (self: NodeInfo) => {
      if (node.text === 'use strict') { // remove use strict; TODO: can affect random strings containing 'use strict'
        flagParentOfType(self, [ts.SyntaxKind.ExpressionStatement], { drop: true });
      }
      return '"' + escapeString(node.text) + '"';
    }
  };
}