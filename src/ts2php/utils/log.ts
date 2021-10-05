import * as ts from 'typescript';
import * as chalk from 'chalk';
import { writeSync } from 'fs';
import { createHash } from 'crypto';
import { format } from 'util';
import { LogObj } from '../types';

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

export interface LogOptions {
  noOutput: boolean;
  baseDir: string;
  outDir: string;
  verbosity?: LogVerbosity;
  forceStderr: boolean;
}

export type LogPrinter = (message: string, msgid: string, params: string[], severity: LogSeverity, context?: string) => void;

export class Logger implements LogObj {
  protected noOutput: boolean;
  protected baseDir: string;
  protected outDir: string;
  protected _verbosity: LogVerbosity;
  protected forceStderr: boolean;

  protected _errCount = 0;
  protected _warnCount = 0;
  protected _printer: LogPrinter;

  public constructor(options: LogOptions, printer?: LogPrinter) {
    this.noOutput = options.noOutput;
    this.baseDir = options.baseDir;
    this.outDir = options.outDir;
    this._verbosity = options.verbosity || (LogVerbosity.ERROR | LogVerbosity.WARN | LogVerbosity.WITH_CONTEXT); // Default for non-testing env
    this.forceStderr = options.forceStderr;
    this._printer = printer || this._printLog.bind(this);
  }

  public get errCount(): number {
    return this._errCount;
  }

  public get warnCount(): number {
    return this._warnCount;
  }

  public get verbosity(): number {
    return this._verbosity;
  }

  public error(message: string, params: string[], context = ''): void {
    this._errCount++;
    if (this._verbosity & LogVerbosity.ERROR) {
      this._printer(message, this._msgid(message), params, LogSeverity.ERROR, this._verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
    }
  }

  public info(message: string, params: string[], context = ''): void {
    if (this._verbosity & LogVerbosity.INFO) {
      this._printer(message, this._msgid(message), params, LogSeverity.INFO, this._verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
    }
  }

  public special(message: string, params: string[], context = ''): void {
    if (this._verbosity & LogVerbosity.INFO) {
      this._printer(message, this._msgid(message), params, LogSeverity.SPECIAL, this._verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
    }
  }

  public typehint(message: string, params: string[], context = ''): void {
    if (this._verbosity & LogVerbosity.WITH_TYPEHINTS) {
      this._printer(message, this._msgid(message), params, LogSeverity.TYPEHINT, this._verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
    }
  }

  public warn(message: string, params: string[], context = ''): void {
    this._warnCount++;
    if (this._verbosity & LogVerbosity.WARN) {
      this._printer(message, this._msgid(message), params, LogSeverity.WARN, this._verbosity & LogVerbosity.WITH_CONTEXT ? context : '');
    }
  }

  public ctx(node?: ts.Node): string {
    if (!node) {
      return '';
    }
    const { line, character } = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    const filename = this.baseDir ?
      node.getSourceFile().fileName.replace(this.baseDir, '[base]') :
      node.getSourceFile().fileName;
    return `@${filename}:${line + 1}:${character + 1}`;
  }

  public shortCtx(fn: string): string {
    const filename = this.baseDir ?
      fn.replace(this.baseDir, '[base]') :
      fn;
    return `@${filename}`;
  }

  protected _msgid(message: string): string {
    const hash = createHash('md4');
    hash.update(message);
    return hash.digest('hex').substr(0, 5);
  }

  public _printLog(message: string, msgid: string, params: string[], severity: LogSeverity, context = '') {
    if (this.baseDir && severity !== LogSeverity.SPECIAL) {
      message = message.replace(this.baseDir, '[base]');
    }
    if (this.outDir && severity !== LogSeverity.SPECIAL) {
      message = message.replace(this.outDir, '[out]');
    }

    let marker: string = chalk.dim(`[i #${msgid}]`);
    switch (severity) {
      case LogSeverity.ERROR:
        marker = chalk.bgRedBright(chalk.black(`[E #${msgid}]`));
        break;
      case LogSeverity.WARN:
        marker = chalk.bgYellowBright(chalk.black(`[W #${msgid}]`));
        break;
      case LogSeverity.SPECIAL:
        marker = chalk.bgGreenBright(chalk.black(`[! #${msgid}]`));
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
