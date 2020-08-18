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
 * Represents the precedence levels of a terminal symbol.
 *
 * This is used to resolve conflicts by comparing a rule's precedence to that
 * of the look-ahead token. If the token's precedence is higher, the parser
 * will consume it (shift). If the rule's precedence is higher, the parser will
 * create a node using the previously parsed tokens (reduce). If both precedence
 * levels are equal, the decision is made using the token's associativity.
 */
export enum Precedence {

  None,
  LogicalOr,    // "or"
  LogicalXor,   // "xor"
  LogicalAnd,   // "and"
  Assignment,
  Ternary,
  Coalesce,
  BooleanOr,    // ConditionalOr "||"
  BooleanAnd,   // ConditionalAnd "&&"
  BitwiseOr,
  BitwiseXor,
  BitwiseAnd,
  Equality,     // Is equal, is identical, spaceship, etc.
  Relational,   // Less than, greater than, etc.
  Shift,
  Add,          // Add, subtract, and concatenate.
  Multiply,     // Multiply, divide, and modulus.
  LogicalNot,   // "!"
  InstanceOf,
  Unary,        // Increment, decrement, type casts, etc.
  Pow,          // "**"

}
