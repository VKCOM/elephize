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

import { ISourceTextContainer } from './ISourceTextContainer';

/**
 * Provides helper methods for working with `ISourceText` objects.
 */
export class SourceTextExtensions {

  /**
   * Determines if the given object is shaped like `ISourceTextContainer`.
   */
  public static isSourceTextContainer(obj: any): obj is ISourceTextContainer {
    if (typeof obj.sourceKey === 'object' && typeof obj.sourceLength === 'number' && Array.isArray(obj.sources)) {
      return true;
    }
    return false;
  }

}
