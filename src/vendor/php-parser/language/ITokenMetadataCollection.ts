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

import { ICountable } from '@mattacosta/php-common';

import { ITokenMetadata } from './ITokenMetadata';

/**
 * Defines an interface for a token metadata collection.
 */
export interface ITokenMetadataCollection<T extends ITokenMetadata> extends ICountable {

  /**
   * Gets the token metadata at a specified index.
   *
   * @param {number} index
   *   The zero-based index into the collection.
   *
   * @return {T|null}
   *   The token metadata, or `null` if the index did not contain a value.
   */
  childAt(index: number): T | null;

}
