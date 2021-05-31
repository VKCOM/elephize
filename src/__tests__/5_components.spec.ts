import { runBatch } from './runBatch';
import { configureLogging } from '../ts2php/components/cli/configureLogging';
import * as path from 'path';
import { Logger, LogSeverity } from '../ts2php/utils/log';

const testSuiteConfig: Array<{file: string[]; failOnErrors: string[]}> = [
  { file: ['components', 'ReactSupport.tsx'], failOnErrors: [] },
  { file: ['components', 'ReactSupport2.tsx'], failOnErrors: [] },
  { file: ['components', 'BasicComponent.tsx'], failOnErrors: [
    '384ae', // Identifier "props" was used but was never declared. This is compile error
  ] },
  { file: ['components', 'BasicComponentWithProps.tsx'], failOnErrors: ['384ae', '6554c'] },
  { file: ['components', 'BasicComponentWithViewLogic.tsx'], failOnErrors: ['384ae', '6554c'] },
  { file: ['components', 'DummyComponent.tsx'], failOnErrors: ['384ae', '6554c'] },
  { file: ['components', 'NestedComponent.tsx'], failOnErrors: ['384ae'] },
  { file: ['components', 'NestedConditionalComponent.tsx'], failOnErrors: ['384ae', '6554c'] },
  { file: ['components', 'TypedComponent.tsx'], failOnErrors: ['384ae', '6554c'] },
  { file: ['components', 'ComponentWithOuterFunction.tsx'], failOnErrors: ['384ae', '6554c'] },
  { file: ['components', 'ComponentBinaryOperators.tsx'], failOnErrors: ['384ae', '6554c'] },
  { file: ['components', 'TwoComponents.tsx'], failOnErrors: ['384ae'] },
  { file: ['components', 'NestedComponentWithDummyInProps.tsx'], failOnErrors: ['384ae', '6554c'] },
  { file: ['components', 'InnerHtmlComponent.tsx'], failOnErrors: ['384ae'] },
  { file: ['components', 'NullReturnInComponent.tsx'], failOnErrors: ['384ae', 'a57e4', '6554c'] },

  // Checks for reserved words in paths/namespaces
  { file: ['components/static', 'KeywordTestComponent.tsx'], failOnErrors: ['384ae', 'a57e4'] },
  { file: ['components/static', 'KeywordTestComponentImport.tsx'], failOnErrors: ['384ae', 'a57e4'] },
  { file: ['components/static', 'KeywordTestModule.ts'], failOnErrors: ['384ae', 'a57e4'] },
  { file: ['components/static', 'KeywordTestModuleImport.ts'], failOnErrors: ['384ae', 'a57e4'] },

  { file: ['fixes', 'CheckBox.tsx'], failOnErrors: ['384ae', 'a57e4'] },
];

const testSuite = testSuiteConfig.map((item) => item.file);
const errContext = testSuiteConfig.reduce<{[key: string]: string[]}>((acc, el) => {
  acc['@[base]/' + el.file.join('/')] = el.failOnErrors;
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
    Logger.prototype._printLog.bind(log)(message, msgid, params, severity, context);
  },
});

test('ts2php.components', () => {
  return runBatch([__dirname, 'specimens'], testSuite, log);
});
