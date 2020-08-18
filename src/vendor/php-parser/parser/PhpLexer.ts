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

import { ArgumentException, Exception } from '@mattacosta/php-common';

import { Character, CharacterInfo } from './Character';
import { Encoding } from '../text/Encoding';
import { ErrorCode } from '../diagnostics/ErrorCode.Generated';
import { ISourceText } from '../text/ISourceText';
import { LexerBase } from './Lexer';
import { PhpLexerState } from './PhpLexerState';
import { PhpVersion } from './PhpVersion';
import { TemplateSpan } from './TemplateSpan';
import { Token } from './Token';
import { TokenKind } from '../language/TokenKind';

/**
 * @internal
 */
export class HeredocLabelInfo {

  constructor(public readonly label: string, public readonly fullLength: number, public readonly isNowdoc: boolean) {}

}

/**
 * Tokenizes PHP source text.
 *
 * IMPORTANT: This class is performance critical and must make every effort to
 * allow native optimization by the V8 engine.
 */
export class PhpLexer extends LexerBase<Token, PhpLexerState> {

  /**
   * A map of cast types to their associated tokens.
   */
  protected static readonly CastTokens: ReadonlyMap<string, TokenKind> = new Map<string, TokenKind>([
    ['array', TokenKind.ArrayCast],
    ['binary', TokenKind.BinaryCast],
    ['bool', TokenKind.BoolCast],
    ['boolean', TokenKind.BooleanCast],
    ['double', TokenKind.DoubleCast],
    ['float', TokenKind.FloatCast],
    ['int', TokenKind.IntCast],
    ['integer', TokenKind.IntegerCast],
    ['object', TokenKind.ObjectCast],
    ['real', TokenKind.RealCast],
    ['string', TokenKind.StringCast],
    ['unset', TokenKind.UnsetCast]
  ]);

  /**
   * A map of keywords to their associated tokens.
   */
  protected static readonly KeywordTokens: ReadonlyMap<string, TokenKind> = new Map<string, TokenKind>([
    ['__class__', TokenKind.MagicClass],
    ['__dir__', TokenKind.MagicDirectory],
    ['__file__', TokenKind.MagicFile],
    ['__function__', TokenKind.MagicFunction],
    ['__halt_compiler', TokenKind.HaltCompiler],
    ['__line__', TokenKind.MagicLine],
    ['__method__', TokenKind.MagicMethod],
    ['__namespace__', TokenKind.MagicNamespace],
    ['__trait__', TokenKind.MagicTrait],
    ['abstract', TokenKind.Abstract],
    ['and', TokenKind.LogicalAnd],
    ['array', TokenKind.Array],
    ['as', TokenKind.As],
    ['break', TokenKind.Break],
    ['callable', TokenKind.Callable],
    ['case', TokenKind.Case],
    ['catch', TokenKind.Catch],
    ['class', TokenKind.Class],
    ['clone', TokenKind.Clone],
    ['const', TokenKind.Const],
    ['continue', TokenKind.Continue],
    ['declare', TokenKind.Declare],
    ['default', TokenKind.Default],
    ['die', TokenKind.Die],
    ['do', TokenKind.Do],
    ['echo', TokenKind.Echo],
    ['else', TokenKind.Else],
    ['elseif', TokenKind.ElseIf],
    ['empty', TokenKind.Empty],
    ['enddeclare', TokenKind.EndDeclare],
    ['endfor', TokenKind.EndFor],
    ['endforeach', TokenKind.EndForEach],
    ['endif', TokenKind.EndIf],
    ['endswitch', TokenKind.EndSwitch],
    ['endwhile', TokenKind.EndWhile],
    ['eval', TokenKind.Eval],
    ['exit', TokenKind.Exit],
    ['extends', TokenKind.Extends],
    ['final', TokenKind.Final],
    ['finally', TokenKind.Finally],
    ['fn', TokenKind.Fn],
    ['for', TokenKind.For],
    ['foreach', TokenKind.ForEach],
    ['function', TokenKind.Function],
    ['global', TokenKind.Global],
    ['goto', TokenKind.GoTo],
    ['if', TokenKind.If],
    ['implements', TokenKind.Implements],
    ['include', TokenKind.Include],
    ['include_once', TokenKind.IncludeOnce],
    ['instanceof', TokenKind.InstanceOf],
    ['insteadof', TokenKind.InsteadOf],
    ['interface', TokenKind.Interface],
    ['isset', TokenKind.IsSet],
    ['list', TokenKind.List],
    ['namespace', TokenKind.Namespace],
    ['new', TokenKind.New],
    ['or', TokenKind.LogicalOr],
    ['print', TokenKind.Print],
    ['private', TokenKind.Private],
    ['protected', TokenKind.Protected],
    ['public', TokenKind.Public],
    ['require', TokenKind.Require],
    ['require_once', TokenKind.RequireOnce],
    ['return', TokenKind.Return],
    ['static', TokenKind.Static],
    ['switch', TokenKind.Switch],
    ['throw', TokenKind.Throw],
    ['trait', TokenKind.Trait],
    ['try', TokenKind.Try],
    ['while', TokenKind.While],
    ['unset', TokenKind.Unset],
    ['use', TokenKind.Use],
    ['var', TokenKind.Var],
    ['xor', TokenKind.LogicalXor],
    ['yield', TokenKind.Yield]
  ]);

  /**
   * Determines if short open tags "<?" are permitted. Defaults to `false`.
   */
  protected allowShortOpen: boolean = false;

  /**
   * Determines if the lexer should scan text as if PHP were aware of UTF-16
   * encoded characters. Defaults to `false`.
   */
  protected allowUtf16: boolean = false;

  /**
   * The default scanning mode when starting to scan text, or when not in a
   * pre-defined region.
   *
   * @see PhpLexer.templateStack
   */
  protected defaultState = PhpLexerState.InHostLanguage;

  /**
   * The indentation to remove from lines in a flexdoc template.
   */
  protected flexibleIndent: string = '';

  /**
   * Temporary storage for spans within a string template.
   */
  protected interpolations: TemplateSpan[] = [];

  /**
   * The version of PHP to parse tokens as.
   */
  protected phpVersion: PhpVersion;

  /**
   * A pre-defined list containing state transitions for a region of text.
   */
  protected templateStack: TemplateSpan[] = [];

  /**
   * The kind of token that was scanned.
   */
  protected tokenKind: TokenKind = TokenKind.Unknown;

  /**
   * The starting offset of the token that was scanned.
   */
  protected tokenStart: number = 0;

  /**
   * The size of a `long` used by PHP.
   */
  private ptrSize: number = 8;

  /**
   * Constructs a `PhpLexer` object.
   *
   * @param {ISourceText} text
   *   The source text to tokenize.
   * @param {PhpVersion=} phpVersion
   *   The version of PHP to parse tokens as. Defaults to `PhpVersion.Latest`.
   * @param {boolean=} is64Bit
   *   Determines if the lexer should scan numbers as if PHP were compiled with
   *   64-bit support. Defaults to `true`.
   * @param {boolean=} allowUtf16
   *   Determines if the lexer should scan text as if PHP were aware of UTF-16
   *   encoded characters. Defaults to `false`.
   *
   * @todo Add `start` and `length` parameters?
   */
  constructor(text: ISourceText, phpVersion = PhpVersion.Latest, is64Bit = true, allowUtf16 = false) {
    super(text, PhpLexerState.InHostLanguage);
    this.allowUtf16 = allowUtf16;
    this.phpVersion = phpVersion;
    this.ptrSize = is64Bit ? 8 : 4;
  }

  /**
   * The current lexing state.
   */
  public get currentState(): PhpLexerState {
    return this.state;
  }

  /**
   * The text currently being scanned.
   */
  public get sourceText(): ISourceText {
    return this.text;
  }

  /**
   * A list of regions within a string template that may be rescanned for
   * additional tokens. This list is empty for all other tokens.
   */
  public get templateSpans(): TemplateSpan[] {
    return this.interpolations;  // @todo Clone?
  }

  /**
   * Scans the source text until a token is found.
   */
  public lex(state: PhpLexerState): Token {
    this.diagnostics = [];
    this.state = state;

    this.tokenStart = this.offset;

    if (this.offset >= this.end) {
      this.tokenKind = TokenKind.EOF;
      return new Token(this.tokenKind, this.tokenStart, 0, this.diagnostics);
    }

    switch (this.state) {
      // Standard lexing states.
      case PhpLexerState.InHostLanguage:
        this.state = this.lexInlineText();
        break;
      case PhpLexerState.InScript:
        this.state = this.lexScript();
        break;

      // Rescanning states.
      case PhpLexerState.InDoubleQuote:
      case PhpLexerState.InFlexibleHeredoc:
      case PhpLexerState.InHeredoc:
      case PhpLexerState.InShellCommand:
        this.state = this.lexString();
        break;
      case PhpLexerState.InFlexibleNowdoc:
      case PhpLexerState.InNowdoc:
        this.state = this.lexNowdoc();
        break;
      case PhpLexerState.InVariableOffset:
        this.state = this.lexVariableOffset();
        break;
      case PhpLexerState.LookingForHeredocIndent:
        this.state = this.lexString();
        break;
      case PhpLexerState.LookingForHeredocLabel:
        this.state = this.lexHeredocLabel();
        break;
      // case PhpLexerState.LookingForProperty:
      //   this.state = this.lexProperty();
      //   break;
      case PhpLexerState.LookingForVariableName:
        this.state = this.lexVariableName();
        break;

      default:
        throw new Exception('Invalid lexer state');
    }

    // If the lexer is currently rescanning a string template, then the state
    // may have already been determined.
    if (this.templateStack.length > 0) {
      // End of current span.
      if (this.offset === this.templateStack[0].start + this.templateStack[0].length) {
        this.state = this.defaultState;
        this.templateStack.shift();
      }
      // If there is another span, then it may start immediately.
      if (this.templateStack.length > 0 && this.offset === this.templateStack[0].start) {
        this.state = this.templateStack[0].state;
        // If a heredoc string had an end label, extend the scan range back
        // to its normal length.
        if (this.state === PhpLexerState.LookingForHeredocLabel && this.offset === this.end) {
          this.end = this.end + this.templateStack[0].length;
        }
      }
    }

    return new Token(this.tokenKind, this.tokenStart, this.offset - this.tokenStart, this.diagnostics);
  }

