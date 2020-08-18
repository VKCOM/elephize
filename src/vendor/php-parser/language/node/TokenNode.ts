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

import { Hash, InvalidOperationException } from '@mattacosta/php-common';

import { INode } from './INode';
import { ISyntaxNode } from '../syntax/ISyntaxNode';
import { Node } from './Node';
import { NodeFlags } from './NodeFlags';
import { NodeList } from './NodeList';
import { NodeTransform } from './NodeTransform.Generated';
import { NodeVisitor } from './NodeVisitor.Generated';
import { SyntaxDiagnostic } from '../../diagnostics/SyntaxDiagnostic';
import { TokenKind } from '../TokenKind';

/**
 * A token that is part of the language syntax.
 */
export class TokenNode extends Node {

  /**
   * The type of the token.
   */
  public readonly kind: TokenKind;

  /**
   * @inheritDoc
   */
  protected _flags: NodeFlags;

  /**
   * @inheritDoc
   */
  protected _fullWidth: number;

  /**
   * @inheritDoc
   */
  protected hash: number;

  /**
   * Constructs a `TokenNode` object.
   *
   * @param {TokenKind} kind
   *   The type of the token.
   * @param {number} width
   *   The width of the token.
   * @param {ReadonlyArray<SyntaxDiagnostic>=} diagnostics
   *   A list of diagnostics associated with the trivia token.
   */
  constructor(kind: TokenKind, width: number, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.IsNotMissing;
    this._fullWidth = width;
    this.hash = 0;

    this.kind = kind;

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  /**
   * @inheritDoc
   */
  public get flags(): NodeFlags {
    return this._flags;
  }

  /**
   * @inheritDoc
   */
  public get fullWidth(): number {
    return this._fullWidth;
  }

  /**
   * @inheritDoc
   */
  public get isToken(): boolean {
    return true;
  }

  /**
   * @inheritdoc
   */
  public get leadingTrivia(): NodeList | null {
    return null;
  }

  /**
   * @inheritDoc
   */
  public get leadingTriviaWidth(): number {
    const trivia = this.leadingTrivia;
    return trivia !== null ? trivia.fullWidth : 0;
  }

  /**
   * @inheritDoc
   */
  public accept(visitor: NodeVisitor): void {
    visitor.visitToken(this);
  }

  /**
   * @inheritDoc
   */
  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitToken(this);
  }

  /**
   * @inheritDoc
   */
  public childAt(index: number): INode | null {
    throw new InvalidOperationException('Unreachable');
  }

  /**
   * @inheritDoc
   */
  public createSyntaxNode<T extends ISyntaxNode>(parent: ISyntaxNode, offset: number): T {
    throw new InvalidOperationException('Unreachable');
  }

  /**
   * @inheritDoc
   */
  public equals(value: TokenNode): boolean {
    // IMPORTANT: This is a performance critical method.
    if (this === value) {
      return true;
    }
    if (this.kind === value.kind && this._fullWidth === value.fullWidth && this._flags === value.flags) {
      return true;
    }
    return false;
  }

