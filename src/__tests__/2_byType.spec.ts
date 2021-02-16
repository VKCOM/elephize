import { runBatch } from './runBatch';
import { configureLogging } from '../ts2php/components/cli/configureLogging';
import * as path from 'path';

const log = configureLogging({
  baseDir: path.resolve(__dirname, 'specimens'), output: '', outDir: ''
});

test('ts2php.byType', () => {
  return runBatch([__dirname, 'specimens'], [
    ['byType', 'arrowFunction.ts'],
    ['byType', 'basicOperators.ts'],
    ['byType', 'binaryExpression.ts'],
    ['byType', 'block.ts'],
    ['byType', 'callExpression.ts'],
    ['byType', 'elementAccessExpression.ts'],
    ['byType', 'export.ts'],
    ['byType', 'functionDeclaration.ts'],
    ['byType', 'identifier.ts'],
    ['byType', 'ifStatement.ts'],
    ['byType', 'serverIfStatement.ts'],
    ['byType', 'import.ts'],
    ['byType', 'jsx.tsx'],
    ['byType', 'loops.ts'],
    ['byType', 'objectLiteralExpression.ts'],
    ['byType', 'parameterDestructuring.ts'],
    ['byType', 'propertyAccessExpression.ts'],
    ['byType', 'restOperator.ts'],
    ['byType', 'spreadOperator.ts'],
    ['byType', 'switchStatement.ts'],
    ['byType', 'templateString.ts'],
    ['byType', 'tsInternals.ts'],
  ], log);
});
