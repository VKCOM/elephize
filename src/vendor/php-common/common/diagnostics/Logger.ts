/**
 * Copyright 2017 Matt Acosta
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import { LogLevel } from './LogLevel';

/**
 * Defines an interface for objects that can log messages.
 */
export interface ILogger {

  /**
   * Logs an error message.
   *
   * @param {string} message
   *   The log message.
   * @param {...any} args
   *   Any additional log arguments.
   */
  error(message: string, ...args: any[]): void;

  /**
   * Logs an informational message.
   *
   * @param {string} message
   *   The log message.
   * @param {...any} args
   *   Any additional log arguments.
   */
  info(message: string, ...args: any[]): void;

  /**
   * Logs a warning message.
   *
   * @param {string} message
   *   The log message.
   * @param {...any} args
   *   Any additional log arguments.
   */
  warn(message: string, ...args: any[]): void;

  /**
   * Logs a message using the given severity level.
   *
   * @param {LogLevel} severity
   *   The severity of the log entry.
   * @param {string} message
   *   The log message.
   * @param {...any} args
   *   Any additional log arguments.
   */
  log(severity: LogLevel, message: string, ...args: any[]): void;

}

/**
 * A base class for logging messages.
 */
export abstract class LoggerBase implements ILogger {

  /**
   * @inheritdoc
   */
  public error(message: string, ...args: any[]) {
    this.log(LogLevel.Error, message, ...args);
  }

  /**
   * @inheritdoc
   */
  public info(message: string, ...args: any[]) {
    this.log(LogLevel.Information, message, ...args);
  }

  /**
   * @inheritdoc
   */
  public warn(message: string, ...args: any[]): void {
    this.log(LogLevel.Warning, message, ...args);
  }

  /**
   * @inheritdoc
   */
  public abstract log(severity: LogLevel, message: string, ...args: any[]): void;

  /**
   * Formats a message with substitution placeholders.
   *
   * @param {string} message
   *   The message, with zero or more of the following formatting placeholders:
   *   - '%d': Outputs a replacement value as an integer.
   *   - '%f': Outputs a replacement value as a floating-point number.
   *   - '%s': Outputs a replacement value as a string.
   *   - '%x': Outputs a replacement value as a hexadecimal number.
   * @param {...any} values
   *   The replacement values for each placeholder.
   *
   * @return {string}
   *   A string with formatted replacement values.
   */
  protected static format(message: string, ...values: any[]): string {
    return message.replace(/%[dfsx]/g, (match: string, offset: number, template: string) => {
      const value = '' + values.shift();
      switch (match) {
        case '%d':
          return Number.parseInt(value).toString(10);
        case '%f':
          // Defaults to a variable precision of up to 15 digits.
          return Number.parseFloat(value).toString();
        case '%x':
          return Number.parseInt(value).toString(16);
        default:
          return value;
      }
    });
  }

}

/**
 * A fallback logger that does nothing.
 */
export class NullLogger extends LoggerBase {

  /**
   * @inheritdoc
   */
  public log(level: LogLevel, message: string, ...args: any[]) {
    // Do nothing.
  }

}
