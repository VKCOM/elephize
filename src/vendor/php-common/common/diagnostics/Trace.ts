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

import { ArgumentOutOfRangeException } from '../Exception';
import { ILogger } from './Logger';
import { LogLevel } from './LogLevel';

/**
 * @todo Experimental.
 */
export class Trace {

  /**
   * An indentation prefix used when logging messages.
   */
  protected static _indent = '';

  /**
   * The current number of indents.
   */
  protected static _indentLevel: number = 0;

  /**
   * The number of spaces used for an indent.
   */
  protected static _indentSize: number = 4;

  /**
   * A list of loggers that receive trace messages.
   */
  protected static listeners: ILogger[] = [];

  /**
   * Gets the current indentation level.
   */
  public static get indentLevel(): number {
    return Trace._indentLevel;
  }

  /**
   * Gets the number of spaces used for indentation.
   */
  public static get indentSize(): number {
    return Trace._indentSize;
  }

  /**
   * Sets the number of spaces used for indentation.
   */
  public static set indentSize(value: number) {
    if (value < 1) {
      throw new ArgumentOutOfRangeException('Indent size must be greater than 0');
    }
    Trace._indentSize = value;
    Trace.updateIndent();
  }

  /**
   * Removes an indentation level from the trace output.
   */
  public static deindent() {
    if (Trace._indentLevel > 0) {
      Trace._indentLevel--;
      Trace.updateIndent();
    }
  }

  /**
   * Adds an indentation level to the trace output.
   */
  public static indent() {
    Trace._indentLevel++;
    Trace.updateIndent();
  }

  /**
   * Updates the indentation prefix used when logging a message.
   */
  protected static updateIndent() {
    // Save the prefix so that it isn't recreated for every trace message.
    const indent = ' '.repeat(Trace._indentSize);
    Trace._indent = indent.repeat(Trace._indentLevel);
  }

  /**
   * Adds a logger to the list of trace listeners.
   */
  public static addListener(listener: ILogger) {
    for (let i = 0; i < Trace.listeners.length; i++) {
      if (Trace.listeners[i] === listener) {
        return;
      }
    }
    Trace.listeners.push(listener);
  }

  /**
   * Removes all trace listeners.
   */
  public static removeAllListeners() {
    Trace.listeners = [];
  }

  /**
   * Removes a logger from the list of trace listeners.
   */
  public static removeListener(listener: ILogger) {
    for (let i = 0; i < Trace.listeners.length; i++) {
      if (Trace.listeners[i] === listener) {
        Trace.listeners.splice(i, 1);
      }
    }
  }

  /**
   * Logs a message to all trace listeners.
   */
  public static log(message: string, ...args: any[]): void {
    for (let i = 0; i < Trace.listeners.length; i++) {
      Trace.listeners[i].log(LogLevel.Trace, Trace._indent + message, ...args);
    }
  }

}