  /**
   * @inheritDoc
   */
  public hashCode(): number {
    // IMPORTANT: This is a performance critical method.
    if (this.hash === 0) {
      this.hash = TokenNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  /**
   * @inheritDoc
   */
  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TokenNode {
    return new TokenNode(this.kind, this._fullWidth, diagnostics);
  }

  /**
   * Returns a new token with the given leading trivia.
   */
  public withLeadingTrivia(leadingTrivia: NodeList | null): TokenNode {
    // This is already a token without trivia; do not create a new object.
    if (leadingTrivia === null) {
      return this;
    }
    return new TokenWithTriviaNode(this.kind, this.width, leadingTrivia, this.diagnostics);
  }

  /**
   * @inheritDoc
   */
  protected computeHashCode(): number {
    return Hash.combine(this._fullWidth, this._flags ^ (this.kind + 8192));
  }

  /**
   * @inheritDoc
   */
  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}

/**
 * A token that is part of the language syntax and is preceeded by trivia.
 *
 * @internal
 */
export class TokenWithTriviaNode extends TokenNode {

  /**
   * A collection of irrelevant tokens prior to the token.
   */
  protected readonly _leadingTrivia: NodeList | null;

  /**
   * Constructs a `TokenWithTriviaNode`.
   *
   * @param {TokenKind} kind
   *   The type of the token.
   * @param {number} width
   *   The width of the token.
   * @param {NodeList|null} leadingTrivia
   *   A collection of irrelevant tokens prior to the token.
   * @param {ReadonlyArray<SyntaxDiagnostic>=} diagnostics
   *   A list of diagnostics associated with the trivia token.
   */
  constructor(kind: TokenKind, width: number, leadingTrivia: NodeList | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(kind, width, diagnostics);

    this._leadingTrivia = leadingTrivia;

    if (leadingTrivia !== null) {
      this.updateFlagsAndWidth(leadingTrivia.flags, leadingTrivia.fullWidth);
    }
  }

  /**
   * @inheritDoc
   */
  public get leadingTrivia(): NodeList | null {
    return this._leadingTrivia;
  }

  /**
   * @inheritDoc
   */
  public equals(value: TokenWithTriviaNode): boolean {
    // IMPORTANT: This is a performance critical method.
    if (this === value) {
      return true;
    }
    if ((this._leadingTrivia !== null) !== (value._leadingTrivia !== null)) {
      return false;
    }
    if (value._leadingTrivia !== null && !this.triviaEquals(value._leadingTrivia)) {
      return false;
    }
    // Do not use `super`. Call the parent method directly.
    return TokenNode.prototype.equals.call(this, value);
  }

  /**
   * @inheritDoc
   */
  public hashCode(): number {
    // IMPORTANT: This is a performance critical method.
    if (this.hash === 0) {
      this.hash = TokenWithTriviaNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  /**
   * @inheritDoc
   */
  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TokenNode {
    return new TokenWithTriviaNode(this.kind, this.width, this._leadingTrivia, diagnostics);
  }

  /**
   * Returns a new token with the given leading trivia.
   */
  public withLeadingTrivia(leadingTrivia: NodeList | null): TokenNode {
    return new TokenWithTriviaNode(this.kind, this.width, leadingTrivia, this.diagnostics);
  }

  /**
   * @inheritDoc
   */
  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ (this.kind + 8192));
    hash = this._leadingTrivia !== null ? Hash.combine(this._leadingTrivia.hashCode(), hash) : hash;
    return hash;
  }

  /**
   * Isolates the leading trivia `equals()` call for V8 optimization.
   */
  protected triviaEquals(leadingTrivia: NodeList): boolean {
    return this._leadingTrivia !== null && this._leadingTrivia.equals(leadingTrivia);
  }

}

/**
 * A token that is part of the language syntax, but is not present in the
 * source text.
 *
 * @internal
 */
export class MissingTokenWithTriviaNode extends TokenWithTriviaNode {

  /**
   * Constructs a `MissingTokenWithTriviaNode`.
   *
   * @param {TokenKind} kind
   *   The type of the token.
   * @param {NodeList|null} leadingTrivia
   *   A collection of irrelevant tokens prior to the token.
   * @param {SyntaxDiagnostic[]=} diagnostics
   *   A list of diagnostics associated with the trivia token.
   */
  constructor(kind: TokenKind, leadingTrivia: NodeList | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(kind, 0, leadingTrivia, diagnostics);
    this._flags &= ~NodeFlags.IsNotMissing;
  }

  /**
   * @inheritDoc
   */
  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TokenNode {
    return new MissingTokenWithTriviaNode(this.kind, this._leadingTrivia, diagnostics);
  }

  /**
   * Returns a new token with the given leading trivia.
   */
  public withLeadingTrivia(leadingTrivia: NodeList | null): TokenNode {
    return new MissingTokenWithTriviaNode(this.kind, leadingTrivia, this.diagnostics);
  }

}
