import * as ts from 'typescript';
import { decode } from 'html-entities';
import { escapeHtml } from '../utils/escapeString';

export function tJsxText(node: ts.JsxText) {
  const str = escapeHtml(decode(node.text)).replace(/^\s+|\s+$/g, ' ');
  if (str !== ' ' && str !== '  ') {
    return '"' + str + '"';
  }
  return '';
}
