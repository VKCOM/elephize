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

import { ArgumentOutOfRangeException } from '@mattacosta/php-common';

import { PhpLexerState } from './PhpLexerState';

/**
 * Represents a span of text within a string template that should be tokenized
 * using a specified lexing state.
 */
export class TemplateSpan {

  /**
   * The starting position of the span.
   */
  public readonly start: number;

  /**
   * The length of the span.
   */
  public readonly length: number;

  /**
   * Constructs a `TemplateSpan` object.
   *
   * @param {PhpLexerState} state
   *   The lexer state inside the span.
   * @param {number} start
   *   The starting offset.
   * @param {number} length
   *   The length of the span.
   */
  constructor(public readonly state: PhpLexerState, start: number, length: number) {
    if (start < 0 || length < 0) {
      throw new ArgumentOutOfRangeException();
    }
    this.start = start;
    this.length = length;
  }

  /**
   * Creates a `TemplateSpan` from starting and ending positions.
   *
   * @param {PhpLexerState} state
   *   The lexer state inside the span.
   * @param {number} start
   *   The starting offset.
   * @param {number} end
   *   The ending offset.
   */
  public static fromBounds(state: PhpLexerState, start: number, end: number): TemplateSpan {
    return new TemplateSpan(state, start, end - start);
  }

}
