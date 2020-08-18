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

/**
 * The "depth" to visit in a syntax tree, in ascending order.
 *
 * For example, visiting tokens would require visiting its parent node, so
 * the `NodesAndTokens` depth is greater than the `Node` depth. Visiting
 * trivia requires visiting tokens, and so on.
 */
export enum SyntaxWalkerDepth {

  /**
   * Visit all nodes.
   */
  Nodes = 0,
  /**
   * Visit all nodes and tokens.
   */
  NodesAndTokens = 1,
  /**
   * Visit all nodes, tokens, and trivia.
   */
  AllExceptStructuredTrivia = 2,
  /**
   * Visit all nodes, tokens, trivia, and structured trivia.
   */
  All = 3

}
