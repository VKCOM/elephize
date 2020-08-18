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

import { ErrorCode } from '../diagnostics/ErrorCode.Generated';
import { ISourceText } from '../text/ISourceText';
import { SourceTextFactory } from '../text/SourceTextFactory';
import { SyntaxDiagnostic } from '../diagnostics/SyntaxDiagnostic';

/**
 * Defines an interface for objects that can generate tokens by scanning source
 * text.
 *
 * @template T, TState
 */
export interface ILexer<T, TState> {

  /**
   * Scans the source text until a token is found.
   *
   * @param {TState} state
   *   The scanning mode used by the lexer.
   *
   * @return {T}
   *   An object containing token information.
   */
  lex(state: TState): T;

  /**
   * Sets the current lexer position.
   *
   * @param {number} offset
   *   The offset into the text.
   */
  setPosition(offset: number): void;

  /**
   * Sets the source text to tokenize.
   */
  setText(text: ISourceText): void;

}

/**
 * Provides a base class for language tokenizers.
 */
export abstract class LexerBase<T, TState> implements ILexer<T, TState> {

  /**
   * A list of diagnostics found while attempting to scan for a token.
   */
  protected diagnostics: SyntaxDiagnostic[] = [];

  /**
   * The location within the text to stop scanning.
   */
  protected end: number = 0;

  /**
   * The current location of the scanner.
   */
  protected offset: number = 0;

  /**
   * The location within the text to start scanning.
   */
  protected start: number = 0;

  /**
   * The current lexing state of the scanner.
   */
  protected state: TState;

  /**
   * The text to scan.
   */
  protected text: ISourceText = SourceTextFactory.EmptyText;

  /**
   * Constructs a `LexerBase` object.
   *
   * @param {ISourceText=} text
   *   The source text to tokenize.
   * @param {TState} defaultState
   *   The default scanning mode when starting to scan text.
   */
  constructor(text: ISourceText, defaultState: TState) {
    this.setText(text);
    this.state = defaultState;
  }

  /**
   * @inheritDoc
   */
  public abstract lex(state: TState): T;

  /**
   * @inheritDoc
   */
  public setPosition(offset: number): void {
    if (offset < this.start || offset > this.end) {
      throw new ArgumentOutOfRangeException('Offset must be within scanning bounds');
    }
    this.offset = offset;
  }

  /**
   * @inheritDoc
   */
  public abstract setText(text: ISourceText): void;

  /**
   * Adds a new diagnostic to the list of diagnostics found during a scan.
   */
  protected addError(relativeOffset: number, width: number, code: ErrorCode, ...args: any[]): void {
    this.diagnostics.push(this.createDiagnostic(relativeOffset, width, code, ...args));
  }

  /**
   * Creates a diagnostic for a token.
   */
  protected createDiagnostic(relativeOffset: number, width: number, code: ErrorCode, ...args: any[]): SyntaxDiagnostic {
    return new SyntaxDiagnostic(relativeOffset, width, code, ...args);
  }

  /**
   * Reads the character code at the given location, but does not consume it.
   *
   * @param {number} offset
   *   An offset into the scannable text.
   *
   * @return {number}
   *   The character code at the specified offset, or -1 if the offset was
   *   outside the allowed scan range.
   */
  protected peek(offset: number): number {
    if (offset >= this.end) {
      return -1;
    }
    return this.text.charCodeAt(offset);
  }

  /**
   * Sets the starting and ending locations of the text to tokenize.
   *
   * @param {number} start
   *   The offset within the text to start tokenizing.
   * @param {number} end
   *   The offset within the text to stop tokenizing.
   */
  protected setBounds(start: number, end: number): void {
    if (start < 0 || start > this.text.length) {
      throw new ArgumentOutOfRangeException();
    }
    if (end < start || end > this.text.length) {
      throw new ArgumentOutOfRangeException();
    }
    this.start = start;
    this.end = end;
  }

  /**
   * Determines if text at the given position starts with the specified string.
   *
   * @param {string} value
   *   The text to search for.
   * @param {boolean=} caseInsensitive
   *   If a match should be case-insensitive. Defaults to `true`.
   *
   * @return {boolean}
   *   If the scannable text starts with the given string `true`, otherwise
   *   `false`.
   */
  protected startsWith(value: string, caseInsensitive = true): boolean {
    // if (value.length == 0) {
    //   return true;
    // }
    if (this.offset + value.length > this.end) {
      return false;
    }
    let text = this.text.substring(this.offset, value.length);
    if (caseInsensitive) {
      return text.toLowerCase().startsWith(value);
    }
    return text.startsWith(value);
  }

}
