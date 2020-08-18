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
 * Specifies how documentation comments should be parsed.
 */
export enum DocumentationMode {

  /**
   * Do not parse documentation comments.
   */
  None,
  /**
   * Parse documentation comments but do not report any diagnostics.
   */
  Parse,
  /**
   * Parse documentation comments and report diagnostics.
   */
  Diagnose,

}
