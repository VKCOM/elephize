import * as fs from 'fs';
import * as codemirror from 'codemirror';
const { startPlayground } = require('@vkontakte/elephize/playground');
import { LogSeverity } from '../src/ts2php/utils/log';

const severityMap: { [key: number]: string } = {
  [LogSeverity.INFO]: 'I',
  [LogSeverity.WARN]: 'W',
  [LogSeverity.ERROR]: 'E',
  [LogSeverity.SPECIAL]: '!',
};

function printer(message: string, msgid: string, params: string[], severity: LogSeverity, context?: string) {
  console.log(`[${severityMap[severity]} ${msgid}] ${message}`);
  if (context) {
    console.log(context);
  }
}

document.addEventListener('load', () => {
  const input = document.getElementById('tsInput')!;
  const cm = codemirror(input, {
    value: '',
    lineNumbers: true,
    mode: 'text/typescript',
  });

  cm.on('change', (e) => {
    const fd = fs.openSync('./entrypoint.ts', 'w+');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fs.write(fd, e.getValue(), () => {});
  });

  startPlayground({
    src: './entrypoint.ts',
    baseDir: './',
    outDir: './output',
    verbose: true,
    verboseUsage: false,
    verboseTypehints: false,
    printer,
  });
});
