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

import { Encoding } from './Encoding';
import { ISourceText } from './ISourceText';
import { SourceTextExtensions } from './SourceTextExtensions';
import { SourceTextFactory } from './SourceTextFactory';

/**
 * @todo Document `SourceTextBuilder`.
 */
export class SourceTextBuilder {

  /**
   * The minimum length of a rebuilt segment. Defaults to 4KB.
   *
   * @todo Experimental.
   */
  protected static MinSegmentLength = 1024 * 4;

  /**
   * The maximum length of a rebuilt segment. Defaults to 16MB.
   *
   * @todo Experimental.
   */
  protected static MaxSegmentLength = 1024 * 1024 * 16;

  /**
   * The number of segments for an optimized rebuild. Defaults to 16.
   *
   * @todo Experimental.
   */
  protected static ReducedSegmentTarget = 16;

  /**
   * The maximum number of segments before the text is considered to be too
   * fragmented. Defaults to 64.
   *
   * @todo Experimental.
   */
  protected static SegmentLimit = 64;

  /**
   * The original encoding of the source text.
   */
  protected readonly encoding: Encoding;

  /**
   * The current length of the source text.
   */
  protected length = 0;

  /**
   * The text segments used to create the source text.
   */
  protected segments: ISourceText[];

  /**
   * The number of unique sources used to create the source text.
   */
  protected sourceCount = 0;

  /**
   * The total length of the unique sources used to create the source text.
   */
  protected sourceLength = 0;

  /**
   * A `Set` containing the unique sources used to create the source text.
   */
  protected uniqueSources: Set<ISourceText>;

  /**
   * Constructs a `SourceTextBuilder` object.
   *
   * @param {Encoding} encoding
   *   The original encoding of the source text.
   */
  constructor(encoding: Encoding) {
    this.encoding = encoding;
    this.segments = [];
    this.uniqueSources = new Set();
  }

  /**
   * Appends a text segment to the source text.
   *
   * @param {ISourceText} segment
   *   The text segment to append.
   */
  public append(segment: ISourceText): void {
    if (SourceTextExtensions.isSourceTextContainer(segment)) {
      for (let i = 0; i < segment.sources.length; i++) {
        this.length += segment.sources[i].length;
        this.segments.push(segment.sources[i]);
        this.addSource(segment.sources[i]);
      }
    }
    else {
      this.length += segment.length;
      this.segments.push(segment);
      this.addSource(segment);
    }
  }

  /**
   * Removes all segments from the builder.
   */
  public clear(): void {
    this.length = 0;
    this.segments = [];
    this.sourceCount = 0;
    this.sourceLength = 0;
    this.uniqueSources.clear();
  }

  /**
   * Creates a source text object from the text segments given to the builder.
   *
   * @return {ISourceText}
   *   A new source text object.
   */
  public toSourceText(): ISourceText {
    if (this.length === 0) {
      return SourceTextFactory.EmptyText;
    }

    // On the one hand, it would be nice to reclaim memory sooner, but on the
    // other hand that would temporarily allocate more than 1.5x the memory.
    if (this.length < this.sourceLength / 2) {
      this.trimSegments();
    }
    if (this.segments.length > SourceTextBuilder.SegmentLimit) {
      this.reduceSegments(this.computeReducedSegmentLength());
    }

    return SourceTextFactory.createContainer(this.segments, this.sourceLength, this.encoding);
  }

  /**
   * Stores the underlying source used by a segment, if it is unique to the text
   * being built. Extending classes may override this method to change the
   * optimization strategy of custom `ISourceText` implementations.
   */
  protected addSource(segment: ISourceText): void {
    if (SourceTextExtensions.isSourceTextContainer(segment)) {
      this.uniqueSources.add(segment.sourceKey);
      if (this.uniqueSources.size > this.sourceCount) {
        this.sourceLength += segment.sourceLength;
        this.sourceCount++;
      }
    }
    else {
      // By default, custom implementations are treated as plain text.
      this.uniqueSources.add(segment);
      if (this.uniqueSources.size > this.sourceCount) {
        this.sourceLength += segment.length;
        this.sourceCount++;
      }
    }
  }

  /**
   * Reduces the number of segments used by the source text being created.
   *
   * @param {number} targetLength
   *   The ideal length of each new segment.
   */
  protected reduceSegments(targetLength: number): void {
    let segments = this.segments;
    this.clear();

    for (let i = 0; i < segments.length; i++) {
      if (segments[i].length > targetLength) {
        this.append(segments[i]);
        continue;
      }

      let mergedLength = segments[i].length;
      let mergedSegments = 0;
      let text = '';

      for (let n = i + 1; n < segments.length; n++) {
        if (mergedLength + segments[n].length > targetLength) {
          break;
        }

        // Now that the segment is known to be merged, extract its text.
        if (text.length === 0) {
          text += segments[i].substring(0);
        }

        text += segments[n].substring(0);
        mergedLength += segments[n].length;
        mergedSegments++;
      }

      this.append(text.length === 0 ? segments[i] : SourceTextFactory.from(text, this.encoding));
      i += mergedSegments;
    }
  }

  /**
   * Removes deleted text from each segment.
   */
  protected trimSegments(): void {
    let segments = this.segments;
    this.clear();
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      if (segment.length > 0) {
        if (SourceTextExtensions.isSourceTextContainer(segment) && segment.length < segment.sourceLength) {
          this.append(SourceTextFactory.from(segment.substring(0), this.encoding));
        }
        else {
          this.append(segment);
        }
      }
    }
  }

  /**
   * Determines how many segments will be required to store text using the
   * given segment length.
   */
  private computeReducedSegmentCount(segmentLength: number): number {
    let removedSegments = 0;
    for (let i = 0; i < this.segments.length; i++) {
      if (this.segments[i].length > segmentLength) {
        continue;
      }

      let mergedLength = this.segments[i].length;
      let mergedSegments = 0;
      for (let n = i + 1; n < this.segments.length; n++) {
        if (mergedLength + this.segments[n].length <= segmentLength) {
          mergedLength += this.segments[n].length;
          mergedSegments++;
        }
        else {
          break;
        }
      }

      if (mergedSegments > 0) {
        removedSegments += mergedSegments;
        i += mergedSegments;
      }
    }
    return this.segments.length - removedSegments;
  }

  /**
   * Determines the segment length needed to bring the overall number of
   * segments below a target count.
   */
  private computeReducedSegmentLength(): number {
    let length = SourceTextBuilder.MinSegmentLength;
    while (length <= SourceTextBuilder.MaxSegmentLength) {
      if (this.computeReducedSegmentCount(length) <= SourceTextBuilder.ReducedSegmentTarget) {
        return length;
      }
      length = length * 2;
    }
    return SourceTextBuilder.MaxSegmentLength;
  }

}
