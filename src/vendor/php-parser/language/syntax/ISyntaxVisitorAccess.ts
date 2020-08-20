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

import { SyntaxTransform } from './SyntaxTransform.Generated';
import { SyntaxVisitor } from './SyntaxVisitor.Generated';

/**
 * Defines an interface for syntax nodes that implement a visitor-pattern.
 */
export interface ISyntaxVisitorAccess {

  /**
   * Invokes a visitor callback method.
   */
  accept(visitor: SyntaxVisitor): void;

  /**
   * Returns the result of a transform operation performed by a visitor.
   */
  acceptResult<T>(visitor: SyntaxTransform<T>): T;

}
