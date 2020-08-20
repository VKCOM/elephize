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
 * The language constructs that are currently being parsed.
 */
export const enum ParseContext {

  /**
   * Statements appearing in the global scope.
   */
  SourceElements = 0,
  /**
   * Statements enclosed by '{' and '}'.
   */
  CompoundStatementElements = 1 << 1,
  /**
   * Statements within a namespace group declaration.
   */
  NamespaceElements = 1 << 2,

  /**
   * Statements enclosed by `declare` and `enddeclare`.
   */
  DeclareBlockElements = 1 << 3,
  /**
   * Statements enclosed by `for` and `endfor`.
   */
  ForBlockElements = 1 << 4,
  /**
   * Statements enclosed by `foreach` and `endforeach`.
   */
  ForEachBlockElements = 1 << 5,
  /**
   * Statements after an `if` or `elseif` condition and ended by `elseif`,
   * `else`, or `endif`.
   */
  IfBlockElements = 1 << 6,
  /**
   * Statements enclosed by `else` and `endif`.
   */
  IfElseBlockElements = 1 << 7,
  /**
   * Statements enclosed by `while` and `endwhile`.
   */
  WhileBlockElements = 1 << 8,

  /**
   * Case clauses within a switch statement.
   */
  SwitchElements = 1 << 9,
  /**
   * Case clauses enclosed by `switch` and `endswitch`.
   */
  SwitchBlockElements = 1 << 10,
  /**
   * Statements appearing after a switch case (or default) label.
   */
  CaseClauseElements = 1 << 11,

  ClassMembers = 1 << 12,
  InterfaceMembers = 1 << 13,
  TraitMembers = 1 << 14,

  // TryBlock
  // CatchClause

  // ArgumentList
  // ParameterList

  // ClassConstantDeclaration
  // ClassPropertyDeclaration

  ConstantDeclaration = 1 << 15,

  Length = 16,  // Always keep updated.

}
