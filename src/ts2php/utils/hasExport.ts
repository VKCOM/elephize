import * as ts from 'typescript';
import { ctx, LogObj } from './log';

export function hasExport(node: ts.Node, log: LogObj) {
  if (node.modifiers) {
    for (let m of node.modifiers) {
      if (m.kind === ts.SyntaxKind.DefaultKeyword) {
        log.error('Do not use `export default` in transpiled code (and preferably anywhere else). Use named exports.', [], ctx(node));
        return null;
      }

      if (m.kind === ts.SyntaxKind.ExportKeyword) {
        return true;
      }
    }
  }
}
