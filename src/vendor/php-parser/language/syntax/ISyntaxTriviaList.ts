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

import { ICountable, IEquatable } from '@mattacosta/php-common';

import { ISyntaxToken } from './ISyntaxToken';
import { ISyntaxTrivia } from './ISyntaxTrivia';
import { TextSpan } from '../../text/TextSpan';

/**
 * Defines an interface for lists of trivia.
 */
export interface ISyntaxTriviaList extends ICountable, IEquatable<ISyntaxTriviaList>, Iterable<ISyntaxTrivia> {

  /**
   * The location of the trivia contained in this list, with the leading
   * trivia of the first element.
   */
  readonly fullSpan: TextSpan;

  /**
   * The location of the trivia contained in this list, without the leading
   * trivia of the first element.
   */
  readonly span: TextSpan;

  /**
   * The token containing the trivia list.
   */
  readonly token: ISyntaxToken;

  /**
   * Gets an iterator that lists trivia in reversed order.
   */
  reversed(): IterableIterator<ISyntaxTrivia>;

  /**
   * Returns the trivia node at a given index.
   */
  triviaAt(index: number): ISyntaxTrivia;

}
