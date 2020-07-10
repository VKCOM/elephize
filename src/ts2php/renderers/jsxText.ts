import * as ts from 'typescript';
import { escapeString } from '../utils/escapeString';

export function tJsxText(node: ts.JsxText) {
  const str = escapeString(node.text).replace(/^\s+|\s+$/g, ' ');
  if (str !== ' ' && str !== '  ') {
    return '"' + str + '"';
  }
  return '';
}
