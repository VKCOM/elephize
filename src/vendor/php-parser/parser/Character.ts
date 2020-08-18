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

import { PhpVersion } from './PhpVersion';

/**
 * A list of character codes.
 */
export const enum Character {

  Null = 0,

  Backspace = 0x08,       // \b
  Tab = 0x09,             // \t
  LineFeed = 0x0A,        // \n
  VerticalTab = 0x0B,     // \v
  FormFeed = 0x0C,        // \f
  CarriageReturn = 0x0D,  // \r

  Space = 0x20,
  Exclamation = 0x21,     // !
  DoubleQuote = 0x22,     // "
  Hash = 0x23,            // #
  Dollar = 0x24,          // $
  Percent = 0x25,         // %
  Ampersand = 0x26,       // &
  SingleQuote = 0x27,     // '
  OpenParen = 0x28,       // (
  CloseParen = 0x29,      // )
  Asterisk = 0x2A,        // *
  Plus = 0x2B,            // +
  Comma = 0x2C,           // ,
  Minus = 0x2D,           // -
  Period = 0x2E,          // .
  Slash = 0x2F,           // /

  _0 = 0x30,
  _1 = 0x31,
  _2 = 0x32,
  _3 = 0x33,
  _4 = 0x34,
  _5 = 0x35,
  _6 = 0x36,
  _7 = 0x37,
  _8 = 0x38,
  _9 = 0x39,

  Colon = 0x3A,           // :
  Semicolon = 0x3B,       // ;
  LessThan = 0x3C,        // <
  Equal = 0x3D,           // =
  GreaterThan = 0x3E,     // >
  Question = 0x3F,        // ?
  At = 0x40,              // @

  A = 0x41,
  B = 0x42,
  C = 0x43,
  D = 0x44,
  E = 0x45,
  F = 0x46,
  G = 0x47,
  H = 0x48,
  I = 0x49,
  J = 0x4A,
  K = 0x4B,
  L = 0x4C,
  M = 0x4D,
  N = 0x4E,
  O = 0x4F,
  P = 0x50,
  Q = 0x51,
  R = 0x52,
  S = 0x53,
  T = 0x54,
  U = 0x55,
  V = 0x56,
  W = 0x57,
  X = 0x58,
  Y = 0x59,
  Z = 0x5A,

  OpenBracket = 0x5B,     // [
  Backslash = 0x5C,       // \
  CloseBracket = 0x5D,    // ]
  Caret = 0x5E,           // ^
  Underscore = 0x5F,      // _
  BackQuote = 0x60,       // `

  a = 0x61,
  b = 0x62,
  c = 0x63,
  d = 0x64,
  e = 0x65,
  f = 0x66,
  g = 0x67,
  h = 0x68,
  i = 0x69,
  j = 0x6A,
  k = 0x6B,
  l = 0x6C,
  m = 0x6D,
  n = 0x6E,
  o = 0x6F,
  p = 0x70,
  q = 0x71,
  r = 0x72,
  s = 0x73,
  t = 0x74,
  u = 0x75,
  v = 0x76,
  w = 0x77,
  x = 0x78,
  y = 0x79,
  z = 0x7A,

  OpenBrace = 0x7B,       // {
  VerticalBar = 0x7C,     // |
  CloseBrace = 0x7D,      // }
  Tilde = 0x7E,           // ~

  Delete = 0x7F

}

/**
 * Defines the language-specific characteristics of certain characters.
 */
export class CharacterInfo {

  /**
   * Determines if a character is a binary digit (0-1).
   */
  public static isBinDigit(ch: number): boolean {
    return ch === Character._0 || ch === Character._1;
  }

  /**
   * Determines if a character is a digit (0-9).
   */
  public static isDigit(ch: number): boolean {
    return ch >= Character._0 && ch <= Character._9;
  }

  /**
   * Determines if a character is a valid escape sequence in a double-quoted
   * string. The escape sequence may still be valid if it consists of multiple
   * characters however.
   */
  public static isDoubleQuoteEscape(ch: number): boolean {
    return ch === Character.Backslash ||
      ch === Character.Dollar ||
      ch === Character.DoubleQuote ||
      ch === Character.e ||
      ch === Character.f ||
      ch === Character.n ||
      ch === Character.r ||
      ch === Character.t ||
      ch === Character.v;
  }

  /**
   * Determines if a character is a hexadecimal digit (0-9, A-F).
   */
  public static isHexDigit(ch: number): boolean {
    return (ch >= Character._0 && ch <= Character._9) ||
      (ch >= Character.A && ch <= Character.F) ||
      (ch >= Character.a && ch <= Character.f);
  }

  /**
   * Determines if the character may be part of an identifier.
   *
   * This is similar to `isIdentifierStart()` but allows for digits.
   */
  public static isIdentifierPart(ch: number, languageVersion = PhpVersion.Latest): boolean {
    if (ch < Character.a) {
      if (ch < Character.A) {
        return ch >= Character._0 && ch <= Character._9;
      }
      return ch <= Character.Z || ch === Character.Underscore;
    }
    if (ch <= Character.z) {
      return true;
    }
    if (ch <= Character.Delete) {
      return languageVersion === PhpVersion.PHP7_0 && ch === Character.Delete;
    }
    return true;
  }

  /**
   * Determines if a character may start an identifier.
   */
  public static isIdentifierStart(ch: number, languageVersion = PhpVersion.Latest): boolean {
    if (ch < Character.a) {
      if (ch < Character.A) {
        return false;
      }
      return ch <= Character.Z || ch === Character.Underscore;
    }
    if (ch <= Character.z) {
      return true;
    }
    if (ch <= Character.Delete) {
      return languageVersion === PhpVersion.PHP7_0 && ch === Character.Delete;
    }
    return true;
  }

  /**
   * Determines if a character is a line break (CR or LF).
   */
  public static isLineBreak(ch: number): boolean {
    // LineSeparator (U+2028), ParagraphSeparator (U+2029)
    return ch === Character.CarriageReturn || ch === Character.LineFeed;
  }

  /**
   * Determines if a character is an octal digit (0-7).
   */
  public static isOctDigit(ch: number): boolean {
    return ch >= Character._0 && ch <= Character._7;
  }

  /**
   * Determines if a character is a valid escape sequence in a single-quoted
   * string.
   */
  public static isSingleQuoteEscape(ch: number): boolean {
    return ch === Character.Backslash || ch === Character.SingleQuote;
  }

  /**
   * Determines if a character is whitespace (but not a line break).
   */
  public static isWhitespace(ch: number): boolean {
    // PHP does not recognize FormFeed or VerticalTab as whitespace.
    return ch === Character.Space || ch === Character.Tab;
  }

  /**
   * Determines if a character is whitespace or a line break.
   */
  public static isWhitespaceLike(ch: number): boolean {
    return CharacterInfo.isLineBreak(ch) || CharacterInfo.isWhitespace(ch);
  }

}
