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

import { SyntaxDiagnostic } from '../diagnostics/SyntaxDiagnostic';

/**
 * Defines an interface for objects that can store immutable data about a token
 * or collection of tokens.
 */
export interface ITokenMetadata {

  /**
   * Determines if any diagnostics are associated with the token or token
   * collection.
   *
   * @see ITokenMetadata.diagnostics
   */
  readonly containsDiagnostics: boolean;

  /**
   * If the token collection contains any tokens that were skipped.
   */
  readonly containsSkippedText: boolean;

  /**
   * A list of diagnostics associated with the token or token collection.
   */
  readonly diagnostics: ReadonlyArray<SyntaxDiagnostic>;

  /**
   * The width of the token or token collection, with trivia.
   *
   * @see ITokenMetadata.width
   */
  readonly fullWidth: number;

  /**
   * If the parser generated the token because it was not found in the source
   * text.
   */
  readonly isMissing: boolean;

  /**
   * If the token is necessary for parsing.
   *
   * @see ITokenMetadata.isTrivia
   */
  readonly isToken: boolean;

  /**
   * If the token is not necessary for parsing.
   *
   * @see ITokenMetadata.isToken
   */
  readonly isTrivia: boolean;

  /**
   * The width of any trivia preceeding the token or token collection.
   */
  readonly leadingTriviaWidth: number;

  /**
   * The width of the token or token collection, without trivia.
   *
   * @see ITokenMetadata.fullWidth
   */
  readonly width: number;

}
