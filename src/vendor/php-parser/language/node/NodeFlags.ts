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
 * Represents a bit field used to store metadata about a node and its children.
 */
export const enum NodeFlags {

  None,
  /**
   * The current node, or one of its children, has one or more diagnostics.
   */
  ContainsDiagnostics = 1 << 0,
  /**
   * The current node, or one of its children, has text that could not be parsed.
   */
  ContainsSkippedText = 1 << 1,
  /**
   * The current node, or one of its children, has a parsed documentation comment.
   */
  ContainsStructuredTrivia = 1 << 2,
  /**
   * The current node, or one of its children, is located in source text.
   */
  IsNotMissing = 1 << 3,

  /**
   * A mask of all inheritable flags.
   */
  InheritMask = ContainsDiagnostics | ContainsSkippedText | ContainsStructuredTrivia | IsNotMissing,

}
