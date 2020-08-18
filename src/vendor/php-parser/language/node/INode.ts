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

import { IHashable } from '@mattacosta/php-common';

import { ISyntaxNode, ISyntaxNodeOrList } from '../syntax/ISyntaxNode';
import { ITokenMetadata } from '../ITokenMetadata';
import { ITokenMetadataCollection } from '../ITokenMetadataCollection';
import { SyntaxDiagnostic } from '../../diagnostics/SyntaxDiagnostic';

/**
 * Defines an interface for objects that store indexable token metadata in an
 * immutable tree structure.
 */
export interface INode extends IHashable<INode>, ITokenMetadata, ITokenMetadataCollection<INode> {

  /**
   * Determines if the node stores a list of other nodes.
   */
  readonly isList: boolean;

  /**
   * The metadata of irrelevant tokens parsed prior to the node.
   *
   * This value should be `null` for non-terminal nodes.
   */
  readonly leadingTrivia: INode | null;

  /**
   * Creates a syntax node from the token metadata stored by this node.
   *
   * @param {ISyntaxNode|null} parent
   *   The parent of this node, if any.
   * @param {number} offset
   *   The absolute offset of the node in the source text.
   */
  createSyntaxNode(parent: ISyntaxNode | null, offset: number): ISyntaxNodeOrList;

  /**
   * Finds the index of the child node that contains a given offset.
   *
   * @param {number} relativeOffset
   *   An offset, relative to the start of the node.
   */
  indexAtOffset(relativeOffset: number): number;

  /**
   * Determines the offset of a child at the given index.
   *
   * @param {number} index
   *   The index of the child node.
   *
   * @return {number}
   *   The offset of the child, relative to the current node.
   */
  offsetAt(index: number): number;

  /**
   * Creates a new node with the given diagnostics.
   */
  withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): INode;

}
