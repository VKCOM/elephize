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

import { Debug } from '@mattacosta/php-common';

import { ISyntaxNode } from './ISyntaxNode';
import { NodeList } from '../node/NodeList';
import { SyntaxNodeBase } from './SyntaxNodeBase';

/**
 * Provides a base class for a node containing a list of children.
 */
export abstract class SyntaxList extends SyntaxNodeBase {

  /**
   * Constructs a `SyntaxList` object.
   */
  constructor(node: NodeList, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  /**
   * Creates a syntax node for a child where its parent is the parent of this
   * list node (normally it would be the current node).
   *
   * @return {ISyntaxNode|null}
   *   The child node, or `null` if the index did not contain a node.
   */
  protected createChildNode(index: number): ISyntaxNode | null {
    // Caller is assumed to have validated index range.
    Debug.assert(index >= 0 && index < this.node.count);

    let node = this.node.childAt(index);
    if (node !== null && !node.isToken) {
      // Lists cannot contain other lists, so this should always be a node.
      // @todo Technically there should be an assertion using a type guard here.
      return <ISyntaxNode>node.createSyntaxNode(this.parent, this.offsetAt(index));
    }
    return null;
  }

}

/**
 * A syntax node that only contains a single child.
 *
 * @internal
 */
export class SingleChildSyntaxList extends SyntaxList {

  /**
   * The only child.
   */
  protected child?: ISyntaxNode | null;

  /**
   * Constructs a `SingleChildSyntaxList` object.
   */
  constructor(node: NodeList, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
    // @todo Probably need to define child here to prevent check-map failures.
  }

  /**
   * @inheritDoc
   */
  protected childAt(index: number): ISyntaxNode | null {
    switch (index) {
      case 0:
        return this.child !== void 0 ? this.child : null;
      default:
        return null;
    }
  }

  /**
   * @inheritDoc
   */
  protected defineChildAt(index: number): ISyntaxNode | null {
    switch (index) {
      case 0:
        if (this.child === void 0) {
          this.child = this.createChildNode(0);
        }
        return this.child;
      default:
        return null;
    }
  }

}

/**
 * A syntax node that only contains two children.
 *
 * @internal
 */
export class TwoChildSyntaxList extends SyntaxList {

  /**
   * The first child node.
   */
  protected firstChild?: ISyntaxNode | null;

  /**
   * The second child node.
   */
  protected secondChild?: ISyntaxNode | null;

  /**
   * Constructs a `TwoChildSyntaxList` object.
   */
  constructor(node: NodeList, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  /**
   * @inheritDoc
   */
  protected childAt(index: number): ISyntaxNode | null {
    switch (index) {
      case 0:
        return this.firstChild !== void 0 ? this.firstChild : null;
      case 1:
        return this.secondChild !== void 0 ? this.secondChild : null;
      default:
        return null;
    }
  }

  /**
   * @inheritDoc
   */
  protected defineChildAt(index: number/*, createNode = true*/): ISyntaxNode | null {
    switch (index) {
      case 0:
        if (this.firstChild === void 0) {
          this.firstChild = this.createChildNode(0);
        }
        return this.firstChild;
      case 1:
        if (this.secondChild === void 0) {
          this.secondChild = this.createChildNode(1);
        }
        return this.secondChild;
      default:
        return null;
    }
  }

}

/**
 * A syntax node that contains an arbitrary number of children.
 *
 * @internal
 */
export class ManyChildSyntaxList extends SyntaxList {

  /**
   * A list of child nodes.
   */
  protected children: Array<ISyntaxNode | null>;

  /**
   * Constructs a `ManyChildSyntaxList` object.
   */
  constructor(list: NodeList, parent: ISyntaxNode, offset: number) {
    super(list, parent, offset);
    this.children = new Array(list.count);
  }

  /**
   * @inheritDoc
   */
  protected childAt(index: number): ISyntaxNode | null {
    if (index >= 0 && index < this.children.length) {
      return this.children[index] !== void 0 ? this.children[index] : null;
    }
    return null;
  }

  /**
   * @inheritDoc
   */
  protected defineChildAt(index: number): ISyntaxNode | null {
    // Caller is assumed to have validated index range.
    Debug.assert(index >= 0 && index < this.children.length);

    if (this.children[index] === void 0) {
      this.children[index] = this.createChildNode(index);
    }
    return this.children[index];
  }

}

/**
 * A syntax node that contains an arbitrary number of children and every other
 * child is a token.
 *
 * @todo Unused.
 *
 * @internal
 */
export class DelimitedSyntaxList extends ManyChildSyntaxList {

  /**
   * @inheritDoc
   */
  protected childAt(index: number): ISyntaxNode | null {
    if ((index & 1) === 0) {
      return null;
    }
    return super.childAt(index);
  }

  /**
   * @inheritDoc
   */
  protected defineChildAt(index: number): ISyntaxNode | null {
    if ((index & 1) === 0) {
      return null;
    }
    return super.defineChildAt(index);
  }

}
