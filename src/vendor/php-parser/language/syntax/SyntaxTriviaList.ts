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

import { IndexOutOfRangeException } from '@mattacosta/php-common';

import { INode } from '../node/INode';
import { ISyntaxNode } from './ISyntaxNode';
import { ISyntaxToken, SyntaxTokenFilter } from './ISyntaxToken';
import { ISyntaxTrivia, SyntaxTriviaFilter } from './ISyntaxTrivia';
import { ISyntaxTriviaList } from './ISyntaxTriviaList';
import { NodeExtensions } from '../node/NodeExtensions';
import { SyntaxNodeExtensions } from './SyntaxNodeExtensions';
import { SyntaxTrivia } from './SyntaxTrivia';
import { TextSpan } from '../../text/TextSpan';

/**
 * Represents a collection of trivia nodes.
 */
export class SyntaxTriviaList implements ISyntaxTriviaList {

  /**
   * @inheritDoc
   */
  public token: ISyntaxToken;

  /**
   * @todo Experimental.
   */
  protected index: number;

  /**
   * An object containing the metadata for this trivia list.
   */
  protected node: INode | null;

  /**
   * The absolute location of this token in the source text.
   *
   * @see SyntaxToken.span
   * @see SyntaxToken.fullSpan
   */
  protected offset: number;

  /**
   * Constructs a `SyntaxTriviaList` object.
   */
  constructor(node: INode | null, token: ISyntaxToken, offset: number, index: number = 0) {
    this.index = index;
    this.node = node;
    this.offset = offset;
    this.token = token;
  }

  /**
   * @inheritDoc
   */
  public get count(): number {
    return this.node !== null ? (this.node.isList ? this.node.count : 1) : 0;
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
  public get span(): TextSpan {
    return this.node !== null
      ? new TextSpan(this.offset + this.node.leadingTriviaWidth, this.node.width)
      : new TextSpan(this.offset, 0);
  }

  /**
   * Attempts to get the first token from a trivia node containing structure.
   *
   * @param {ISyntaxTriviaList} triviaList
   *   The list of trivia to search.
   * @param {SyntaxTriviaFilter=} triviaFilter
   *   A callback used to limit which trivia nodes are searched.
   * @param {SyntaxTokenFilter=} tokenFilter
   *   A callback used to limit which structured nodes are returned.
   *
   * @return {ISyntaxToken|null}
   *   The first matching token, or `null` if either a trivia filter was not
   *   provided or no tokens matched the token filter.
   */
  public static tryGetFirstToken(triviaList: ISyntaxTriviaList, triviaFilter?: SyntaxTriviaFilter, tokenFilter?: SyntaxTokenFilter): ISyntaxToken | null {
    if (triviaFilter === undefined) {
      return null;
    }

    for (let trivia of triviaList) {
      if (trivia.containsStructuredTrivia && triviaFilter(trivia)) {
        // Suppress TS2345: Result cannot be null due to if-condition.
        const structure = <ISyntaxNode>trivia.getStructure();
        const token = SyntaxNodeExtensions.tryGetFirstToken(structure, tokenFilter);
        if (token !== null) {
          return token;
        }
      }
    }

    return null;
  }

  /**
   * Attempts to get the last token from a trivia node containing structure
   * while searching in reversed order.
   *
   * @param {ISyntaxTriviaList} triviaList
   *   The list of trivia to search.
   * @param {SyntaxTriviaFilter=} triviaFilter
   *   A callback used to limit which trivia nodes are searched.
   * @param {SyntaxTokenFilter=} tokenFilter
   *   A callback used to limit which structured nodes are returned.
   *
   * @return {ISyntaxToken|null}
   *   The last matching token, or `null` if either a trivia filter was not
   *   provided or no tokens matched the token filter.
   */
  public static tryGetLastToken(triviaList: ISyntaxTriviaList, triviaFilter?: SyntaxTriviaFilter, tokenFilter?: SyntaxTokenFilter): ISyntaxToken | null {
    if (triviaFilter === undefined) {
      return null;
    }

    for (let trivia of triviaList.reversed()) {
      if (trivia.containsStructuredTrivia && triviaFilter(trivia)) {
        // Suppress TS2345: Result cannot be null due to if-condition.
        const structure = <ISyntaxNode>trivia.getStructure();
        const token = SyntaxNodeExtensions.tryGetLastToken(structure, tokenFilter);
        if (token !== null) {
          return token;
        }
      }
    }

    return null;
  }

  /**
   * @todo Experimental.
   */
  public *[Symbol.iterator](): IterableIterator<SyntaxTrivia> {
    if (this.node === null) {
      return;
    }
    if (this.node.isList) {
      const length = this.node.count;
      for (let i = 0; i < length; i++) {
        const node = this.node.childAt(i);
        const offset = this.offset + this.node.offsetAt(i);
        yield new SyntaxTrivia(node, this.token, offset, this.index + i);
      }
    }
    else {
      yield new SyntaxTrivia(this.node, this.token, this.offset, this.index);
    }
  }

  /**
   * @inheritDoc
   */
  public equals(value: SyntaxTriviaList): boolean {
    if (this === value) {
      return true;
    }
    if (this.index === value.index && this.token.equals(value.token)) {
      return NodeExtensions.equals(this.node, value.node);
    }
    return false;
  }

  /**
   * @inheritDoc
   */
  public *reversed(): IterableIterator<ISyntaxTrivia> {
    if (this.node !== null) {
      const length = this.count;
      for (let i = length - 1; i >= 0; i--) {
        yield this.triviaAt(i);
      }
    }
  }

  /**
   * @inheritDoc
   */
  public triviaAt(index: number): ISyntaxTrivia {
    if (this.node !== null) {
      if (this.node.isList) {
        if (index >= 0 && index < this.node.count) {
          const offset = this.offset + this.node.offsetAt(index);
          return new SyntaxTrivia(this.node.childAt(index), this.token, offset, this.index + index);
        }
      }
      else if (index === 0) {
        return new SyntaxTrivia(this.node, this.token, this.offset, this.index);
      }
    }
    throw new IndexOutOfRangeException();
  }

  /**
   * @todo Experimental.
   */
  protected toArray(): ISyntaxTrivia[] {
    if (this.node === null) {
      return [];
    }

    let list = new Array(this.node.count);
    if (this.node.isList) {
      const length = this.node.count;
      for (let i = 0; i < length; i++) {
        const node = this.node.childAt(i);
        const offset = this.offset + this.node.offsetAt(i);
        list[i] = new SyntaxTrivia(node, this.token, offset, this.index + i);
      }
    }
    else {
      list[0] = new SyntaxTrivia(this.node, this.token, this.offset, this.index);
    }

    return list;
  }

}
