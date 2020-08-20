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
import {
  LongChildListNode,
  NodeList,
  ShortChildListNode,
  SingleChildListNode,
  TwoChildListNode
} from './NodeList';
import {
  MissingTokenWithTriviaNode,
  TokenNode,
  TokenWithTriviaNode
} from './TokenNode';
import { Node } from './Node';
import { ObjectCache } from './ObjectCache';
import { SkippedTokenNode, TriviaNode } from './TriviaNode';
import { SyntaxDiagnostic } from '../../diagnostics/SyntaxDiagnostic';
import { TokenKind, TokenKindInfo } from '../TokenKind';

/**
 * Provides a factory service for creating tokens, trivia, and node lists.
 */
export class NodeFactory {

  /**
   * A trivia node representing a CRLF token.
   */
  protected static readonly CRLF = new TriviaNode(TokenKind.LineBreak, 2);

  /**
   * A trivia node representing a LF token.
   */
  protected static readonly LF = new TriviaNode(TokenKind.LineBreak, 1);

  // #region Whitespace

  /**
   * A trivia node representing a single whitespace character.
   */
  protected static readonly SingleWhitespace = new TriviaNode(TokenKind.Whitespace, 1);

  /**
   * A trivia node representing two whitespace characters.
   */
  protected static readonly DoubleWhitespace = new TriviaNode(TokenKind.Whitespace, 2);

  /**
   * A trivia node representing four whitespace characters.
   */
  protected static readonly QuadrupleWhitespace = new TriviaNode(TokenKind.Whitespace, 4);

  /**
   * A list node containing a single whitespace character, used for leading trivia.
   */
  protected static readonly SingleLeadingSpace: NodeList = new SingleChildListNode(NodeFactory.SingleWhitespace);

  /**
   * A list node containing two whitespace characters, used for leading trivia.
   */
  protected static readonly TwoLeadingSpaces: NodeList = new SingleChildListNode(NodeFactory.DoubleWhitespace);

  /**
   * A list node containing four whitespace characters, used for leading trivia.
   */
  protected static readonly FourLeadingSpaces: NodeList = new SingleChildListNode(NodeFactory.QuadrupleWhitespace);

  // #endregion

  // #region Caching

  /**
   * A cache for lists of tokens or trivia.
   *
   * @todo Merge back into `NodeCache`?
   */
  protected static readonly ListCache = new ObjectCache<NodeList>(15);

  /**
   * A cache for tokens and trivia.
   *
   * @todo Determine the ideal size: 15=32768, 16=65536.
   */
  protected static readonly NodeCache = new ObjectCache<INode>(15);

  /**
   * A list of reusable tokens without leading trivia.
   */
  protected static readonly TokensWithNoTrivia: TokenNode[] = new Array(TokenKind.EOF);

  /**
   * A list of reusable tokens with a single leading space.
   */
  protected static readonly TokensWithSingleLeadingSpace: TokenNode[] = new Array(TokenKind.EOF);

  /**
   * The maximum number of children a node may have before being uncachable.
   */
  private static readonly ChildLimit = 3;

  /**
   * The maximum list size before lists are created with pre-calculated offsets.
   * A high value, will increase the compute time to find an offset, while a low
   * value will increase the memory usage of list nodes.
   *
   * @todo Determine the ideal limit.
   */
  private static readonly ShortListLimit = 8;

  // #endregion

  /**
   * Creates a `NodeFactory` object.
   */
  constructor() {
    if (NodeFactory.TokensWithNoTrivia[TokenKind.Abstract] === void 0) {
      // Create reusable "well known" tokens.
      for (let kind = TokenKind.Abstract; kind < TokenKind.EOF; kind++) {
        let width = TokenKindInfo.getText(kind).length;
        let token = new TokenNode(kind, width);
        let tokenWithTrivia = new TokenWithTriviaNode(kind, width, NodeFactory.SingleLeadingSpace);
        NodeFactory.TokensWithNoTrivia[kind] = token;
        NodeFactory.TokensWithSingleLeadingSpace[kind] = tokenWithTrivia;
      }
    }
  }

  /**
   * Determines if the token is one of the reusable token kinds.
   */
  protected static isWellKnownKind(kind: TokenKind): boolean {
    return kind >= TokenKind.Abstract && kind < TokenKind.EOF;
  }

  /**
   * Creates a `NodeList` and caches it, if possible.
   */
  public createList(nodes: Node[], diagnostics?: SyntaxDiagnostic[]): NodeList {
    if (nodes.length === 1) {
      if (diagnostics === void 0) {
        if (nodes[0] === NodeFactory.SingleWhitespace) {
          return NodeFactory.SingleLeadingSpace;
        }
        if (nodes[0] === NodeFactory.DoubleWhitespace) {
          return NodeFactory.TwoLeadingSpaces;
        }
        if (nodes[0] === NodeFactory.QuadrupleWhitespace) {
          return NodeFactory.FourLeadingSpaces;
        }
      }
      let list = new SingleChildListNode(nodes[0], diagnostics);
      return this.getCachedList(list, list.hashCode());
    }
    else if (nodes.length === 2) {
      let list = new TwoChildListNode(nodes[0], nodes[1], diagnostics);
      return this.getCachedList(list, list.hashCode());
    }
    else if (nodes.length <= NodeFactory.ShortListLimit) {
      let list = new ShortChildListNode(nodes, diagnostics);
      return nodes.length <= NodeFactory.ChildLimit
        ? this.getCachedList(list, list.hashCode()) : list;
    }
    else {
      // No point in trying to cache lists this long.
      return new LongChildListNode(nodes, diagnostics);
    }
  }

