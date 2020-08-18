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

import { ArgumentException, Debug } from '@mattacosta/php-common';

import { INode } from '../node/INode';
import { ISourceText } from '../../text/ISourceText';
import { ISyntaxNode } from './ISyntaxNode';
import { ISyntaxToken, SyntaxTokenFilter } from './ISyntaxToken';
import { ISyntaxTriviaList } from './ISyntaxTriviaList';
import { NodeExtensions } from '../node/NodeExtensions';
import { SyntaxNodeExtensions } from './SyntaxNodeExtensions';
import { SyntaxTriviaFilter } from './ISyntaxTrivia';
import { SyntaxTriviaList } from './SyntaxTriviaList';
import { TextSpan } from '../../text/TextSpan';
import { TokenKind } from '../TokenKind';
import { TokenNode } from '../node/TokenNode';

/**
 * Represents a terminal node in a syntax tree.
 */
export class SyntaxToken implements ISyntaxToken {

  /**
   * @inheritDoc
   */
  public readonly parent: ISyntaxNode;

  /**
   * @todo Experimental.
   */
  protected readonly index: number;

  /**
   * An object containing the metadata for this token.
   */
  protected readonly node: INode | null;

  /**
   * The absolute location of this token in the source text.
   *
   * @see SyntaxToken.span
   * @see SyntaxToken.fullSpan
   */
  protected readonly offset: number;

  /**
   * Constructs a `SyntaxToken` object.
   */
  constructor(node: INode | null, parent: ISyntaxNode, offset: number, index: number) {
    Debug.assert(node === null || node.isToken);

    this.node = node;
    this.parent = parent;
    this.offset = offset;
    this.index = index;
  }

  /**
   * @todo Unused.
   */
  protected get endOffset(): number {
    return this.node !== null ? this.offset + this.node.fullWidth : 0;
  }

  /**
   * @inheritDoc
   */
  public get containsDiagnostics(): boolean {
    return this.node !== null ? this.node.containsDiagnostics : false;
  }

  /**
   * @inheritDoc
   */
  public get fullSpan(): TextSpan {
    return new TextSpan(this.offset, this.node !== null ? this.node.fullWidth : 0);
  }

  /**
   * @inheritDoc
   */
  public get isMissing(): boolean {
    return this.node !== null ? this.node.isMissing : false;
  }

  /**
   * @inheritDoc
   */
  public get isToken(): boolean {
    return true;
  }

  /**
   * @inheritDoc
   */
  public get leadingTrivia(): ISyntaxTriviaList | null {
    return this.node !== null ? new SyntaxTriviaList(this.node.leadingTrivia, this, this.offset) : null;
  }

  /**
   * @inheritDoc
   */
  public get kind(): TokenKind {
    // @todo This is cheating.
    return this.node !== null ? (<TokenNode>this.node).kind : TokenKind.Unknown;
  }

  /**
   * @inheritDoc
   */
  public get span(): TextSpan {
    return this.node !== null
      ? new TextSpan(this.offset + this.node.leadingTriviaWidth, this.node.width)
      : new TextSpan(this.offset, 0);
  }

  /**
   * Determines if the token has a width (not including trivia).
   */
  public static hasWidth(token: ISyntaxToken): boolean {
    const span = token.span;
    const width = span ? span.length : 0;
    return width > 0;
  }

  /**
   * Gets the text of a token.
   *
   * @param {ISyntaxToken} token
   *   A token in a syntax tree.
   * @param {ISourceText} text
   *   The text of the syntax tree that contains the token.
   */
  public static getText(token: ISyntaxToken, text: ISourceText): string {
    if (token.span.end > text.length) {
      throw new ArgumentException('Token is not in source text');
    }
    if (token.span.isEmpty) {
      return '';
    }
    return text.substring(token.span.start, token.span.length);
  }

  /**
   * Attempts to get the first token matching the given filter(s).
   *
   * @param {ISyntaxToken} token
   *   The token to search.
   * @param {SyntaxTokenFilter=} tokenFilter
   *   A callback used to limit what tokens are returned. This filter is
   *   applied to the current token and tokens found within structured
   *   trivia, if any. If not provided, any token will match.
   * @param {SyntaxTriviaFilter=} triviaFilter
   *   A callback used to limit what structured trivia nodes are searched.
   *   If not provided, trivia is not searched.
   */
  public static tryGetFirstToken(token: ISyntaxToken, tokenFilter?: SyntaxTokenFilter, triviaFilter?: SyntaxTriviaFilter): ISyntaxToken | null {
    const leadingTrivia = token.leadingTrivia;
    if (leadingTrivia !== null && triviaFilter !== undefined) {
      const structuredToken = SyntaxTriviaList.tryGetFirstToken(leadingTrivia, triviaFilter, tokenFilter);
      if (structuredToken !== null) {
        return structuredToken;
      }
    }

    if (tokenFilter === undefined || tokenFilter(token)) {
      return token;
    }

    return null;
  }

