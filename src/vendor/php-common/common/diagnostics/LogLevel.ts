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

/**
 * The severity of a log entry.
 */
export enum LogLevel {

  /**
   * A log entry containing detailed (and potentially sensistive) information.
   */
  Trace,
  /**
   * A log entry containing useful debugging information.
   */
  Debug,
  /**
   * A log entry tracking the control flow of an operation.
   */
  Information,
  /**
   * A log entry indicating when an unexpected, but recoverable event occurs.
   */
  Warning,
  /**
   * A log entry indicating when execution of an operation, but not the
   * application, has stopped due to a failure.
   */
  Error,
  /**
   * A log entry indicating when execution of the application, but not the
   * system, has stopped due to an unexpected condition.
   */
  Critical,

}

/**
 * Provides generic information about a `LogLevel`.
 */
export class LogLevelInfo {

  /**
   * Gets the shortened name of a log level.
   */
  public static getShortName(level: LogLevel): string {
    switch (level) {
      case LogLevel.Critical:
        return 'critical';
      case LogLevel.Debug:
        return 'debug';
      case LogLevel.Error:
        return 'error';
      case LogLevel.Information:
        return 'info';
      case LogLevel.Trace:
        return 'trace';
      case LogLevel.Warning:
        return 'warn';
      default:
        return '';
    }
  }

}
