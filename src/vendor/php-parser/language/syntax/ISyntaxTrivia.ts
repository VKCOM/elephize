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

import { ISyntaxNode } from './ISyntaxNode';
import { ISyntaxToken } from './ISyntaxToken';
import { TextSpan } from '../../text/TextSpan';
import { TokenKind } from '../TokenKind';

/**
 * A function that can be used to filter `ISyntaxTrivia` objects.
 */
export type SyntaxTriviaFilter = (trivia: ISyntaxTrivia) => boolean;

/**
 * Defines an interface for trivia nodes attached to a token.
 */
export interface ISyntaxTrivia extends IEquatable<ISyntaxTrivia> {

  /**
   * Determines if the trivia contains parsed documentation.
   */
  readonly containsStructuredTrivia: boolean;

  /**
   * Determines if the trivia was created from a skipped token.
   */
  readonly containsSkippedText: boolean;

  /**
   * The location of the trivia.
   *
   * If the trivia is structured, then this span includes the leading trivia of
   * the embedded node.
   */
  readonly fullSpan: TextSpan;

  /**
   * The type of trivia that was scanned.
   */
  readonly kind: TokenKind;

  /**
   * The location of the trivia.
   *
   * If the trivia is structured, then this span does not include the leading
   * trivia of the embedded node.
   */
  readonly span: TextSpan;

  /**
   * The token containing this trivia.
   */
  readonly token: ISyntaxToken;

  /**
   * Gets the embedded node representing any parsed documentation.
   *
   * @see ISyntaxTrivia.containsStructuredTrivia
   */
  getStructure(): ISyntaxNode | null;

}
