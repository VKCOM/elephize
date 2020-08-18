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
import { ISyntaxVisitorAccess } from './ISyntaxVisitorAccess';
import { SourceTextNode } from '../node/SourceTextNode';
import { SyntaxList } from './SyntaxList';
import { SyntaxNode } from './SyntaxNode';
import { SyntaxNodeBase } from './SyntaxNodeBase';
import { SyntaxToken } from './SyntaxToken';
import { SyntaxTransform } from './SyntaxTransform.Generated';
import { SyntaxVisitor } from './SyntaxVisitor.Generated';

/**
 * Defines an interface for syntax nodes that represent a source file.
 */
export interface ISourceTextSyntaxNode extends ISyntaxNode, ISyntaxVisitorAccess {

  /**
   * A zero-width token that contains any remaining trivia at the end of a file.
   */
  readonly eof: SyntaxToken;

}

/**
 * The root node of a syntax tree.
 */
export class SourceTextSyntaxNode extends SyntaxNode implements ISourceTextSyntaxNode {

  protected _statements?: SyntaxList | null;

  constructor(node: INode) {
    super(node, null, 0);
  }

  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createFirstChildNode<SyntaxList>();
    }
    return this._statements;
  }
  public get eof(): SyntaxToken {
    return new SyntaxToken((<SourceTextNode>this.node).eof, this, this.offsetAt(1), 1);
  }

  public get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitSourceText(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitSourceText(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (typeof this._statements === 'undefined') {
          this._statements = this.createFirstChildNode<SyntaxList>();
        }
        return this._statements;
      default:
        return null;
    }
  }

}
