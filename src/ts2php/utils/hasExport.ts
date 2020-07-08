import * as ts from 'typescript';
import { ctx, log, LogSeverity } from './log';

export function hasExport(node: ts.Node) {
  if (node.modifiers) {
    for (let m of node.modifiers) {
      if (m.kind === ts.SyntaxKind.DefaultKeyword) {
        log('Do not use `export default` in transpiled code (and preferably anywhere else). Use named exports.', LogSeverity.ERROR, ctx(node));
        return null;
      }

      if (m.kind === ts.SyntaxKind.ExportKeyword) {
        return true;
      }
    }
  }
}
