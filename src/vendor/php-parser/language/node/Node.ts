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

import { INode } from './INode';
import { INodeVisitorAccess } from './INodeVisitorAccess';
import { NodeBase } from './NodeBase';
import { NodeTransform } from './NodeTransform.Generated';
import { NodeVisitor } from './NodeVisitor.Generated';

/**
 * Provides a base class for all non-terminal nodes in a tree.
 */
export abstract class Node extends NodeBase implements INodeVisitorAccess {

  /**
   * @inheritDoc
   */
  public abstract accept(visitor: NodeVisitor): void;

  /**
   * @inheritDoc
   */
  public abstract acceptResult<T>(visitor: NodeTransform<T>): T;

  /**
   * @inheritDoc
   */
  public equals(value: Node): boolean {
    // IMPORTANT: This is a performance critical method.

    // Reference equality, skip everything.
    if (this === value) {
      return true;
    }

    const count = this.count;  // This property is actually a "getter".
    if (this._flags === value.flags && this._fullWidth === value.fullWidth && count === value.count) {
      for (let i = 0; i < count; i++) {
        const child1 = this.childAt(i);
        const child2 = value.childAt(i);
        if ((child1 !== null) !== (child2 !== null)) {
          return false;
        }
        // Suppress TS2345: Transitive property prevents value(s) from being `null`.
        if (child1 !== null && !child1.equals(<INode>child2)) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

}
