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

import { Encoding } from './Encoding';
import { ISourceText } from './ISourceText';
import { SegmentedText } from './SegmentedText';
import { SourceTextBase } from './SourceTextBase';
import { SourceTextFactory } from './SourceTextFactory';
import { TextSpan } from './TextSpan';

/**
 * A source code container based on a string.
 *
 * @internal
 */
export class StringText extends SourceTextBase {

  /**
   * @inheritDoc
   */
  public readonly encoding: Encoding;

  /**
   * @inheritDoc
   */
  public readonly length: number;

  /**
   * @inheritDoc
   */
  public readonly sourceKey: ISourceText;

  /**
   * @inheritDoc
   */
  public readonly sourceLength: number;

  /**
   * @inheritDoc
   */
  public readonly sources: ReadonlyArray<ISourceText>;

  /**
   * A string containing the source code.
   */
  protected readonly text: string;

  /**
   * Constructs a `StringText` object.
   *
   * @param {string} text
   *   A string containing the source code.
   * @param {Encoding} encoding
   *   The original encoding of the source text.
   */
  constructor(text: string, encoding: Encoding) {
    super();
    this.encoding = encoding;
    this.length = text.length;
    this.sourceKey = this;
    this.sourceLength = text.length;
    this.sources = [this];
    this.text = text;
  }

  /**
   * @inheritDoc
   */
  public charCodeAt(index: number): number {
    return this.text.charCodeAt(index);
  }

  /**
   * @inheritDoc
   */
  public slice(position: TextSpan | number): ISourceText {
    if (typeof position === 'number') {
      position = TextSpan.fromBounds(position, this.text.length);
    }
    if (!this.isSpanInText(position)) {
      throw new ArgumentOutOfRangeException();
    }
    if (position.length === 0) {
      return SourceTextFactory.EmptyText;
    }
    if (position.start === 0 && position.length === this.text.length) {
      return new StringText(this.text, this.encoding);  // Always return a new instance.
    }
    return new SegmentedText(this, position, this.encoding);
  }

  /**
   * @inheritDoc
   */
  public substring(start: number, length?: number): string {
    if (start < 0) {
      start = this.length + start;
    }
    if (start < 0 || start > this.length) {
      throw new ArgumentOutOfRangeException();
    }
    if (length === void 0) {
      length = this.length - start;
    }
    if (length < 0) {
      length = 0;
    }
    if (length > this.length - start) {
      throw new ArgumentOutOfRangeException();
    }
    return this.text.substr(start, length);
  }

  /**
   * @inheritDoc
   */
  public withEncoding(encoding: Encoding): ISourceText {
    return new StringText(this.text, encoding);
  }

}
