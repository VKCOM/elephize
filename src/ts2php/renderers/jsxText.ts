import * as ts from 'typescript';
import { escapeHtml } from '../utils/escapeString';

export function tJsxText(node: ts.JsxText) {
  const str = escapeHtml(node.text).replace(/^\s+|\s+$/g, ' ');
  if (str !== ' ' && str !== '  ') {
    return '"' + str + '"';
  }
  return '';
}
