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
  IComparable,
  IEquatable
} from '@mattacosta/php-common';

/**
 * Represents a region of text.
 *
 * Text span comparison methods:
 *
 * |            | contains | overlaps | intersects |
 * |------------|:--------:|:--------:|:----------:|
 * | `-aaa----` | no       | no       | yes        |
 * | `----bbb-` |          |          |            |
 * | `-aaa----` | no       | yes      | yes        |
 * | `---bbb--` |          |          |            |
 * | `--aaaa--` | yes      | yes      | yes        |
 * | `--bbbb--` |          |          |            |
 */
export class TextSpan implements IComparable<TextSpan>, IEquatable<TextSpan> {

  /**
   * The number of characters in the span.
   */
  public readonly length: number;

  /**
   * The starting location of the span.
   */
  public readonly start: number;

  /**
   * Constructs a `TextSpan` object.
   *
   * @param {number} start
   *   The starting location of the span.
   * @param {number} length
   *   The number of characters in the span.
   */
  constructor(start: number, length: number) {
    if (start < 0) {
      throw new ArgumentOutOfRangeException();
    }
    if (start + length < start) {
      throw new ArgumentOutOfRangeException();
    }
    this.start = start;
    this.length = length;
  }

  /**
   * Creates a `TextSpan` using starting and ending locations.
   *
   * @param {number} start
   *   The starting location of the span.
   * @param {number} end
   *   The ending location of the span.
   */
  public static fromBounds(start: number, end: number): TextSpan {
    if (start < 0) {
      throw new ArgumentOutOfRangeException();
    }
    if (end < start) {
      throw new ArgumentOutOfRangeException();
    }
    return new TextSpan(start, end - start);
  }

  /**
   * Gets the ending location of the span.
   */
  public get end(): number {
    return this.start + this.length;
  }

  /**
   * Determines if the number of characters in the span is zero.
   */
  public get isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * @inheritDoc
   */
  public compareTo(span: TextSpan): number {
    const diff = this.start - span.start;
    return diff === 0 ? this.length - span.length : diff;
  }

  /**
   * Determines if the given span is completely within this span, or if an
   * offset is within the bounds of this span (`start` inclusive).
   */
  public contains(position: TextSpan | number): boolean {
    if (typeof position === 'number') {
      return position >= this.start ? (position - this.start) < this.length : false;
    }
    return position.start >= this.start && position.end <= this.end;
  }

  /**
   * @inheritDoc
   */
  public equals(span: TextSpan): boolean {
    return this.start === span.start && this.length === span.length;
  }

  /**
   * Finds the intersecting region of this span and a given span.
   *
   * Text spans intersect if both share a common region, or if the end of one
   * span is the same as the start of the other.
   *
   * @return {TextSpan|null}
   *   The intersecting region of the spans, or `null` if the spans did not
   *   intersect.
   */
  public intersection(span: TextSpan): TextSpan | null {
    const intersectStart = Math.max(this.start, span.start);
    const intersectEnd = Math.min(this.end, span.end);
    return intersectStart <= intersectEnd
      ? TextSpan.fromBounds(intersectStart, intersectEnd)
      : null;
  }

  /**
   * Determines if a given span intersects with this span, or if an offset is
   * within the bounds of this span (`start` and `end` inclusive).
   */
  public intersectsWith(position: TextSpan | number): boolean {
    if (typeof position === 'number') {
      return (position - this.start) <= this.length;
    }
    return position.start <= this.end && position.end >= this.start;
  }

  /**
   * Finds the overlapping region of this span and a given span.
   *
   * @return {TextSpan|null}
   *   The overlapping region of the spans, or `null` if the spans did not
   *   overlap.
   */
  public overlap(span: TextSpan): TextSpan | null {
    const overlapStart = Math.max(this.start, span.start);
    const overlapEnd = Math.min(this.end, span.end);
    return overlapStart < overlapEnd
      ? TextSpan.fromBounds(overlapStart, overlapEnd)
      : null;
  }

  /**
   * Determines if the given span overlaps with this span.
   */
  public overlapsWith(span: TextSpan): boolean {
    return Math.max(this.start, span.start) < Math.min(this.end, span.end);
  }

}
