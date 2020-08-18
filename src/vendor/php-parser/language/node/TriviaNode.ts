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
import { NodeTransform } from './NodeTransform.Generated';
import { NodeVisitor } from './NodeVisitor.Generated';
import { SyntaxDiagnostic } from '../../diagnostics/SyntaxDiagnostic';
import { TokenKind } from '../TokenKind';

/**
 * A token that is not part of the language syntax.
 */
export class TriviaNode extends Node {

  /**
   * The type of the trivia token.
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
   * Constructs a `TriviaNode` object.
   *
   * @param {TokenKind} kind
   *   The type of the trivia token.
   * @param {number} fullWidth
   *   The width of the trivia token.
   * @param {ReadonlyArray<SyntaxDiagnostic>=} diagnostics
   *   A list of diagnostics associated with the trivia token.
   */
  constructor(kind: TokenKind, fullWidth: number, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = fullWidth;
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
  public get isTrivia(): boolean {
    return true;
  }

  /**
   * @inheritDoc
   */
  public get leadingTriviaWidth(): number {
    return 0;
  }

  /**
   * @inheritDoc
   */
  public accept(visitor: NodeVisitor): void {
    visitor.visitTrivia(this);
  }

  /**
   * @inheritDoc
   */
  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitTrivia(this);
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
  public equals(value: TriviaNode): boolean {
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
      this.hash = TriviaNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  /**
   * @inheritDoc
   */
  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TriviaNode {
    return new TriviaNode(this.kind, this._fullWidth, diagnostics);
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
    throw new InvalidOperationException('Unreachable');
  }

}

/**
 * A token that was skipped by the parser.
 *
 * Skipped token nodes occur when neither the current parse context, nor any
 * enclosing contexts know how to handle a token.
 */
export class SkippedTokenNode extends TriviaNode {

  /**
   * Constructs a `SkippedTokenNode` object.
   *
   * @param {TokenKind} kind
   *   The type of the skipped token.
   * @param {number} fullWidth
   *   The width of the skipped token.
   * @param {ReadonlyArray<SyntaxDiagnostic>=} diagnostics
   *   A list of diagnostics associated with the skipped token.
   */
  constructor(kind: TokenKind, fullWidth: number, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(kind, fullWidth, diagnostics);
    this._flags = this._flags | NodeFlags.ContainsSkippedText;
  }

  /**
   * @inheritDoc
   */
  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): SkippedTokenNode {
    return new SkippedTokenNode(this.kind, this._fullWidth, diagnostics);
  }

}