  /**
   * Attempts to get the last token matching the given filter(s).
   *
   * @param {ISyntaxToken} token
   *   The token to search.
   * @param {SyntaxTokenFilter=} tokenFilter
   *   A callback used to limit what tokens are returned. This filter is
   *   applied to the current token and tokens found within structured
   *   trivia, if any. If not provided, any token will match.
   * @param {SyntaxTriviaFilter=} triviaFilter
   *   A callback used to limit what structured trivia nodes are searched.
   *   If not provided, trivia is not searched.
   */
  public static tryGetLastToken(token: ISyntaxToken, tokenFilter?: SyntaxTokenFilter, triviaFilter?: SyntaxTriviaFilter): ISyntaxToken | null {
    if (tokenFilter === undefined || tokenFilter(token)) {
      return token;
    }

    const leadingTrivia = token.leadingTrivia;
    if (leadingTrivia !== null && triviaFilter !== undefined) {
      const structuredToken = SyntaxTriviaList.tryGetLastToken(leadingTrivia, triviaFilter, tokenFilter);
      if (structuredToken !== null) {
        return structuredToken;
      }
    }

    return null;
  }

  /**
   * Attempts to get the next token matching the given filter(s).
   *
   * @param {ISyntaxToken} token
   *   The token to search.
   * @param {SyntaxTokenFilter=} tokenFilter
   *   A callback used to limit what tokens are returned. This filter is
   *   applied to the current token and tokens found within structured
   *   trivia, if any. If not provided, any token will match.
   * @param {SyntaxTriviaFilter=} triviaFilter
   *   A callback used to limit what structured trivia nodes are searched.
   *   If not provided, trivia is not searched.
   */
  public static tryGetNextToken(token: ISyntaxToken, tokenFilter?: SyntaxTokenFilter, triviaFilter?: SyntaxTriviaFilter): ISyntaxToken | null {
    // @todo Instead of changing this method signature, add another method
    //   that also searches the leading trivia of a token.

    let found = false;
    for (let child of token.parent.getAllChildren()) {
      if (found) {
        if (child.isToken) {
          let result = SyntaxToken.tryGetFirstToken(<ISyntaxToken>child, tokenFilter /*, triviaFilter */);
          if (result !== null) {
            return result;
          }
        }
        else {
          let result = SyntaxNodeExtensions.tryGetFirstToken(<ISyntaxNode>child, tokenFilter /*, triviaFilter */);
          if (result !== null) {
            return result;
          }
        }
      }
      else if (child.isToken && token.equals(child)) {
        // Found the current token, so any remaining tokens should be searched.
        found = true;
      }
    }

    // Not found in parent, check the grandparent.
    return SyntaxNodeExtensions.tryGetNextToken(token.parent, tokenFilter);
  }

  /**
   * Attempts to get the previous token matching the given filter(s).
   *
   * @param {ISyntaxToken} token
   *   The token to search.
   * @param {SyntaxTokenFilter=} tokenFilter
   *   A callback used to limit what tokens are returned. This filter is
   *   applied to the current token and tokens found within structured
   *   trivia, if any. If not provided, any token will match.
   * @param {SyntaxTriviaFilter=} triviaFilter
   *   A callback used to limit what structured trivia nodes are searched.
   *   If not provided, trivia is not searched.
   */
  public static tryGetPreviousToken(token: ISyntaxToken, tokenFilter?: SyntaxTokenFilter, triviaFilter?: SyntaxTriviaFilter): ISyntaxToken | null {
    // @todo Instead of changing this method signature, add another method
    //   that also searches the leading trivia of a token.

    let found = false;
    for (let child of token.parent.getAllChildrenReversed()) {
      if (found) {
        if (child.isToken) {
          let result = SyntaxToken.tryGetLastToken(<ISyntaxToken>child, tokenFilter /*, triviaFilter */);
          if (result !== null) {
            return result;
          }
        }
        else {
          let result = SyntaxNodeExtensions.tryGetLastToken(<ISyntaxNode>child, tokenFilter /*, triviaFilter */);
          if (result !== null) {
            return result;
          }
        }
      }
      else if (child.isToken && token.equals(child)) {
        // Found the current token, so any remaining tokens should be searched.
        found = true;
      }
    }

    // Not found in parent, check the grandparent.
    return SyntaxNodeExtensions.tryGetPreviousToken(token.parent, tokenFilter);
  }

  /**
   * @inheritDoc
   */
  public equals(value: SyntaxToken): boolean {
    if (this === value) {
      return true;
    }
    if (this.offset === value.offset && this.index === value.index && this.parent.equals(value.parent)) {
      return NodeExtensions.equals(this.node, value.node);
    }
    return false;
  }

  /**
   * @inheritDoc
   */
  public nextToken(includeZeroWidth = false): ISyntaxToken | null {
    if (this.node === null) {
      return null;
    }
    if (!includeZeroWidth) {
      return SyntaxToken.tryGetNextToken(this, SyntaxToken.hasWidth);
    }
    return SyntaxToken.tryGetNextToken(this);
  }

  /**
   * @inheritDoc
   */
  public previousToken(includeZeroWidth = false): ISyntaxToken | null {
    if (this.node === null) {
      return null;
    }
    if (!includeZeroWidth) {
      return SyntaxToken.tryGetPreviousToken(this, SyntaxToken.hasWidth);
    }
    return SyntaxToken.tryGetPreviousToken(this);
  }

}