  /**
   * Initializes the lexer with predetermined lexing regions found after
   * scanning a `FlexdocTemplate` token.
   */
  public rescanInterpolatedFlexdoc(spans: TemplateSpan[]): void {
    if (spans.length < 1) {
      throw new ArgumentException('Flexdoc template must contain at least one span');
    }
    if (spans[spans.length - 1].state !== PhpLexerState.LookingForHeredocLabel) {
      throw new ArgumentException('Flexdoc template must end with a label span');
    }

    this.defaultState = PhpLexerState.InFlexibleHeredoc;
    this.state = PhpLexerState.LookingForHeredocLabel;
    this.templateStack = spans;

    let endSpan = spans[spans.length - 1];

    // Get the indent.
    let endLabel = this.text.substring(endSpan.start, endSpan.length);
    for (let i = 0; i < endLabel.length; i++) {
      if (!CharacterInfo.isWhitespace(endLabel.charCodeAt(i))) {
        this.flexibleIndent = endLabel.substr(0, i);
        break;
      }
    }

    // Force the lexer to stop just before an end label instead of always
    // trying to scan for it. After reaching the last span, this region will
    // be "appended" and scanned normally.
    this.end = this.end - endSpan.length;
  }

  /**
   * Initializes the lexer with predetermined lexing regions found after
   * scanning a `HeredocTemplate` token.
   */
  public rescanInterpolatedHeredoc(spans: TemplateSpan[]): void {
    this.defaultState = PhpLexerState.InHeredoc;
    this.state = PhpLexerState.LookingForHeredocLabel;
    this.templateStack = spans;

    // Force the lexer to stop just before an end label instead of always
    // trying to scan for it. After reaching the last span, this region will
    // be "appended" and scanned normally.
    if (spans.length > 0 && spans[spans.length - 1].state === PhpLexerState.LookingForHeredocLabel) {
      this.end = this.end - spans[spans.length - 1].length;
    }
  }

  /**
   * Initializes the lexer with predetermined lexing regions found after
   * scanning a `ShellCommandTemplate` token.
   */
  public rescanInterpolatedShellCommand(spans: TemplateSpan[]): void {
    this.state = this.defaultState = PhpLexerState.InShellCommand;
    this.templateStack = spans;

    if (spans.length > 0 && this.offset === spans[0].start) {
      this.state = spans[0].state;
    }
  }

  /**
   * Initializes the lexer with predetermined lexing regions found after
   * scanning a `StringTemplate` token.
   *
   * This method should only be used on a new, temporary `PhpLexer` object,
   * that was created with the text of the `StringTemplate` token.
   *
   * @see PhpLexer.templateSpans
   */
  public rescanInterpolatedString(spans: TemplateSpan[]): void {
    if (spans.length === 0) {
      throw new ArgumentException('String template must contain at least 1 span');
    }

    this.state = this.defaultState = PhpLexerState.InDoubleQuote;
    this.templateStack = spans;

    if (this.offset === spans[0].start) {
      this.state = spans[0].state;
    }
  }

  /**
   * Sets the source text to tokenize.
   *
   * @param {ISourceText} text
   *   The source text to tokenize.
   * @param {number=} start
   *   The offset within the text to start tokenizing. Defaults to 0.
   * @param {number=} length
   *   The maximum number of characters to tokenize. Defaults to the length
   *   of the text.
   */
  public setText(text: ISourceText, start?: number, length?: number): void {
    this.text = text;

    start = start === void 0 ? 0 : start;
    length = length === void 0 ? text.length : length;
    this.setBounds(start, start + length);
    this.setPosition(start);
  }

  /**
   * Determines if the given heredoc (or nowdoc) label is present at the
   * lexer's current position.
   *
   * @param {string} label
   *   The label used to delimit the string.
   */
  protected isHeredocEnd(label: string): boolean {
    // Don't move the actual lexer position.
    let offset = this.offset;

    // PHP 7.3 allows leading whitespace.
    if (this.phpVersion >= PhpVersion.PHP7_3) {
      while (offset < this.end && CharacterInfo.isWhitespace(this.text.charCodeAt(offset))) {
        offset++;
      }
    }

    // End label.
    if (offset + label.length > this.end) {
      return false;
    }

    let labelStart = offset;
    if (CharacterInfo.isIdentifierStart(this.text.charCodeAt(offset))) {
      offset++;

      // No partial matches, so get the full identifier.
      while (offset < this.end) {
        let ch = this.text.charCodeAt(offset);
        if (!CharacterInfo.isIdentifierPart(ch, this.phpVersion)) {
          break;
        }
        offset++;
      }

      // Compare to the label.
      if (this.text.substring(labelStart, offset - labelStart) !== label) {
        return false;
      }
    }
    else {
      return false;
    }

    // PHP 7.3 also removes requirements for trailing characters.
    if (this.phpVersion >= PhpVersion.PHP7_3) {
      return true;
    }

    // Optional semicolon.
    if (this.peek(offset) === Character.Semicolon) {
      offset++;
    }

    // Required line break.
    let ch = this.peek(offset);
    if (ch === Character.CarriageReturn || ch === Character.LineFeed) {
      return true;
    }

    return false;
  }

  /**
   * Tokenizes a starting or ending heredoc label.
   */
  protected lexHeredocLabel(): PhpLexerState {
    let ch = this.text.charCodeAt(this.offset);
    if (ch === Character.LessThan) {
      let info = this.tryScanHeredocStartLabel();
      if (this.flexibleIndent) {
        this.state = PhpLexerState.LookingForHeredocIndent;
      }
      else {
        this.state = (info && info.isNowdoc) ? PhpLexerState.InNowdoc : PhpLexerState.InHeredoc;
      }

      this.tokenKind = TokenKind.HeredocStart;
    }
    else if (CharacterInfo.isWhitespace(ch)) {
      // NOTE: Do not move past the first whitespace character yet.
      this.scanHeredocEndLabelIndent();
      this.tokenKind = TokenKind.StringIndent;
    }
    else {
      this.offset++;
      this.scanIdentifierPart();
      this.tokenKind = TokenKind.HeredocEnd;
    }
    return this.state;
  }

  /**
   * Tokenizes inline text until a PHP open tag is encountered.
   */
  protected lexInlineText(): PhpLexerState {
    if (this.text.encoding === Encoding.Utf16le && !this.allowUtf16) {
      // All code points are encoded using at least two bytes, which prevents
      // PHP from finding an open tag (null bytes are between each character).
      this.offset = this.end;
      this.tokenKind = TokenKind.InlineText;
      return this.state;
    }

    // Only return an opening tag if there is no inline text in the way.
    let length = this.tryScanOpenTag();
    if (length) {
      this.tokenKind = length === 5
        ? TokenKind.OpenTag
        : length === 3 ? TokenKind.OpenTagWithEcho : TokenKind.ShortOpenTag;
      return PhpLexerState.InScript;
    }

    this.offset++;

    while (this.offset < this.end) {
      length = this.tryScanOpenTag();
      if (length > 0) {
        // Do not return the opening tag as part of the inline text.
        this.offset = this.offset - length;
        break;
      }
      this.offset++;
    }

    this.tokenKind = TokenKind.InlineText;
    return this.state;
  }

  /**
   * Tokenizes the text of a nowdoc string.
   */
  protected lexNowdoc(): PhpLexerState {
    // In a regular nowdoc, the end label has been temporarily removed, so
    // there's nothing to do but instantaneously tokenize the string.
    if (this.state === PhpLexerState.InNowdoc) {
      this.offset = this.end;
      this.tokenKind = TokenKind.StringTemplateLiteral;
      return this.state;
    }

    // A flexible nowdoc actually has some tokens though.
    let ch = this.text.charCodeAt(this.offset);

    switch (ch) {
      case Character.Space:
      case Character.Tab:
        if (this.state === PhpLexerState.LookingForHeredocIndent) {
          this.scanFlexdocIndent();
          this.tokenKind = TokenKind.StringIndent;
          this.state = PhpLexerState.InFlexibleNowdoc;
          break;
        }
        this.scanNowdocString();
        this.tokenKind = TokenKind.StringTemplateLiteral;
        break;
      case Character.CarriageReturn:
      case Character.LineFeed:
        this.offset++;
        while (CharacterInfo.isLineBreak(this.text.charCodeAt(this.offset))) {
          this.offset++;
        }
        this.tokenKind = TokenKind.StringLineBreak;
        this.state = PhpLexerState.LookingForHeredocIndent;
        break;
      default:
        this.scanNowdocString();
        this.tokenKind = TokenKind.StringTemplateLiteral;
        break;
    }

    return this.state;
  }

