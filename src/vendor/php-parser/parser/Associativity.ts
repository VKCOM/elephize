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
 * Determines how operators of the same precedence are grouped in the absence
 * of parentheses.
 *
 * See also: [Operator associativity](https://en.wikipedia.org/wiki/Operator_associativity)
 */
export enum Associativity {

  /**
   * Non-associative. No defined behavior when used in sequence.
   *
   * Example: The expression `a < b < c` is not equivalent to `(a < b) < c` or
   * `a < (b < c)`.
   */
  None,
  /**
   * Left associative. Operators in sequence group from the left side.
   *
   * Example: The expression `a + b + c` is equivalent to `(a + b) + c`.
   */
  Left,
  /**
   * Right associative. Operators in sequence group from the right side.
   *
   * Example: The expression `a ^ b ^ c` is equivalent to `a ^ (b ^ c)`.
   */
  Right

}
