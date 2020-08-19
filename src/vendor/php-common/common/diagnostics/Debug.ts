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

import { Exception } from '../Exception';

/**
 * Provides helpful methods to debug your code.
 */
export class Debug {

  /**
   * @internal
   */
  protected static assertInternal(condition: boolean, message?: string) {
    if (!condition) {
      throw new AssertException(message, Debug.assertInternal);
    }
  }

  /**
   * Enables assertion methods.
   *
   * This method should be called as early as possible to prevent code
   * deoptimization.
   */
  public static enable() {
    Debug.assert = Debug.assertInternal;
  }

  /**
   * Asserts that a condition is `true` and throws an exception if not.
   *
   * This method does nothing until `Debug.enable()` is called.
   */
  public static assert(condition: boolean, message?: string) {
    // No-op.
  }

  /**
   * Makes an assertion that always fails.
   */
  public static fail(message?: string) {
    Debug.assert(false, message);
  }

  /**
   * Makes an assertion that always passes.
   */
  public static pass(message?: string) {
    Debug.assert(true, message);
  }

}

/**
 * An exception thrown when an assert condition is `false`.
 */
export class AssertException extends Exception {

  constructor(message?: string, constructorFn?: Function) {
    super(message);
    this.captureStackTrace(constructorFn);
  }

}
