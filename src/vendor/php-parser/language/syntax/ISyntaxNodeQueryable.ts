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

import { ISyntaxTreeTraversable } from './ISyntaxTreeTraversable';

/**
 * A function that can be used to filter `ISyntaxNode` objects.
 */
export type SyntaxNodeFilter<T> = (node: T) => boolean;

/**
 * Defines an interface for nodes that can search for relatives.
 */
export interface ISyntaxNodeQueryable<T> extends ISyntaxTreeTraversable<T> {

  /**
   * Gets an iterator that lists all ancestors of the current node.
   */
  getAncestors(): IterableIterator<T>;

  /**
   * Gets an iterator that lists the current node and all of its ancestors.
   */
  getAncestorsAndSelf(): IterableIterator<T>;

  /**
   * Finds the first ancestor (which may include the current node) that matches
   * the given filter.
   *
   * @param {SyntaxNodeFilter<T>=} nodeFilter
   *   A callback used to limit what nodes are returned.
   */
  firstAncestorOrSelf(nodeFilter?: SyntaxNodeFilter<T>): T | null;

}