  /**
   * Tokenizes object operators and property names.
   *
   * @todo Unused.
   */
  protected lexProperty(): PhpLexerState {
    let ch = this.text.charCodeAt(this.offset);
    switch (ch) {
      // Line breaks
      case Character.CarriageReturn:
      case Character.LineFeed:
        if (ch === Character.CarriageReturn && this.peek(this.offset + 1) === Character.LineFeed) {
          this.offset = this.offset + 2;
        }
        else {
          this.offset++;
        }

        this.tokenKind = TokenKind.LineBreak;
        return this.state;

      // Whitespace
      case Character.Space:
      case Character.Tab:
        this.offset++;
        this.scanWhitespace();
        this.tokenKind = TokenKind.Whitespace;
        return this.state;
      case Character.Minus:
        if (this.peek(this.offset + 1) === Character.GreaterThan) {
          this.offset = this.offset + 2;  // "->"
          this.tokenKind = TokenKind.ObjectOperator;
          return this.state;
        }
        // Fall through to {ANY_CHAR} rule.
      default:
        if (CharacterInfo.isIdentifierStart(ch, this.phpVersion)) {
          this.offset++;
          this.scanIdentifierPart();
          this.tokenKind = TokenKind.Identifier;
          return this.state = PhpLexerState.InScript;
        }
        // No match. Need to fallback and try again.
        this.state = PhpLexerState.InScript;
        return this.lexScript();
    }
  }

  /**
   * Tokenizes the region of source text that contains PHP script.
   */
  protected lexScript(): PhpLexerState {
    let ch = this.text.charCodeAt(this.offset);

    switch (ch) {
      // Line breaks
      case Character.CarriageReturn:
      case Character.LineFeed:
        if (ch === Character.CarriageReturn && this.peek(this.offset + 1) === Character.LineFeed) {
          this.offset = this.offset + 2;
        }
        else {
          this.offset++;
        }

        this.tokenKind = TokenKind.LineBreak;
        return this.state;

      // Whitespace
      case Character.Space:
      case Character.Tab:
        this.offset++;
        this.scanWhitespace();
        this.tokenKind = TokenKind.Whitespace;
        return this.state;
    }

    // Express checkout for keywords and common identifiers.
    if ((ch >= Character.a && ch <= Character.z) || (ch >= Character.A && ch <= Character.Z)) {
      this.scanIdentifierOrKeyword();
      return this.state;
    }

    let next = this.peek(this.offset + 1);
    switch (ch) {
      // Variables
      case Character.Dollar:
        if (CharacterInfo.isIdentifierStart(next, this.phpVersion)) {
          this.offset = this.offset + 2;
          this.scanIdentifierPart();
          this.tokenKind = TokenKind.Variable;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Dollar;
        }
        return this.state;

      // Strings
      case Character.BackQuote:
        this.offset++;
        this.interpolations = [];
        this.scanInterpolatedString(Character.BackQuote, this.interpolations);
        if (this.peek(this.offset) === Character.BackQuote) {
          this.offset++;
        }
        else {
          this.addError(0, this.offset - this.tokenStart, ErrorCode.ERR_UnterminatedString);
        }
        this.tokenKind = TokenKind.ShellCommandTemplate;
        return this.state;
      case Character.DoubleQuote:
        this.offset++;
        this.interpolations = [];
        this.scanInterpolatedString(Character.DoubleQuote, this.interpolations);
        if (this.peek(this.offset) === Character.DoubleQuote) {
          this.offset++;
        }
        else {
          this.addError(0, this.offset - this.tokenStart, ErrorCode.ERR_UnterminatedString);
        }
        this.tokenKind = this.interpolations.length ? TokenKind.StringTemplate : TokenKind.StringLiteral;
        return this.state;
      case Character.SingleQuote:
        this.offset++;
        this.scanSingleQuoteString();
        if (this.peek(this.offset) === Character.SingleQuote) {
          this.offset++;
        }
        else {
          this.addError(0, this.offset - this.tokenStart, ErrorCode.ERR_UnterminatedStringConstant);
        }

        // PHP would normally return a `StringTemplate` here, if the string
        // was unterminated, which would in turn force the script to exit with
        // a syntax error. This lexer can generate the correct token however,
        // since it can add diagnostics instead.

        this.tokenKind = TokenKind.StringLiteral;
        return this.state;

      // Comments
      case Character.Hash:
        this.offset++;
        this.tokenKind = TokenKind.SingleLineComment;
        this.scanLineComment();
        return this.state;
      case Character.Slash:
        if (next === Character.Slash) {
          this.offset = this.offset + 2;  // "//"
          // if (this.peek(this.offset) === Character.OpenBrace) {
          //   this.offset++;
          //   this.tokenKind = TokenKind.RegionStart;
          // }
          // else if (this.peek(this.offset) === Character.CloseBrace) {
          //   this.offset++;
          //   this.tokenKind = TokenKind.RegionEnd;
          // }
          // else {
          //   this.tokenKind = TokenKind.SingleLineComment;
          // }
          this.tokenKind = TokenKind.SingleLineComment;
          this.scanLineComment();
          return this.state;
        }
        else if (next === Character.Asterisk) {
          this.offset = this.offset + 2;  // "/*"
          if (this.peek(this.offset) === Character.Asterisk && CharacterInfo.isWhitespaceLike(this.peek(this.offset + 1))) {
            this.offset = this.offset + 2;
            this.tokenKind = TokenKind.DocumentationComment;
          }
          else {
            this.tokenKind = TokenKind.MultipleLineComment;
          }
          this.scanMultipleLineComment();
          if (this.peek(this.offset) === Character.Asterisk && this.peek(this.offset + 1) === Character.Slash) {
            this.offset = this.offset + 2;  // "*/"
          }
          else {
            this.addError(0, this.offset - this.tokenStart, ErrorCode.WRN_UnterminatedComment);
          }
          return this.state;
        }
        else if (next === Character.Equal) {
          this.offset = this.offset + 2;  // "/="
          this.tokenKind = TokenKind.DivideEqual;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Slash;
        }
        return this.state;

      // Punctuation
      case Character.At:
        this.offset++;
        this.tokenKind = TokenKind.At;
        return this.state;
      case Character.Backslash:
        this.offset++;
        this.tokenKind = TokenKind.Backslash;
        return this.state;
      case Character.CloseBrace:
        this.offset++;
        this.tokenKind = TokenKind.CloseBrace;
        return this.state;
      case Character.CloseBracket:
        this.offset++;
        this.tokenKind = TokenKind.CloseBracket;
        return this.state;
      case Character.CloseParen:
        this.offset++;
        this.tokenKind = TokenKind.CloseParen;
        return this.state;
      case Character.Comma:
        this.offset++;
        this.tokenKind = TokenKind.Comma;
        return this.state;
      case Character.OpenBrace:
        // NOTE: A "{$" token can only occur in an interpolated string.
        this.offset++;
        this.tokenKind = TokenKind.OpenBrace;
        return this.state;
      case Character.OpenBracket:
        this.offset++;
        this.tokenKind = TokenKind.OpenBracket;
        return this.state;
      case Character.Semicolon:
        this.offset++;
        this.tokenKind = TokenKind.Semicolon;
        return this.state;
      case Character.Tilde:
        this.offset++;
        this.tokenKind = TokenKind.Tilde;
        return this.state;

      // Compound punctuation
      case Character.Ampersand:
        if (next === Character.Ampersand) {
          this.offset = this.offset + 2;  // "&&"
          this.tokenKind = TokenKind.BooleanAnd;
        }
        else if (next === Character.Equal) {
          this.offset = this.offset + 2;  // "&="
          this.tokenKind = TokenKind.AndEqual;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Ampersand;
        }
        return this.state;
      case Character.Asterisk:
        if (next === Character.Equal) {
          this.offset = this.offset + 2;  // "*="
          this.tokenKind = TokenKind.MultiplyEqual;
        }
        else if (next === Character.Asterisk) {
          if (this.peek(this.offset + 2) === Character.Equal) {
            this.offset = this.offset + 3;  // "**="
            this.tokenKind = TokenKind.PowEqual;
          }
          else {
            this.offset = this.offset + 2;  // "**"
            this.tokenKind = TokenKind.Pow;
          }
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Asterisk;
        }
        return this.state;
      case Character.Caret:
        if (next === Character.Equal) {
          this.offset = this.offset + 2;  // "^="
          this.tokenKind = TokenKind.XorEqual;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Caret;
        }
        return this.state;
      case Character.Colon:
        if (next === Character.Colon) {
          this.offset = this.offset + 2;  // "::"
          this.tokenKind = TokenKind.DoubleColon;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Colon;
        }
        return this.state;
      case Character.Equal:
        if (next === Character.Equal) {
          if (this.peek(this.offset + 2) === Character.Equal) {
            this.offset = this.offset + 3;  // "==="
            this.tokenKind = TokenKind.IsIdentical;
          }
          else {
            this.offset = this.offset + 2;  // "=="
            this.tokenKind = TokenKind.IsEqual;
          }
        }
        else if (next === Character.GreaterThan) {
          this.offset = this.offset + 2;  // "=>"
          this.tokenKind = TokenKind.DoubleArrow;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Equal;
        }
        return this.state;
      case Character.Exclamation:
        if (next === Character.Equal) {
          if (this.peek(this.offset + 2) === Character.Equal) {
            this.offset = this.offset + 3;  // "!=="
            this.tokenKind = TokenKind.IsNotIdentical;
          }
          else {
            this.offset = this.offset + 2;  // "!="
            this.tokenKind = TokenKind.IsNotEqual;
          }
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Exclamation;
        }
        return this.state;
      case Character.GreaterThan:
        if (next === Character.Equal) {
          this.offset = this.offset + 2;  // ">="
          this.tokenKind = TokenKind.IsGreaterThanOrEqual;
        }
        else if (next === Character.GreaterThan) {
          if (this.peek(this.offset + 2) === Character.Equal) {
            this.offset = this.offset + 3;  // ">>="
            this.tokenKind = TokenKind.ShiftRightEqual;
          }
          else {
            this.offset = this.offset + 2;  // ">>"
            this.tokenKind = TokenKind.ShiftRight;
          }
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.GreaterThan;
        }
        return this.state;
      case Character.LessThan:
        if (next === Character.Equal) {
          if (this.peek(this.offset + 2) === Character.GreaterThan) {
            this.offset = this.offset + 3;  // "<=>"
            this.tokenKind = TokenKind.Spaceship;
          }
          else {
            this.offset = this.offset + 2;  // "<="
            this.tokenKind = TokenKind.IsLessThanOrEqual;
          }
        }
        else if (next === Character.GreaterThan) {
          this.offset = this.offset + 2;  // "<>"
          this.tokenKind = TokenKind.Inequality;
        }
        else if (next === Character.LessThan) {
          if (this.peek(this.offset + 2) === Character.LessThan) {
            this.tryScanHeredoc(this.interpolations);
          }
          else if (this.peek(this.offset + 2) === Character.Equal) {
            this.offset = this.offset + 3;  // "<<="
            this.tokenKind = TokenKind.ShiftLeftEqual;
          }
          else {
            this.offset = this.offset + 2;  // "<<"
            this.tokenKind = TokenKind.ShiftLeft;
          }
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.LessThan;
        }
        return this.state;
      case Character.Minus:
        if (next === Character.GreaterThan) {
          this.offset = this.offset + 2;  // "->"
          this.tokenKind = TokenKind.ObjectOperator;
        }
        else if (next === Character.Minus) {
          this.offset = this.offset + 2;  // "--"
          this.tokenKind = TokenKind.Decrement;
        }
        else if (next === Character.Equal) {
          this.offset = this.offset + 2;  // "-="
          this.tokenKind = TokenKind.MinusEqual;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Minus;
        }
        return this.state;
      case Character.OpenParen:
        this.tryScanTypeCast();
        return this.state;
      case Character.Percent:
        if (next === Character.Equal) {
          this.offset = this.offset + 2;  // "%="
          this.tokenKind = TokenKind.ModEqual;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Percent;
        }
        return this.state;
      case Character.Period:
        if (CharacterInfo.isDigit(next)) {
          this.scanNumber();
          return this.state;
        }
        else if (next === Character.Equal) {
          this.offset = this.offset + 2;  // ".="
          this.tokenKind = TokenKind.ConcatEqual;
        }
        else if (next === Character.Period && this.peek(this.offset + 2) === Character.Period) {
          this.offset = this.offset + 3;  // "..."
          this.tokenKind = TokenKind.Ellipsis;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Period;
        }
        return this.state;
      case Character.Plus:
        if (next === Character.Plus) {
          this.offset = this.offset + 2;  // "++"
          this.tokenKind = TokenKind.Increment;
        }
        else if (next === Character.Equal) {
          this.offset = this.offset + 2;  // "+="
          this.tokenKind = TokenKind.PlusEqual;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Plus;
        }
        return this.state;
      case Character.Question:
        if (next === Character.GreaterThan) {
          this.offset = this.offset + 2;  // "?>"
          this.tokenKind = TokenKind.CloseTag;
          return this.state = PhpLexerState.InHostLanguage;
        }
        else if (next === Character.Question) {
          if (this.peek(this.offset + 2) === Character.Equal && this.phpVersion >= PhpVersion.PHP7_4) {
            this.offset = this.offset + 3;  // "??="
            this.tokenKind = TokenKind.CoalesceEqual;
          }
          else {
            this.offset = this.offset + 2;  // "??"
            this.tokenKind = TokenKind.Coalesce;
          }
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.Question;
        }
        return this.state;
      case Character.VerticalBar:
        if (next === Character.VerticalBar) {
          this.offset = this.offset + 2;  // "||"
          this.tokenKind = TokenKind.BooleanOr;
        }
        else if (next === Character.Equal) {
          this.offset = this.offset + 2;  // "|="
          this.tokenKind = TokenKind.OrEqual;
        }
        else {
          this.offset++;
          this.tokenKind = TokenKind.VerticalBar;
        }
        return this.state;

      // Numbers
      case Character._0:
        this.scanNumberWithPrefix();
        return this.state;
      case Character._1:
      case Character._2:
      case Character._3:
      case Character._4:
      case Character._5:
      case Character._6:
      case Character._7:
      case Character._8:
      case Character._9:
        this.scanNumber();
        return this.state;

      // Identifiers starting with extended characters.
      default:
        if (CharacterInfo.isIdentifierStart(ch, this.phpVersion)) {
          this.scanIdentifierOrKeyword();
          return this.state;
        }
        this.addError(0, 1, ErrorCode.ERR_UnexpectedCharacter, '0x' + ch.toString(16).toUpperCase(), this.text.substring(this.offset, 1));
        this.offset++;
        this.tokenKind = TokenKind.Error;
        return this.state;
    }
  }

