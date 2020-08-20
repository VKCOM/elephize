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

import { ISyntaxNode, ISyntaxNodeOrList } from './ISyntaxNode';
import { SyntaxNodeBase } from './SyntaxNodeBase';
import { SyntaxTransform } from './SyntaxTransform.Generated';
import { SyntaxVisitor } from './SyntaxVisitor.Generated';

/**
 * A non-terminal node in a syntax tree.
 */
export abstract class SyntaxNode extends SyntaxNodeBase implements ISyntaxNode {

  /**
   * @inheritDoc
   */
  public abstract accept(visitor: SyntaxVisitor): void;

  /**
   * @inheritDoc
   */
  public abstract acceptResult<T>(visitor: SyntaxTransform<T>): T;

  /**
   * Creates a syntax node for a child at the given index.
   *
   * @return {T|null}
   *   A child syntax node, or `null` if the child was undefined or not a node.
   *
   * @see createFirstChildNode()
   */
  protected createChildNode<T extends ISyntaxNodeOrList>(index: number): T | null {
    const node = this.node.childAt(index);
    if (node !== null) {
      // Suppress TS2322: Type `ISyntaxNodeOrList` is assignable to `ISyntaxNodeOrList`.
      return <T><any>node.createSyntaxNode(this, this.offsetAt(index));
    }
    return null;
  }

  /**
   * Creates the first child syntax node of the current node.
   *
   * This is a slight optimization of `createChildNode()`.
   *
   * @return {T|null}
   *   A child syntax node, or `null` if the first child was undefined or not a
   *   node.
   */
  protected createFirstChildNode<T extends ISyntaxNodeOrList>(): T | null {
    const node = this.node.childAt(0);
    if (node !== null) {
      // Suppress TS2322: Type `ISyntaxNodeOrList` is assignable to `ISyntaxNodeOrList`.
      return <T><any>node.createSyntaxNode(this, this.offset);
    }
    return null;
  }

}
