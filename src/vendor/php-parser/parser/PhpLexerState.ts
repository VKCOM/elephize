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

/**
 * Lexing states used when tokenizing PHP files.
 */
export enum PhpLexerState {

  /**
   * The lexing state used when the lexer is within the host language that
   * contains a PHP script.
   *
   * This is the default state.
   */
  InHostLanguage,
  /**
   * The default lexing state when rescanning a `StringTemplate`.
   */
  InDoubleQuote,
  /**
   * The default lexing state when rescanning a `FlexdocTemplate`.
   */
  InFlexibleHeredoc,
  /**
   * The default lexing state when rescanning a `FlexdocTemplate` that starts
   * with a nowdoc label.
   */
  InFlexibleNowdoc,
  /**
   * The default lexing state when rescanning a `HeredocTemplate`.
   */
  InHeredoc,
  /**
   * The default lexing state when rescanning a `HeredocTemplate` that starts
   * with a nowdoc label.
   */
  InNowdoc,
  /**
   * The lexing state used when the lexer is within a PHP script.
   *
   * @see PhpLexerState.InHostLanguage
   */
  InScript,
  /**
   * The default lexing state when rescanning a `ShellCommandTemplate`.
   */
  InShellCommand,
  /**
   * A lexing state used when scanning an element access expression within a
   * string interpolation.
   */
  InVariableOffset,
  /**
   * A lexing state used when rescanning the whitespace after a line break.
   */
  LookingForHeredocIndent,
  /**
   * A lexing state used when rescanning heredoc start or end labels.
   */
  LookingForHeredocLabel,
  /**
   * A lexing state used when scanning an object access expression within a
   * string interpolation.
   */
  LookingForProperty,      // Not used.
  /**
   * A lexing state used when scanning an indirect variable name.
   */
  LookingForVariableName,  // `${...}`

}
