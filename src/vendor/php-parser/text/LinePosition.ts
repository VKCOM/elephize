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

import {
  ArgumentOutOfRangeException,
  Hash,
  IComparable,
  IHashable,
} from '@mattacosta/php-common';

/**
 * A line number and character position.
 */
export class LinePosition implements IComparable<LinePosition>, IHashable<LinePosition> {

  /**
   * A line position at the start of a document (0,0).
   */
  public static readonly Zero = new LinePosition();

  /**
   * The offset of the character in the line.
   */
  public readonly character: number;

  /**
   * The line number, starting from 0.
   */
  public readonly line: number;

  /**
   * Constructs a `LinePosition` object.
   *
   * @param {number} line
   *   The line number, starting from 0.
   * @param {number} character
   *   The offset of the character in the line.
   */
  constructor(line = 0, character = 0) {
    if (line < 0 || character < 0) {
      throw new ArgumentOutOfRangeException();
    }
    this.line = line;
    this.character = character;
  }

  /**
   * @inheritDoc
   */
  public compareTo(value: LinePosition): number {
    const diff = this.line - value.line;
    return diff !== 0 ? diff : this.character - value.character;
  }

  /**
   * @inheritDoc
   */
  public equals(value: LinePosition): boolean {
    return this.line === value.line && this.character === value.character;
  }

  /**
   * @inheritDoc
   */
  public hashCode(): number {
    return Hash.combine(this.line, this.character);
  }

}
