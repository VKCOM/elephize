import * as ts from 'typescript';
import { NodeDescription } from '../types';
import { escapeString } from '../utils/escapeString';

export function tJsxText(node: ts.JsxText): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => {
      const str = escapeString(node.text).replace(/^\s+|\s+$/g, ' ');
      if (str !== ' ' && str !== '  ') {
        return '"' + str + '"';
      }
      return '';
    }
  };
}
