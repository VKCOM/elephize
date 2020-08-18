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

import { IEquatable } from '@mattacosta/php-common';

import { Encoding } from './Encoding';
import { TextChange } from './TextChange';
import { TextSpan } from './TextSpan';

/**
 * Defines an interface for objects containing source code.
 *
 * @todo Add a `lines` property?
 */
export interface ISourceText extends IEquatable<ISourceText> {

  /**
   * The original encoding of the source text.
   */
  readonly encoding: Encoding;

  /**
   * The length of the text.
   */
  readonly length: number;

  /**
   * Returns an integer representing a character at a given location.
   *
   * @param {number} offset
   *   The offset of the character.
   *
   * @return {number}
   *   The integer value of the character.
   */
  charCodeAt(offset: number): number;

  /**
   * Creates a copy of the source text containing the given region.
   *
   * @param {TextSpan|number} position
   *   A span containing the region of text to copy, or the starting offset
   *   of the region. If an offset is given, all remaining text is included.
   *
   * @return {ISourceText}
   *   A section of the source text.
   */
  slice(position: TextSpan | number): ISourceText;

  /**
   * Extracts a section of the text as a string.
   *
   * @param {number} start
   *   The offset of the first character to extract. If this is a negative
   *   number, the offset will start from the end of the source text.
   * @param {number=} length
   *   The number of characters to extract. If not provided, the length will be
   *   the number of characters from `start` to the end of the string. If the
   *   length is negative, it will be set to 0.
   *
   * @return {string}
   *   A section of the source text, as a string.
   */
  substring(start: number, length?: number): string;

  /**
   * Creates a new source text object with the given changes.
   *
   * @param {Iterable<TextChange>} changes
   *   A series of changes to the text.
   */
  withChanges(changes: Iterable<TextChange>): ISourceText;

  /**
   * Creates a new source text object with the given encoding.
   *
   * @param {Encoding} encoding
   *   The original encoding of the source text.
   */
  withEncoding(encoding: Encoding): ISourceText;

}