  /**
   * Tokenizes the regions within a string template that are not part of an
   * interpolation.
   */
  protected lexString(): PhpLexerState {
    let ch = this.text.charCodeAt(this.offset);
    let next = this.peek(this.offset + 1);

    if (this.state === PhpLexerState.InDoubleQuote && ch === Character.DoubleQuote) {
      this.offset++;
      this.tokenKind = TokenKind.DoubleQuote;
      return this.state;
    }
    else if (this.state === PhpLexerState.InShellCommand && ch === Character.BackQuote) {
      this.offset++;
      this.tokenKind = TokenKind.BackQuote;
      return this.state;
    }

    switch (ch) {
      case Character.Dollar:
        // NOTE: Variables embedded within the quote should be part of
        // `InScript` spans and are not valid tokens in this state.
        if (next === Character.OpenBrace) {
          this.offset = this.offset + 2;  // "${"
          this.tokenKind = TokenKind.DollarOpenBrace;
        }
        else {
          this.offset++;
          this.scanStringTemplateLiteral();
          this.tokenKind = TokenKind.StringTemplateLiteral;
        }
        break;
      case Character.OpenBrace:
        this.offset++;
        if (next === Character.Dollar) {
          this.tokenKind = TokenKind.OpenBrace;
        }
        else {
          this.scanStringTemplateLiteral();
          this.tokenKind = TokenKind.StringTemplateLiteral;
        }
        break;
      case Character.Space:
      case Character.Tab:
        if (this.state === PhpLexerState.LookingForHeredocIndent) {
          this.state = PhpLexerState.InFlexibleHeredoc;
          let length = this.scanFlexdocIndent();
          if (length > 0) {
            this.tokenKind = TokenKind.StringIndent;
            break;
          }
        }
        this.scanStringTemplateLiteral();
        this.tokenKind = TokenKind.StringTemplateLiteral;
        break;
      case Character.CarriageReturn:
      case Character.LineFeed:
        if (this.state === PhpLexerState.InFlexibleHeredoc || this.state === PhpLexerState.LookingForHeredocIndent) {
          this.offset++;
          while (CharacterInfo.isLineBreak(this.text.charCodeAt(this.offset))) {
            this.offset++;
          }
          this.tokenKind = TokenKind.StringLineBreak;
          this.state = PhpLexerState.LookingForHeredocIndent;
        }
        else {
          this.scanStringTemplateLiteral();
          this.tokenKind = TokenKind.StringTemplateLiteral;
        }
        break;
      default:
        // @todo Assert that this length is greater than 0.
        this.scanStringTemplateLiteral();
        this.tokenKind = TokenKind.StringTemplateLiteral;
        break;
    }

    return this.state;
  }

  /**
   * Tokenizes an identifier found in a string template.
   *
   * This is slightly different than scanning outside of a string, because
   * keyword tokens are not permitted.
   */
  protected lexVariableName(): PhpLexerState {
    // This state only returns a single token, and can only be reached after a
    // string template has already been found to have an identifier, so there
    // isn't anything to actually check.
    this.offset++;
    this.scanIdentifierPart();
    this.tokenKind = TokenKind.StringIdentifier;
    return this.state = PhpLexerState.InScript;
  }

