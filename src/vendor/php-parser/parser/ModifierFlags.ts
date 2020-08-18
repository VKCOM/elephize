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
 * Specifies the modifier keywords parsed prior to a type member declaration.
 */
export enum ModifierFlags {

  None = 0,

  Abstract = 1 << 0,

  Final = 1 << 1,

  Private = 1 << 2,

  Protected = 1 << 3,

  Public = 1 << 4,

  Static = 1 << 5,

  VisibilityMask = Private | Protected | Public,

}
