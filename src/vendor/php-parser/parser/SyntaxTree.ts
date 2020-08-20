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

import { SyntaxDiagnostic } from '../diagnostics/SyntaxDiagnostic';

/**
 * Defines an interface for objects that contain a syntax tree.
 */
export interface ISyntaxTree<TNode> {

  /**
   * The location of the source text used to generate this tree.
   */
  readonly path: string;

  /**
   * The root node of the syntax tree.
   */
  readonly root: TNode;

  /**
   * Gets an iterator that lists all diagnostics found while parsing.
   *
   * @todo This may need to be renamed to getParserDiagnostics().
   */
  getDiagnostics(): Iterator<SyntaxDiagnostic>;

}

/**
 * Provides a base class for objects that contain a syntax tree.
 *
 * @todo Add a method to get the text used to create the tree?
 */
export abstract class SyntaxTreeBase<T> implements ISyntaxTree<T> {

  /**
   * @inheritDoc
   */
  public abstract readonly path: string;

  /**
   * @inheritDoc
   */
  public abstract readonly root: T;

  /**
   * @inheritDoc
   */
  public abstract getDiagnostics(): Iterator<SyntaxDiagnostic>;

}
