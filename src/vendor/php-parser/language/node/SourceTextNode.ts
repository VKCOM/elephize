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

import { Hash } from '@mattacosta/php-common';

import { INode } from './INode';
import { Node } from './Node';
import { NodeFlags } from './NodeFlags';
import { NodeList } from './NodeList';
import { NodeTransform } from './NodeTransform.Generated';
import { NodeVisitor } from './NodeVisitor.Generated';
import { SourceTextSyntaxNode } from '../syntax/SourceTextSyntaxNode';
import { SyntaxDiagnostic } from '../../diagnostics/SyntaxDiagnostic';
import { TokenNode } from './TokenNode';

/**
 * The root node of a token metadata tree.
 */
export class SourceTextNode extends Node {

  public readonly statements: NodeList | null;
  public readonly eof: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  /**
   * Constructs a `SourceTextNode` object.
   *
   * @param {NodeList|null} statements
   *   A list of top-level statements in the parsed source text.
   * @param {TokenNode} eof
   *   The EOF token that contains any trailing trivia at the end of a file.
   * @param {ReadonlyArray<SyntaxDiagnostic>=} diagnostics
   *   A list of diagnostics associated with this node.
   */
  constructor(statements: NodeList | null, eof: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.statements = statements;
    this.eof = eof;

    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }
    this.updateFlagsAndWidth(eof.flags, eof.fullWidth);
  }

  public get count(): number {
    return 2;
  }

  public get flags(): NodeFlags {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitSourceText(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitSourceText(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.statements;
      case 1:
        return this.eof;
      default:
        return null;
    }
  }

  public createSyntaxNode(): SourceTextSyntaxNode {
    return new SourceTextSyntaxNode(this);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = SourceTextNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): SourceTextNode {
    return new SourceTextNode(this.statements, this.eof, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ (4 + 8192 + 512));
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    hash = Hash.combine(this.eof.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
