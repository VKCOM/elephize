import * as ts from 'typescript';
import { Declaration } from '../types';
import { escapeString } from '../utils/escapeString';
import { flagParentOfType } from '../utils/ast';
import { Context } from '../components/context';

export function tStringLiteral(node: ts.StringLiteral, context: Context<Declaration>) {
  if (node.text === 'use strict') { // remove use strict; TODO: can affect random strings containing 'use strict'
    flagParentOfType(node, [ts.SyntaxKind.ExpressionStatement], { drop: true }, context.nodeFlagsStore);
  }
  return '"' + escapeString(node.text) + '"';
}
