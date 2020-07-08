import * as ts from 'typescript';
import * as chalk from 'chalk';

export enum LogSeverity {
  INFO,
  WARN,
  ERROR,
  SPECIAL
}

export enum LogVerbosity {
  INFO = 1,
  WARN = 2,
  ERROR = 4,
  WITH_CONTEXT = 8,
  WITH_ELIMINATION_HINTS = 16,
  WITH_USAGE_GRAPH_DUMP = 32,

  ALL = 63 // fix this if there is more flags
}

type LogFunc = (message: string, severity: LogSeverity, context?: string) => void;
type LogObj = LogFunc & {
  noOutput?: boolean;
  warnCount?: number;
  errCount?: number;
  baseDir?: string;
  outDir?: string;
  verbosity?: LogVerbosity;
  forceStderr?: boolean;
};

export const log: LogObj = (message: string, severity: LogSeverity, context = '') => {
  switch (severity) {
    case LogSeverity.ERROR:
      log.errCount = (log.errCount || 0) + 1;
      if (log.verbosity! & LogVerbosity.ERROR) {
        printLog(message, severity, log.verbosity! & LogVerbosity.WITH_CONTEXT ? context : '');
      }
      break;
    case LogSeverity.SPECIAL:
    case LogSeverity.INFO:
      if (log.verbosity! & LogVerbosity.INFO) {
        printLog(message, severity, log.verbosity! & LogVerbosity.WITH_CONTEXT ? context : '');
      }
      break;
    case LogSeverity.WARN:
      log.warnCount = (log.warnCount || 0) + 1;
      if (log.verbosity! & LogVerbosity.WARN) {
        printLog(message, severity, log.verbosity! & LogVerbosity.WITH_CONTEXT ? context : '');
      }
      break;
  }
};
log.verbosity = LogVerbosity.ERROR | LogVerbosity.WARN | LogVerbosity.WITH_CONTEXT;

export function ctx(node?: ts.Node): string {
  if (!node) {
    return '';
  }
  let { line, character } = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
  const filename = log.baseDir
    ? node.getSourceFile().fileName.replace(log.baseDir, '[base]')
    : node.getSourceFile().fileName;
  return `@${filename}:${line + 1}:${character + 1}`;
}

export function shortCtx(fn: string): string {
  const filename = log.baseDir
    ? fn.replace(log.baseDir, '[base]')
    : fn;
  return `@${filename}`;
}

function printLog(message: string, severity: LogSeverity, context = '') {
  if (log.baseDir && severity !== LogSeverity.SPECIAL) {
    message = message.replace(log.baseDir, '[base]');
  }
  if (log.outDir && severity !== LogSeverity.SPECIAL) {
    message = message.replace(log.outDir, '[out]');
  }

  let marker: string = chalk.dim('[i]');
  switch (severity) {
    case LogSeverity.ERROR:
      marker = chalk.bgRedBright(chalk.black('[E]'));
      break;
    case LogSeverity.WARN:
      marker = chalk.bgYellowBright(chalk.black('[W]'));
      break;
    case LogSeverity.SPECIAL:
      marker = chalk.bgGreenBright(chalk.black('[!]'));
      break;
    case LogSeverity.INFO:
    default:
      break;
  }

  const str = `${marker} ${message}${context ? '\n      ' + context : ''}`;
  if (severity === LogSeverity.ERROR || log.forceStderr) {
    process.stderr.write(str + '\n');
  } else {
    process.stdout.write(str + '\n');
  }
}