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

import { INode } from '../node/INode';
import { ISyntaxNode } from './ISyntaxNode';
import { ISyntaxToken } from './ISyntaxToken';
import { ISyntaxTrivia } from './ISyntaxTrivia';
import { NodeExtensions } from '../node/NodeExtensions';
import { TextSpan } from '../../text/TextSpan';
import { TokenKind } from '../TokenKind';
import { TriviaNode } from '../node/TriviaNode';

/**
 * Represents an insignificant token within a syntax tree.
 */
export class SyntaxTrivia implements ISyntaxTrivia {

  /**
   * @inheritDoc
   */
  public readonly token: ISyntaxToken;

  /**
   * @todo Experimental.
   */
  protected readonly index: number;

  /**
   * An object containing the metadata for this trivia.
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
   * Constructs a `SyntaxTrivia` object.
   */
  constructor(node: INode | null, token: ISyntaxToken, offset: number, index: number) {
    this.index = index;
    this.node = node;
    this.offset = offset;
    this.token = token;
  }

  /**
   * @inheritDoc
   */
  public get containsStructuredTrivia(): boolean {
    return false;  // @todo Not implemented.
  }

  /**
   * @inheritDoc
   */
  public get containsSkippedText(): boolean {
    return this.node !== null ? this.node.containsSkippedText : false;
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
  public get kind(): TokenKind {
    // @todo Use an interface.
    return this.node !== null ? (<TriviaNode>this.node).kind : TokenKind.Unknown;
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
   * Determines if the trivia was created from a skipped token.
   */
  public static isSkippedToken(trivia: ISyntaxTrivia): boolean {
    return trivia.containsSkippedText;
  }

  /**
   * @inheritDoc
   */
  public equals(value: SyntaxTrivia): boolean {
    if (this === value) {
      return true;
    }
    if (this.offset === value.offset && this.index === value.index && this.token.equals(value.token)) {
      return NodeExtensions.equals(this.node, value.node);
    }
    return false;
  }

  /**
   * @inheritDoc
   */
  public getStructure(): ISyntaxNode | null {
    return null;  // @todo Not implemented.
  }

}
