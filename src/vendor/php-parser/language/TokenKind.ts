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
 * A list of possible token types.
 */
export enum TokenKind {

  Unknown,
  Error,                    // T_BAD_CHARACTER

  // Keywords
  Abstract,
  Array,
  As,
  Break,
  Callable,
  Case,
  Catch,
  Class,
  Clone,
  Const,
  Continue,
  Declare,
  Default,
  Die,
  Do,
  Echo,
  Else,
  ElseIf,
  Empty,
  EndDeclare,
  EndFor,
  EndForEach,
  EndIf,
  EndSwitch,
  EndWhile,
  Eval,
  Exit,
  Extends,
  Final,
  Finally,
  Fn,
  For,
  ForEach,
  Function,
  Global,
  GoTo,
  HaltCompiler,
  If,
  Implements,
  Include,
  IncludeOnce,
  InstanceOf,
  InsteadOf,
  Interface,
  IsSet,
  List,
  LogicalAnd,               // "and"
  LogicalOr,                // "or"
  LogicalXor,
  MagicClass,               // T_CLASS_C
  MagicDirectory,           // T_DIR
  MagicFile,                // T_FILE
  MagicFunction,            // T_FUNC_C
  MagicLine,                // T_LINE
  MagicMethod,              // T_METHOD_C
  MagicNamespace,           // T_NS_C
  MagicTrait,               // T_TRAIT_C
  Namespace,
  New,
  Print,
  Private,
  Protected,
  Public,
  Require,
  RequireOnce,
  Return,
  Static,
  Switch,
  Throw,
  Trait,
  Try,
  While,
  Unset,
  Use,
  Var,
  Yield,

  // Punctuation
  Ampersand,
  Asterisk,
  At,
  BackQuote,                // Technically should be `GraveAccent`.
  Backslash,                // T_NAMESPACE_SEPARATOR
  Caret,
  CloseBrace,
  CloseBracket,
  CloseParen,
  Colon,
  Comma,
  Dollar,
  DoubleQuote,
  Equal,
  Exclamation,
  GreaterThan,
  LessThan,
  Minus,
  OpenBrace,
  OpenBracket,
  OpenParen,
  Percent,
  Period,
  Plus,
  Question,
  Semicolon,
  SingleQuote,              // Not used.
  Slash,
  Tilde,
  VerticalBar,

  // Compound punctuation
  AndEqual,
  BooleanAnd,               // "&&"
  BooleanOr,                // "||"
  Coalesce,
  CoalesceEqual,
  ConcatEqual,
  Decrement,
  DivideEqual,
  DollarOpenBrace,          // T_DOLLAR_OPEN_CURLY_BRACE
  DoubleArrow,
  DoubleColon,
  Ellipsis,
  Increment,
  Inequality,               // "<>"
  IsEqual,
  IsGreaterThanOrEqual,
  IsIdentical,
  IsLessThanOrEqual,        // T_SMALLER_OR_EQUAL
  IsNotEqual,               // "!="
  IsNotIdentical,
  MinusEqual,
  ModEqual,
  MultiplyEqual,
  ObjectOperator,
  OpenBraceDollar,          // Not used.
  OrEqual,
  PlusEqual,
  Pow,
  PowEqual,
  ShiftLeft,
  ShiftLeftEqual,
  ShiftRight,
  ShiftRightEqual,
  Spaceship,
  XorEqual,

  // This should be trivia, but is equivalent to ';'.
  CloseTag,
  // This should be trivia, but is equivalent to 'echo'.
  OpenTagWithEcho,

  // End of file (also marks the end of language-defined tokens)
  EOF,

  // Keywords (with whitespace)
  ArrayCast,
  BinaryCast,
  BoolCast,
  BooleanCast,
  DoubleCast,
  FloatCast,
  IntCast,
  IntegerCast,
  ObjectCast,
  RealCast,
  StringCast,
  UnsetCast,
  YieldFrom,

  // Literals
  DNumber,
  FlexdocTemplate,          // Virtual.
  HeredocEnd,
  HeredocStart,
  HeredocTemplate,          // Virtual.
  Identifier,               // T_STRING
  InlineText,               // T_INLINE_HTML
  LNumber,
  ShellCommandTemplate,     // Virtual.
  StringIdentifier,         // T_STRING_VARNAME
  StringIndent,
  StringLineBreak,
  StringLiteral,            // T_CONSTANT_ENCAPSED_STRING (single-quoted text)
  StringNumber,             // T_NUM_STRING
  StringTemplate,           // Virtual.
  StringTemplateLiteral,    // T_ENCAPSED_AND_WHITESPACE (double-quoted text)
  Variable,

