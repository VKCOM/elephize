import { runBatch } from './runBatch';
import { configureLogging } from '../ts2php/components/cli/configureLogging';
import * as path from 'path';
import { SyntaxKind, NumericLiteral } from 'typescript';

const log = configureLogging({
  baseDir: path.resolve(__dirname, 'specimens'), outDir: '',
});

test('ts2php.customMisc', () => {
  return runBatch([__dirname, 'specimens'], [
    ['misc', 'allowedOnClick.tsx'],
    ['misc', 'astHooks.tsx'],
  ], log, {
    jsxPreferences: {
      allowStringEvents: true,
    },
    hooks: {
      [SyntaxKind.NumericLiteral]: {
        run: (node: NumericLiteral) => {
          if (node.getText().endsWith('.')) {
            return { preventDefault: true, content: `1 + ${node.getText()}` };
          } else {
            return { preventDefault: false };
          }
        },
      },
    },
  });
});
