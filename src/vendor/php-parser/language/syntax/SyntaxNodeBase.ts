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

import {
  ArgumentOutOfRangeException,
  Debug,
  Exception,
  InvalidOperationException
} from '@mattacosta/php-common';

import { DiagnosticSeverity } from '../../diagnostics/DiagnosticSeverity';
import { INode } from '../node/INode';
import { ISyntaxNode } from './ISyntaxNode';
import { ISyntaxNodeOrList } from './ISyntaxNode';
import { ISyntaxToken } from './ISyntaxToken';
import { ISyntaxTriviaList } from './ISyntaxTriviaList';
import { NodeExtensions } from '../node/NodeExtensions';
import { SyntaxDiagnostic } from '../../diagnostics/SyntaxDiagnostic';
import { SyntaxNodeExtensions } from './SyntaxNodeExtensions';
import { SyntaxNodeFilter } from './ISyntaxNodeQueryable';
import { SyntaxToken } from './SyntaxToken';
import { TextSpan } from '../../text/TextSpan';

/**
 * Stores the iteration state of a (parent) node.
 *
 * @todo Add triviaIndex property?
 */
class NodeIteration {

  /**
   * Constructs a `NodeIteration` object.
   *
   * @param {INode} node
   *   The current node being iterated upon.
   * @param {number} childIndex
   *   The index of a child to restart from.
   */
  constructor(public readonly node: INode, public readonly childIndex: number) {}

}

/**
 * Provides a base class for non-terminal nodes in a syntax tree.
 */
export abstract class SyntaxNodeBase implements ISyntaxNodeOrList {

  /**
   * @inheritDoc
   */
  public readonly parent: ISyntaxNode | null;

  /**
   * An object containing the metadata for this node.
   */
  protected readonly node: INode;

  /**
   * The absolute location of this node in the source text.
   */
  protected readonly offset: number;

  /**
   * Constructs a `SyntaxNodeBase` object.
   *
   * @param {INode} node
   *   An object containing the metadata for this node.
   * @param {ISyntaxNode|null} parent
   *   The syntax node containing this node, if any.
   * @param {number} offset
   *   The absolute location of this node in the source text.
   */
  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    Debug.assert(offset >= 0);

