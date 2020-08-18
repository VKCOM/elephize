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

import { ISyntaxNode } from './ISyntaxNode';
import { ISyntaxToken } from './ISyntaxToken';
import { ISyntaxTrivia } from './ISyntaxTrivia';
import { SyntaxVisitor } from './SyntaxVisitor.Generated';
import { SyntaxWalkerDepth } from './SyntaxWalkerDepth';

/**
 * A syntax visitor that descends through an entire syntax tree.
 *
 * Nodes and tokens are visited in a depth-first order.
 */
export class SyntaxWalker extends SyntaxVisitor {

  /**
   * The maximum depth to walk in the syntax tree.
   */
  protected readonly walkerDepth: SyntaxWalkerDepth;

  /**
   * Constructs a `SyntaxWalker` object.
   *
   * @param {SyntaxWalkerDepth=} depth
   *   The maximum depth to walk in the syntax tree.
   */
  constructor(depth = SyntaxWalkerDepth.Nodes) {
    super();
    this.walkerDepth = depth;
  }

  /**
   * Visits all children of a node.
   */
  public defaultVisit(node: ISyntaxNode): void {
    for (let child of node.getAllChildren()) {
      if (child.isToken) {
        if (this.walkerDepth >= SyntaxWalkerDepth.NodesAndTokens) {
          this.visitToken(<ISyntaxToken>child);
        }
      }
      else {
        this.visit(<ISyntaxNode>child);
      }
    }
  }

  /**
   * Visits a token in the syntax tree.
   */
  public visitToken(token: ISyntaxToken): void {
    if (this.walkerDepth >= SyntaxWalkerDepth.AllExceptStructuredTrivia) {
      if (!token.leadingTrivia) {
        return;
      }
      const leadingTrivia = token.leadingTrivia;
      for (let i = 0; i < leadingTrivia.count; i++) {
        this.visitTrivia(leadingTrivia.triviaAt(i));
      }
    }
  }

  /**
   * Visits the trivia attached to a token.
   */
  public visitTrivia(trivia: ISyntaxTrivia): void {
    // if (this.depth == SyntaxWalkerDepth.All && trivia.containsStructuredTrivia) {
    //   this.visit(trivia.getStructure());
    // }
  }

}