  // Trivia
  ConflictMarkerEnd,        // @todo Experimental.
  ConflictMarkerStart,      // @todo Experimental.
  DocumentationComment,     // "/**{WHITESPACE}"
  ElasticSpace,             // @todo Experimental.
  ElasticTab,               // @todo Experimental.
  LineBreak,
  MultipleLineComment,      // "/*"
  OpenTag,                  // "<?php"
  RegionEnd,                // @todo Experimental.
  RegionStart,              // @todo Experimental.
  ShortOpenTag,             // "<?"
  SingleLineComment,        // T_COMMENT
  Whitespace

}

/**
 * Useful methods that return information about the various types of tokens.
 */
export class TokenKindInfo {

  /**
   * Gets the text representation of a language-defined token kind, or the
   * machine name of a user-defined token kind.
   */
  public static getText(kind: TokenKind): string {
    switch (kind) {
      // Keywords
      case TokenKind.Abstract:
        return 'abstract';
      case TokenKind.Array:
        return 'array';
      case TokenKind.As:
        return 'as';
      case TokenKind.Break:
        return 'break';
      case TokenKind.Callable:
        return 'callable';
      case TokenKind.Case:
        return 'case';
      case TokenKind.Catch:
        return 'catch';
      case TokenKind.Class:
        return 'class';
      case TokenKind.Clone:
        return 'clone';
      case TokenKind.Const:
        return 'const';
      case TokenKind.Continue:
        return 'continue';
      case TokenKind.Declare:
        return 'declare';
      case TokenKind.Default:
        return 'default';
      case TokenKind.Die:
        return 'die';
      case TokenKind.Do:
        return 'do';
      case TokenKind.Echo:
        return 'echo';
      case TokenKind.Else:
        return 'else';
      case TokenKind.ElseIf:
        return 'elseif';
      case TokenKind.Empty:
        return 'empty';
      case TokenKind.EndDeclare:
        return 'enddeclare';
      case TokenKind.EndFor:
        return 'endfor';
      case TokenKind.EndForEach:
        return 'endforeach';
      case TokenKind.EndIf:
        return 'endif';
      case TokenKind.EndSwitch:
        return 'endswitch';
      case TokenKind.EndWhile:
        return 'endwhile';
      case TokenKind.Eval:
        return 'eval';
      case TokenKind.Exit:
        return 'exit';
      case TokenKind.Extends:
        return 'extends';
      case TokenKind.Final:
        return 'final';
      case TokenKind.Finally:
        return 'finally';
      case TokenKind.Fn:
        return 'fn';
      case TokenKind.For:
        return 'for';
      case TokenKind.ForEach:
        return 'foreach';
      case TokenKind.Function:
        return 'function';
      case TokenKind.Global:
        return 'global';
      case TokenKind.GoTo:
        return 'goto';
      case TokenKind.HaltCompiler:
        return '__halt_compiler';
      case TokenKind.If:
        return 'if';
      case TokenKind.Implements:
        return 'implements';
      case TokenKind.Include:
        return 'include';
      case TokenKind.IncludeOnce:
        return 'include_once';
      case TokenKind.InstanceOf:
        return 'instanceof';
      case TokenKind.InsteadOf:
        return 'insteadof';
      case TokenKind.Interface:
        return 'interface';
      case TokenKind.IsSet:
        return 'isset';
      case TokenKind.List:
        return 'list';
      case TokenKind.LogicalAnd:
        return 'and';
      case TokenKind.LogicalOr:
        return 'or';
      case TokenKind.LogicalXor:
        return 'xor';
      case TokenKind.MagicClass:
        return '__class__';
      case TokenKind.MagicDirectory:
        return '__dir__';
      case TokenKind.MagicFile:
        return '__file__';
      case TokenKind.MagicFunction:
        return '__function__';
      case TokenKind.MagicLine:
        return '__line__';
      case TokenKind.MagicMethod:
        return '__method__';
      case TokenKind.MagicNamespace:
        return '__namespace__';
      case TokenKind.MagicTrait:
        return '__trait__';
      case TokenKind.Namespace:
        return 'namespace';
      case TokenKind.New:
        return 'new';
      case TokenKind.Print:
        return 'print';
      case TokenKind.Private:
        return 'private';
      case TokenKind.Protected:
        return 'protected';
      case TokenKind.Public:
        return 'public';
      case TokenKind.Require:
        return 'require';
      case TokenKind.RequireOnce:
        return 'require_once';
      case TokenKind.Return:
        return 'return';
      case TokenKind.Static:
        return 'static';
      case TokenKind.Switch:
        return 'switch';
      case TokenKind.Throw:
        return 'throw';
      case TokenKind.Trait:
        return 'trait';
      case TokenKind.Try:
        return 'try';
      case TokenKind.While:
        return 'while';
      case TokenKind.Unset:
        return 'unset';
      case TokenKind.Use:
        return 'use';
      case TokenKind.Var:
        return 'var';
      case TokenKind.Yield:
        return 'yield';
      // Punctuation
      case TokenKind.Ampersand:
        return '&';
      case TokenKind.Asterisk:
        return '*';
      case TokenKind.At:
        return '@';
      case TokenKind.BackQuote:
        return '`';
      case TokenKind.Backslash:
        return '\\';
      case TokenKind.Caret:
        return '^';
      case TokenKind.CloseBrace:
        return '}';
      case TokenKind.CloseBracket:
        return ']';
      case TokenKind.CloseParen:
        return ')';
      case TokenKind.Colon:
        return ':';
      case TokenKind.Comma:
        return ',';
      case TokenKind.Dollar:
        return '$';
      case TokenKind.DoubleQuote:
        return '"';
      case TokenKind.Equal:
        return '=';
      case TokenKind.Exclamation:
        return '!';
      case TokenKind.GreaterThan:
        return '>';
      case TokenKind.LessThan:
        return '<';
      case TokenKind.Minus:
        return '-';
      case TokenKind.OpenBrace:
        return '{';
      case TokenKind.OpenBracket:
        return '[';
      case TokenKind.OpenParen:
        return '(';
      case TokenKind.Percent:
        return '%';
      case TokenKind.Period:
        return '.';
      case TokenKind.Plus:
        return '+';
      case TokenKind.Question:
        return '?';
      case TokenKind.Semicolon:
        return ';';
      case TokenKind.SingleQuote:
        return '\'';
      case TokenKind.Slash:
        return '/';
      case TokenKind.Tilde:
        return '~';
      case TokenKind.VerticalBar:
        return '|';
      // Compound punctuation
      case TokenKind.AndEqual:
        return '&=';
      case TokenKind.BooleanAnd:
        return '&&';
      case TokenKind.BooleanOr:
        return '||';
      case TokenKind.Coalesce:
        return '??';
      case TokenKind.CoalesceEqual:
        return '??=';
      case TokenKind.ConcatEqual:
        return '.=';
      case TokenKind.Decrement:
        return '--';
      case TokenKind.DivideEqual:
        return '/=';
      case TokenKind.DollarOpenBrace:
        return '${';
      case TokenKind.DoubleArrow:
        return '=>';
      case TokenKind.DoubleColon:
        return '::';
      case TokenKind.Ellipsis:
        return '...';
      case TokenKind.Increment:
        return '++';
      case TokenKind.Inequality:
        return '<>';
      case TokenKind.IsEqual:
        return '==';
      case TokenKind.IsGreaterThanOrEqual:
        return '>=';
      case TokenKind.IsIdentical:
        return '===';
      case TokenKind.IsLessThanOrEqual:
        return '<=';
      case TokenKind.IsNotEqual:
        return '!=';
      case TokenKind.IsNotIdentical:
        return '!==';
      case TokenKind.MinusEqual:
        return '-=';
      case TokenKind.ModEqual:
        return '%=';
      case TokenKind.MultiplyEqual:
        return '*=';
      case TokenKind.ObjectOperator:
        return '->';
      case TokenKind.OpenBraceDollar:
        return '{$';
      case TokenKind.OrEqual:
        return '|=';
      case TokenKind.PlusEqual:
        return '+=';
      case TokenKind.Pow:
        return '**';
      case TokenKind.PowEqual:
        return '**=';
      case TokenKind.ShiftLeft:
        return '<<';
      case TokenKind.ShiftLeftEqual:
        return '<<=';
      case TokenKind.ShiftRight:
        return '>>';
      case TokenKind.ShiftRightEqual:
        return '>>=';
      case TokenKind.Spaceship:
        return '<=>';
      case TokenKind.XorEqual:
        return '^=';
      // Tags
      case TokenKind.CloseTag:
        return '?>';
      case TokenKind.OpenTagWithEcho:
        return '<?=';
      default:
        return TokenKind[kind].toUpperCase();
    }
  }

  /**
   * Determines if the token kind represents punctuation.
   */
  public static isPunctuation(kind: TokenKind): boolean {
    if (kind >= TokenKind.Ampersand && kind <= TokenKind.XorEqual) {
      return true;
    }
    return false;
  }

  /**
   * Determines if the token kind represents a semi-reserved keyword.
   */
  public static isSemiReservedKeyword(kind: TokenKind): boolean {
    if (kind >= TokenKind.Abstract && kind <= TokenKind.Yield) {
      return true;
    }
    return false;
  }

  /**
   * Determines if the token kind is non-essential.
   */
  public static isTrivia(kind: TokenKind): boolean {
    if (kind >= TokenKind.ConflictMarkerEnd && kind <= TokenKind.Whitespace) {
      return true;
    }
    return false;
  }

}
