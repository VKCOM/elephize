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
import { SourceTextBase } from './SourceTextBase';
import { SourceTextFactory } from './SourceTextFactory';
import { TextSpan } from './TextSpan';

/**
 * A segment of another source text.
 *
 * @internal
 */
export class SegmentedText extends SourceTextBase {

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
   * The starting position and length of the segment.
   */
  protected readonly span: TextSpan;

  /**
   * The source text that contains this segment.
   */
  protected readonly text: ISourceText;

  /**
   * Constructs a `SegmentedText` object.
   *
   * @param {ISourceText} text
   *   The source text that contains the segment.
   * @param {TextSpan} span
   *   The starting position and length of the segment.
   * @param {Encoding} encoding
   *   The original encoding of the source text.
   *
   * @throws {ArgumentOutOfRangeException}
   *   The span did not specify a region within the source text.
   */
  constructor(text: ISourceText, span: TextSpan, encoding: Encoding) {
    super();
    if (span.start < 0 || span.start >= text.length || span.end < 0 || span.end > text.length) {
      throw new ArgumentOutOfRangeException();
    }
    this.encoding = encoding;
    this.length = span.length;
    this.sourceKey = text;
    this.sourceLength = text.length;
    this.sources = [this];
    this.span = span;
    this.text = text;
  }

  /**
   * @inheritDoc
   */
  public charCodeAt(offset: number): number {
    if (offset < 0 || offset >= this.length) {
      return NaN;
    }
    return this.text.charCodeAt(this.span.start + offset);
  }

  /**
   * @inheritDoc
   */
  public slice(position: TextSpan | number): ISourceText {
    if (typeof position === 'number') {
      position = TextSpan.fromBounds(position, this.length);
    }
    if (!this.isSpanInText(position)) {
      throw new ArgumentOutOfRangeException();
    }
    if (position.length === 0) {
      return SourceTextFactory.EmptyText;
    }
    let segmentSpan = this.createSegmentSpan(position.start, position.length);
    return new SegmentedText(this.text, segmentSpan, this.encoding);
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
    let segmentSpan = this.createSegmentSpan(start, length);
    return this.text.substring(segmentSpan.start, segmentSpan.length);
  }

  /**
   * @inheritDoc
   */
  public withEncoding(encoding: Encoding): ISourceText {
    return new SegmentedText(this.text, this.span, encoding);
  }

  /**
   * Creates a span relative to the source text that contains this segment.
   *
   * @param {number} start
   *   The starting location of the span.
   * @param {number} length
   *   The number of characters in the span.
   */
  protected createSegmentSpan(start: number, length: number): TextSpan {
    let spanStart = Math.min(this.text.length, this.span.start + start);
    let spanEnd = Math.min(this.text.length, spanStart + length);
    return new TextSpan(spanStart, spanEnd - spanStart);
  }

}
