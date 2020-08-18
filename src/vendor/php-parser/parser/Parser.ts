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

import { Exception } from '@mattacosta/php-common';

/**
 * Defines an interface for objects that can parse source text and return a
 * syntax tree.
 *
 * @template T
 */
export interface IParser<T> {

  /**
   * Creates a syntax tree from the source text given to the parser.
   */
  parse(): T;

}

/**
 * An exception thrown when a parser encounters an unrecoverable error.
 */
export class ParserException extends Exception {}