  /**
   * Tokenizes an element access offset found in a string template.
   */
  protected lexVariableOffset(): PhpLexerState {
    let ch = this.text.charCodeAt(this.offset);
    let next = this.peek(this.offset + 1);

    switch (ch) {
      // Numbers.
      case Character._0:
        if (next === Character.x && CharacterInfo.isHexDigit(this.peek(this.offset + 2))) {
          this.offset = this.offset + 2;
          this.scanHexDigits();
          this.tokenKind = TokenKind.StringNumber;
          break;
        }
        if (next === Character.b && CharacterInfo.isBinDigit(this.peek(this.offset + 2))) {
          this.offset = this.offset + 2;
          this.scanBinDigits();
          this.tokenKind = TokenKind.StringNumber;
          break;
        }
        // Fall through.
      case Character._1:
      case Character._2:
      case Character._3:
      case Character._4:
      case Character._5:
      case Character._6:
      case Character._7:
      case Character._8:
      case Character._9:
        this.scanNumberPart(CharacterInfo.isDigit);
        this.tokenKind = TokenKind.StringNumber;
        break;

      // Punctuation.
      case Character.CloseBracket:
        this.offset++;
        this.tokenKind = TokenKind.CloseBracket;
        break;
      case Character.Dollar:
        // In this state, only a variable is valid.
        this.offset = this.offset + 2;
        this.scanIdentifierPart();
        this.tokenKind = TokenKind.Variable;
        break;
      case Character.Minus:
        this.offset++;
        this.tokenKind = TokenKind.Minus;
        break;
      case Character.OpenBracket:
        this.offset++;
        this.tokenKind = TokenKind.OpenBracket;
        break;

      // Identifiers.
      default:
        // Debug.assert(CharacterInfo.isIdentifierStart(ch, this.phpVersion));
        this.offset++;
        this.scanIdentifierPart();
        this.tokenKind = TokenKind.Identifier;
        break;
    }

    return this.state;
  }

  /**
   * Scans the digits of a binary integer.
   */
  protected scanBinDigits(): number {
    const start = this.offset;

    // Skip leading zeroes.
    this.scanNumberPart(ch => ch === Character._0);

    // Allow a numeric separator between the zeros and trailing digits.
    if (this.offset - start > 0 && this.phpVersion >= PhpVersion.PHP7_4) {
      if (this.peek(this.offset) === Character.Underscore && CharacterInfo.isBinDigit(this.peek(this.offset + 1))) {
        this.offset++;
      }
    }

    // Significant digits.
    let part = this.scanNumberPart(CharacterInfo.isBinDigit);
    this.tokenKind = part[0] - part[1] < this.ptrSize * 8 ? TokenKind.LNumber : TokenKind.DNumber;
    return this.offset - start;
  }

  /**
   * Scans for the indent in a flexible heredoc.
   */
  protected scanFlexdocIndent(): number {
    const start = this.offset;

    let hasMismatchedIndentation = false;

    for (let i = 0; i < this.flexibleIndent.length; i++) {
      if (this.offset >= this.end) {
        throw new Exception('Missing end label');  // Unreachable.
      }

      let ch = this.text.charCodeAt(this.offset);
      if (ch !== this.flexibleIndent.charCodeAt(i)) {
        if (CharacterInfo.isLineBreak(ch)) {
          // Found an empty line.
          break;
        }
        else {
          // Either this is a space instead of a tab, a tab instead of a space,
          // or some other non-whitespace character. In the first two cases,
          // continue scanning the indent in order to prevent "indent expected"
          // errors when there is clearly whitespace present.
          hasMismatchedIndentation = true;

          // Found a line without enough indentation.
          if (!CharacterInfo.isWhitespace(ch)) {
            break;
          }
        }
      }

      this.offset++;
    }

    if (hasMismatchedIndentation && this.offset - start > 0) {
      this.addError(0, this.offset - start, ErrorCode.ERR_HeredocIndentMismatch);
    }

    return this.offset - start;
  }

  /**
   * Scans the indentation of the end label in a flexdoc template.
   */
  protected scanHeredocEndLabelIndent(): number {
    const start = this.offset;

    let hasSpaces = false;
    let hasTabs = false;

    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      if (ch === Character.Space) {
        hasSpaces = true;
      }
      else if (ch === Character.Tab) {
        hasTabs = true;
      }
      else {
        break;
      }
      this.offset++;
    }

    if (hasSpaces && hasTabs) {
      this.addError(0, this.offset - start, ErrorCode.ERR_HeredocIndentHasSpacesAndTabs);
    }

