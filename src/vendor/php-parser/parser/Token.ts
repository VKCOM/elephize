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
import { TokenKind } from '../language/TokenKind';

/**
 * A lexical token.
 *
 * This object represents a segment of the source text that was scanned and
 * found to match a pattern associated with a type of token.
 */
export class Token {

  /**
   * A list of problems found when scanning the token.
   */
  public readonly diagnostics: SyntaxDiagnostic[];

  /**
   * The type of token that was found.
   */
  public readonly kind: TokenKind;

  /**
   * The length of the token.
   */
  public readonly length: number;

  /**
   * The starting position of the token within the source text.
   */
  public readonly offset: number;

  /**
   * Constructs a `Token` object.
   *
   * @param {TokenKind} kind
   *   The type of lexical unit that was found.
   * @param {number} offset
   *   The starting position of the token within the source text.
   * @param {number} length
   *   The length of the token.
   * @param {SyntaxDiagnostic[]=} diagnostics
   *   A list of problems found when scanning the token.
   */
  constructor(kind: TokenKind, offset: number, length: number, diagnostics: SyntaxDiagnostic[] = []) {
    this.kind = kind;
    this.offset = offset;
    this.length = length;
    this.diagnostics = diagnostics;
  }

}