  /**
   * Creates a missing token node.
   */
  public createMissingToken(kind: TokenKind, leadingTrivia: NodeList | null, diagnostics?: SyntaxDiagnostic[]): TokenNode {
    return new MissingTokenWithTriviaNode(kind, leadingTrivia, diagnostics);
  }

  /**
   * Creates a skipped token node (which is actually a trivia node).
   */
  public createSkippedTokenTrivia(kind: TokenKind, fullWidth: number, diagnostics?: SyntaxDiagnostic[]): SkippedTokenNode {
    return new SkippedTokenNode(kind, fullWidth, diagnostics);
  }

  /**
   * Creates a token node that does not contain any leading trivia.
   */
  public createToken(kind: TokenKind, fullWidth: number, diagnostics?: SyntaxDiagnostic[]): TokenNode {
    if (diagnostics !== void 0 && diagnostics.length > 0) {
      return new TokenNode(kind, fullWidth, diagnostics);
    }
    if (NodeFactory.isWellKnownKind(kind)) {
      return NodeFactory.TokensWithNoTrivia[kind];
    }
    let token = new TokenNode(kind, fullWidth);
    return this.getCachedNode(token, token.hashCode());
  }

  /**
   * Creates a token node that also contains leading trivia.
   *
   * @param {TokenKind} kind
   *   The type of token.
   * @param {number} tokenWidth
   *   The full width of the token node (which at this point does not include
   *   leading trivia).
   * @param {NodeList} leadingTrivia
   *   A list of trivia nodes that were parsed ahead of the token.
   * @param {SyntaxDiagnostic[]=} diagnostics
   *   An optional list of diagnostics that should be added to the token node.
   */
  public createTokenWithTrivia(kind: TokenKind, tokenWidth: number, leadingTrivia: NodeList, diagnostics?: SyntaxDiagnostic[]): TokenNode {
    if (diagnostics !== void 0 && diagnostics.length > 0) {
      return new TokenWithTriviaNode(kind, tokenWidth, leadingTrivia, diagnostics);
    }
    if (NodeFactory.isWellKnownKind(kind) && leadingTrivia === NodeFactory.SingleLeadingSpace) {
      return NodeFactory.TokensWithSingleLeadingSpace[kind];
    }
    let token = new TokenWithTriviaNode(kind, tokenWidth, leadingTrivia);
    return this.getCachedNode(token, token.hashCode());
  }

  /**
   * Creates a trivia node.
   */
  public createTrivia(kind: TokenKind, fullWidth: number, diagnostics?: SyntaxDiagnostic[]): TriviaNode {
    if (diagnostics !== void 0 && diagnostics.length > 0) {
      return new TriviaNode(kind, fullWidth, diagnostics);
    }
    // Whitespace is very common, bypass the cache if possible.
    if (kind === TokenKind.LineBreak) {
      if (fullWidth === 1) {
        return NodeFactory.LF;
      }
      if (fullWidth === 2) {
        return NodeFactory.CRLF;
      }
    }
    else if (kind === TokenKind.Whitespace) {
      if (fullWidth === 1) {
        return NodeFactory.SingleWhitespace;
      }
      if (fullWidth === 2) {
        return NodeFactory.DoubleWhitespace;
      }
      if (fullWidth === 4) {
        return NodeFactory.QuadrupleWhitespace;
      }
    }
    let trivia = new TriviaNode(kind, fullWidth);
    return this.getCachedNode(trivia, trivia.hashCode());
  }

  /**
   * @todo Document getCachedList<T>().
   * @todo Test performance when merged with `getCachedNode()`.
   */
  protected getCachedList<T extends NodeList>(node: T, hash: number): T {
    let cached = NodeFactory.ListCache.tryGetObject(node, hash);
    if (cached !== null) {
      return <T>cached;
    }
    else if (this.isCacheableList(node)) {
      NodeFactory.ListCache.set(node, hash);
    }
    return node;
  }

  /**
   * @todo Document getCachedNode<T>().
   */
  protected getCachedNode<T extends INode>(node: T, hash: number): T {
    let cached = NodeFactory.NodeCache.tryGetObject(node, hash);
    if (cached !== null) {
      return <T>cached;
    }
    else if (this.isCacheableNode(node)) {
      NodeFactory.NodeCache.set(node, hash);
    }
    return node;
  }

  /**
   * Determines if a node containing a list of children is cacheable.
   */
  protected isCacheableList(node: INode): boolean {
    if (node.containsDiagnostics || node.containsSkippedText) {
      return false;
    }
    const count = node.count;
    if (count > NodeFactory.ChildLimit) {
      return false;
    }
    for (let i = 0; i < count; i++) {
      const child = node.childAt(i);
      if (child !== null) {
        if (!NodeFactory.NodeCache.has(child, child.hashCode())) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Determines if a node is cachebale.
   */
  protected isCacheableNode(node: INode): boolean {
    if (node.containsDiagnostics || node.containsSkippedText || node.isMissing) {
      return false;
    }
    const count = node.count;
    if (count > NodeFactory.ChildLimit) {
      return false;
    }
    for (let i = 0; i < count; i++) {
      const child = node.childAt(i);
      if (child !== null) {
        if (child.isList) {
          if (!NodeFactory.ListCache.has(<NodeList>child, child.hashCode())) {
            return false;
          }
        }
        else if (!NodeFactory.NodeCache.has(child, child.hashCode())) {
          return false;
        }
      }
    }
    return true;
  }

}
