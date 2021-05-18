import { runBatch } from './runBatch';
import { configureLogging } from '../ts2php/components/cli/configureLogging';
import * as path from 'path';
import { Logger, LogSeverity } from '../ts2php/utils/log';

const testSuiteConfig: Array<{file: string[]; failOnErrors: string[]; expectedErrors: string[]}> = [
  { file: ['byType', 'arrowFunction.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'basicOperators.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'binaryExpression.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'block.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'callExpression.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'enum.ts'], failOnErrors: [], expectedErrors: ['c81c7'] },
  { file: ['byType', 'enumImport.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'elementAccessExpression.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'export.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'functionDeclaration.ts'], failOnErrors: [], expectedErrors: ['f889d'] },
  { file: ['byType', 'identifier.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'ifStatement.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'serverIfStatement.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'import.ts'], failOnErrors: [], expectedErrors: ['6554c'] },
  { file: ['byType', 'jsx.tsx'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'loops.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'objectLiteralExpression.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'objectComputedProperties.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'parameterDestructuring.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'propertyAccessExpression.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'restOperator.ts'], failOnErrors: [], expectedErrors: [] },
  { file: ['byType', 'spreadOperator.ts'], failOnErrors: [], expectedErrors: ['7e4a6'] },
  { file: ['byType', 'switchStatement.ts'], failOnErrors: ['6554c'], expectedErrors: [] },
  { file: ['byType', 'templateString.ts'], failOnErrors: [], expectedErrors: ['7cebf'] },
  { file: ['byType', 'tsInternals.ts'], failOnErrors: [], expectedErrors: [] },

  { file: ['fixes', 'excessiveElimination.ts'], failOnErrors: [], expectedErrors: ['7cebf'] },
];

const testSuite = testSuiteConfig.map((item) => item.file);
const errContext = testSuiteConfig.reduce<{[key: string]: string[]}>((acc, el) => {
  acc['@[base]/' + el.file.join('/')] = el.failOnErrors;
  return acc;
}, {});

const expectedErrContext = testSuiteConfig.reduce<{[key: string]: string[]}>((acc, el) => {
  acc['@[base]/' + el.file.join('/')] = el.expectedErrors;
  return acc;
}, {});

const log = configureLogging({
  baseDir: path.resolve(__dirname, 'specimens'),
  outDir: '',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  printer: (message: string, msgid: string, params: string[], severity: LogSeverity, context?: string) => {
    if (context && errContext[context.split(':')[0]] && errContext[context.split(':')[0]].includes(msgid)) {
      throw new Error(`Compile error #${msgid} is not acceptable in test ${context}`);
    }
    if (context && expectedErrContext[context.split(':')[0]] && !expectedErrContext[context.split(':')[0]].includes(msgid)) {
      Logger.prototype._printLog.bind(log)(message, msgid, params, severity, context);
    }
  },
});

test('ts2php.byType', () => {
  return runBatch([__dirname, 'specimens'], testSuite, log);
});
