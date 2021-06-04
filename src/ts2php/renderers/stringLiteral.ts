import * as ts from 'typescript';
import { Declaration } from '../types';
import { escapeHtml, escapeString } from '../utils/escapeString';
import { flagParentOfType } from '../utils/ast';
import { Context } from '../components/context';
import { decode } from 'html-entities';

export function tStringLiteral(node: ts.StringLiteral, context: Context<Declaration>) {
  if (node.text === 'use strict') { // remove use strict; TODO: can affect random strings containing 'use strict'
    flagParentOfType(node, [ts.SyntaxKind.ExpressionStatement], { drop: true }, context.nodeFlagsStore);
  }

  if (node.parent.kind === ts.SyntaxKind.JsxAttribute || node.parent.kind === ts.SyntaxKind.JsxExpression) {
    // decode html entities for literal strings in jsx
    return '"' + escapeHtml(decode(node.text)) + '"';
  }
  return '"' + escapeString(node.text) + '"';
}
