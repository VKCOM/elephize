import { runBatch } from './runBatch';
import { configureLogging } from '../ts2php/components/cli/configureLogging';
import * as path from 'path';

const log = configureLogging({
  baseDir: path.resolve(__dirname, 'specimens'), outDir: '',
});

test('ts2php.customJSX', () => {
  return runBatch([__dirname, 'specimens'], [
    ['misc', 'allowedOnClick.tsx'],
  ], log, {
    jsxPreferences: {
      allowStringEvents: true,
    },
  });
});
