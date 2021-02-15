import * as ts from 'typescript';
import * as chalk from 'chalk';
import { writeSync } from 'fs';

export enum LogSeverity {
  INFO,
  WARN,
  ERROR,
  SPECIAL,
  TYPEHINT
}

export enum LogVerbosity {
  INFO = 1,
  WARN = 2,
  ERROR = 4,
  WITH_CONTEXT = 8,
  WITH_ELIMINATION_HINTS = 16,
  WITH_USAGE_GRAPH_DUMP = 32,
  WITH_TYPEHINTS = 64,

  ALL = 127 // fix this if there is more flags
}

type LogFunc = (message: string, severity: LogSeverity, context?: string) => void;
export type LogObj = LogFunc & {
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
    case LogSeverity.TYPEHINT:
      if (log.verbosity! & LogVerbosity.WITH_TYPEHINTS) {
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

// Default for non-testing env
log.verbosity = LogVerbosity.ERROR | LogVerbosity.WARN | LogVerbosity.WITH_CONTEXT;

// Default for testing env
if (typeof jest !== 'undefined') { // unit testing: remove error messages as they are mainly expected...
  log.verbosity = 0;

  if (process.env.VERBOSE) {
    log.verbosity = LogVerbosity.ERROR | LogVerbosity.WARN | LogVerbosity.WITH_CONTEXT | LogVerbosity.INFO;
  }
}

// Process env vars to make more precise log tuning
if (process.env.WITH_ELIMINATION_HINTS) {
  log.verbosity = log.verbosity | LogVerbosity.WITH_ELIMINATION_HINTS;
}
if (process.env.WITH_USAGE_GRAPH_DUMP) {
  log.verbosity = log.verbosity | LogVerbosity.WITH_USAGE_GRAPH_DUMP;
}
if (process.env.WITH_TYPEHINTS) {
  log.verbosity = log.verbosity | LogVerbosity.WITH_TYPEHINTS;
}

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

const STDERR_FILE_DESCRIPTOR = 2; // should match process.stderr.fd
const STDOUT_FILE_DESCRIPTOR = 1; // should match process.stdout.fd

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

  const dt = new Date();
  const pieces = [dt.getHours(), dt.getMinutes(), dt.getSeconds()].map((p) => p.toString().padStart(2, '0'));
  const timer = chalk.ansi(90)(`[${pieces.join(':')}:${dt.getMilliseconds().toString().padStart(3, '0')}]`);

  const str = `${marker}${timer} ${message}${context ? '\n   ' + context : ''}`;
  if (severity === LogSeverity.ERROR || log.forceStderr) {
    writeSync(STDERR_FILE_DESCRIPTOR, str + (str.endsWith('\n') ? '' : '\n'));
  } else {
    writeSync(STDOUT_FILE_DESCRIPTOR, str + (str.endsWith('\n') ? '' : '\n'));
  }
}