    this.node = node;
    this.offset = offset;
    this.parent = parent;
  }

  /**
   * The number of child nodes and tokens.
   *
   * @todo Unused.
   */
  protected get count(): number {
    return this.node.count;
  }

  /**
   * The width of the node, including trivia.
   *
   * This is a performance optimization to avoid the overhead of creating and
   * using a `TextSpan` object.
   *
   * @todo Unused.
   */
  protected get fullWidth(): number {
    return this.node.fullWidth;
  }

  /**
   * @inheritDoc
   */
  public get hasError(): boolean {
    if (!this.node.containsDiagnostics) {
      return false;
    }
    for (let d of this.getDiagnostics()) {
      if (d.severity === DiagnosticSeverity.Error) {
        return true;
      }
    }
    return false;
  }

  /**
   * Determines if the current node contains a list of child nodes and tokens.
   *
   * @todo Unused.
   */
  protected get isList(): boolean {
    return this.node.isList;
  }

  /**
   * @inheritDoc
   */
  public get isToken(): boolean {
    return this.node.isToken;
  }

  /**
   * @inheritDoc
   */
  public get containsDiagnostics(): boolean {
    return this.node.containsDiagnostics;
  }

  /**
   * @inheritDoc
   */
  public get containsSkippedText(): boolean {
    return this.node.containsSkippedText;
  }

  /**
   * @inheritDoc
   */
  public get fullSpan(): TextSpan {
    // NOTE: This is unlikely to be called unless the node also contains a
    // diagnostic. Since the vast majority of nodes are fine, this is not stored
    // as a property in order to save memory.
    return new TextSpan(this.offset, this.node.fullWidth);
  }

  /**
   * Determines if the node contains a child token with leading trivia.
   */
  public get hasLeadingTrivia(): boolean {
    return this.leadingTrivia !== null ? this.leadingTrivia.count > 0 : false;
  }

  /**
   * @inheritDoc
   */
  public get isMissing(): boolean {
    return this.node.isMissing;
  }

  /**
   * The leading trivia of the first token within the node.
   */
  public get leadingTrivia(): ISyntaxTriviaList | null {
    let token = this.firstToken(true);
    if (token !== null) {
      return token.leadingTrivia;
    }
    return null;
  }

  /**
   * @inheritDoc
   */
  public get span(): TextSpan {
    let triviaWidth = this.node.leadingTriviaWidth;
    return new TextSpan(this.offset + triviaWidth, this.node.fullWidth - triviaWidth);
  }

  /**
   * Finds the child token at the given offset.
   *
   * @param {SyntaxNodeBase} parent
   *   The parent node.
   * @param {number} offset
   *   The offset of the token, relative to the start of the syntax tree.
   *
   * @todo Experimental.
   */
  protected static getToken(parent: SyntaxNodeBase, offset: number): ISyntaxToken {
    Debug.assert(parent.fullSpan.contains(offset));

    let node = parent.node;
    let start = parent.offset;

    let index = 0;
    let relativeIndex = 0;
    let count = node.count;
    while (index < count) {
      let child = node.childAt(index);
      if (child !== null) {
        let end = start + child.fullWidth;
        if (offset < end) {
          if (child.isToken) {
            // If the child is a token then the parent must be a node.
            return new SyntaxToken(child, <ISyntaxNode><ISyntaxNodeOrList>parent, start, relativeIndex);
          }

          // Found a node, search through its children.
          // @todo Technically this could be done recursively.
          let syntaxNode = parent.defineChildAt(index);
          if (!(syntaxNode instanceof SyntaxNodeBase)) {
            // Either the child did not exist (which shouldn't be possible) or
            // the parent created a child that didn't derive from its base type.
            throw new InvalidOperationException();
          }

          node = child;
          parent = syntaxNode;

          index = child.indexAtOffset(offset - start);
          count = child.count;

          start += child.offsetAt(index);
          relativeIndex += NodeExtensions.childCount(child);
          continue;
        }
        else {
          // Offset is not within this child.
          start = end;
          relativeIndex += NodeExtensions.childCount(child);
        }
      }
      index++;
    }

    // Parent did not contain the specified offset.
    throw new Exception('Token not found');
  }

  /**
   * Gets a descendant node or token based on a relative index.
   *
   * @param {SyntaxNodeBase} parent
   *   The parent node.
   * @param {number} relativeIndex
   *   The child index relative to any lists contained in the parent.
   *
   * @todo Experimental.
   */
  protected static relativeChildAt(parent: SyntaxNodeBase, relativeIndex: number): ISyntaxNode | ISyntaxToken {
    let child: INode | null = null;
    let nodeIndex = 0;
    let listIndex = relativeIndex;
    let offset = parent.offset;

    // Find the actual index of the child in the current node, its index in the
    // child list (if any), and its offset.
    let count = parent.node.count;
    while (nodeIndex < count) {
      child = parent.node.childAt(nodeIndex);
      if (child !== null) {
        let size = child.isList ? child.count : 1;
        if (listIndex < size) {
          break;
        }
        listIndex -= size;
        offset += child.fullWidth;
      }
      nodeIndex++;
    }

    if (child === null) {
      throw new Exception('Child node not found');
    }

    let syntaxNode = parent.defineChildAt(nodeIndex);
    if (syntaxNode !== null) {
      if (!child.isList) {
        // If the node is not a list, then neither is the syntax node.
        return <ISyntaxNode>syntaxNode;
      }

      if (!(syntaxNode instanceof SyntaxNodeBase)) {
        // The parent created a child that didn't derive from its base type.
        throw new InvalidOperationException();
      }

      let syntaxListChild = syntaxNode.defineChildAt(listIndex);
      if (syntaxListChild !== null) {
        // Lists can only contain nodes.
        return <ISyntaxNode>syntaxListChild;
      }

      // Found a token in a delimited list.
      child = child.childAt(listIndex);
      offset = syntaxNode.offsetAt(listIndex);

      if (child === null) {
        throw new Exception('List nodes cannot contain undefined or null entries');
      }
    }

    // The child must be a token (and its parent must be a node).
    return new SyntaxToken(child, <ISyntaxNode><ISyntaxNodeOrList>parent, offset, relativeIndex);
  }

  /**
   * @inheritDoc
   */
  public allChildren(): Array<ISyntaxNode | ISyntaxToken> {
    let count = NodeExtensions.childCount(this.node);
    let children = new Array(count);
    for (let i = 0; i < count; i++) {
      children[i] = SyntaxNodeBase.relativeChildAt(this, i);
    }
    return children;
  }

  /**
   * @inheritDoc
   */
  public ancestors(): ISyntaxNodeOrList[] {
    return this.parent !== null ? this.parent.ancestorsAndSelf() : [];
  }

  /**
   * @inheritDoc
   */
  public ancestorsAndSelf(): ISyntaxNodeOrList[] {
    let parents = [];
    let node: ISyntaxNodeOrList | null = this;
    while (node !== null) {
      parents.push(node);
      node = node.parent;
    }
    return parents;
  }

  /**
   * @inheritDoc
   */
  public childNodes(): ISyntaxNode[] {
    let nodes = [];
    let count = NodeExtensions.childCount(this.node);
    for (let i = 0; i < count; i++) {
      const child = SyntaxNodeBase.relativeChildAt(this, i);
      if (!child.isToken) {
        nodes.push(<ISyntaxNode>child);
      }
    }
    return nodes;
  }

  /**
   * @inheritDoc
   */
  public childTokens(): ISyntaxToken[] {
    let tokens = [];
    let children = this.allChildren();
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.isToken) {
        tokens.push(<ISyntaxToken>child);
      }
    }
    return tokens;
  }

  /**
   * @inheritDoc
   */
  public contains(node: ISyntaxNode | null): boolean {
    if (node === null || !this.fullSpan.contains(node.fullSpan)) {
      return false;
    }
    while (node !== null) {
      if (this.equals(node)) {
        return true;
      }
      node = node.parent;
    }
    return false;
  }

  /**
   * @inheritDoc
   */
  public equals(value: ISyntaxNodeOrList): boolean {
    // Reference equality should be sufficient since nodes should not be
    // created multiple times while traversing through a syntax tree.
    return this === value;
  }

  /**
   * @inheritDoc
   */
  public findChildNode(span: TextSpan, innermostNode = false): ISyntaxNodeOrList {
    // Find the first token in the span.
    let token = this.findChildToken(span.start);

    // Then find the first node that contains the entire span.
    let node = token.parent.firstAncestorOrSelf((value) => {
      return value.fullSpan.contains(span);
    });

    if (node === null) {
      throw new Exception('Parent node not found');  // Unreachable.
    }

    if (!innermostNode) {
      while (node.parent !== null) {
        // @todo It would be faster to use `fullWidth` instead.
        if (!node.parent.fullSpan.equals(node.fullSpan)) {
          break;
        }
        if (SyntaxNodeExtensions.isSourceTextSyntaxNode(node.parent)) {
          break;
        }
        node = node.parent;
      }
    }

    return node;
  }

  /**
   * @inheritdoc
   */
  public findChildToken(offset: number): ISyntaxToken {
    let end = this.offset + this.node.fullWidth;
    if (offset === end && SyntaxNodeExtensions.isSourceTextSyntaxNode(this)) {
      return this.eof;
    }
    if (!this.fullSpan.contains(offset)) {
      throw new ArgumentOutOfRangeException();
    }
    return SyntaxNodeBase.getToken(this, offset);
  }

  /**
   * @inheritDoc
   */
  public firstAncestorOrSelf(nodeFilter?: SyntaxNodeFilter<ISyntaxNodeOrList>): ISyntaxNodeOrList | null {
    let node: ISyntaxNodeOrList | null = this;
    while (node !== null) {
      if (nodeFilter === undefined || nodeFilter(node)) {
        return node;
      }
      node = node.parent;
    }
    return null;
  }

  /**
   * @inheritDoc
   */
  public firstToken(includeZeroWidth = false): ISyntaxToken | null {
    if (!includeZeroWidth) {
      return SyntaxNodeExtensions.tryGetFirstToken(this, SyntaxToken.hasWidth);
    }
    return SyntaxNodeExtensions.tryGetFirstToken(this);
  }

  /**
   * @inheritDoc
   */
  public *getAllChildren(): IterableIterator<ISyntaxNode | ISyntaxToken> {
    const count = NodeExtensions.childCount(this.node);
    for (let i = 0; i < count; i++) {
      yield SyntaxNodeBase.relativeChildAt(this, i);
    }
  }

  /**
   * @inheritDoc
   */
  public *getAllChildrenReversed(): IterableIterator<ISyntaxNode | ISyntaxToken> {
    const count = NodeExtensions.childCount(this.node);
    for (let i = count - 1; i >= 0; i--) {
      yield SyntaxNodeBase.relativeChildAt(this, i);
    }
  }

  /**
   * @inheritDoc
   */
  public *getAncestors(): IterableIterator<ISyntaxNodeOrList> {
    let node = this.parent;
    while (node !== null) {
      yield node;
      node = node.parent;
    }
  }

  /**
   * @inheritDoc
   */
  public *getAncestorsAndSelf(): IterableIterator<ISyntaxNodeOrList> {
    let node: ISyntaxNodeOrList | null = this;
    while (node !== null) {
      yield node;
      node = node.parent;
    }
  }

  /**
   * @inheritDoc
   */
  public *getChildNodes(): IterableIterator<ISyntaxNode> {
    for (let child of this.getAllChildren()) {
      if (!child.isToken) {
        yield <ISyntaxNode>child;
      }
    }
  }

  /**
   * @inheritDoc
   */
  public *getChildTokens(): IterableIterator<ISyntaxToken> {
    for (let child of this.getAllChildren()) {
      if (child.isToken) {
        yield <ISyntaxToken>child;
      }
    }
  }

  /**
   * @inheritDoc
   */
  public *getDiagnostics(): IterableIterator<SyntaxDiagnostic> {
    if (!this.node.containsDiagnostics) {
      return;
    }

    // If leading trivia were appended to missing tokens, the resulting
    // diagnostics could be in the following positions:
    //
    // node #1 |          leading          : node #2 | node #3 | node #4
    //  token  | trivia | skipped | trivia | missing | missing |  token
    //   parse error ---^         ^--- expected error on node #3
    //                    actual error on node #3 ---^
    //
    // Instead, the parser delays appending trivia until an actual token is
    // found, and generates nodes similar to:
    //
    // node #1 | node #2 | node #3 |          leading          : node #4
    //  token  | missing | missing | trivia | skipped | trivia |  token
    //

    let offset = 0;
    let iterationStack = [new NodeIteration(this.node, 0)];
    while (iterationStack.length > 0) {
      // Suppress TS2532: Result cannot be undefined due to while-condition.
      let iteration = <NodeIteration>iterationStack.pop();
      let node = iteration.node;

      // If the child index is not 0, then the node was already processed and
      // the iterator is restarting from an earlier parent node.
      if (iteration.childIndex === 0) {
        // Diagnostics on leading trivia.
        // @todo Get diagnostics on structured trivia.
        if (node.leadingTrivia !== null && node.leadingTrivia.containsDiagnostics) {
          let triviaDiagnostics = this.getTriviaDiagnostics(node.leadingTrivia);
          for (let i = 0; i < triviaDiagnostics.length; i++) {
            let start = offset + triviaDiagnostics[i].offset;
            yield triviaDiagnostics[i].withOffset(start);
          }
        }

        // let triviaWidth = node.leadingTriviaWidth;

        // Diagnostics on the node.
        let diagnostics = node.diagnostics;
        for (let i = 0; i < diagnostics.length; i++) {
          let start = offset /*+ triviaWidth*/ + diagnostics[i].offset;
          // @todo Temporary. SyntaxDiagnostics are not meant to have absolute positions.
          yield diagnostics[i].withOffset(start);
        }

        if (node.isToken) {
          offset += node.fullWidth;
        }
      }

      let count = node.count;
      for (let i = iteration.childIndex; i < count; i++) {
        let child = node.childAt(i);
        if (child === null) {
          continue;
        }
        if (child.containsDiagnostics) {
          // Put the current node back. It will need to be finished later.
          iterationStack.push(new NodeIteration(node, i + 1));
          // The first child with a diagnostic is now the priority.
          iterationStack.push(new NodeIteration(child, 0));
          break;
        }
        else {
          offset += child.fullWidth;
        }
      }
    }
  }

  /**
   * @inheritDoc
   */
  public lastToken(includeZeroWidth = false): ISyntaxToken | null {
    if (!includeZeroWidth) {
      return SyntaxNodeExtensions.tryGetLastToken(this, SyntaxToken.hasWidth);
    }
    return SyntaxNodeExtensions.tryGetLastToken(this);
  }

  /**
   * Gets the child node at the given index, if it has been created.
   *
   * @see SyntaxNodeBase.defineChildAt()
   */
  protected abstract childAt(index: number): ISyntaxNodeOrList | null;

  /**
   * Gets the child node at the given index, creating it, if necessary.
   *
   * @todo Merge into `childAt()` by adding a `createNode` parameter?
   */
  protected abstract defineChildAt(index: number): ISyntaxNodeOrList | null;

  /**
   * Calculates the offset of the child at the given index.
   */
  protected offsetAt(index: number): number {
    let offset = 0;
    while (index > 0) {
      index--;

      // If a syntax node to the left has already been created, try and avoid
      // the worst case scenario of computing the offset of every child node.
      let childSyntaxNode = this.childAt(index);
      if (childSyntaxNode instanceof SyntaxNodeBase) {
        return childSyntaxNode.offset + childSyntaxNode.node.fullWidth + offset;
      }

      let childNode = this.node.childAt(index);
      if (childNode !== null) {
        offset += childNode.fullWidth;
      }
    }
    return this.offset + offset;
  }

  /**
   * Determines the relative index of a child.
   */
  protected relativeIndexAt(index: number): number {
    let relativeIndex = 0;
    for (let i = 0; i < index; i++) {
      const child = this.node.childAt(i);
      if (child !== null) {
        relativeIndex += child.isList ? child.count : 1;
      }
    }
    return relativeIndex;
  }

  /**
   * @todo Document getTriviaDiagnostics().
   */
  private getTriviaDiagnostics(trivia: INode): SyntaxDiagnostic[] {
    Debug.assert(trivia.containsDiagnostics);

    let diagnostics: SyntaxDiagnostic[] = [];
    if (trivia.isList) {
      let hasSkippedDiagnostic = false;
      let count = trivia.count;
      for (let i = 0; i < count; i++) {
        let child = trivia.childAt(i);
        if (child === null) {
          continue;
        }

        Debug.assert(child.isTrivia);
        if (child.containsDiagnostics) {
          if (child.containsSkippedText) {
            if (!hasSkippedDiagnostic) {
              diagnostics.push(child.diagnostics[0]);
              hasSkippedDiagnostic = true;
            }
          }
          else {
            diagnostics = diagnostics.concat(child.diagnostics);
          }
        }
      }
    }
    else {
      Debug.assert(trivia.isTrivia);
      if (trivia.containsSkippedText) {
        diagnostics.push(trivia.diagnostics[0]);
      }
      else {
        diagnostics = diagnostics.concat(trivia.diagnostics);
      }
    }

    return diagnostics;
  }

}
