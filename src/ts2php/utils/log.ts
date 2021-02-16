import * as ts from 'typescript';
import * as chalk from 'chalk';
import { writeSync } from 'fs';
import { createHash } from 'crypto';
import { format } from 'util';

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

const STDERR_FILE_DESCRIPTOR = 2; // should match process.stderr.fd
const STDOUT_FILE_DESCRIPTOR = 1; // should match process.stdout.fd

interface LogOptions {
  noOutput: boolean;
  baseDir: string;
  outDir: string;
  verbosity?: LogVerbosity;
  forceStderr: boolean;
};

export interface LogObj {
  errCount: number;
  warnCount: number;
  info: (message: string, params: string[], context?: string) => void;
  warn: (message: string, params: string[], context?: string) => void;
  error: (message: string, params: string[], context?: string) => void;
  special: (message: string, params: string[], context?: string) => void;
  typehint: (message: string, params: string[], context?: string) => void;
  _printLog: (message: string, params: string[], severity: LogSeverity, context?: string) => void;
  ctx: (node?: ts.Node) => string;
  shortCtx: (fn: string) => string;
}

class Logger implements LogObj {
  protected noOutput: boolean;
  protected baseDir: string;
  protected outDir: string;
  protected verbosity: LogVerbosity;
  protected forceStderr: boolean;

  protected _errCount = 0;
  protected _warnCount = 0;
  protected _printer: Logger['_printLog'];

  public constructor(options: LogOptions, printer?: Logger['_printLog']) {
    this.noOutput = options.noOutput;
    this.baseDir = options.baseDir;
    this.outDir = options.outDir;
    this.verbosity = options.verbosity || (LogVerbosity.ERROR | LogVerbosity.WARN | LogVerbosity.WITH_CONTEXT); // Default for non-testing env
    this.forceStderr = options.forceStderr;
    this._printer = printer || this._printLog.bind(this);
  }

  public get errCount(): number {
    return this._errCount;
  }

  public get warnCount(): number {
    return this._warnCount;
  }

  public error(message: string, params: string[], context = ''): void {
    this._errCount++;
    if (this.verbosity & LogVerbosity.ERROR) {
      this._printer(message, params, LogSeverity.ERROR, this.verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
    }
  }

  public info(message: string, params: string[], context = ''): void {
    if (this.verbosity & LogVerbosity.INFO) {
      this._printer(message, params, LogSeverity.INFO, this.verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
    }
  }

  public special(message: string, params: string[], context = ''): void {
    if (this.verbosity & LogVerbosity.INFO) {
      this._printer(message, params, LogSeverity.SPECIAL, this.verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
    }
  }

  public typehint(message: string, params: string[], context = ''): void {
    if (this.verbosity & LogVerbosity.WITH_TYPEHINTS) {
      this._printer(message, params, LogSeverity.TYPEHINT, this.verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
    }
  }

  public warn(message: string, params: string[], context = ''): void {
    this._warnCount++;
    if (this.verbosity & LogVerbosity.WARN) {
      this._printer(message, params, LogSeverity.WARN, this.verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
    }
  }

  public ctx(node?: ts.Node): string {
    if (!node) {
      return '';
    }
    let { line, character } = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    const filename = this.baseDir
      ? node.getSourceFile().fileName.replace(this.baseDir, '[base]')
      : node.getSourceFile().fileName;
    return `@${filename}:${line + 1}:${character + 1}`;
  }

  public shortCtx(fn: string): string {
    const filename = this.baseDir
      ? fn.replace(this.baseDir, '[base]')
      : fn;
    return `@${filename}`;
  }

  protected _printLog(message: string, params: string[], severity: LogSeverity, context = '') {
    if (this.baseDir && severity !== LogSeverity.SPECIAL) {
      message = message.replace(this.baseDir, '[base]');
    }
    if (this.outDir && severity !== LogSeverity.SPECIAL) {
      message = message.replace(this.outDir, '[out]');
    }

    const hash = createHash('md4');
    hash.update(message);
    const ident = hash.digest('hex').substr(0, 5);
    let marker: string = chalk.dim(`[i #${ident}]`);
    switch (severity) {
      case LogSeverity.ERROR:
        marker = chalk.bgRedBright(chalk.black(`[E #${ident}]`));
        break;
      case LogSeverity.WARN:
        marker = chalk.bgYellowBright(chalk.black(`[W #${ident}]`));
        break;
      case LogSeverity.SPECIAL:
        marker = chalk.bgGreenBright(chalk.black(`[! #${ident}]`));
        break;
      case LogSeverity.INFO:
      default:
        break;
    }

    message = format(message, ...params); // apply parameters to string strictly after hashing

    const dt = new Date();
    const pieces = [dt.getHours(), dt.getMinutes(), dt.getSeconds()].map((p) => p.toString().padStart(2, '0'));
    const timer = chalk.ansi(90)(`[${pieces.join(':')}:${dt.getMilliseconds().toString().padStart(3, '0')}]`);

    const str = `${marker}${timer} ${message}${context ? '\n   ' + context : ''}`;
    if (severity === LogSeverity.ERROR || this.forceStderr) {
      writeSync(STDERR_FILE_DESCRIPTOR, str + (str.endsWith('\n') ? '' : '\n'));
    } else {
      writeSync(STDOUT_FILE_DESCRIPTOR, str + (str.endsWith('\n') ? '' : '\n'));
    }
  }
}