    return this.offset - start;
  }

  /**
   * Scans the digits of a hexadecimal integer.
   */
  protected scanHexDigits(): number {
    const start = this.offset;

    // Skip leading zeroes.
    this.scanNumberPart(ch => ch === Character._0);

    // Allow a numeric separator between the zeros and trailing digits.
    if (this.offset - start > 0 && this.phpVersion >= PhpVersion.PHP7_4) {
      if (this.peek(this.offset) === Character.Underscore && CharacterInfo.isHexDigit(this.peek(this.offset + 1))) {
        this.offset++;
      }
    }

    // Significant digits.
    let digitStart = this.offset;
    let part = this.scanNumberPart(CharacterInfo.isHexDigit);

    let digitLength = part[0] - part[1];
    if (digitLength < this.ptrSize * 2 || (digitLength === this.ptrSize * 2 && this.peek(digitStart) <= Character._7)) {
      this.tokenKind = TokenKind.LNumber;
    }
    else {
      this.tokenKind = TokenKind.DNumber;
    }
    return this.offset - start;
  }

  /**
   * Scans an identifier and determines if it is a keyword.
   */
  protected scanIdentifierOrKeyword(): number {
    const start = this.offset;

    let hasUnderscore = this.text.charCodeAt(this.offset) === Character.Underscore;
    this.offset++;

    // Equivalent to scanIdentifierPart() but keeps track of underscores.
    while (this.offset < this.end) {
      const ch = this.text.charCodeAt(this.offset);
      if (!CharacterInfo.isIdentifierPart(ch, this.phpVersion)) {
        break;
      }
      if (ch === Character.Underscore) {
        hasUnderscore = true;
      }
      this.offset++;
    }

    // If the identifier is too long, then it's not a keyword.
    if ((!hasUnderscore && this.offset - start > 10) || (hasUnderscore && this.offset - start > 15)) {
      this.tokenKind = TokenKind.Identifier;
    }
    else {
      this.tokenKind = this.textToIdentifierToken();
    }

    // Ideally "yield from" would only be valid with a single space, but
    // someone decided to make it a special snowflake...
    if (this.tokenKind === TokenKind.Yield && CharacterInfo.isWhitespaceLike(this.peek(this.offset))) {
      const yieldEnd = this.offset;
      while (this.offset < this.end) {
        const ch = this.text.charCodeAt(this.offset);
        if (!CharacterInfo.isWhitespaceLike(ch)) {
          break;
        }
        this.offset++;
      }
      if (this.startsWith('from') && !CharacterInfo.isIdentifierPart(this.peek(this.offset + 4), this.phpVersion)) {
        this.offset = this.offset + 4;
        this.tokenKind = TokenKind.YieldFrom;
      }
      else {
        this.offset = yieldEnd;
      }
    }

    return this.offset - start;
  }

  /**
   * Scans for additional characters that may be part of an identifer name.
   */
  protected scanIdentifierPart(): number {
    const start = this.offset;
    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      if (!CharacterInfo.isIdentifierPart(ch, this.phpVersion)) {
        break;
      }
      this.offset++;
    }
    return this.offset - start;
  }

  /**
   * Scans inline text within an interpolated string.
   */
  protected scanInterpolatedInlineText(): number {
    const start = this.offset;
    while(this.offset < this.end) {
      if (this.tryScanOpenTag()) {
        break;
      }
      this.offset++;
    }
    return this.offset - start;
  }

  /**
   * Scans any PHP script within an interpolated string.
   */
  protected scanInterpolatedScript(delimiter: Character): number {
    const start = this.offset;

    // In order to find the closing terminator of an interpolated string, the
    // embedded script must end. That is done by close braces and close tags,
    // but it is not as simple as scanning for those tokens because while in a
    // script the following conditions apply:
    // 1. Open braces and interpolated strings may create additional embedded
    //    lexing states which must end before returning to the original string.
    //    This is handled by recursively calling the relevant scanning methods.
    // 2. User-defined tokens may contain the characters being searched for. The
    //    possible tokens, constant strings and comments, are handled by simply
    //    scanning them normally when they are found.
    // 3. Close tags always start the host language state, which may in turn
    //    restart the script state, resulting in a loop.

    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      switch (ch) {
        // Delimiters.
        case Character.CloseBrace:
        case Character.CloseBracket:
        case Character.CloseParen:
          this.offset++;
          if (ch === delimiter) {
            return this.offset - start;
          }
          break;
        case Character.OpenBrace:
          this.offset++;  // "{"
          this.scanInterpolatedScript(Character.CloseBrace);
          break;
        case Character.OpenBracket:
          this.offset++;  // "["
          // @todo Experimental.
          // this.scanInterpolatedScript(Character.CloseBracket);
          break;
        case Character.OpenParen:
          this.offset++;  // "("
          // @todo Experimental.
          // this.scanInterpolatedScript(Character.CloseParen);
          break;

        // Strings.
        case Character.BackQuote:
          this.offset++;
          this.scanInterpolatedString(Character.BackQuote);
          if (this.peek(this.offset) === Character.BackQuote) {
            this.offset++;
          }
          break;
        case Character.DoubleQuote:
          this.offset++;
          this.scanInterpolatedString(Character.DoubleQuote);
          if (this.peek(this.offset) === Character.DoubleQuote) {
            this.offset++;
          }
          break;
        case Character.LessThan:
          if (this.peek(this.offset + 1) === Character.LessThan && this.peek(this.offset + 2) === Character.LessThan) {
            let info = this.tryScanHeredocStartLabel();
            if (info) {
              this.scanInterpolatedString(info.label);
              if (this.isHeredocEnd(info.label)) {
                this.scanWhitespace();
                this.offset = this.offset + info.label.length;
              }
              break;
            }
          }
          this.offset++;
          break;
        case Character.SingleQuote:
          this.offset++;
          this.scanSingleQuoteString();
          if (this.peek(this.offset) === Character.SingleQuote) {
            this.offset++;
          }
          break;

        // Comments.
        case Character.Hash:
            this.offset++;
            this.scanLineComment();
            break;
        case Character.Slash:
          if (this.peek(this.offset + 1) === Character.Slash) {
            this.offset = this.offset + 2;  // "//"
            this.scanLineComment();
          }
          else if (this.peek(this.offset + 1) === Character.Asterisk) {
            this.offset = this.offset + 2;  // "/*"
            this.scanMultipleLineComment();
            if (this.peek(this.offset) === Character.Asterisk && this.peek(this.offset + 1) === Character.Slash) {
              this.offset = this.offset + 2;  // "*/"
            }
          }
          else {
            this.offset++;
          }
          break;

        // Close tag.
        case Character.Question:
          if (this.peek(this.offset + 1) === Character.GreaterThan) {
            this.offset = this.offset + 2; // "?>"

            // Inline text only terminates at the end of the file or at an open
            // tag. In the first case, this loop will terminate as well, and in
            // the second case, just resume scanning the script normally.
            this.scanInterpolatedInlineText();
          }
          else {
            this.offset++;  // "?"
          }
          break;

        // Embedded code.
        default:
          this.offset++;
          break;
      }
    }

    return this.offset - start;
  }

  /**
   * Scans the contents of a possible interpolated string.
   *
   * @param {Character|string} delimiter
   *   A closing quote or label used to delimit a heredoc or nowdoc string.
   * @param {TemplateSpan[]=} spans
   *   An array to store any scanned interpolations within the string.
   * @param {number=} startLength
   *   The length of the string's starting token. For heredoc and nowdoc
   *   strings this length includes the '<<<' operator, whitespace, and
   *   optional quotation marks. For other strings, this is simply the length
   *   of the quote character.
   *
   * @return {number}
   *   The length of the interpolated string (not including the string
   *   terminator).
   *
   * State transitions for interpolated strings:
   *
   * InDoubleQuote
   * Input        Token              Transition
   * "$LABEL"     T_VARIABLE         Continue
   * "$LABEL["    T_VARIABLE         Start InVariableOffset
   * "$LABEL->*"  T_VARIABLE         Start LookingForProperty
   * "${"         T_DOLLAR_OPEN_...  Start LookingForVariableName
   * "{$"         "{"                Start InScript
   * "\""         "\""               End current state
   * "ANY"        T_ENCAPSED_AND...  Continue
   *
   * LookingForVariableName
   * Input        Token              Transition
   * "LABEL["     T_STRING_VARNAME   End current state, Start InScript
   * "LABEL}"     T_STRING_VARNAME   End current state, Start InScript
   * "ANY"        ---                End current state, Start Inscript
   *
   * LookingForProperty
   * Input        Token              Transition
   * "\s"         T_WHITESPACE       Continue
   * "->"         T_OBJECT_OPERATOR  Continue
   * "LABEL"      T_STRING           End current state
   * "ANY"        ---                End current state
   *
   * InVariableOffset
   * Input        Token              Transition         Remarks
   * "\d"         T_NUM_STRING       Continue           Also includes 0x and 0b numbers.
   * "LABEL"      T_STRING           Continue
   * "$LABEL"     T_VARIABLE         Continue
   * "TOKEN"      "TOKEN"            Continue           Also includes '{', '}', '"', '`'.
   * "]"          "]"                End current state
   * "\s"         T_ENCAPSED_AND...  End current state  Also includes '\\', '\'', and '#'.
   * "ANY"        ---                Throw
   */
  protected scanInterpolatedString(delimiter: Character | string, spans: TemplateSpan[] = [], startLength?: number): number {
    const start = this.offset;
    const tokenOffset = start - (startLength ? startLength : 1);

    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      let next = this.peek(this.offset + 1);

      let spanOffset: number;

      switch (ch) {
        case Character.BackQuote:
          if (delimiter === Character.BackQuote) {
            return this.offset - start;
          }
          this.offset++;
          break;
        case Character.Backslash:
          // Escape sequence.
          this.offset++;
          if (CharacterInfo.isDoubleQuoteEscape(next)) {
            this.offset++;
          }
          else if (next === Character.u) {
            this.offset++;
            this.scanUnicodeEscape();
          }
          else {
            this.scanOctalEscape();
          }
          break;
        case Character.Dollar:
          if (next === Character.OpenBrace) {
            this.offset = this.offset + 2;  // "${"

            spanOffset = this.offset;
            if (this.tryScanInterpolatedVariableName()) {
              spans.push(new TemplateSpan(PhpLexerState.LookingForVariableName, spanOffset - tokenOffset, this.offset - spanOffset));
              spanOffset = this.offset;
            }

            this.scanInterpolatedScript(Character.CloseBrace);
            spans.push(new TemplateSpan(PhpLexerState.InScript, spanOffset - tokenOffset, this.offset - spanOffset));
          }
          else if (CharacterInfo.isIdentifierStart(next, this.phpVersion)) {
            spanOffset = this.offset;
            this.offset = this.offset + 2;  // "$a"
            this.scanIdentifierPart();

            if (this.startsWithObjectProperty()) {
              this.offset = this.offset + 3;
              this.scanIdentifierPart();
              spans.push(new TemplateSpan(PhpLexerState.InScript, spanOffset - tokenOffset, this.offset - spanOffset));
            }
            else if (this.peek(this.offset) === Character.OpenBracket) {
              // Since simple variables need a span anyways, adding one here as
              // well means that no additional logic is required to rescan
              // variables in a template.
              spans.push(new TemplateSpan(PhpLexerState.InScript, spanOffset - tokenOffset, this.offset - spanOffset));

              spanOffset = this.offset;
              this.scanInterpolatedVariableOffset();  // "$a["
              spans.push(new TemplateSpan(PhpLexerState.InVariableOffset, spanOffset - tokenOffset, this.offset - spanOffset));
            }
            else {
              // Normally, variables would be tokenized without leaving the
              // `InDoubleQuote` state, however while tokenizing a script, a span
              // needs to be added in order to let the caller know that this is
              // not a constant string (i.e. a `StringLiteral`).
              spans.push(new TemplateSpan(PhpLexerState.InScript, spanOffset - tokenOffset, this.offset - spanOffset));
            }
          }
          else {
            this.offset++;  // "$"
          }
          break;
        case Character.DoubleQuote:
          if (delimiter === Character.DoubleQuote) {
            return this.offset - start;
          }
          this.offset++;
          break;
        case Character.OpenBrace:
          this.offset++;  // "{"
          if (next === Character.Dollar) {
            spanOffset = this.offset;
            this.scanInterpolatedScript(Character.CloseBrace);
            spans.push(new TemplateSpan(PhpLexerState.InScript, spanOffset - tokenOffset, this.offset - spanOffset));
          }
          break;
        case Character.CarriageReturn:
          if (next === Character.LineFeed) {
            this.offset++;
          }
          // Fall through.
        case Character.LineFeed:
          this.offset++;
          if (typeof delimiter === 'string' && this.isHeredocEnd(delimiter)) {
            return this.offset - start;
          }
          break;
        default:
          this.offset++;
          break;
      }
    }

    return this.offset - start;
  }

  /**
   * Scans the offset of an interpolated variable.
   *
   * Unlike PHP's implementation which also attempts to lex a variety of
   * invalid tokens, this method only scans for a sequence of characters that
   * result in a valid production. This has several benefits:
   *
   * - The lexer doesn't have to try and tokenize a bunch of garbage.
   * - Invalid characters don't become uncacheable skipped tokens, which
   *   results in a faster parse and fewer objects being created.
   * - The lexer can immediately go back to scanning the string, which makes it
   *   much more likely to produce the desired tokens (PHP doesn't even try to
   *   recover gracefully).
   */
  protected scanInterpolatedVariableOffset(): number {
    const start = this.offset;

    this.offset++;  // "["

    let ch = this.peek(this.offset);
    let next = this.peek(this.offset + 1);

    if (ch === Character.Minus || CharacterInfo.isDigit(ch)) {
      if (ch === Character.Minus) {
        this.offset++;  // "-"
      }
      switch (this.peek(this.offset)) {
        case Character._0:
          if (this.peek(this.offset + 1) === Character.x && CharacterInfo.isHexDigit(this.peek(this.offset + 2))) {
            this.offset = this.offset + 2;
            this.scanHexDigits();
            break;
          }
          else if (this.peek(this.offset + 1) === Character.b && CharacterInfo.isBinDigit(this.peek(this.offset + 2))) {
            this.offset = this.offset + 2;
            this.scanBinDigits();
            break;
          }
          // Fall through.
        case Character._1:
        case Character._2:
        case Character._3:
        case Character._4:
        case Character._5:
        case Character._6:
        case Character._7:
        case Character._8:
        case Character._9:
          // Only integers are allowed, so only do the first part of scanNumber().
          this.scanNumberPart(CharacterInfo.isDigit);
          break;
      }
    }
    else if (ch === Character.Dollar) {
      if (CharacterInfo.isIdentifierStart(next)) {
        this.offset = this.offset + 2;
        this.scanIdentifierPart();
      }
    }
    else if (CharacterInfo.isIdentifierStart(ch)) {
      this.offset++;
      this.scanIdentifierPart();
    }

    if (this.peek(this.offset) === Character.CloseBracket) {
      this.offset++;
    }

    return this.offset - start;
  }

  /**
   * Scans the remaining portion of a line comment until a line break or close
   * tag is found.
   */
  protected scanLineComment(/* ignoreCloseTag = false */): number {
    const commentStart = this.offset;

    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      if (ch === Character.CarriageReturn || ch === Character.LineFeed) {
        break;
      }
      if (ch === Character.Question && this.peek(this.offset + 1) === Character.GreaterThan) {
        break;
      }
      this.offset++;
    }

    return this.offset - commentStart;
  }

  /**
   * Scans the remaining portion of a multiple-line comment.
   */
  protected scanMultipleLineComment(): number {
    const commentStart = this.offset;

    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      if (ch === Character.Asterisk && this.peek(this.offset + 1) === Character.Slash) {
        break;
      }
      this.offset++;
    }

    return this.offset - commentStart;
  }

  /**
   * Scans the remaining portion of a nowdoc until the end label is found.
   */
  protected scanNowdoc(label: string): number {
    const start = this.offset;

    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      switch (ch) {
        case Character.CarriageReturn:
          if (this.peek(this.offset + 1) === Character.LineFeed) {
            this.offset++;
          }
          // Fall through.
        case Character.LineFeed:
          this.offset++;
          if (this.isHeredocEnd(label)) {
            return this.offset - start;
          }
          break;
        default:
          this.offset++;
          break;
      }
    }

    return this.offset - start;
  }

  /**
   * Scans for constant text within a nowdoc string.
   */
  protected scanNowdocString(): number {
    const start = this.offset;
    while (this.offset < this.end) {
      if (CharacterInfo.isLineBreak(this.text.charCodeAt(this.offset))) {
        break;
      }
      this.offset++;
    }
    return this.offset - start;
  }

  /**
   * Scans a decimal integer or floating-point number.
   *
   * A long consists of:
   * - One or more digits.
   *
   * A double consists of:
   * - Zero or more digits followed by a decimal point and one or more digits.
   * - One or more digits followed by a decimal point and zero or more digits.
   *
   * A double with exponent consists of:
   * - A long or double followed by 'e' or 'E', then an optional '+' or '-', and
   *   finally a long.
   */
  protected scanNumber(): number {
    const start = this.offset;

    // Integer part.
    this.scanNumberPart(CharacterInfo.isDigit);

    // Fractional part.
    let isDouble = false;
    if (this.peek(this.offset) === Character.Period) {
      isDouble = true;
      this.offset++;
      this.scanNumberPart(CharacterInfo.isDigit);
    }

    let exponentStart = this.offset;
    let ch = this.peek(this.offset);
    if (ch === Character.e || ch === Character.E) {
      this.offset++;

      ch = this.peek(this.offset);
      if (ch === Character.Minus || ch === Character.Plus) {
        this.offset++;
      }

      ch = this.peek(this.offset);
      if (CharacterInfo.isDigit(ch)) {
        isDouble = true;
        this.scanNumberPart(CharacterInfo.isDigit);
      }
      else {
        // Found 'e' but no number.
        this.offset = exponentStart;
      }
    }

    this.tokenKind = isDouble ? TokenKind.DNumber : TokenKind.LNumber;
    return this.offset - start;
  }

  /**
   * Scans for the digits of a number.
   *
   * @param {(ch: number) => boolean} predicate
   *   A callback used to determine what characters are valid digits in the
   *   number.
   *
   * @returns A tuple containing the total length of the scanned digits, and
   *   how many separators were present.
   */
  protected scanNumberPart(predicate: (ch: number) => boolean): [number, number] {
    const start = this.offset;

    while (this.offset < this.end && predicate(this.text.charCodeAt(this.offset))) {
      this.offset++;
    }

    let separatorCount = 0;
    if (this.offset - start > 0 && this.phpVersion >= PhpVersion.PHP7_4) {
      while (this.peek(this.offset) === Character.Underscore && predicate(this.peek(this.offset + 1))) {
        this.offset++;  // "_"
        separatorCount++;
        while (this.offset < this.end && predicate(this.text.charCodeAt(this.offset))) {
          this.offset++;
        }
      }
    }

    return [this.offset - start, separatorCount];
  }

  /**
   * Scans a hexadecimal or binary number. If not found, a decimal
   * or octal number is scanned instead.
   */
  protected scanNumberWithPrefix(): number {
    const start = this.offset;

    let length = 0;
    if (this.peek(this.offset + 1) === Character.x) {
      this.offset = this.offset + 2;  // "0x"
      length = this.scanHexDigits();
    }
    else if (this.peek(this.offset + 1) === Character.b) {
      this.offset = this.offset + 2;  // "0b"
      length = this.scanBinDigits();
    }
    else {
      return this.scanNumber();
    }

    if (length === 0) {
      // There are no productions where a number can be followed by an identifier.
      //
      // It is also much more likely that the user intends on adding digits after
      // a valid prefix, instead of deleting the letter or going back and adding
      // some other token inbetween the two characters:
      //
      //   if ($x == 0x) {
      //             ~~     // Error: Invalid numeric literal.
      //
      // Normally, the above example would generate two tokens, but leaving it as
      // a single token results in the same error and less work for the parser.

      this.addError(0, 2, ErrorCode.ERR_InvalidNumber);
      this.tokenKind = TokenKind.LNumber;
    }

    return this.offset - start;
  }

  /**
   * Scans for an octal escape sequence.
   */
  protected scanOctalEscape(): number {
    const start = this.offset;

    let firstDigit = this.peek(this.offset);
    if (!CharacterInfo.isOctDigit(firstDigit)) {
      return 0;
    }

    this.offset++;

    let i = 0;
    while (this.offset < this.end && i < 2) {
      let ch = this.text.charCodeAt(this.offset);
      if (!CharacterInfo.isOctDigit(ch)) {
        return this.offset - start;
      }
      // Max: 255 = 0xFF = \377
      if (i === 1 && firstDigit > Character._3) {
        this.addError(start - this.tokenStart - 1, i + 3, ErrorCode.WRN_OctalEscapeSequenceOverflow);
      }
      this.offset++;
      i++;
    }

    return this.offset - start;
  }

  /**
   * Scans the contents of a constant string.
   */
  protected scanSingleQuoteString(): number {
    const start = this.offset;

    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      if (ch === Character.SingleQuote) {
        break;
      }
      else if (ch === Character.Backslash && this.offset + 1 < this.end) {
        this.offset = this.offset + 2;
      }
      else {
        this.offset++;
      }
    }

    return this.offset - start;
  }

  /**
   * Scans for constant text within a string template.
   */
  protected scanStringTemplateLiteral(): number {
    const start = this.offset;

    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      let next = this.peek(this.offset + 1);

      // String terminators.
      if (this.state === PhpLexerState.InDoubleQuote && ch === Character.DoubleQuote) {
        break;
      }
      else if (this.state === PhpLexerState.InShellCommand && ch === Character.BackQuote) {
        break;
      }

      // End of constant text.
      if (ch === Character.Dollar && (next === Character.OpenBrace || CharacterInfo.isIdentifierStart(next, this.phpVersion))) {
        break;
      }
      else if (ch === Character.OpenBrace && next === Character.Dollar) {
        break;
      }
      else if ((this.state === PhpLexerState.InFlexibleHeredoc || this.state === PhpLexerState.LookingForHeredocIndent) && CharacterInfo.isLineBreak(ch)) {
        break;
      }

      if (ch === Character.Backslash && CharacterInfo.isDoubleQuoteEscape(next)) {
        this.offset++;
      }

      this.offset++;
    }

    return this.offset - start;
  }

  /**
   * Scans for a unicode escape sequence.
   */
  protected scanUnicodeEscape(): number {
    const start = this.offset;

    let ch = this.peek(this.offset);

    // JSON-serialized strings are silently ignored since they may contain
    // unicode escape sequences that do not follow the PHP format.
    if (ch !== Character.OpenBrace) {
      return 0;
    }

    this.offset++;  // "{"

    while (this.offset < this.end) {
      ch = this.text.charCodeAt(this.offset);
      if (ch === Character.CloseBrace) {
        break;
      }
      if (!CharacterInfo.isHexDigit(ch)) {
        this.addError(start - this.tokenStart - 2, this.offset - start + 2, ErrorCode.ERR_UnterminatedUnicodeEscapeSequence);
        return this.offset - start;
      }
      this.offset++;
    }

    // A unicode escape sequence cannot be empty.
    let length = this.offset - start - 1;
    if (length === 0) {
      this.addError(start - this.tokenStart - 2, 4, ErrorCode.ERR_InvalidEscapeSequenceUnicode);
      return this.offset - start;
    }

    if (Number.parseInt(this.text.substring(start + 1, length), 16) > 0x10FFFF) {
      this.addError(start - this.tokenStart - 2, length + 4, ErrorCode.ERR_UnicodeEscapeSequenceOverflow);
    }

    return this.offset - start;
  }

  /**
   * Scans any remaining whitespace characters.
   */
  protected scanWhitespace(): number {
    const start = this.offset;

    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      if (!CharacterInfo.isWhitespace(ch)) {
        break;
      }
      this.offset++;
    }

    return this.offset - start;
  }

  /**
   * Determines if an object operator and property name are present at the
   * scanner's current location.
   */
  protected startsWithObjectProperty(): boolean {
    if (this.offset + 3 > this.end) {
      return false;
    }
    return this.text.charCodeAt(this.offset) === Character.Minus &&
      this.text.charCodeAt(this.offset + 1) === Character.GreaterThan &&
      CharacterInfo.isIdentifierStart(this.text.charCodeAt(this.offset + 2), this.phpVersion);
  }

  /**
   * Returns a keyword or identifier token for the scanned text.
   */
  protected textToIdentifierToken(): TokenKind {
    const tokenText = this.text.substring(this.tokenStart, this.offset - this.tokenStart).toLowerCase();
    const keyword = PhpLexer.KeywordTokens.get(tokenText);
    if (keyword !== undefined) {
      // Backward compatibility: Am I a joke to you?
      if (tokenText === 'fn' && this.phpVersion < PhpVersion.PHP7_4) {
        return TokenKind.Identifier;
      }
      return keyword;
    }
    return TokenKind.Identifier;
  }

  /**
   * Attempts to scan for a heredoc or nowdoc string. If not found, a left
   * shift token is scanned instead.
   */
  protected tryScanHeredoc(spans: TemplateSpan[]): number {
    const start = this.offset;

    let info = this.tryScanHeredocStartLabel();
    if (info !== null) {
      spans.length = 0;  // Need to modify the existing array.

      // The starting label consumes a trailing new line, so for an empty
      // string, the search for an ending label would never be triggered.
      if (this.isHeredocEnd(info.label)) {
        this.tokenKind = CharacterInfo.isWhitespace(this.text.charCodeAt(this.offset))
          ? TokenKind.FlexdocTemplate : TokenKind.HeredocTemplate;

        let labelStart = this.offset - start;
        let indentLength = this.scanWhitespace();
        this.offset = this.offset + info.label.length;

        spans.push(new TemplateSpan(PhpLexerState.LookingForHeredocLabel, labelStart, indentLength + info.label.length));
        return this.offset - start;
      }

      if (info.isNowdoc) {
        this.scanNowdoc(info.label);
      }
      else {
        this.scanInterpolatedString(info.label, spans, info.fullLength);
      }

      if (this.isHeredocEnd(info.label)) {
        this.tokenKind = CharacterInfo.isWhitespace(this.text.charCodeAt(this.offset))
          ? TokenKind.FlexdocTemplate : TokenKind.HeredocTemplate;

        let labelStart = this.offset - start;
        let indentLength = this.scanWhitespace();
        this.offset = this.offset + info.label.length;

        spans.push(new TemplateSpan(PhpLexerState.LookingForHeredocLabel, labelStart, indentLength + info.label.length));
      }
      else {
        this.addError(0, this.offset - start, info.isNowdoc ? ErrorCode.ERR_UnterminatedStringConstant : ErrorCode.ERR_UnterminatedString);
        this.tokenKind = TokenKind.HeredocTemplate;
      }
    }
    else {
      // Starting label not found.
      this.offset = this.offset + 2;
      this.tokenKind = TokenKind.ShiftLeft;
    }

    return this.offset - start;
  }

  /**
   * Attempts to scan for a variable name in a string template that uses "${}"
   * syntax to explicity specify the name. If not found, nothing is scanned.
   */
  protected tryScanInterpolatedVariableName(): number {
    const start = this.offset;

    let ch = this.peek(this.offset);
    if (CharacterInfo.isIdentifierStart(ch, this.phpVersion)) {
      this.offset++;
      this.scanIdentifierPart();

      ch = this.peek(this.offset);
      if (ch === Character.OpenBracket || ch === Character.CloseBrace) {
        return this.offset - start;
      }
    }

    this.offset = start;
    return 0;
  }

  /**
   * Attempts to scan for a PHP script opening tag. If not found, nothing is
   * scanned.
   */
  protected tryScanOpenTag(): number {
    const start = this.offset;
    if (this.peek(this.offset) === Character.LessThan) {
      if (this.peek(this.offset + 1) === Character.Question) {
        this.offset = this.offset + 2;  // "<?"
        if (this.peek(this.offset) === Character.Equal) {
          this.offset++;
        }
        else if (this.allowShortOpen) {
          // Nothing to do except take precedence over the full open tag. This
          // is technically a bug in PHP since the lexer should be greedy.
        }
        else if (this.startsWith('php')) {
          if (CharacterInfo.isWhitespaceLike(this.peek(this.offset + 3))) {
            this.offset = this.offset + 3;
          }
          else if (this.offset + 3 === this.end && this.phpVersion >= PhpVersion.PHP7_4) {
            this.offset = this.offset + 3;
          }
          else {
            // Partial match, not an open tag.
            this.offset = start;
          }
        }
        else {
          this.offset = start;
        }
      }
    }
    return this.offset - start;
  }

  /**
   * Attempts to scan a full type cast token. If not found, only the opening
   * parenthesis is scanned instead.
   *
   * @todo Disabled optimization: Unsupported phi use of const or let variable.
   */
  protected tryScanTypeCast(): number {
    const castStart = this.offset;

    this.offset++;
    this.scanWhitespace();

    const typeStart = this.offset;
    while (this.offset < this.end) {
      let ch = this.text.charCodeAt(this.offset);
      if ((ch >= Character.a && ch <= Character.z) || (ch >= Character.A && ch <= Character.Z)) {
        this.offset++;
      }
      else {
        break;
      }

      // Max length of a cast is 7 (tied between 'boolean' and 'integer'), save
      // time and end early if there are too many characters.
      if (this.offset - typeStart === 8) {
        this.offset = castStart + 1;
        this.tokenKind = TokenKind.OpenParen;
        return 1;
      }
    }

    // Cast types are between 3 and 7 characters inclusive.
    let length = this.offset - typeStart;
    if (length >= 3) {
      this.scanWhitespace();
      // It's still not a cast until we get a closing parenthesis.
      if (this.peek(this.offset) === Character.CloseParen) {
        let type = this.text.substring(typeStart, length).toLowerCase();
        if (PhpLexer.CastTokens.has(type)) {
          this.offset++;  // ")"
          // Suppress TS2322: Result cannot be undefined due to if-condition.
          this.tokenKind = <TokenKind>PhpLexer.CastTokens.get(type);
          return this.offset - castStart;
        }
      }
    }

    // Not found.
    this.offset = castStart + 1;
    this.tokenKind = TokenKind.OpenParen;
    return 1;
  }

  /**
   * Attempts to scan for the opening label or a heredoc string. If not found,
   * nothing is scanned.
   */
  private tryScanHeredocStartLabel(): HeredocLabelInfo | null {
    const start = this.offset;

    this.offset = this.offset + 3;  // "<<<"

    // Skip leading tabs and spaces after the operator.
    this.scanWhitespace();

    let quoteCh = 0;

    // Optional opening quote.
    let ch = this.peek(this.offset);
    if (ch === Character.DoubleQuote || ch === Character.SingleQuote) {
      quoteCh = ch;
      this.offset++;
    }

    const labelStart = this.offset;
    let label: string;

    // Label.
    ch = this.peek(this.offset);
    if (!CharacterInfo.isIdentifierStart(ch, this.phpVersion)) {
      this.offset = start;
      return null;
    }

    this.offset++;
    this.scanIdentifierPart();

    // Closing quote.
    if (quoteCh) {
      if (this.peek(this.offset) !== quoteCh) {
        this.offset = start;
        return null;
      }
      label = this.text.substring(labelStart, this.offset - labelStart);
      this.offset++;
    }
    else {
      label = this.text.substring(labelStart, this.offset - labelStart);
    }

    // A line break after the label is required as well.
    ch = this.peek(this.offset);
    if (ch === Character.CarriageReturn) {
      this.offset++;
      // PHP does NOT require a well-formed CRLF here.
      if (this.peek(this.offset) === Character.LineFeed) {
        this.offset++;
      }
    }
    else if (ch === Character.LineFeed) {
      this.offset++;
    }
    else {
      // Missing line break, not a heredoc label.
      this.offset = start;
      return null;
    }

    return new HeredocLabelInfo(label, this.offset - start, quoteCh === Character.SingleQuote);
  }

}
