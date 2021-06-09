import * as ts from 'typescript';
import { escapeTextLiteral } from '../utils/escapeString';

export function tJsxText(node: ts.JsxText) {
  return escapeTextLiteral(node.text);
}
