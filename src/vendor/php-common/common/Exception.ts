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
 * Defines an interface for errors with Node.js features.
 */
interface NodeError {

  stackTraceLimit: number;

  captureStackTrace(targetObject: Object, constructorOpt?: Function): void;

}

/**
 * An error that occured during program execution.
 */
export class Exception extends Error {

  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
    this.captureStackTrace();
  }

  protected captureStackTrace(fn?: Function) {
    if (typeof fn === 'undefined') {
      fn = this.constructor;
    }
    if (Exception.isNodeError(Error)) {
      Error.captureStackTrace(this, fn);
    }
  }

  private static isNodeError(type: any): type is NodeError {
    return typeof type.captureStackTrace === 'function';
  }

}

/**
 * An exception thrown when one of the arguments provided to a method is
 * invalid.
 */
export class ArgumentException extends Exception {}

/**
 * An exception thrown when an argument is null.
 */
export class ArgumentNullException extends ArgumentException {}

/**
 * An exception thrown when an argument is not within an expected range.
 */
export class ArgumentOutOfRangeException extends ArgumentException {}

/**
 * An exception thrown when an attempt is made to access an element of an array
 * or collection with an index that is outside its bounds.
 */
export class IndexOutOfRangeException extends Exception {}

/**
 * An exception thrown when a method call is invalid for the object's current
 * state.
 */
export class InvalidOperationException extends Exception {}

/**
 * An exception thrown when a requested method or operation is not implemented.
 */
export class NotImplementedException extends Exception {}

/**
 * An exception thrown when an invoked method is not supported, or when there
 * is an attempt to read or write to a stream that does not support it.
 */
export class NotSupportedException extends Exception {}
