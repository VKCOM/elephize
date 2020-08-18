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

import { BomKind } from './BomKind';
import { CompositeText } from './CompositeText';
import { Encoding } from './Encoding';
import { ISourceText } from './ISourceText';
import { StringText } from './StringText';

/**
 * @todo Document SourceTextFactory.
 */
export class SourceTextFactory {

  /**
   * An empty source text container.
   */
  public static readonly EmptyText: ISourceText = new StringText('', Encoding.Utf8);

  /**
   * The maximum length of a string before a more efficient source text
   * container is created.
   *
   * @todo Experimental.
   * @todo Unused.
   */
  protected static readonly LargeTextLimit: number = 4 * 1024;  // 4KB

  /**
   * Creates a source text container from other source texts.
   *
   * @param {ReadonlyArray<ISourceText>} sources
   *   A list of ordered text segments.
   * @param {number} sourceLength
   *   The total length of the stored text. This may be greater than the length
   *   of the text.
   * @param {Encoding} encoding
   *   The original encoding of the source text.
   *
   * @internal
   */
  public static createContainer(sources: ReadonlyArray<ISourceText>, sourceLength: number, encoding: Encoding): ISourceText {
    return CompositeText.from(sources, sourceLength, encoding);
  }

  /**
   * Creates a source text object from a string.
   *
   * @param {string} text
   *   A string containing source code.
   * @param {Encoding=} encoding
   *   The original encoding of the source text. Defaults to `Encoding.Utf8`.
   */
  public static from(text: string, encoding = Encoding.Utf8): ISourceText {
    return new StringText(text, encoding);
  }

  /**
   * Attempts to determine if a byte order mark is present in the source text.
   *
   * @param {Uint8Array} buffer
   *   A byte-array containing the encoded source text.
   * @param {number} length
   *   The number of valid bytes in the buffer.
   */
  public static tryReadByteOrderMark(buffer: Uint8Array, length: number): BomKind {
    if (length > buffer.length) {
      throw new ArgumentOutOfRangeException();
    }

    if (length >= 2) {
      if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
        return BomKind.UTF16BE;
      }
      if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
        return BomKind.UTF16LE;
      }
      if (buffer[0] === 0xEF) {
        if (length >= 3 && buffer[1] === 0xBB && buffer[2] === 0xBF) {
          return BomKind.UTF8;
        }
      }
    }

    return BomKind.Unknown;
  }

}
