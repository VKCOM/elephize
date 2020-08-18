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

import { TextSpan } from './TextSpan';

/**
 * Represents a span of text that has been changed.
 */
export class TextChange implements IEquatable<TextChange> {

  /**
   * The affected region of the original text.
   */
  public readonly span: TextSpan;

  /**
   * The replacement text (if any).
   */
  public readonly text: string;

  /**
   * Constructs a new `TextChange` object.
   *
   * @param {TextSpan} span
   *   The affected region of the original text.
   * @param {string} text
   *   The replacement text (if any).
   */
  constructor(span: TextSpan, text: string) {
    this.span = span;
    this.text = text;
  }

  /**
   * @inheritDoc
   */
  public equals(change: TextChange): boolean {
    return this.span.equals(change.span) && this.text === change.text;
  }

}
