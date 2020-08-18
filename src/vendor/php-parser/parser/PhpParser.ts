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

import { Debug } from '@mattacosta/php-common';

import {
  AnonymousClassNode,
  AnonymousFunctionNode,
  AnonymousObjectCreationNode,
  ArgumentNode,
  ArrayElementNode,
  ArrayNode,
  ArrowFunctionNode,
  AssignmentNode,
  BinaryNode,
  BreakNode,
  ClassConstantDeclarationNode,
  ClassConstantElementNode,
  ClassConstantNode,
  ClassDeclarationNode,
  CloneNode,
  ClosureUseNode,
  ConditionalNode,
  ConstantDeclarationNode,
  ConstantElementNode,
  ConstantNode,
  ContinueNode,
  DeclareBlockNode,
  DeclareNode,
  DestructuringAssignmentNode,
  DoWhileNode,
  EchoNode,
  ElementAccessNode,
  ElseBlockNode,
  ElseIfBlockNode,
  ElseIfNode,
  ElseNode,
  EmptyIntrinsicNode,
  ErrorControlNode,
  EvalIntrinsicNode,
  ExitIntrinsicNode,
  ExpressionGroupNode,
  ExpressionNode,
  ExpressionStatementNode,
  FlexibleHeredocElementNode,
  FlexibleHeredocTemplateNode,
  ForBlockNode,
  ForEachBlockNode,
  ForEachNode,
  ForNode,
  FullyQualifiedNameNode,
  FunctionDeclarationNode,
  FunctionInvocationNode,
  GlobalNode,
  GoToNode,
  HaltCompilerNode,
  HeredocTemplateNode,
  IfBlockNode,
  IfNode,
  IncompleteMemberNode,
  IncompleteNamedTraitAdaptationNode,
  IncompleteReferencedTraitAdaptationNode,
  IndirectMemberAccessNode,
  IndirectMethodInvocationNode,
  IndirectObjectCreationNode,
  IndirectScopedInvocationNode,
  IndirectStringVariableNode,
  IndirectVariableNode,
  InstanceOfNode,
  InterfaceDeclarationNode,
  IsSetIntrinsicNode,
  LabelNode,
  LexicalVariableNode,
  ListDestructureElementNode,
  ListDestructureNode,
  LiteralNode,
  LocalVariableNode,
  MemberAccessNode,
  MemberInvocationNode,
  MethodDeclarationNode,
  MethodReferenceNode,
  NamedMemberAccessNode,
  NamedMethodInvocationNode,
  NamedObjectCreationNode,
  NamedScopedInvocationNode,
  NamedTraitAliasNode,
  NamedTypeNode,
  NameNode,
  NamespaceDeclarationNode,
  NamespaceGroupDeclarationNode,
  ObjectCreationNode,
  ParameterNode,
  PartiallyQualifiedNameNode,
  PostfixUnaryNode,
  PredefinedTypeNode,
  PrintIntrinsicNode,
  PropertyDeclarationNode,
  PropertyElementNode,
  ReferencedTraitAliasNode,
  RelativeNameNode,
  ReturnNode,
  ScriptInclusionNode,
  ShellCommandTemplateNode,
  StatementBlockNode,
  StatementNode,
  StaticElementNode,
  StaticNode,
  StaticPropertyNode,
  StringElementAccessNode,
  StringExpressionNode,
  StringTemplateNode,
  StringVariableNode,
  SwitchBlockNode,
  SwitchCaseNode,
  SwitchNode,
  ThrowNode,
  TraitAliasNode,
  TraitDeclarationNode,
  TraitPrecedenceNode,
  TraitUseGroupNode,
  TraitUseNode,
  TryCatchNode,
  TryFinallyNode,
  TryNode,
  UnaryNode,
  UnsetNode,
  UseDeclarationNode,
  UseElementNode,
  UseGroupDeclarationNode,
  VariableNode,
  WhileBlockNode,
  WhileNode,
  YieldFromNode,
  YieldNode,
} from '../language/node/Node.Generated';
import { ErrorCode } from '../diagnostics/ErrorCode.Generated';
import { ExpressionType } from './ExpressionType';
import { INode } from '../language/node/INode';
import { IParser, ParserException } from './Parser';
import { ModifierFlags } from './ModifierFlags';
import { Node } from '../language/node/Node';
import { NodeFactory } from '../language/node/NodeFactory';
import { NodeList } from '../language/node/NodeList';
import { ParseContext } from './ParseContext';
import { PhpLexer } from './PhpLexer';
import { PhpLexerState } from './PhpLexerState';
import { PhpParserOptions } from './PhpParserOptions';
import { PhpVersion } from './PhpVersion';
import { Precedence } from './Precedence';
import { SourceTextNode } from '../language/node/SourceTextNode';
import { SourceTextSyntaxNode } from '../language/syntax/SourceTextSyntaxNode';
import { SyntaxDiagnostic } from '../diagnostics/SyntaxDiagnostic';
import { TextSpan } from '../text/TextSpan';
import { Token } from './Token';
import { TokenKind, TokenKindInfo } from '../language/TokenKind';
import { TokenNode } from '../language/node/TokenNode';
import { TriviaNode } from '../language/node/TriviaNode';

/**
 * A container for a parsed expression (or statement) node and its type.
 */
export class Expression {

  constructor(public readonly node: ExpressionNode | StatementNode, public readonly type: ExpressionType) {}

}

/**
 * A container for the arguments of an invocation expression.
 */
export class InvocationArguments {

  constructor(public readonly openParen: TokenNode, public readonly argumentList: NodeList | null, public readonly closeParen: TokenNode) {}

}

/**
 * A container for the parameters of a function or method declaration.
 */
export class Parameters {

  constructor(public readonly openParen: TokenNode, public readonly parameterList: NodeList | null, public readonly closeParen: TokenNode) {}

}

/**
 * Parses a PHP file into an abstract syntax tree.
 */
export class PhpParser implements IParser<SourceTextSyntaxNode> {

  /**
   * The contexts that the parser has encountered.
   *
   * Contexts are typically used when parsing arbitrarily long lists in order
   * to help determine a proper recovery action when an error occurs.
   *
   * For example, while parsing a list of statements inside a while loop, the
   * parser will know that it has encountered a block statement (the parent
   * function or method) and while statement contexts.
   *
   * Note that care must be used when changing contexts. For example, when
   * parsing a while loop that is inside another while loop, removing the
   * nested loop's context using
   *
   * `this.currentContext &= ~ParseContext.WhileBlockElements;`
   *
   * would incorrectly remove the parent context as well. Instead, save the
   * current context, and when the action is complete, restore that context
   * (since the context may not have actually changed).
   */
  protected currentContext: ParseContext;

  /**
   * The current token from the lexer.
   */
  protected currentToken: Token;

  /**
   * A factory service for creating tokens, trivia, and node lists.
   */
  protected factory: NodeFactory;

  /**
   * A list of trivia nodes that preceed the current token.
   */
  protected leadingTrivia: TriviaNode[] = [];

  /**
   * The width of the current token's leading trivia.
   */
  protected leadingTriviaWidth: number = 0;

  /**
   * A PHP tokenizer.
   */
  protected lexer: PhpLexer;

  /**
   * The current state of the PHP tokenizer.
   */
  protected lexerState: PhpLexerState;

  /**
   * An object containing configuration options for the parser.
   */
  protected options: PhpParserOptions;

  /**
   * Constructs a `PhpParser` object.
   *
   * @todo Implement incremental parsing.
   * @todo Implement cancellation token support.
   */
  constructor(lexer: PhpLexer, options = PhpParserOptions.Default /*, oldTree?: SourceTextSyntaxNode, changes?: TextChange[], cancellationToken?: any*/) {
    this.currentContext = ParseContext.SourceElements;
    this.currentToken = new Token(TokenKind.Unknown, 0, 0);
    this.factory = new NodeFactory();
    this.lexer = lexer;
    this.lexerState = lexer.currentState;
    this.options = options;
  }

  /**
   * @inheritDoc
   */
  public parse(): SourceTextSyntaxNode {
    this.nextToken();
    return this.parseSourceText().createSyntaxNode();
  }

  /**
   * Force the parser to skip any remaining content.
   *
   * @todo Experimental.
   */
  protected forceEndOfFile(): void {
    // @todo Technically this should be the end of the scanning bounds.
    let end = this.lexer.sourceText.length;

    // Already at the end of the file.
    if (this.currentToken.kind === TokenKind.EOF) {
      return;
    }

    // The syntax tree still needs to be fully representative, so make a token
    // with any intermediate content...
    this.currentToken = new Token(TokenKind.InlineText, this.currentToken.offset, end - this.currentToken.offset);

    // ...and then skip it (without a diagnostic).
    let trivia = this.factory.createSkippedTokenTrivia(this.currentToken.kind, this.currentToken.length);
    this.leadingTriviaWidth = this.leadingTriviaWidth + this.currentToken.length;
    this.leadingTrivia.push(trivia);

    // Finally, move the lexer to get the actual EOF token.
    this.lexer.setPosition(end);
    this.nextToken();
  }

  /**
   * Determines if the given version requirements are satisfied.
   *
   * @param {PhpVersion} minVersion
   *   The earliest supported PHP version.
   * @param {PhpVersion} maxVersion
   *   The latest supported PHP version.
   */
  protected isSupportedVersion(minVersion: PhpVersion, maxVersion = PhpVersion.Latest): boolean {
    return this.options.version >= minVersion && this.options.version <= maxVersion;
  }

  /**
   * @todo Document parseSourceText().
   */
  protected parseSourceText(): SourceTextNode {
    let statements = this.parseList(ParseContext.SourceElements);
    let eofToken = this.eat(TokenKind.EOF);
    return new SourceTextNode(statements, eofToken);
  }

  // --------------------------------------------------------------------------
  // Token nodes
  // --------------------------------------------------------------------------

  /**
   * Creates a missing token.
   *
   * @param {TokenKind} expected
   *   The expected token kind.
   * @param {TokenKind} actual
   *   The actual token kind that was parsed.
   * @param {boolean} reportError
   *   If `true`, the created token will contain a diagnostic using a generic
   *   error code (depending on the expected and actual tokens found).
   */
  protected createMissingToken(expected: TokenKind, actual: TokenKind, reportError: boolean): TokenNode {
    let diagnostics: SyntaxDiagnostic[] = [];
    if (reportError) {
      let diagnostic = this.createExpectedDiagnostic(expected, actual, this.getOffsetForMissingToken(), 0);
      diagnostics.push(diagnostic);
    }
    return this.createMissingTokenWithDiagnostic(expected, diagnostics);
  }

  /**
   * Creates a missing token using the given error code.
   */
  protected createMissingTokenWithError(expected: TokenKind, code: ErrorCode, ...args: any[]): TokenNode {
    let diagnostic = this.createDiagnosticForMissingToken(code, ...args);
    return this.createMissingTokenWithDiagnostic(expected, [diagnostic]);
  }

  /**
   * Creates a missing token with the given diagnostics.
   *
   * NOTE: This method should not be called directly from parsing methods.
   * Use `createMissingToken()` or `createMissingTokenWithError()` instead.
   */
  protected createMissingTokenWithDiagnostic(expected: TokenKind, diagnostics: SyntaxDiagnostic[]): TokenNode {
    return this.factory.createMissingToken(expected, null, diagnostics);
  }

  /**
   * Creates a `TokenNode` from a token generated by the lexer.
   *
   * If there was leading trivia prior to this token, it will also be added
   * to the token.
   *
   * @param {Token} token
   *   A token generated by the lexer.
   */
  protected createToken(token: Token): TokenNode {
    let diagnostics = token.diagnostics;

    // Adjust token diagnostics for leading trivia on the node.
    for (let i = 0; i < diagnostics.length; i++) {
      diagnostics[i] = diagnostics[i].withOffset(diagnostics[i].offset + this.leadingTriviaWidth);
    }

    if (this.leadingTrivia.length > 0) {
      let trivia = this.factory.createList(this.leadingTrivia);
      this.leadingTrivia = [];
      this.leadingTriviaWidth = 0;
      return this.factory.createTokenWithTrivia(token.kind, token.length, trivia, diagnostics);
    }

    return this.factory.createToken(token.kind, token.length, diagnostics);
  }

  /**
   * Creates a token node.
   *
   * If expected, the lexer will also be moved to the next token.
   *
   * @param {TokenKind} kind
   *   The expected type of the token to parse.
   *
   * @return {TokenNode}
   *   A token node. If the expected token does not match the current token,
   *   this node will be flagged as missing.
   */
  protected eat(kind: TokenKind): TokenNode {
    if (this.currentToken.kind === kind) {
      const token = this.createToken(this.currentToken);
      this.nextToken();
      return token;
    }
    return this.createMissingToken(kind, this.currentToken.kind, true);
  }

  /**
   * Creates a token node only if the expected token matches the current token.
   *
   * If expected, the lexer will also be moved to the next token.
   *
   * @param {TokenKind} kind
   *   The expected type of token to parse.
   *
   * @return {TokenNode|null}
   *   A token node, or `null` if the current token was not expected.
   */
  protected eatOptional(kind: TokenKind): TokenNode | null {
    if (this.currentToken.kind === kind) {
      const token = this.createToken(this.currentToken);
      this.nextToken();
      return token;
    }
    return null;
  }

  /**
   * Moves the lexer to the next non-trivia token.
   */
  protected nextToken(): void {
    this.scanToken();
    while (TokenKindInfo.isTrivia(this.currentToken.kind)) {
      let diagnostics = this.currentToken.diagnostics;

      // Adjust token diagnostics for leading trivia on the node.
      for (let i = 0; i < diagnostics.length; i++) {
        diagnostics[i] = diagnostics[i].withOffset(diagnostics[i].offset + this.leadingTriviaWidth);
      }

      let trivia = this.factory.createTrivia(this.currentToken.kind, this.currentToken.length, diagnostics);
      this.leadingTriviaWidth = this.leadingTriviaWidth + this.currentToken.length;
      this.leadingTrivia.push(trivia);
      this.scanToken();
    }
  }

  /**
   * @todo Document scanToken().
   *
   * @todo Merge into nextToken() if not needed for incremental parsing.
   */
  protected scanToken(): void {
    this.currentToken = this.lexer.lex(this.lexerState);
    if (this.lexerState !== this.lexer.currentState) {
      // @todo May need to save the location of the state change.
      this.lexerState = this.lexer.currentState;
    }
  }

  /**
   * Adds the current token to the leading trivia of the next token. The token
   * will be given a generic diagnostic as well.
   */
  protected skipToken(): void {
    this.skipTokenWithError(ErrorCode.ERR_UnexpectedToken, TokenKindInfo.getText(this.currentToken.kind));
  }

  /**
   * Adds the current token to the leading trivia of the next token with a
   * given error code.
   */
  protected skipTokenWithError(code: ErrorCode, ...args: any[]): void {
    let diagnostic = this.createDiagnosticForSkippedToken(code, ...args);
    let trivia = this.factory.createSkippedTokenTrivia(this.currentToken.kind, this.currentToken.length, [diagnostic]);
    this.leadingTriviaWidth = this.leadingTriviaWidth + this.currentToken.length;
    this.leadingTrivia.push(trivia);
    this.nextToken();
  }

  // --------------------------------------------------------------------------
  // Diagnostics
  // --------------------------------------------------------------------------

  /**
   * Appends a diagnostic to the given node.
   */
  protected addError<T extends INode>(node: T, code: ErrorCode, ...args: any[]): T {
    let existing = node.diagnostics;
    let diagnostic = this.createDiagnosticForNode(node, code, ...args);
    // Suppress TS2322: Type `INode` is assignable to `INode`.
    return <T>node.withDiagnostics(existing.concat([diagnostic]));
  }

  /**
   * Creates a diagnostic for a node.
   */
  protected createDiagnostic(offset: number, width: number, code: ErrorCode, ...args: any[]): SyntaxDiagnostic {
    return new SyntaxDiagnostic(offset, width, code, ...args);
  }

  /**
   * Creates a diagnostic for a token node with no width.
   */
  protected createDiagnosticForMissingToken(code: ErrorCode, ...args: any[]): SyntaxDiagnostic {
    return this.createDiagnostic(this.getOffsetForMissingToken(), 0, code, ...args);
  }

  /**
   * Creates a diagnostic for a node that has already been created.
   */
  protected createDiagnosticForNode(node: INode, code: ErrorCode, ...args: any[]): SyntaxDiagnostic {
    return this.createDiagnostic(node.leadingTriviaWidth, node.width, code, ...args);
  }

  /**
   * Creates a diagnostic for a trivia node containing a skipped token.
   */
  protected createDiagnosticForSkippedToken(code: ErrorCode, ...args: any[]): SyntaxDiagnostic {
    return this.createDiagnostic(this.leadingTriviaWidth, this.currentToken.length, code, ...args);
  }

  /**
   * Creates a diagnostic at a specified location using an error code
   * appropriate for the expected and actual token kinds.
   */
  protected createExpectedDiagnostic(expected: TokenKind, actual: TokenKind, offset: number, width: number): SyntaxDiagnostic {
    let code = this.getExpectedTokenErrorCode(expected, actual);
    switch (code) {
      case ErrorCode.ERR_IdentifierExpectedKeyword:
        return this.createDiagnostic(offset, width, code, TokenKindInfo.getText(actual));
      case ErrorCode.ERR_Syntax:
        return this.createDiagnostic(offset, width, code, TokenKindInfo.getText(expected));
      default:
        return this.createDiagnostic(offset, width, code);
    }
  }

  /**
   * Gets an appropriate error code given the expected and actual token kinds.
   */
  protected getExpectedTokenErrorCode(expected: TokenKind, actual: TokenKind): ErrorCode {
    switch (expected) {
      case TokenKind.Identifier:
        // if (TokenKindInfo.isSemiReservedKeyword(actual)) {
        //   return ErrorCode.ERR_IdentifierExpectedKeyword;
        // }
        return ErrorCode.ERR_IdentifierExpected;
      case TokenKind.Semicolon:
        return ErrorCode.ERR_SemicolonExpected;
      case TokenKind.CloseBrace:
        return ErrorCode.ERR_CloseBraceExpected;
      case TokenKind.CloseBracket:
        return ErrorCode.ERR_CloseBracketExpected;
      case TokenKind.CloseParen:
        return ErrorCode.ERR_CloseParenExpected;
      case TokenKind.OpenBrace:
        return ErrorCode.ERR_OpenBraceExpected;
      case TokenKind.OpenParen:
        return ErrorCode.ERR_OpenParenExpected;
      default:
        return ErrorCode.ERR_Syntax;
    }
  }

  /**
   * Gets the offset of the last non-whitespace token in the leading trivia.
   *
   * This method is required to properly place diagnostics when multiple tokens
   * have been skipped.
   */
  protected getOffsetForMissingToken(): number {
    let offset = this.leadingTriviaWidth;
    for (let i = this.leadingTrivia.length - 1; i >= 0; i--) {
      let trivia = this.leadingTrivia[i];
      // The first skipped token found is where the diagnostic should be.
      if (!TokenKindInfo.isTrivia(trivia.kind)) {
        break;
      }
      offset -= trivia.width;
    }
    return offset;
  }

  // --------------------------------------------------------------------------
  // Parse contexts
  // --------------------------------------------------------------------------

  /**
   * Adds a context flag to the parser's currently active contexts.
   */
  protected addParseContext(context: ParseContext): void {
    this.currentContext |= context;
  }

  /**
   * Determines if the parser is currently in the given context.
   */
  protected isInContext(context: ParseContext): boolean {
    return this.currentContext === context || (this.currentContext & context) !== 0;
  }

  /**
   * Determines if the token kind starts or ends any active contexts.
   */
  protected isTokenValidInContexts(kind: TokenKind): boolean {
    // The default context needs to be manually checked (1 << 0 != 0).
    if (this.tokenStartsContext(ParseContext.SourceElements, kind)) {
      return true;
    }

    for (let context = 1; context < ParseContext.Length; context++) {
      let contextFlag = 1 << context;
      if (this.isInContext(contextFlag)) {
        if (this.tokenStartsContext(contextFlag, kind) || this.tokenEndsContext(contextFlag, kind)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Determines if a token terminates a specified context.
   *
   * @param {ParseContext} context
   *   The context to check.
   * @param {TokenKind} kind
   *   The token kind.
   */
  protected tokenEndsContext(context: ParseContext, kind: TokenKind): boolean {
    if (kind === TokenKind.EOF) {
      return true;
    }

    switch (context) {
      case ParseContext.SourceElements:
        return false;
      case ParseContext.CaseClauseElements:
        return kind === TokenKind.Case || kind === TokenKind.Default;
      case ParseContext.ClassMembers:
      case ParseContext.CompoundStatementElements:
      case ParseContext.InterfaceMembers:
      case ParseContext.NamespaceElements:
      case ParseContext.SwitchElements:
      case ParseContext.TraitMembers:
        return kind === TokenKind.CloseBrace;
      case ParseContext.ConstantDeclaration:
        return kind === TokenKind.Semicolon;
      case ParseContext.DeclareBlockElements:
        return kind === TokenKind.EndDeclare;
      case ParseContext.IfBlockElements:
        return kind === TokenKind.Else || kind === TokenKind.ElseIf || kind === TokenKind.EndIf;
      case ParseContext.IfElseBlockElements:
        return kind === TokenKind.EndIf;
      case ParseContext.ForBlockElements:
        return kind === TokenKind.EndFor;
      case ParseContext.ForEachBlockElements:
        return kind === TokenKind.EndForEach;
      case ParseContext.SwitchBlockElements:
        return kind === TokenKind.EndSwitch;
      case ParseContext.WhileBlockElements:
        return kind === TokenKind.EndWhile;
      default:
        throw new ParserException('Unhandled parse context');
    }
  }

  /**
   * Determines if a token could start a node within the specified context.
   *
   * @param {ParseContext} context
   *   The context to check.
   * @param {TokenKind} kind
   *   The token kind.
   */
  protected tokenStartsContext(context: ParseContext, kind: TokenKind): boolean {
    switch (context) {
      case ParseContext.SourceElements:
      case ParseContext.NamespaceElements:
        return this.isTopStatementStart(kind);
      case ParseContext.CaseClauseElements:
      case ParseContext.DeclareBlockElements:
      case ParseContext.ForBlockElements:
      case ParseContext.ForEachBlockElements:
      case ParseContext.IfBlockElements:
      case ParseContext.IfElseBlockElements:
      case ParseContext.CompoundStatementElements:
      case ParseContext.WhileBlockElements:
        return this.isStatementBlockStart(kind);
      case ParseContext.ClassMembers:
      case ParseContext.InterfaceMembers:
      case ParseContext.TraitMembers:
        // Even though some class statements are not allowed in interfaces or
        // traits, they are technically known by the context and can still be
        // parsed. A custom error diagnostic will be added later.
        return this.isClassMemberStart(kind);
      case ParseContext.ConstantDeclaration:
        return kind === TokenKind.Identifier;
      case ParseContext.SwitchElements:
      case ParseContext.SwitchBlockElements:
        return this.isSwitchCaseStart(kind);
      default:
        throw new ParserException('Unhandled parse context');
    }
  }

  // --------------------------------------------------------------------------
  // Token classification
  // --------------------------------------------------------------------------

  /**
   * Determines if a token starts an argument in an invocation expression.
   */
  protected isArgumentStart(kind: TokenKind): boolean {
    return this.isExpressionStart(kind) || kind === TokenKind.Ellipsis;
  }

  /**
   * Determines if a token starts an element within an array.
   */
  protected isArrayElementStart(kind: TokenKind): boolean {
    return this.isExpressionStart(kind) || kind === TokenKind.Ampersand || kind === TokenKind.Ellipsis;
  }

  /**
   * Determines if a token represents an assignment operation.
   */
  protected isAssignmentOperator(kind: TokenKind): boolean {
    switch (kind) {
      case TokenKind.AndEqual:
      case TokenKind.CoalesceEqual:
      case TokenKind.ConcatEqual:
      case TokenKind.DivideEqual:
      case TokenKind.Equal:
      case TokenKind.MinusEqual:
      case TokenKind.ModEqual:
      case TokenKind.MultiplyEqual:
      case TokenKind.OrEqual:
      case TokenKind.PlusEqual:
      case TokenKind.PowEqual:
      case TokenKind.ShiftLeftEqual:
      case TokenKind.ShiftRightEqual:
      case TokenKind.XorEqual:
        return true;
      default:
        return false;
    }
  }

  /**
   * Determines if a token represents a binary operation.
   */
  protected isBinaryOperator(kind: TokenKind): boolean {
    switch (kind) {
      // Arithmetic operators.
      case TokenKind.Asterisk:
      case TokenKind.Minus:
      case TokenKind.Percent:
      case TokenKind.Period:
      case TokenKind.Plus:
      case TokenKind.Pow:
      case TokenKind.Slash:
      // Bitwise operators.
      case TokenKind.Ampersand:
      case TokenKind.Caret:
      case TokenKind.ShiftLeft:
      case TokenKind.ShiftRight:
      case TokenKind.VerticalBar:
      // Comparison operators.
      case TokenKind.Coalesce:
      case TokenKind.GreaterThan:
      case TokenKind.Inequality:
      case TokenKind.IsEqual:
      case TokenKind.IsGreaterThanOrEqual:
      case TokenKind.IsIdentical:
      case TokenKind.IsLessThanOrEqual:
      case TokenKind.IsNotEqual:
      case TokenKind.IsNotIdentical:
      case TokenKind.LessThan:
      case TokenKind.Spaceship:
      case TokenKind.InstanceOf:
      // Logical operators.
      case TokenKind.BooleanAnd:
      case TokenKind.BooleanOr:
      case TokenKind.LogicalAnd:
      case TokenKind.LogicalOr:
      case TokenKind.LogicalXor:
        return true;

      default:
        return this.isAssignmentOperator(kind);
    }
  }

  /**
   * Determines if a token is a valid identifier for a class member.
   */
  protected isClassMemberIdentifier(kind: TokenKind): boolean {
    return kind === TokenKind.Identifier || TokenKindInfo.isSemiReservedKeyword(kind);
  }

  /**
   * Determines if a token starts a class member declaration.
   */
  protected isClassMemberStart(kind: TokenKind): boolean {
    return this.isModifier(kind) ||
      kind === TokenKind.Const ||
      kind === TokenKind.Function ||
      kind === TokenKind.Use ||
      kind === TokenKind.Var;
  }

  /**
   * Determines if a token starts a class name reference found after an
   * `instanceof` or `new` keyword.
   */
  protected isClassNameReferenceStart(kind: TokenKind): boolean {
    return this.isNameStart(kind) ||
      kind === TokenKind.Dollar ||
      kind === TokenKind.Static ||
      kind === TokenKind.Variable;
  }

  /**
   * Determines if a token starts a postfix expression within a class name
   * reference.
   */
  protected isClassNameReferenceExpressionStart(kind: TokenKind): boolean {
    return kind === TokenKind.DoubleColon ||
      kind === TokenKind.ObjectOperator ||
      kind === TokenKind.OpenBrace ||
      kind === TokenKind.OpenBracket;
  }

  /**
   * Determines if a token starts a dereference of an object.
   *
   * @see PhpParser.isElementAccessStart()
   */
  protected isDereferenceStart(kind: TokenKind): boolean {
    return kind === TokenKind.DoubleColon ||
      kind === TokenKind.ObjectOperator ||
      kind === TokenKind.OpenBrace ||
      kind === TokenKind.OpenBracket ||
      kind === TokenKind.OpenParen;
  }

  /**
   * Determines if a token starts a dereference of a non-object.
   *
   * @see isDereferenceStart()
   */
  protected isElementAccessStart(kind: TokenKind): boolean {
    return kind === TokenKind.OpenBracket || kind === TokenKind.OpenBrace;
  }

  /**
   * Determines if a token starts an expression.
   */
  protected isExpressionStart(kind: TokenKind): boolean {
    switch (kind) {
      // names
      case TokenKind.Backslash:
      case TokenKind.Identifier:    // Includes "parent" and "self".
      case TokenKind.Namespace:

      // expression
      case TokenKind.Clone:
      case TokenKind.Include:
      case TokenKind.IncludeOnce:
      case TokenKind.New:
      case TokenKind.List:
      case TokenKind.Require:
      case TokenKind.RequireOnce:
      case TokenKind.Yield:
      case TokenKind.YieldFrom:

      // primary-expression
      case TokenKind.Array:
      case TokenKind.DNumber:
      case TokenKind.Dollar:
      case TokenKind.FlexdocTemplate:
      case TokenKind.Fn:
      case TokenKind.Function:
      case TokenKind.HeredocTemplate:
      case TokenKind.LNumber:
      case TokenKind.OpenBracket:
      case TokenKind.OpenParen:
      case TokenKind.ShellCommandTemplate:
      case TokenKind.Static:
      case TokenKind.StringLiteral:
      case TokenKind.StringTemplate:
      case TokenKind.Variable:      // Includes "$this".

      // primary-expression > intrinsic
      case TokenKind.Die:
      case TokenKind.Empty:
      case TokenKind.Eval:
      case TokenKind.Exit:
      case TokenKind.IsSet:
      case TokenKind.Print:

      // unary-expression
      case TokenKind.At:
      case TokenKind.Decrement:
      case TokenKind.Exclamation:
      case TokenKind.Increment:
      case TokenKind.Minus:
      case TokenKind.Plus:
      case TokenKind.Tilde:

      // unary-expression > cast-expression
      case TokenKind.ArrayCast:
      case TokenKind.BinaryCast:
      case TokenKind.BoolCast:
      case TokenKind.BooleanCast:
      case TokenKind.DoubleCast:
      case TokenKind.FloatCast:
      case TokenKind.IntCast:
      case TokenKind.IntegerCast:
      case TokenKind.ObjectCast:
      case TokenKind.RealCast:
      case TokenKind.StringCast:
      case TokenKind.UnsetCast:

      // magic-constants
      case TokenKind.MagicClass:
      case TokenKind.MagicDirectory:
      case TokenKind.MagicFile:
      case TokenKind.MagicFunction:
      case TokenKind.MagicLine:
      case TokenKind.MagicMethod:
      case TokenKind.MagicNamespace:
      case TokenKind.MagicTrait:
        return true;
      default:
        return false;
    }
  }

  /**
   * Determines if the token starts a line within a flexible heredoc.
   */
  protected isFlexdocTemplateLineStart(kind: TokenKind): boolean {
    return kind === TokenKind.StringIndent
      || kind === TokenKind.StringTemplateLiteral   // For error recovery.
      || this.isStringTemplateElementStart(kind);   // For error recovery.
  }

  /**
   * Determines if a token is a valid identifier for a function.
   */
  protected isFunctionIdentifier(kind: TokenKind): boolean {
    if (kind === TokenKind.Identifier) {
      return true;
    }
    // Also allow functions with reserved names if the parser is being used to
    // generate metadata about PHP itself.
    if (TokenKindInfo.isSemiReservedKeyword(kind) && this.options.allowReservedNames) {
      return true;
    }
    return false;
  }

  /**
   * Determines if a token starts an expression or nested list deconstruction.
   */
  protected isListIntrinsicElementStart(kind: TokenKind): boolean {
    // The '&' token is also allowed for error recovery purposes.
    return kind === TokenKind.Ampersand || kind === TokenKind.List || this.isExpressionStart(kind);
  }

  /**
   * Determines if a token is a type or visibility modifier.
   */
  protected isModifier(kind: TokenKind): boolean {
    switch (kind) {
      case TokenKind.Abstract:
      case TokenKind.Final:
      case TokenKind.Private:
      case TokenKind.Protected:
      case TokenKind.Public:
      case TokenKind.Static:
        return true;
      default:
        return false;
    }
  }

  /**
   * Determines if a token starts a fully qualified, partially qualified, or
   * relative name.
   */
  protected isNameStart(kind: TokenKind): boolean {
    switch (kind) {
      case TokenKind.Backslash:
      case TokenKind.Identifier:
      case TokenKind.Namespace:
        return true;
      default:
        return false;
    }
  }

  /**
   * Determines if a token is a non-associative binary operator.
   */
  protected isNonAssociative(kind: TokenKind): boolean {
    switch (kind) {
      // Comparison.
      case TokenKind.GreaterThan:
      case TokenKind.InstanceOf:
      case TokenKind.IsGreaterThanOrEqual:
      case TokenKind.IsLessThanOrEqual:
      case TokenKind.LessThan:
      // Equality.
      case TokenKind.Inequality:
      case TokenKind.IsEqual:
      case TokenKind.IsIdentical:
      case TokenKind.IsNotEqual:
      case TokenKind.IsNotIdentical:
      case TokenKind.Spaceship:
        return true;
      default:
        return false;
    }
  }

  /**
   * Determines if a token starts a parameter in a function or method declaration.
   */
  protected isParameterStart(kind: TokenKind): boolean {
    switch (kind) {
      case TokenKind.Ampersand:
      case TokenKind.Ellipsis:
      case TokenKind.Variable:
      // Allowed for better error recovery.
      case TokenKind.Dollar:
        return true;
      default:
        return this.isTypeStart(kind);
    }
  }

  /**
   * Determines if a token starts a property declaration.
   */
  protected isPropertyStart(kind: TokenKind): boolean {
    return kind === TokenKind.Dollar || kind === TokenKind.Variable || this.isTypeStart(kind);
  }

  /**
   * Determines if a token is a right-associative *binary* operator.
   */
  protected isRightAssociative(kind: TokenKind): boolean {
    // Fun fact: PHP's grammar lists assignment operators as left associative,
    // but the LHS of `variable_expr = expr` can't be an assignment expression
    // so they end up being parsed like right associative operators anyways.
    switch (kind) {
      // Arithmetic operators.
      case TokenKind.Pow:
      // Assignment operators.
      case TokenKind.AndEqual:
      case TokenKind.CoalesceEqual:
      case TokenKind.ConcatEqual:
      case TokenKind.DivideEqual:
      case TokenKind.Equal:
      case TokenKind.MinusEqual:
      case TokenKind.ModEqual:
      case TokenKind.MultiplyEqual:
      case TokenKind.OrEqual:
      case TokenKind.PlusEqual:
      case TokenKind.PowEqual:
      case TokenKind.ShiftLeftEqual:
      case TokenKind.ShiftRightEqual:
      case TokenKind.XorEqual:
      // Comparison operators.
      case TokenKind.Coalesce:
        return true;
      default:
        return false;
    }
  }

  /**
   * Determines if a token starts a declaration or statement within a
   * `compound-statement`.
   */
  protected isStatementBlockStart(kind: TokenKind): boolean {
    switch (kind) {
      // Allowed for better error recovery.
      case TokenKind.HaltCompiler:
      // Declaration statements.
      case TokenKind.Abstract:
      case TokenKind.Class:
      case TokenKind.Final:
      case TokenKind.Function:
      case TokenKind.Interface:
      case TokenKind.Trait:
        return true;
      default:
        return this.isStatementStart(kind);
    }
  }

  /**
   * Determines if a token is a semicolon or close tag.
   */
  protected isStatementEnd(kind: TokenKind): boolean {
    return kind === TokenKind.Semicolon || kind === TokenKind.CloseTag;
  }

  /**
   * Determines if a token is the start of a statement.
   */
  protected isStatementStart(kind: TokenKind): boolean {
    switch (kind) {
      case TokenKind.Break:
      case TokenKind.CloseTag:         // Equivalent to a semicolon.
      case TokenKind.Continue:
      case TokenKind.Declare:
      case TokenKind.Do:
      case TokenKind.Echo:
      case TokenKind.For:
      case TokenKind.ForEach:
      case TokenKind.Global:
      case TokenKind.GoTo:
      case TokenKind.Identifier:
      case TokenKind.If:
      case TokenKind.InlineText:       // Echo statement.
      case TokenKind.OpenBrace:
      case TokenKind.OpenTagWithEcho:  // Echo statement.
      case TokenKind.Return:
      case TokenKind.Semicolon:        // Expression statement.
      case TokenKind.Static:
      case TokenKind.Switch:
      case TokenKind.Throw:
      case TokenKind.Try:
      case TokenKind.Unset:
      case TokenKind.While:
        return true;
      default:
        return this.isExpressionStart(kind);
    }
  }

  /**
   * Determines if a token ends a string template.
   */
  protected isStringTemplateEnd(kind: TokenKind, terminator: TokenKind): boolean {
    return kind === terminator || kind === TokenKind.EOF;
  }

  /**
   * Determines if a token starts a variable offset within an interpolated
   * element access expression.
   */
  protected isStringTemplateVariableOffset(kind: TokenKind): boolean {
    switch (kind) {
      case TokenKind.Identifier:
      case TokenKind.StringNumber:
      case TokenKind.Variable:
        return true;
      default:
        return false;
    }
  }

  /**
   * Determines if a token is the start of an interpolation within a string
   * template.
   */
  protected isStringTemplateElementStart(kind: TokenKind): boolean {
    switch (kind) {
      case TokenKind.DollarOpenBrace:
      case TokenKind.OpenBrace:
      case TokenKind.Variable:
        return true;
      default:
        return false;
    }
  }

  /**
   * Determines if a token starts a branch within a switch statement.
   */
  protected isSwitchCaseStart(kind: TokenKind): boolean {
    return kind === TokenKind.Case || kind === TokenKind.Default;
  }

  /**
   * Determines if a token is the start of a top-level statement, which
   * includes other statements and expressions.
   */
  protected isTopStatementStart(kind: TokenKind): boolean {
    switch (kind) {
      // Allowed for a better error recovery.
      case TokenKind.Private:
      case TokenKind.Protected:
      case TokenKind.Public:
      // Generic declarations and statements.
      case TokenKind.Const:
      case TokenKind.HaltCompiler:
      case TokenKind.Namespace:
      case TokenKind.Use:
      // Type declaration statements.
      case TokenKind.Abstract:
      case TokenKind.Class:
      case TokenKind.Final:
      case TokenKind.Function:
      case TokenKind.Interface:
      case TokenKind.Trait:
        return true;
      default:
        return this.isStatementStart(kind);
    }
  }

  /**
   * Determines if a token starts a class or method name.
   */
  protected isTraitAdaptationStart(kind: TokenKind): boolean {
    return this.isNameStart(kind) || TokenKindInfo.isSemiReservedKeyword(kind);
  }

  /**
   * Determines if a token is a predefined type or starts a user-defined type.
   */
  protected isTypeStart(kind: TokenKind): boolean {
    switch (kind) {
      case TokenKind.Array:
      case TokenKind.Callable:
      case TokenKind.Question:
        return true;
      default:
        return this.isNameStart(kind);
    }
  }

  /**
   * Determines if a token represents a unary operation.
   */
  protected isUnaryOperator(kind: TokenKind): boolean {
    switch (kind) {
      // Arithmatic operators.
      case TokenKind.Decrement:
      case TokenKind.Increment:
      case TokenKind.Minus:
      case TokenKind.Plus:
      // Bitwise and logical not operators.
      case TokenKind.Exclamation:
      case TokenKind.Tilde:
      // Cast operators.
      case TokenKind.ArrayCast:
      case TokenKind.BinaryCast:
      case TokenKind.BoolCast:
      case TokenKind.BooleanCast:
      case TokenKind.DoubleCast:
      case TokenKind.FloatCast:
      case TokenKind.IntCast:
      case TokenKind.IntegerCast:
      case TokenKind.ObjectCast:
      case TokenKind.RealCast:
      case TokenKind.StringCast:
      case TokenKind.UnsetCast:
        return true;
      default:
        return false;
    }
  }

  /**
   * Determines if a token starts a type, function, or constant import.
   */
  protected isUseGroupElementStart(kind: TokenKind): boolean {
    switch (kind) {
      case TokenKind.Const:
      case TokenKind.Function:
      case TokenKind.Identifier:
        return true;
      default:
        return false;
    }
  }

  // --------------------------------------------------------------------------
  // List generation
  // --------------------------------------------------------------------------

  /**
   * Parses a list of elements separated by a delimiter.
   */
  protected parseDelimitedList(context: ParseContext, delimiter: TokenKind, terminator: TokenKind): NodeList {
    const savedContext = this.currentContext;
    this.addParseContext(context);

    let nodes: Node[] = [];
    nodes.push(this.parseElement(context));

    // @todo Redesign the delimeter and terminator parameters into callbacks?
    while (this.currentToken.kind !== terminator && this.currentToken.kind !== TokenKind.EOF) {
      if (this.currentToken.kind === delimiter || this.tokenStartsContext(context, this.currentToken.kind)) {
        nodes.push(this.eat(delimiter));
        nodes.push(this.parseElement(context));
        continue;
      }

      if (this.isTokenValidInContexts(this.currentToken.kind)) {
        break;
      }

      this.skipToken();
    }

    this.currentContext = savedContext;

    return this.factory.createList(nodes);
  }

  /**
   * Parses a element based on the given context.
   */
  protected parseElement(context: ParseContext): Node {
    switch (context) {
      case ParseContext.SourceElements:
      case ParseContext.NamespaceElements:
        return this.parseSourceElement();
      case ParseContext.CaseClauseElements:
      case ParseContext.DeclareBlockElements:
      case ParseContext.ForBlockElements:
      case ParseContext.ForEachBlockElements:
      case ParseContext.IfBlockElements:
      case ParseContext.IfElseBlockElements:
      case ParseContext.CompoundStatementElements:
      case ParseContext.WhileBlockElements:
        return this.parseStatementBlockElement();
      case ParseContext.ConstantDeclaration:
        return this.parseConstantElement();
      default:
        throw new ParserException('Unhandled parse context');
    }
  }

  /**
   * Parses a list of elements based on the given context.
   */
  protected parseList(context: ParseContext): NodeList | null {
    const savedContext = this.currentContext;
    this.addParseContext(context);

    let nodes: Node[] = [];
    while (!this.tokenEndsContext(context, this.currentToken.kind)) {
      if (this.tokenStartsContext(context, this.currentToken.kind)) {
        nodes.push(this.parseElement(context));
        continue;
      }

      // Check if a parent context knows what to do with this token.
      if (this.isTokenValidInContexts(this.currentToken.kind)) {
        break;
      }

      // Skip the token since none of the contexts know what to do.
      this.skipToken();
    }

    this.currentContext = savedContext;

    return nodes.length > 0 ? this.factory.createList(nodes) : null;
  }

  /**
   * Parses a nested statement.
   */
  protected parseStatementBlockElement(): StatementNode {
    switch (this.currentToken.kind) {
      case TokenKind.Abstract:
      case TokenKind.Class:
      case TokenKind.Final:
        return this.parseClassDeclaration();
      case TokenKind.Function:
        return this.parseExpressionOrTopStatement();
      case TokenKind.HaltCompiler:
        let haltCompiler = this.parseHaltCompiler();
        return this.addError(haltCompiler, ErrorCode.ERR_HaltCompilerScope);
      case TokenKind.Interface:
        return this.parseInterfaceDeclaration();
      case TokenKind.Trait:
        return this.parseTraitDeclaration();
      default:
        return this.parseStatement();
    }
  }

  /**
   * Parses a top-level statement.
   */
  protected parseSourceElement(): StatementNode {
    switch (this.currentToken.kind) {
      case TokenKind.Abstract:
      case TokenKind.Class:
      case TokenKind.Final:
      // If the user is coming from a language like C# that allows 'public' on
      // top-level classes (or any modifier on nested classes), then allow
      // visibility modifier tokens so that a custom error message can be added.
      case TokenKind.Private:
      case TokenKind.Protected:
      case TokenKind.Public:
        return this.parseClassDeclaration();
      case TokenKind.Const:
        return this.parseConstantDeclaration();
      case TokenKind.Function:
        // @todo Test: Required trailing ';' if expression.
        return this.parseExpressionOrTopStatement();
      case TokenKind.HaltCompiler:
        let haltCompiler = this.parseHaltCompiler();
        if (!haltCompiler.containsDiagnostics) {
          this.forceEndOfFile();
        }
        return haltCompiler;
      case TokenKind.Interface:
        return this.parseInterfaceDeclaration();
      case TokenKind.Namespace:
        // @todo Test: Required trailing ';' if expression.
        return this.parseExpressionOrTopStatement();
      case TokenKind.Trait:
        return this.parseTraitDeclaration();
      case TokenKind.Use:
        return this.parseUseDeclaration();
      default:
        return this.parseStatement();
    }
  }

  // --------------------------------------------------------------------------
  // Productions (statements)
  // --------------------------------------------------------------------------

  /**
   * Parses a statement.
   */
  protected parseStatement(): StatementNode {
    switch (this.currentToken.kind) {
      // Statements (keywords).
      case TokenKind.Break:
        // @todo Add error when not in loop or switch.
        return this.parseBreak();
      case TokenKind.Continue:
        // @todo Add error when not in loop or switch.
        return this.parseContinue();
      case TokenKind.Declare:
        return this.parseDeclare();
      case TokenKind.Do:
        return this.parseDoWhile();
      case TokenKind.Echo:
        return this.parseEcho();
      case TokenKind.For:
        return this.parseFor();
      case TokenKind.ForEach:
        return this.parseForEach();
      case TokenKind.Global:
        return this.parseGlobal();
      case TokenKind.GoTo:
        return this.parseGoTo();
      case TokenKind.Identifier:
        return this.parseExpressionOrTopStatement();
      case TokenKind.If:
        return this.parseIf();
      case TokenKind.Return:
        return this.parseReturn();
      case TokenKind.Static:
        return this.parseExpressionOrTopStatement();
      case TokenKind.Switch:
        return this.parseSwitch();
      case TokenKind.Throw:
        return this.parseThrow();
      case TokenKind.Try:
        return this.parseTry();
      case TokenKind.Unset:
        return this.parseUnset();
      case TokenKind.While:
        return this.parseWhile();
      // Statements (other).
      case TokenKind.InlineText:
        return this.parseInlineText();
      case TokenKind.OpenBrace:
        return this.parseStatementBlock();
      case TokenKind.OpenTagWithEcho:
        return this.parseEcho();
      case TokenKind.CloseTag:
      case TokenKind.Semicolon:
        let semicolon = this.parseStatementEnd();
        return new ExpressionStatementNode(null, semicolon);
      // Expressions.
      default:
        if (this.isExpressionStart(this.currentToken.kind)) {
          let expr = this.parseExpression();
          let exprSemicolon = this.parseStatementEnd();
          return new ExpressionStatementNode(expr, exprSemicolon);
        }
        // Missing call to isStatementStart()?
        throw new ParserException('Unhandled token while attempting to parse statement');
    }
  }

  /**
   * Parses a break statement.
   *
   * Syntax: `BREAK optional-expr ;`
   */
  protected parseBreak(): BreakNode {
    let breakKeyword = this.eat(TokenKind.Break);
    let depth: ExpressionNode | null = null;
    if (this.isExpressionStart(this.currentToken.kind)) {
      depth = this.parseBreakOrContinueDepth(TokenKind.Break);
    }
    let semicolon = !this.isStatementEnd(this.currentToken.kind) && depth === null
      ? this.createMissingTokenWithError(TokenKind.Semicolon, ErrorCode.ERR_IterationDepthOrSemicolonExpected)
      : this.parseStatementEnd();
    return new BreakNode(breakKeyword, depth, semicolon);
  }

  /**
   * Parses the iteration depth of a `break` or `continue` statement.
   *
   * Syntax: `expr`
   *
   * This syntax is only for compatibility purposes. The node should actually
   * be equivalent to `LNUMBER` or `( LNUMBER )`.
   */
  protected parseBreakOrContinueDepth(keyword: TokenKind): ExpressionNode {
    // The caller should have checked if the depth exists.
    Debug.assert(this.isExpressionStart(this.currentToken.kind));

    if (this.currentToken.kind === TokenKind.LNumber) {
      let expr = this.parseExpression();
      // The integer may have been part of a larger expression.
      if (!(expr instanceof LiteralNode)) {
        expr = this.addError(expr, ErrorCode.ERR_InvalidIterationDepth, TokenKindInfo.getText(keyword));
      }
      return expr;
    }

    // Technically, the iteration depth should strictly be an integer, but due
    // to a quirk in how PHP is parsed, the parentheses in an expression group
    // are ignored, so if the inner expression is an integer, it is also valid.
    if (this.currentToken.kind === TokenKind.OpenParen) {
      let openParen = this.eat(TokenKind.OpenParen);
      // Suppress TS2365: Current token changed after previous method call.
      let isInteger = <TokenKind>this.currentToken.kind === TokenKind.LNumber;
      let expr = this.parseExpression();
      if (!isInteger || !(expr instanceof LiteralNode)) {
        expr = this.addError(expr, ErrorCode.ERR_InvalidIterationDepth, TokenKindInfo.getText(keyword));
      }
      let closeParen = this.eat(TokenKind.CloseParen);
      // Any additional operators cannot be part of a constant expression, so
      // by this point a semicolon should be expected, even though the
      // positioning will probably seem weird to most users.
      return new ExpressionGroupNode(openParen, expr, closeParen);
    }

    // While nothing else is valid, the diagnostic message (and recovery in
    // general) is better if a full expression is parsed instead of only
    // accepting the next token.
    //
    //   break 1 + 1;
    //         ~       Error: ';' expected
    //
    //   break 1 + 1;
    //         ~~~~~   Error: Iteration depth in 'break' statement must be an integer.
    //
    let expr = this.parseExpression();
    return this.addError(expr, ErrorCode.ERR_InvalidIterationDepth, TokenKindInfo.getText(keyword));
  }

  /**
   * Parses a list of class constants.
   *
   * Syntax: `visibility-modifier CONST const-elements ;`
   *
   * Where `const-elements` is:
   * - `const-elements , const-element`
   * - `const-element`
   */
  protected parseClassConstantDeclaration(modifiers: TokenNode[], context: ParseContext): ClassConstantDeclarationNode {
    for (let i = 0; i < modifiers.length; i++) {
      let modifier = this.getModifierFlag(modifiers[i].kind);
      if (modifier & ModifierFlags.VisibilityMask) {
        if (!this.isSupportedVersion(PhpVersion.PHP7_1)) {
          modifiers[i] = this.addError(modifiers[i], ErrorCode.ERR_FeatureClassConstantModifiers);
        }
      }
      else {
        modifiers[i] = this.addError(modifiers[i], ErrorCode.ERR_BadConstantModifier);
      }
    }

    let nodes: Array<ClassConstantElementNode | TokenNode> = [];
    let constKeyword = this.eat(TokenKind.Const);
    if (context === ParseContext.TraitMembers) {
      constKeyword = this.addError(constKeyword, ErrorCode.ERR_TraitConstant);
    }

    // const savedContext = this.currentContext;
    // this.addParseContext(ParseContext.ClassConstantDeclaration);

    nodes.push(this.parseClassConstantElement());

    // @todo Use parseDelimitedList() instead?
    // @todo See also: skipBadParameterListTokens()
    while (this.currentToken.kind !== TokenKind.EOF && this.currentToken.kind !== TokenKind.Semicolon) {
      if (this.currentToken.kind === TokenKind.Comma || this.isClassMemberIdentifier(this.currentToken.kind)) {
        nodes.push(this.eat(TokenKind.Comma));
        nodes.push(this.parseClassConstantElement());
        continue;
      }

      if (this.isTokenValidInContexts(this.currentToken.kind)) {
        break;
      }

      this.skipToken();
    }

    // this.currentContext = savedContext;

    let semicolon = this.parseStatementEnd();
    return new ClassConstantDeclarationNode(
      modifiers.length > 0 ? this.factory.createList(modifiers) : null,
      constKeyword,
      this.factory.createList(nodes),
      semicolon
    );
  }

  /**
   * Parses a single constant within a class constant declaration.
   *
   * Syntax: `member-name = expression`
   */
  protected parseClassConstantElement(): ClassConstantElementNode {
    // Technically, this error code is incorrect as identifiers or semi-reserved
    // keywords are allowed, but if that were mentioned in the error message,
    // users would be unlikely to know what those keywords are anyways.
    let identifier = this.parseClassMemberName(ErrorCode.ERR_IdentifierExpected);
    // Unlike other class members, the keyword 'class' is fully reserved for
    // class constants, as any expressions using it would conflict with class
    // name resolution (::class).
    if (identifier.kind === TokenKind.Class) {
      identifier = this.addError(identifier, ErrorCode.ERR_IdentifierExpectedKeyword, TokenKindInfo.getText(TokenKind.Class));
    }
    let equal = this.eat(TokenKind.Equal);
    let expression = this.parseExpression();
    return new ClassConstantElementNode(identifier, equal, expression);
  }

  /**
   * Parses a class declaration statement.
   *
   * Syntax: `class-modifier CLASS IDENTIFIER class-base-clause class-interface-clause { class-member-declarations }`
   *
   * Where `class-base-clause` is:
   * - `EXTENDS qualified-name`
   *
   * Where `class-interface-clause` is:
   * - `IMPLEMENTS qualified-name-list`
   */
  protected parseClassDeclaration(): ClassDeclarationNode {
    let modifiers = this.parseClassModifiers();
    let classKeyword = this.eat(TokenKind.Class);
    let identifier = this.eat(TokenKind.Identifier);

    let extendsKeyword = this.eatOptional(TokenKind.Extends);
    let baseType: NameNode | null = null;
    if (extendsKeyword !== null) {
      baseType = this.parseTypeName();
      if (this.currentToken.kind === TokenKind.Comma) {
        // @todo Skip all remaining types in the base clause?
        //
        // class A extends B, C {}
        //                  ~~~
        //
        this.skipTokenWithError(ErrorCode.ERR_MultipleInheritance);
      }
    }

    let implementsKeyword = this.eatOptional(TokenKind.Implements);
    let interfaces: NodeList | null = null;
    if (implementsKeyword !== null) {
      interfaces = this.parseQualifiedNameList();
      if (this.currentToken.kind === TokenKind.Extends && extendsKeyword === null) {
        this.skipTokenWithError(ErrorCode.ERR_BaseClauseAfterImplements);
      }
    }

    let openBrace: TokenNode;
    if (this.currentToken.kind !== TokenKind.OpenBrace) {
      if (implementsKeyword === null) {
        let code = extendsKeyword ? ErrorCode.ERR_IncompleteClassDeclarationWithExtends : ErrorCode.ERR_IncompleteClassDeclaration;
        openBrace = this.createMissingTokenWithError(TokenKind.OpenBrace, code);
      }
      else {
        openBrace = this.createMissingTokenWithError(TokenKind.OpenBrace, ErrorCode.ERR_CommaOrOpenBraceExpected);
      }
    }
    else {
      openBrace = this.eat(TokenKind.OpenBrace);
    }

    let members: NodeList | null = null;
    if (!identifier.isMissing && !openBrace.isMissing) {
      members = this.parseClassMembers(ParseContext.ClassMembers);
    }

    // If the opening brace is missing, then create a missing close brace as
    // well since the next close brace is most likely part of another block.
    //
    // namespace {
    //   class | <-- cursor here
    // }
    //
    let closeBrace = openBrace.isMissing
      ? this.createMissingToken(TokenKind.CloseBrace, this.currentToken.kind, false)
      : this.eat(TokenKind.CloseBrace);

    return new ClassDeclarationNode(
      modifiers,
      classKeyword,
      identifier,
      extendsKeyword,
      baseType,
      implementsKeyword,
      interfaces,
      openBrace,
      members,
      closeBrace
    );
  }

  /**
   * Parses a list of member declarations within a type declaration.
   */
  protected parseClassMembers(context: ParseContext): NodeList | null {
    const savedContext = this.currentContext;
    this.addParseContext(context);

    let varKeyword: TokenNode;  // Do not move, method optimization.

    let members: StatementNode[] = [];
    while (!this.tokenEndsContext(context, this.currentToken.kind)) {
      if (this.tokenStartsContext(context, this.currentToken.kind)) {
        switch (this.currentToken.kind) {
          case TokenKind.Const:
            members.push(this.parseClassConstantDeclaration([], context));
            break;
          case TokenKind.Function:
            members.push(this.parseMethodDeclaration([], ModifierFlags.None, context));
            break;
          case TokenKind.Use:
            members.push(this.parseTraitUse(context));
            break;
          case TokenKind.Var:
            varKeyword = this.eat(TokenKind.Var);
            members.push(this.parsePropertyDeclaration([varKeyword], context));
            break;
          default:
            // Modifier tokens.
            members.push(this.parseClassMemberDeclaration(context));
            break;
        }
      }
      else {
        // If an error occurs in a declaration or statement above a method
        // declaration, then its opening brace would normally be skipped,
        // which would then cause its closing brace to be treated as part of
        // the class declaration.
        this.skipBadMemberTokens();
      }
    }

    this.currentContext = savedContext;

    return members.length > 0 ? this.factory.createList(members) : null;
  }

  /**
   * @todo Document parseClassMemberDeclaration().
   */
  protected parseClassMemberDeclaration(context: ParseContext): StatementNode {
    // Anything that is not a modifier should have been handled by the caller.
    Debug.assert(this.getModifierFlag(this.currentToken.kind) !== ModifierFlags.None);

    let modifiers: TokenNode[] = [];
    let modifierFlags = this.parseClassMemberModifiers(modifiers, context);

    if (this.currentToken.kind === TokenKind.Const) {
      return this.parseClassConstantDeclaration(modifiers, context);
    }
    if (this.currentToken.kind === TokenKind.Function) {
      return this.parseMethodDeclaration(modifiers, modifierFlags, context);
    }
    if (this.isPropertyStart(this.currentToken.kind)) {
      return this.parsePropertyDeclaration(modifiers, context);
    }

    let code: ErrorCode;
    if (context === ParseContext.ClassMembers) {
      code = ErrorCode.ERR_ClassMemberExpected;
    }
    else {
      code = context === ParseContext.InterfaceMembers ? ErrorCode.ERR_InterfaceMemberExpected : ErrorCode.ERR_TraitMemberExpected;
    }
    modifiers[modifiers.length - 1] = this.addError(modifiers[modifiers.length - 1], code);
    return new IncompleteMemberNode(this.factory.createList(modifiers));
  }

  /**
   * Parses the modifiers of a class member declaration.
   */
  protected parseClassMemberModifiers(tokens: TokenNode[], context: ParseContext): ModifierFlags {
    let modifiers = ModifierFlags.None;

    let flag = this.getModifierFlag(this.currentToken.kind);
    while (flag !== ModifierFlags.None) {
      let keyword = this.eat(this.currentToken.kind);

      if (modifiers & flag) {
        keyword = this.addError(keyword, ErrorCode.ERR_DuplicateModifier, TokenKindInfo.getText(keyword.kind));
      }
      else if (context === ParseContext.InterfaceMembers && (flag === ModifierFlags.Abstract || flag === ModifierFlags.Final)) {
        keyword = this.addError(keyword, ErrorCode.ERR_BadInterfaceModifier);
      }
      else {
        if (flag & ModifierFlags.VisibilityMask) {
          if (modifiers & ModifierFlags.VisibilityMask) {
            keyword = this.addError(keyword, ErrorCode.ERR_MultipleVisibilityModifiers, TokenKindInfo.getText(keyword.kind));
          }
          if (flag !== ModifierFlags.Public && context === ParseContext.InterfaceMembers) {
            keyword = this.addError(keyword, ErrorCode.ERR_InterfaceMemberNotPublic);
          }
        }
        if (modifiers & ModifierFlags.Abstract || modifiers & ModifierFlags.Final) {
          // Since this token cannot be a duplicate, it must be the other.
          if (flag === ModifierFlags.Abstract || flag === ModifierFlags.Final) {
            keyword = this.addError(keyword, ErrorCode.ERR_AbstractMemberIsFinal);
          }
        }
        if (this.isAbstractAndPrivate(modifiers, flag)) {
          keyword = this.addError(keyword, ErrorCode.ERR_AbstractMemberIsPrivate);
        }
      }

      modifiers = modifiers | flag;
      tokens.push(keyword);

      flag = this.getModifierFlag(this.currentToken.kind);
    }

    return modifiers;
  }

  /**
   * Parses a class member name.
   *
   * Syntax: `member-name`
   *
   * Where `member-name` is:
   * - `IDENTIFIER`
   * - `semi-reserved-keyword`
   */
  protected parseClassMemberName(code: ErrorCode, ...args: any[]): TokenNode {
    let member = this.isClassMemberIdentifier(this.currentToken.kind)
      ? this.eat(this.currentToken.kind)
      : this.createMissingTokenWithError(TokenKind.Identifier, code, ...args);
    return member;
  }

  /**
   * Parses the modifiers of a class declaration.
   *
   * All modifiers except `abstract` and `final` will generate a diagnostic.
   */
  protected parseClassModifiers(): NodeList | null {
    let tokens: TokenNode[] = [];
    let modifiers = ModifierFlags.None;

    let flag = this.getModifierFlag(this.currentToken.kind);
    while (flag !== ModifierFlags.None) {
      let keyword = this.eat(this.currentToken.kind);

      if (modifiers & flag) {
        keyword = this.addError(keyword, ErrorCode.ERR_DuplicateModifier, TokenKindInfo.getText(keyword.kind));
      }
      else if (flag & ModifierFlags.VisibilityMask || flag === ModifierFlags.Static) {
        keyword = this.addError(keyword, ErrorCode.ERR_BadTypeModifier, TokenKindInfo.getText(keyword.kind));
      }
      else if (modifiers & ModifierFlags.Abstract || modifiers & ModifierFlags.Final) {
        // Since this token cannot be a duplicate, it must be the other.
        if (flag === ModifierFlags.Abstract || flag === ModifierFlags.Final) {
          keyword = this.addError(keyword, ErrorCode.ERR_AbstractClassIsFinal);
        }
      }

      modifiers = modifiers | flag;
      tokens.push(keyword);

      flag = this.getModifierFlag(this.currentToken.kind);
    }

    return tokens.length > 0 ? this.factory.createList(tokens) : null;
  }

  /**
   * Parses a constant declaration statement.
   *
   * Syntax: `CONST const-list ;`
   *
   * Where `const-list` is:
   * - `const-list , const-element`
   * - `const-element`
   */
  protected parseConstantDeclaration(): ConstantDeclarationNode {
    let constKeyword = this.eat(TokenKind.Const);
    let constants = this.parseDelimitedList(ParseContext.ConstantDeclaration, TokenKind.Comma, TokenKind.Semicolon);
    let semicolon = this.isStatementEnd(this.currentToken.kind)
      ? this.parseStatementEnd()
      : this.createMissingTokenWithError(TokenKind.Semicolon, ErrorCode.ERR_CommaOrSemicolonExpected);
    return new ConstantDeclarationNode(constKeyword, constants, semicolon);
  }

  /**
   * Parses a single constant from a constant declaration statement.
   *
   * Syntax: `IDENTIFIER = expression`
   */
  protected parseConstantElement(): ConstantElementNode {
    let identifier = this.eat(TokenKind.Identifier);
    let equal = this.eat(TokenKind.Equal);

    // If the user is adding a constant and the identifier and '=' are missing
    // then the next expression may not be part of the assignment.
    //
    //   const A = 1,|  <-- cursor here
    //   $i++;
    //
    // In this case, simply create an artificial expression.
    let expression: ExpressionNode;
    if (identifier.isMissing && equal.isMissing) {
      let literal = this.createMissingToken(TokenKind.LNumber, this.currentToken.kind, false);
      expression = new LiteralNode(literal);
    }
    else {
      expression = this.parseExpression();
    }
    return new ConstantElementNode(identifier, equal, expression);
  }

  /**
   * Parses a continue statement.
   *
   * Syntax: `CONTINUE optional-expr ;`
   */
  protected parseContinue(): ContinueNode {
    let continueKeyword = this.eat(TokenKind.Continue);
    let depth: ExpressionNode | null = null;
    if (this.isExpressionStart(this.currentToken.kind)) {
      depth = this.parseBreakOrContinueDepth(TokenKind.Continue);
    }
    let semicolon = !this.isStatementEnd(this.currentToken.kind) && depth === null
      ? this.createMissingTokenWithError(TokenKind.Semicolon, ErrorCode.ERR_IterationDepthOrSemicolonExpected)
      : this.parseStatementEnd();
    return new ContinueNode(continueKeyword, depth, semicolon);
  }

  /**
   * Parses a declare statement.
   *
   * Syntax:
   * - `DECLARE ( const-list ) statement`
   * - `DECLARE ( const-list ) : statement-list ENDDECLARE ;`
   */
  protected parseDeclare(): DeclareNode | DeclareBlockNode {
    let declareKeyword = this.eat(TokenKind.Declare);
    let openParen = this.eat(TokenKind.OpenParen);

    let directives: Array<ConstantElementNode | TokenNode> = [];
    directives.push(this.parseConstantElement());

    // @todo Use parseDelimitedList() instead?
    while (this.currentToken.kind !== TokenKind.EOF && this.currentToken.kind !== TokenKind.CloseParen) {
      if (this.currentToken.kind === TokenKind.Comma || this.currentToken.kind === TokenKind.Identifier) {
        directives.push(this.eat(TokenKind.Comma));
        directives.push(this.parseConstantElement());
        continue;
      }

      if (this.isTokenValidInContexts(this.currentToken.kind)) {
        break;
      }

      this.skipToken();
    }

    let closeParen = this.currentToken.kind === TokenKind.CloseParen
      ? this.eat(TokenKind.CloseParen)
      : this.createMissingTokenWithError(TokenKind.CloseParen, ErrorCode.ERR_CommaOrCloseParenExpected);

    // Alternate syntax.
    if (this.currentToken.kind === TokenKind.Colon) {
      let colon = this.eat(TokenKind.Colon);
      let statements = this.parseList(ParseContext.DeclareBlockElements);
      let endDeclare = this.eat(TokenKind.EndDeclare);
      let semicolon = this.parseStatementEnd();
      return new DeclareBlockNode(
        declareKeyword,
        openParen,
        this.factory.createList(directives),
        closeParen,
        colon,
        statements,
        endDeclare,
        semicolon
      );
    }

    let statement = this.parseEmbeddedStatement(false, ErrorCode.ERR_StatementOrColonExpected);
    return new DeclareNode(
      declareKeyword,
      openParen,
      this.factory.createList(directives),
      closeParen,
      statement
    );
  }

  /**
   * Parses a do-while statement.
   *
   * Syntax: `DO statement WHILE ( expression ) ;`
   */
  protected parseDoWhile(): DoWhileNode {
    let doKeyword = this.eat(TokenKind.Do);
    let statement = this.parseEmbeddedStatement(false, ErrorCode.ERR_StatementExpected);
    let whileKeyword = this.eat(TokenKind.While);
    let openParen = this.eat(TokenKind.OpenParen);
    let condition = this.parseExpression();
    let closeParen = this.eat(TokenKind.CloseParen);
    let semicolon = this.parseStatementEnd();
    return new DoWhileNode(
      doKeyword,
      statement,
      whileKeyword,
      openParen,
      condition,
      closeParen,
      semicolon
    );
  }

  /**
   * Parses an echo expression.
   *
   * Syntax: `ECHO echo-list ;`
   *
   * Where `echo-list` is:
   * - `echo-list , expr`
   * - `expr`
   */
  protected parseEcho(): EchoNode {
    // Inline text should not reach this method.
    Debug.assert(this.currentToken.kind === TokenKind.Echo || this.currentToken.kind === TokenKind.OpenTagWithEcho);

    let echoKeyword = this.eat(this.currentToken.kind);
    let semicolon: TokenNode;

    let expressions: Array<ExpressionNode | TokenNode> = [];
    expressions.push(this.parseExpression());

    while (this.currentToken.kind === TokenKind.Comma) {
      expressions.push(this.eat(TokenKind.Comma));
      expressions.push(this.parseExpression());
    }

    semicolon = this.isStatementEnd(this.currentToken.kind)
      ? this.parseStatementEnd()
      : this.createMissingTokenWithError(TokenKind.Semicolon, ErrorCode.ERR_CommaOrSemicolonExpected);
    return new EchoNode(echoKeyword, this.factory.createList(expressions), semicolon);
  }

  /**
   * Parses an `elseif` clause of an if statement.
   *
   * Syntax: `ELSEIF ( expr ) statement`
   */
  protected parseElseIf(): ElseIfNode {
    let elseIfKeyword = this.eat(TokenKind.ElseIf);
    let openParen = this.eat(TokenKind.OpenParen);
    let condition = this.parseExpression();
    let closeParen = this.eat(TokenKind.CloseParen);
    let statement = this.parseEmbeddedStatement(true, ErrorCode.ERR_StatementExpected);
    return new ElseIfNode(elseIfKeyword, openParen, condition, closeParen, statement);
  }

  /**
   * Parses an `elseif` clause of an if statement (alternate syntax).
   *
   * Syntax: `ELSEIF ( expr ) : statement-list`
   */
  protected parseElseIfBlock(): ElseIfBlockNode {
    let elseIfKeyword = this.eat(TokenKind.ElseIf);
    let openParen = this.eat(TokenKind.OpenParen);
    let condition = this.parseExpression();
    let closeParen = this.eat(TokenKind.CloseParen);
    let colon = this.eat(TokenKind.Colon);
    let statements = this.parseList(ParseContext.IfBlockElements);
    return new ElseIfBlockNode(
      elseIfKeyword,
      openParen,
      condition,
      closeParen,
      colon,
      statements
    );
  }

  /**
   * Parses a single statement or, if the statement is missing, an empty
   * statement is created with a diagnostic.
   *
   * @param {boolean} warnIfEmpty
   *   If `true` and the next token is a semicolon, then a warning is added to
   *   the generated empty statement.
   * @param {ErrorCode} code
   *   An error code to use if the statement is missing.
   * @param {...any[]} args
   *   A list of arguments given to the diagnostic created if the statement is
   *   missing.
   */
  protected parseEmbeddedStatement(warnIfEmpty: boolean, code: ErrorCode, ...args: any[]): StatementNode {
    let statement: StatementNode;
    if (this.isStatementStart(this.currentToken.kind)) {
      if (this.currentToken.kind === TokenKind.Semicolon && warnIfEmpty) {
        statement = this.parseStatement();
        statement = this.addError(statement, ErrorCode.WRN_PossibleMistakenEmptyStatement);
      }
      else {
        statement = this.parseStatement();
      }
    }
    else {
      // Create an empty expression statement to act as our placeholder.
      let semicolon = this.createMissingToken(TokenKind.Semicolon, this.currentToken.kind, false);
      statement = new ExpressionStatementNode(null, semicolon);
      statement = this.addError(statement, code, ...args);
    }
    return statement;
  }

  /**
   * Parses a for statement (or its alternate syntax).
   *
   * Syntax:
   * - `FOR ( for-expr ; for-expr ; for-expr ) statement`
   * - `FOR ( for-expr ; for-expr ; for-expr ) : statement-list ENDFOR ;`
   */
  protected parseFor(): ForNode | ForBlockNode {
    let forKeyword = this.eat(TokenKind.For);
    let openParen = this.eat(TokenKind.OpenParen);

    let initializerExpressions = this.parseForExpressionList(TokenKind.Semicolon);
    let initializers = initializerExpressions.length > 0 ? this.factory.createList(initializerExpressions) : null;

    // Depending on what is being parsed and what is missing, semicolon errors
    // may not indicate the proper correction. For example, if a for statement
    // is being added:
    //
    //   for|  <-- cursor here
    //   $a;
    //
    // Instead of telling the user to add a semicolon after the statement, only
    // the missing open parenthesis is reported, and additional errors are
    // ignored.

    let firstSemicolon: TokenNode;
    if (!this.isStatementEnd(this.currentToken.kind)) {
      if (openParen.isMissing) {
        firstSemicolon = this.createMissingToken(TokenKind.Semicolon, this.currentToken.kind, false);
      }
      else {
        let code = initializers !== null ? ErrorCode.ERR_CommaOrSemicolonExpected : ErrorCode.ERR_ExpressionOrSemicolonExpected;
        firstSemicolon = this.createMissingTokenWithError(TokenKind.Semicolon, code);
      }
    }
    else {
      firstSemicolon = this.parseStatementEnd();
    }

    let conditionExpressions = this.parseForExpressionList(TokenKind.Semicolon);
    let conditions = conditionExpressions.length > 0 ? this.factory.createList(conditionExpressions) : null;

    let secondSemicolon: TokenNode;
    if (!this.isStatementEnd(this.currentToken.kind)) {
      if (openParen.isMissing || firstSemicolon.isMissing) {
        secondSemicolon = this.createMissingToken(TokenKind.Semicolon, this.currentToken.kind, false);
      }
      else {
        let code = conditions !== null ? ErrorCode.ERR_CommaOrSemicolonExpected : ErrorCode.ERR_ExpressionOrSemicolonExpected;
        secondSemicolon = this.createMissingTokenWithError(TokenKind.Semicolon, code);
      }
    }
    else {
      secondSemicolon = this.parseStatementEnd();
    }

    let iterationExpressions = this.parseForExpressionList(TokenKind.CloseParen);
    let iterations = iterationExpressions.length > 0 ? this.factory.createList(iterationExpressions) : null;

    let closeParen: TokenNode;
    if (this.currentToken.kind === TokenKind.CloseParen) {
      closeParen = this.eat(TokenKind.CloseParen);
    }
    else if (openParen.isMissing || firstSemicolon.isMissing || secondSemicolon.isMissing) {
      closeParen = this.createMissingToken(TokenKind.CloseParen, this.currentToken.kind, false);
    }
    else {
      let code: ErrorCode;
      if (iterationExpressions.length > 0) {
        let lastExpression = <ExpressionNode>iterationExpressions[iterationExpressions.length - 1];
        code = lastExpression.isMissing ? ErrorCode.ERR_CloseParenExpected : ErrorCode.ERR_CommaOrCloseParenExpected;
      }
      else {
        code = ErrorCode.ERR_ExpressionOrCloseParenExpected;
      }
      closeParen = this.createMissingTokenWithError(TokenKind.CloseParen, code);
    }

    // Alternate syntax.
    if (this.currentToken.kind === TokenKind.Colon) {
      let colon = this.eat(TokenKind.Colon);
      let statements = this.parseList(ParseContext.ForBlockElements);
      let endForKeyword = this.eat(TokenKind.EndFor);
      let semicolon = this.parseStatementEnd();
      return new ForBlockNode(
        forKeyword,
        openParen,
        initializers,
        firstSemicolon,
        conditions,
        secondSemicolon,
        iterations,
        closeParen,
        colon,
        statements,
        endForKeyword,
        semicolon
      );
    }

    let statement = this.parseEmbeddedStatement(true, ErrorCode.ERR_StatementOrColonExpected);
    return new ForNode(
      forKeyword,
      openParen,
      initializers,
      firstSemicolon,
      conditions,
      secondSemicolon,
      iterations,
      closeParen,
      statement
    );
  }

  /**
   * Parses a comma-separated list of expressions within a for statement.
   */
  protected parseForExpressionList(terminator: TokenKind): Array<ExpressionNode | TokenNode> {
    let expressions: Array<ExpressionNode | TokenNode> = [];

    if (this.isExpressionStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.Comma) {
      expressions.push(this.parseExpression());
    }

    let kind = this.currentToken.kind;  // WARNING: Side-effects!
    while (kind !== TokenKind.CloseParen && kind !== TokenKind.Semicolon && kind !== TokenKind.EOF) {
      if (this.isExpressionStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.Comma) {
        expressions.push(this.eat(TokenKind.Comma));
        expressions.push(this.parseExpression());
        kind = this.currentToken.kind;
        continue;
      }

      if (this.isTokenValidInContexts(this.currentToken.kind)) {
        break;
      }

      this.skipBadForExpressionListTokens(terminator);
      kind = this.currentToken.kind;
    }

    return expressions;
  }

  /**
   * Parses a foreach statement.
   *
   * Syntax:
   * - `FOREACH ( expr AS foreach-value ) statement`
   * - `FOREACH ( expr AS foreach-value ) : statement-list ENDFOREACH ;`
   * - `FOREACH ( expr AS expr => foreach-value ) statement`
   * - `FOREACH ( expr AS expr => foreach-value ) : statement-list ENDFOREACH ;`
   *
   * Where `foreach-value` is:
   * - `expr`
   * - `& expr`
   * - `LIST ( list-elements )`
   * - `[ list-elements ]`
   */
  protected parseForEach(): ForEachNode | ForEachBlockNode {
    let forEachKeyword = this.eat(TokenKind.ForEach);
    let openParen = this.eat(TokenKind.OpenParen);
    let sourceExpr = this.parseExpression();
    let asKeyword = this.eat(TokenKind.As);

    let isValue = true;
    let ampersand: TokenNode | null = null;
    let value: ExpressionNode | ListDestructureNode;

    // Array keys cannot be lists, nor can they be accessed by reference, so
    // if either is found, the first expression represents the value element.

    switch (this.currentToken.kind) {
      case TokenKind.Ampersand:
        ampersand = this.eat(TokenKind.Ampersand);
        value = this.parseExpression(ExpressionType.Explicit);
        break;
      case TokenKind.List:
        value = this.parseListDestructure();
        break;
      default:
        value = this.parseForEachVariable();
        isValue = (value instanceof ArrayNode && value.arrayKeyword === null);
        break;
    }

    let doubleArrow: TokenNode | null = null;
    let key: ExpressionNode | null = null;

    // NOTE: While PHP allows parsing of these invalid key expressions, the
    // resulting statement always results in an error ("key element cannot be
    // a reference" and "cannot use list as key element").

    if (this.currentToken.kind === TokenKind.DoubleArrow && !isValue) {
      key = <ExpressionNode>value;
      doubleArrow = this.eat(TokenKind.DoubleArrow);

      // Suppress TS2365: Current token changed after previous method call.
      switch (<TokenKind>this.currentToken.kind) {
        case TokenKind.Ampersand:
          ampersand = this.eat(TokenKind.Ampersand);
          value = this.parseExpression(ExpressionType.Explicit);
          break;
        case TokenKind.List:
          value = this.parseListDestructure();
          break;
        default:
          value = this.parseForEachVariable();
          break;
      }
    }

    let code = !isValue && doubleArrow === null
      ? ErrorCode.ERR_DoubleArrowOrCloseParenExpected
      : ErrorCode.ERR_CloseParenExpected;
    let closeParen = this.currentToken.kind === TokenKind.CloseParen
      ? this.eat(TokenKind.CloseParen)
      : this.createMissingTokenWithError(TokenKind.CloseParen, code);

    if (this.currentToken.kind === TokenKind.Colon) {
      let colon = this.eat(TokenKind.Colon);
      let statements = this.parseList(ParseContext.ForEachBlockElements);
      let endForEach = this.eat(TokenKind.EndForEach);
      let semicolon = this.parseStatementEnd();
      return new ForEachBlockNode(
        forEachKeyword,
        openParen,
        sourceExpr,
        asKeyword,
        key,
        doubleArrow,
        ampersand,
        value,
        closeParen,
        colon,
        statements,
        endForEach,
        semicolon
      );
    }

    let statement = this.parseEmbeddedStatement(true, ErrorCode.ERR_StatementOrColonExpected);
    return new ForEachNode(
      forEachKeyword,
      openParen,
      sourceExpr,
      asKeyword,
      key,
      doubleArrow,
      ampersand,
      value,
      closeParen,
      statement
    );
  }

  /**
   * @todo Document parseForEachVariable().
   */
  protected parseForEachVariable(): ExpressionNode {
    // Due to a rather unfortunate ambiguity in PHP's grammar, an array
    // initializer and deconstruction may have the exact same syntax.
    //
    //   foreach ($a as [$b, $c]()->d) {}  // Equivalent to `$b::$c()->d`.
    //                  ^-- parser here
    //
    // In the above scenario, the parser does not know if the opening bracket
    // should start a deconstruction or an array initializer and as a result,
    // needs to parse it as either. Sadly, this means that invalid
    // array initializers are not syntax errors.
    //
    //   [,$a]   // Valid deconstruction, invalid array.
    //
    let expr = this.parseExpressionTree();
    let value = <ExpressionNode>expr.node;
    // The only diagnostic that can be added is for implicit expressions that
    // are not short-form arrays.
    if (!value.containsDiagnostics && expr.type !== ExpressionType.Explicit && !(value instanceof ArrayNode && value.arrayKeyword === null)) {
      value = this.addError(value, ErrorCode.ERR_ExpressionNotAddressable);
    }
    return value;
  }

  /**
   * Parses a qualified name that begins with a namespace separator.
   */
  protected parseFullyQualifiedName(): FullyQualifiedNameNode {
    let leadingBackslash = this.eat(TokenKind.Backslash);
    let namespaceName = this.factory.createList(this.parseNamespaceName());
    return new FullyQualifiedNameNode(leadingBackslash, namespaceName);
  }

  /**
   * Parses a function declaration statement.
   *
   * Syntax: `FUNCTION & IDENTIFIER ( parameter-list ) return-type statement-block`
   */
  protected parseFunctionDeclaration(functionKeyword: TokenNode, ampersand: TokenNode | null): FunctionDeclarationNode {
    // The caller should have checked if the name is valid.
    Debug.assert(this.isFunctionIdentifier(this.currentToken.kind));

    let identifier = this.eat(this.currentToken.kind);
    let parameters = this.parseParameterList();
    let colon = this.eatOptional(TokenKind.Colon);
    let returnType = colon ? this.parseType() : null;

    let openBrace = this.currentToken.kind !== TokenKind.OpenBrace && colon === null
      ? this.createMissingTokenWithError(TokenKind.OpenBrace, ErrorCode.ERR_OpenBraceOrColonExpected)
      : this.eat(TokenKind.OpenBrace);
    let statements = this.parseList(ParseContext.CompoundStatementElements);
    let closeBrace = openBrace.isMissing
      ? this.createMissingToken(TokenKind.CloseBrace, this.currentToken.kind, false)
      : this.eat(TokenKind.CloseBrace);
    return new FunctionDeclarationNode(
      functionKeyword,
      ampersand,
      identifier,
      parameters.openParen,
      parameters.parameterList,
      parameters.closeParen,
      colon,
      returnType,
      new StatementBlockNode(openBrace, statements, closeBrace)
    );
  }

  /**
   * Parses a global variable declaration statement.
   *
   * Syntax: `GLOBAL global-variable-list ;`
   *
   * Where `global-variable-list` is:
   * - `global-variable-list , simple-variable`
   * - `simple-variable`
   */
  protected parseGlobal(): GlobalNode {
    let globalKeyword = this.eat(TokenKind.Global);

    let variables: Array<TokenNode | VariableNode> = [];
    variables.push(this.parseSimpleVariable());

    while (this.currentToken.kind === TokenKind.Comma) {
      variables.push(this.eat(TokenKind.Comma));
      variables.push(this.parseSimpleVariable());
    }

    let semicolon = this.isStatementEnd(this.currentToken.kind)
      ? this.parseStatementEnd()
      : this.createMissingTokenWithError(TokenKind.Semicolon, ErrorCode.ERR_CommaOrSemicolonExpected);
    return new GlobalNode(globalKeyword, this.factory.createList(variables), semicolon);
  }

  /**
   * Parses a goto statement.
   *
   * Syntax: `GOTO IDENTIFIER ;`
   */
  protected parseGoTo(): GoToNode {
    let gotoKeyword = this.eat(TokenKind.GoTo);
    let label = this.eat(TokenKind.Identifier);
    let semicolon = this.parseStatementEnd();
    return new GoToNode(gotoKeyword, label, semicolon);
  }

  /**
   * Parses a halt compiler statement.
   *
   * Syntax: `HALT_COMPILER ( ) ;`
   */
  protected parseHaltCompiler(): HaltCompilerNode {
    let haltKeyword = this.eat(TokenKind.HaltCompiler);
    let openParen = this.eat(TokenKind.OpenParen);
    let closeParen = this.eat(TokenKind.CloseParen);
    let semicolon = this.parseStatementEnd();

    // The caller will determine the context and, if necessary, stop the parser.
    return new HaltCompilerNode(haltKeyword, openParen, closeParen, semicolon);
  }

  /**
   * Parses an if statement.
   *
   * Syntax:
   * - `if-statement`
   * - `if-statement ELSE statement`
   *
   * Where `if-statement` is:
   * - `IF ( expr ) statement`
   * - `IF ( expr ) statement elseif-clause`
   */
  protected parseIf(): IfNode | IfBlockNode {
    let ifKeyword = this.eat(TokenKind.If);
    let openParen = this.eat(TokenKind.OpenParen);
    let condition = this.parseExpression();
    let closeParen = this.eat(TokenKind.CloseParen);

    // Alternate syntax.
    if (this.currentToken.kind === TokenKind.Colon) {
      let colon = this.eat(TokenKind.Colon);
      let statements = this.parseList(ParseContext.IfBlockElements);

      let elseIfClauses: ElseIfBlockNode[] = [];
      // Suppress TS2365: Current token changed after previous method call.
      while (<TokenKind>this.currentToken.kind === TokenKind.ElseIf) {
        elseIfClauses.push(this.parseElseIfBlock());
      }

      let elseClause: ElseBlockNode | null = null;
      // Suppress TS2365: Current token changed after previous method call.
      if (<TokenKind>this.currentToken.kind === TokenKind.Else) {
        let elseKeyword = this.eat(TokenKind.Else);
        let elseColon = this.eat(TokenKind.Colon);
        let elseStatements = this.parseList(ParseContext.IfElseBlockElements);
        elseClause = new ElseBlockNode(elseKeyword, elseColon, elseStatements);
      }

      let endIf = this.eat(TokenKind.EndIf);
      let semicolon = this.parseStatementEnd();
      return new IfBlockNode(
        ifKeyword,
        openParen,
        condition,
        closeParen,
        colon,
        statements,
        elseIfClauses.length > 0 ? this.factory.createList(elseIfClauses) : null,
        elseClause,
        endIf,
        semicolon
      );
    }

    let statement = this.parseEmbeddedStatement(true, ErrorCode.ERR_StatementOrColonExpected);

    let elseIfClauses: ElseIfNode[] = [];
    while (this.currentToken.kind === TokenKind.ElseIf) {
      elseIfClauses.push(this.parseElseIf());
    }

    let elseClause: ElseNode | null = null;
    if (this.currentToken.kind === TokenKind.Else) {
      let elseKeyword = this.eat(TokenKind.Else);
      let elseStatement = this.parseEmbeddedStatement(true, ErrorCode.ERR_StatementExpected);
      elseClause = new ElseNode(elseKeyword, elseStatement);
    }

    return new IfNode(
      ifKeyword,
      openParen,
      condition,
      closeParen,
      statement,
      elseIfClauses.length > 0 ? this.factory.createList(elseIfClauses) : null,
      elseClause
    );
  }

  /**
   * Parses inline text (which actually gets treated as an echo statement).
   *
   * Syntax: `INLINE_TEXT`
   */
  protected parseInlineText(): EchoNode {
    let inlineText = this.eat(TokenKind.InlineText);
    let exprList = this.factory.createList([inlineText]);
    // Fun fact: TypeScript sucks! Note the lack of an error in:
    //   new EchoNode(null, inlineText, null);
    return new EchoNode(null, exprList, null);
  }

  /**
   * Parses an interface declaration statement.
   *
   * Syntax: `INTERFACE IDENTIFIER interface-base-clause { interface-member-declarations }`
   *
   * Where `interface-base-clause` is:
   * - `EXTENDS qualified-name-list`
   */
  protected parseInterfaceDeclaration(): InterfaceDeclarationNode {
    let interfaceKeyword = this.eat(TokenKind.Interface);
    let identifier = this.eat(TokenKind.Identifier);

    let extendsKeyword = this.eatOptional(TokenKind.Extends);
    let baseInterfaces: NodeList | null = null;
    if (extendsKeyword !== null) {
      baseInterfaces = this.parseQualifiedNameList();
    }

    if (this.currentToken.kind === TokenKind.Implements) {
      this.skipTokenWithError(ErrorCode.ERR_InterfaceImplementsList);
    }

    let openBrace: TokenNode;
    if (this.currentToken.kind !== TokenKind.OpenBrace) {
      let code = extendsKeyword !== null ? ErrorCode.ERR_CommaOrOpenBraceExpected : ErrorCode.ERR_IncompleteInterfaceDeclaration;
      openBrace = this.createMissingTokenWithError(TokenKind.OpenBrace, code);
    }
    else {
      openBrace = this.eat(TokenKind.OpenBrace);
    }

    let members: NodeList | null = null;
    if (!identifier.isMissing && !openBrace.isMissing) {
      members = this.parseClassMembers(ParseContext.InterfaceMembers);
    }

    let closeBrace = openBrace.isMissing
      ? this.createMissingToken(TokenKind.CloseBrace, this.currentToken.kind, false)
      : this.eat(TokenKind.CloseBrace);

    return new InterfaceDeclarationNode(
      interfaceKeyword,
      identifier,
      extendsKeyword,
      baseInterfaces,
      openBrace,
      members,
      closeBrace
    );
  }

  /**
   * Parses a method declaration statement.
   *
   * Syntax: `modifiers FUNCTION & member-name ( parameter-list ) return-type method-body`
   *
   * Where `method-body` is:
   * - `statement-block`
   * - `;`
   *
   * @param {TokenNode[]} modifiers
   *   A list of previously parsed modifier keywords.
   * @param {ModifierFlags} modifierFlags
   *   A bit field representing all the modifiers that were parsed.
   * @param {ParseContext} context
   *   The context that this declaration should be parsed in.
   */
  protected parseMethodDeclaration(modifiers: TokenNode[], modifierFlags: ModifierFlags, context: ParseContext): MethodDeclarationNode {
    let functionKeyword = this.eat(TokenKind.Function);
    let ampersand = this.eatOptional(TokenKind.Ampersand);
    let identifier = this.parseClassMemberName(ampersand !== null ? ErrorCode.ERR_MethodNameExpected : ErrorCode.ERR_MethodNameOrAmpersandExpected);
    let parameters = this.parseParameterList();
    let colon = this.eatOptional(TokenKind.Colon);
    let returnType = colon ? this.parseType() : null;

    let statements: StatementBlockNode | null = null;
    let semicolon: TokenNode | null = null;

    // If there is an opening brace, then unconditionally parse a statement
    // block, even if this is an abstract method or if this declaration is
    // inside an interface. This should allow for a more useful error message,
    // and prevent the parser from getting too far off track.
    let isInterfaceOrAbstract = context === ParseContext.InterfaceMembers || modifierFlags & ModifierFlags.Abstract;
    if (this.currentToken.kind !== TokenKind.OpenBrace && isInterfaceOrAbstract) {
      semicolon = this.isStatementEnd(this.currentToken.kind)
        ? this.parseStatementEnd()
        : this.createMissingTokenWithError(TokenKind.Semicolon, ErrorCode.ERR_ColonOrSemicolonExpected);
    }
    else {
      let openBrace: TokenNode;
      if (this.currentToken.kind === TokenKind.OpenBrace) {
        openBrace = this.eat(TokenKind.OpenBrace);
        if (context === ParseContext.InterfaceMembers) {
          // @todo Test: Diagnostic priority over ERR_AbstractMethodHasBody.
          openBrace = this.addError(openBrace, ErrorCode.ERR_InterfaceMethodDefinition);
        }
        if (modifierFlags & ModifierFlags.Abstract) {
          openBrace = this.addError(openBrace, ErrorCode.ERR_AbstractMethodHasBody);
        }
      }
      else {
        let code = colon !== null ? ErrorCode.ERR_OpenBraceExpected : ErrorCode.ERR_OpenBraceOrColonExpected;
        openBrace = this.createMissingTokenWithError(TokenKind.OpenBrace, code);
      }

      let statementList = this.parseList(ParseContext.CompoundStatementElements);
      let closeBrace = openBrace.isMissing
        ? this.createMissingToken(TokenKind.CloseBrace, this.currentToken.kind, false)
        : this.eat(TokenKind.CloseBrace);

      statements = new StatementBlockNode(openBrace, statementList, closeBrace);
    }

    // A method body must be present or explicitly ommitted (even if the
    // semicolon token is missing).
    Debug.assert(!(statements === null && semicolon === null));

    return new MethodDeclarationNode(
      modifiers.length > 0 ? this.factory.createList(modifiers) : null,
      functionKeyword,
      ampersand,
      identifier,
      parameters.openParen,
      parameters.parameterList,
      parameters.closeParen,
      colon,
      returnType,
      statements,
      semicolon
    );
  }

  /**
   * Parses a namespace declaration.
   *
   * Syntax:
   * - `NAMESPACE name;`
   * - `NAMESPACE name { namespaced-statement-list }`
   * - `NAMESPACE { namespaced-statement-list }`
   */
  protected parseNamespaceDeclaration(namespaceKeyword: TokenNode): NamespaceDeclarationNode | NamespaceGroupDeclarationNode {
    // The next token should not be missing or part of a relative name.
    Debug.assert(this.currentToken.kind === TokenKind.Identifier || this.currentToken.kind === TokenKind.OpenBrace);

    // NOTE: While PHP will generate an error when mixed namespace declaration
    // types are used in a file, there is nothing in the language grammar that
    // makes such a statement invalid. As such, it is strictly a semantic issue
    // and not prohibited by this parser.

    // Global namespace.
    if (this.currentToken.kind === TokenKind.OpenBrace) {
      let openBrace = this.eat(TokenKind.OpenBrace);
      let statements = this.parseList(ParseContext.NamespaceElements);
      let closeBrace = this.eat(TokenKind.CloseBrace);
      return new NamespaceGroupDeclarationNode(namespaceKeyword, null, openBrace, statements, closeBrace);
    }

    let name = this.parsePartiallyQualifiedName();

    // Suppress TS2365: Current token changed after previous method call.
    if (<TokenKind>this.currentToken.kind === TokenKind.OpenBrace) {
      let openBrace = this.eat(TokenKind.OpenBrace);
      let statements = this.parseList(ParseContext.NamespaceElements);
      let closeBrace = this.eat(TokenKind.CloseBrace);
      return new NamespaceGroupDeclarationNode(namespaceKeyword, name, openBrace, statements, closeBrace);
    }

    let semicolon = this.isStatementEnd(this.currentToken.kind)
      ? this.parseStatementEnd()
      : this.createMissingTokenWithError(TokenKind.Semicolon, ErrorCode.ERR_OpenBraceOrSemicolonExpected);

    return new NamespaceDeclarationNode(namespaceKeyword, name, semicolon);
  }

  /**
   * Parses a delimited list of tokens representing a name.
   *
   * @param {boolean=} noTrailingBackslash
   *   If `true`, a missing identifier is appended to the list of returned
   *   tokens if an unrecognized token is found after a namespace separator.
   *
   * @return {TokenNode[]}
   *   A list of tokens making up the name. An actual node to contain these
   *   tokens must be created by the caller.
   */
  protected parseNamespaceName(noTrailingBackslash = true): TokenNode[] {
    let namespaces: TokenNode[] = [];
    let identifier = this.currentToken.kind === TokenKind.Identifier
      ? this.eat(TokenKind.Identifier)
      : this.createMissingToken(TokenKind.Identifier, this.currentToken.kind, false);

    namespaces.push(identifier);

    if (identifier.isMissing) {
      // @todo This is not the ideal error code in every situation.
      namespaces[0] = this.addError(namespaces[0], ErrorCode.ERR_IdentifierExpected);
      return namespaces;
    }

    while (this.currentToken.kind === TokenKind.Backslash) {
      namespaces.push(this.eat(TokenKind.Backslash));

      // If the next token is an identifier or another backslash, then eat an
      // identifier (which should be missing in the latter case). If it is
      // something else, then only add a missing identifier token if allowed.

      // @todo Needs IDE testing.

      // Suppress TS2365: Current token changed after previous method call.
      let kind = <TokenKind>this.currentToken.kind;
      if (kind === TokenKind.Identifier || kind === TokenKind.Backslash || noTrailingBackslash) {
        namespaces.push(this.eat(TokenKind.Identifier));
      }
    }

    return namespaces;
  }

  /**
   * Parses a single parameter within a function or method's parameter list.
   *
   * Syntax:
   * - `type & ELLIPSIS VARIABLE`
   * - `type & ELLIPSIS VARIABLE = expr`
   */
  protected parseParameter(): ParameterNode {
    let type: NamedTypeNode | PredefinedTypeNode | null = null;
    if (this.isTypeStart(this.currentToken.kind)) {
      type = this.parseType();
    }

    let ampersand = this.eatOptional(TokenKind.Ampersand);
    let variadic = this.eatOptional(TokenKind.Ellipsis);
    let variable: TokenNode;
    if (this.currentToken.kind === TokenKind.Dollar) {
      variable = this.eat(TokenKind.Dollar);
      variable = this.addError(variable, ErrorCode.ERR_VariableNameExpected);
    }
    else {
      if (this.currentToken.kind !== TokenKind.Variable) {
        // From right to left, determine what could still be expected.
        let code: ErrorCode;
        if (variadic !== null) {
          code = ErrorCode.ERR_VariableExpected;
        }
        else if (ampersand !== null) {
          code = ErrorCode.ERR_VariableOrEllipsisExpected;
        }
        else {
          code = type !== null ? ErrorCode.ERR_IncompleteParameter : ErrorCode.ERR_ParameterExpected;
        }
        variable = this.createMissingTokenWithError(TokenKind.Variable, code);
      }
      else {
        variable = this.eat(TokenKind.Variable);
      }
    }
    let equal = this.eatOptional(TokenKind.Equal);
    if (variadic !== null && equal !== null) {
      equal = this.addError(equal, ErrorCode.ERR_VariadicHasDefaultValue);
    }
    let defaultValue = equal !== null ? this.parseExpression() : null;

    return new ParameterNode(type, ampersand, variadic, variable, equal, defaultValue);
  }

  /**
   * Parses a comma separated list of parameters.
   *
   * Syntax: `( parameter-list )`
   *
   * Where `parameter-list` is:
   * - `parameter-list , parameter`
   * - `parameter`
   */
  protected parseParameterList(): Parameters {
    let parameters: Array<ParameterNode | TokenNode> = [];
    let variadicIndex = -1;

    let openParen = this.eat(TokenKind.OpenParen);

    // const savedContext = this.currentContext;
    // this.addParseContext(ParseContext.ParameterListElements);

    if (this.isParameterStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.Comma) {
      let parameter = this.parseParameter();
      parameters.push(parameter);
      if (parameter.ellipsis) {
        variadicIndex = 0;
      }
    }

    // @todo Replace with tokenEndsContext()?
    while (this.currentToken.kind !== TokenKind.CloseParen && this.currentToken.kind !== TokenKind.EOF) {
      if (this.isParameterStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.Comma) {
        parameters.push(this.eat(TokenKind.Comma));

        let parameter = this.parseParameter();
        parameters.push(parameter);
        if (parameter.ellipsis !== null && variadicIndex === -1) {
          variadicIndex = parameters.length - 1;
        }

        continue;
      }

      if (this.isTokenValidInContexts(this.currentToken.kind)) {
        break;
      }

      this.skipBadParameterListTokens();
    }

    if (variadicIndex !== -1 && variadicIndex < parameters.length - 1) {
      parameters[variadicIndex] = this.addError(parameters[variadicIndex], ErrorCode.ERR_VariadicIsNotLastParameter);
    }

    // this.currentContext = savedContext;

    let closeParen: TokenNode;
    if (openParen.isMissing) {
      closeParen = this.createMissingToken(TokenKind.CloseParen, this.currentToken.kind, false);
    }
    else if (this.currentToken.kind === TokenKind.CloseParen) {
      closeParen = this.eat(TokenKind.CloseParen);
    }
    else {
      let code: ErrorCode;
      if (parameters.length > 0) {
        let lastParameter = <ParameterNode>parameters[parameters.length - 1];
        if (lastParameter.ellipsis !== null) {
          code = ErrorCode.ERR_CloseParenExpected;
        }
        else if (lastParameter.equal !== null) {
          code = ErrorCode.ERR_CommaOrCloseParenExpected;
        }
        else {
          code = ErrorCode.ERR_IncompleteParameterList;
        }
      }
      else {
        code = ErrorCode.ERR_ParameterOrCloseParenExpected;
      }
      closeParen = this.createMissingTokenWithError(TokenKind.CloseParen, code);
    }

    // NOTE: Just like `InvocationArguments`, this temporary object is used to
    // standardize how parameter lists are parsed.
    return new Parameters(
      openParen,
      parameters.length > 0 ? this.factory.createList(parameters) : null,
      closeParen
    );
  }

  /**
   * Parses a name that starts with an identifier and may include namespaces.
   *
   * Syntax: `name`
   *
   * Where `name` is:
   * - `name \ IDENTIFIER`
   * - `IDENTIFIER`
   *
   * @see parseQualifiedName()
   */
  protected parsePartiallyQualifiedName(): PartiallyQualifiedNameNode {
    let namespaceName = this.factory.createList(this.parseNamespaceName());
    return new PartiallyQualifiedNameNode(namespaceName);
  }

  /**
   * Parses a property declaration statement.
   *
   * Syntax: `property-modifiers type property-list ;`
   *
   * Where `property-modifiers` is:
   * - `modifiers`
   * - `VAR`
   *
   * Where `property-list` is:
   * - `property-list , property-element`
   * - `property-element`
   *
   * @param {TokenNode[]} modifiers
   *   Previously parsed modifier keywords.
   * @param {ParseContext} context
   *   The parent parsing context (class, interface, or trait members).
   */
  protected parsePropertyDeclaration(modifiers: TokenNode[], context: ParseContext): PropertyDeclarationNode {
    for (let i = 0; i < modifiers.length; i++) {
      let modifier = this.getModifierFlag(modifiers[i].kind);
      if (modifier === ModifierFlags.Abstract || modifier === ModifierFlags.Final) {
        // Since these modifiers are already invalid within an interface, there
        // is no need to add another diagnostic.
        if (context !== ParseContext.InterfaceMembers) {
          modifiers[i] = this.addError(modifiers[i], ErrorCode.ERR_BadPropertyModifier);
        }
      }
    }

    // Even though 'callable' is semantically invalid, it is not a parse error.
    let type: NamedTypeNode | PredefinedTypeNode | null = null;
    if (this.isTypeStart(this.currentToken.kind)) {
      type = this.parseType();
      if (!this.isSupportedVersion(PhpVersion.PHP7_4)) {
        type = this.addError(type, ErrorCode.ERR_FeatureTypedProperties);
      }
    }

    let property = this.parsePropertyElement();
    if (context === ParseContext.InterfaceMembers) {
      property = this.addError(property, ErrorCode.ERR_InterfaceProperty);
    }

    // Shouldn't be able to parse a property without seeing one of these first.
    // @todo Attempt to parse for error recovery and assume 'public'?
    Debug.assert(modifiers.length > 0);

    let nodes: Array<PropertyElementNode | TokenNode> = [];
    nodes.push(property);
    while (this.currentToken.kind === TokenKind.Comma) {
      nodes.push(this.eat(TokenKind.Comma));
      nodes.push(this.parsePropertyElement());
    }

    let semicolon: TokenNode;
    if (this.isStatementEnd(this.currentToken.kind)) {
      semicolon = this.parseStatementEnd();
    }
    else {
      let lastProperty = <PropertyElementNode>nodes[nodes.length - 1];
      let code = lastProperty.equal !== null ? ErrorCode.ERR_CommaOrSemicolonExpected : ErrorCode.ERR_IncompletePropertyDeclaration;
      semicolon = this.createMissingTokenWithError(TokenKind.Semicolon, code);
    }

    return new PropertyDeclarationNode(
      this.factory.createList(modifiers),
      type,
      this.factory.createList(nodes),
      semicolon
    );
  }

  /**
   * Parses the declaration of an individual property.
   *
   * Syntax: `property-element`
   *
   * Where `property-element` is:
   * - `VARIABLE`
   * - `VARIABLE = expression` (technically `constant-expression`)
   */
  protected parsePropertyElement(): PropertyElementNode {
    let variable = this.parsePropertyName();
    let equal = this.eatOptional(TokenKind.Equal);
    let expression = equal !== null ? this.parseExpression() : null;
    return new PropertyElementNode(variable, equal, expression);
  }

  /**
   * Parses a property name.
   *
   * Syntax: `VARIABLE`
   */
  protected parsePropertyName(): TokenNode {
    // If the user is declaring the property then a trailing '$' would simply
    // be skipped and added to trailing trivia.
    //
    //   public $
    //
    // If the user is renaming a property, then subsequent tokens have a high
    // probability of being successfully parsed here.
    //
    //   public $ = 1;      -or-
    //   public $a = 1, $;
    //
    // In both cases, the diagnostic message is much better than PHP's
    // "expecting function or const" error, which isn't even close to what the
    // user was trying to do.

    let variable: TokenNode;
    if (this.currentToken.kind === TokenKind.Dollar) {
      variable = this.eat(TokenKind.Dollar);
      variable = this.addError(variable, ErrorCode.ERR_PropertyNameExpected);
    }
    else {
      variable = this.currentToken.kind === TokenKind.Variable
        ? this.eat(TokenKind.Variable)
        : this.createMissingTokenWithError(TokenKind.Variable, ErrorCode.ERR_PropertyExpected);
    }
    return variable;
  }

  /**
   * Parses a potentially qualified identifier for name resolution.
   *
   * Syntax: `qualified-name`
   *
   * Where `qualified-name` is:
   * - `name`
   * - `\ name` (fully qualified)
   * - `NAMESPACE \ name` (relative)
   */
  protected parseQualifiedName(allowRelativeNames = true): NameNode {
    // @todo May want to re-design this to allow naming options.
    // - Use flags? FQN | Relative | NoTrailingBackslash
    // - Partially qualified names would always be allowed.
    switch (this.currentToken.kind) {
      case TokenKind.Backslash:
        return this.parseFullyQualifiedName();
      case TokenKind.Namespace:
        if (allowRelativeNames) {
          return this.parseRelativeName();
        }
        // Fall-through.
      default:
        // Expects an identifier, but creates a missing node otherwise.
        return this.parsePartiallyQualifiedName();
    }
  }

  /**
   * Parses a comma separated list of qualified names.
   */
  protected parseQualifiedNameList(): NodeList {
    let nodes: Array<NameNode | TokenNode> = [];

    // Depending on the desired error code, an alternative is to directly use
    // `parseQualifiedName()` instead.
    nodes.push(this.parseTypeName());

    while (this.currentToken.kind === TokenKind.Comma) {
      nodes.push(this.eat(TokenKind.Comma));
      nodes.push(this.parseTypeName());
    }

    return this.factory.createList(nodes);
  }

  /**
   * Parses a name that begins with a `NAMESPACE` token.
   */
  protected parseRelativeName(): RelativeNameNode {
    let namespaceKeyword = this.eat(TokenKind.Namespace);
    let leadingBackslash = this.eat(TokenKind.Backslash);
    let namespaceName = this.factory.createList(this.parseNamespaceName());
    return new RelativeNameNode(namespaceKeyword, leadingBackslash, namespaceName);
  }

  /**
   * Parses a return statement.
   *
   * Syntax: `RETURN optional-expr ;`
   */
  protected parseReturn(): ReturnNode {
    let returnKeyword = this.eat(TokenKind.Return);
    let expression = this.isExpressionStart(this.currentToken.kind) ? this.parseExpression() : null;
    let semicolon = expression === null && !this.isStatementEnd(this.currentToken.kind)
      ? this.createMissingTokenWithError(TokenKind.Semicolon, ErrorCode.ERR_ExpressionOrSemicolonExpected)
      : this.parseStatementEnd();
    return new ReturnNode(returnKeyword, expression, semicolon);
  }

  /**
   * Parses a static variable declaration statement.
   *
   * Syntax: `STATIC static-variable-list ;`
   *
   * Where `static-variable-list` is:
   * - `static-variable-list , static-variable`
   * - `static-variable`
   */
  protected parseStatic(staticKeyword: TokenNode): StaticNode {
    let variables: Array<StaticElementNode | TokenNode> = [];
    variables.push(this.parseStaticElement());

    while (this.currentToken.kind === TokenKind.Comma) {
      variables.push(this.eat(TokenKind.Comma));
      variables.push(this.parseStaticElement());
    }

    let semicolon: TokenNode;
    if (this.isStatementEnd(this.currentToken.kind)) {
      semicolon = this.parseStatementEnd();
    }
    else {
      let lastVariable = <StaticElementNode>variables[variables.length - 1];
      let code = lastVariable.equal !== null ? ErrorCode.ERR_CommaOrSemicolonExpected : ErrorCode.ERR_IncompleteStaticDeclaration;
      semicolon = this.createMissingTokenWithError(TokenKind.Semicolon, code);
    }

    return new StaticNode(staticKeyword, this.factory.createList(variables), semicolon);
  }

  /**
   * Parses a static variable with an optional initialization expression.
   *
   * Syntax:
   * - `VARIABLE`
   * - `VARIABLE = expr`
   */
  protected parseStaticElement(): StaticElementNode {
    // A '$' is usually an incomplete variable.
    if (this.currentToken.kind === TokenKind.Dollar) {
      let dollar = this.eat(TokenKind.Dollar);
      dollar = this.addError(dollar, ErrorCode.ERR_VariableNameExpected);
      return new StaticElementNode(dollar, null, null);
    }

    let variable = this.currentToken.kind === TokenKind.Variable
      ? this.eat(TokenKind.Variable)
      : this.createMissingTokenWithError(TokenKind.Variable, ErrorCode.ERR_VariableExpected);

    if (this.currentToken.kind === TokenKind.Equal) {
      let equal = this.eat(TokenKind.Equal);
      let expression = this.parseExpression();
      return new StaticElementNode(variable, equal, expression);
    }
    return new StaticElementNode(variable, null, null);
  }

  /**
   * Parses a list of statements within surrounding braces.
   *
   * Syntax: `{ statement-list }`
   *
   * Alias: `compound-statement`
   */
  protected parseStatementBlock(): StatementBlockNode {
    let openBrace = this.eat(TokenKind.OpenBrace);
    let statements = this.parseList(ParseContext.CompoundStatementElements);
    let closeBrace = openBrace.isMissing
      ? this.createMissingToken(TokenKind.CloseBrace, this.currentToken.kind, false)
      : this.eat(TokenKind.CloseBrace);
    return new StatementBlockNode(openBrace, statements, closeBrace);
  }

  /**
   * Parses a semicolon or closing tag.
   *
   * Syntax:
   * - `;`
   * - `?>`
   */
  protected parseStatementEnd(): TokenNode {
    // @todo Add a warning if a statement ends in a close tag?
    return this.currentToken.kind === TokenKind.Semicolon || this.currentToken.kind === TokenKind.CloseTag
      ? this.eat(this.currentToken.kind)
      : this.createMissingToken(TokenKind.Semicolon, this.currentToken.kind, true);
  }

  /**
   * Parses a switch statement.
   *
   * Syntax:
   * - `SWITCH ( expr ) { ; switch-case-list }`
   * - `SWITCH ( expr ) : ; switch-case-list ENDSWITCH ;`
   */
  protected parseSwitch(): SwitchNode | SwitchBlockNode {
    let switchKeyword = this.eat(TokenKind.Switch);
    let openParen = this.eat(TokenKind.OpenParen);
    let expression = this.parseExpression();
    let closeParen = this.eat(TokenKind.CloseParen);

    if (this.currentToken.kind === TokenKind.Colon) {
      let colon = this.eat(TokenKind.Colon);
      let caseSemicolon = this.eatOptional(TokenKind.Semicolon);

      // Suppress TS2365: Current token changed after previous method call.
      if (!colon.isMissing && caseSemicolon === null && <TokenKind>this.currentToken.kind === TokenKind.EndSwitch) {
        colon = this.addError(colon, ErrorCode.WRN_EmptySwitchBlock);
      }

      let caseClauses = !colon.isMissing
        ? this.parseSwitchElements(ParseContext.SwitchBlockElements)
        : null;

      let endSwitch = this.eat(TokenKind.EndSwitch);
      let semicolon = this.parseStatementEnd();
      return new SwitchBlockNode(
        switchKeyword,
        openParen,
        expression,
        closeParen,
        colon,
        caseSemicolon,
        caseClauses,
        endSwitch,
        semicolon
      );
    }

    let openBrace = this.currentToken.kind === TokenKind.OpenBrace
      ? this.eat(TokenKind.OpenBrace)
      : this.createMissingTokenWithError(TokenKind.OpenBrace, ErrorCode.ERR_OpenBraceOrColonExpected);
    let caseSemicolon = this.eatOptional(TokenKind.Semicolon);

    // There is no good reason for this; show the user the error of their ways.
    if (!openBrace.isMissing && caseSemicolon === null && this.currentToken.kind === TokenKind.CloseBrace) {
      openBrace = this.addError(openBrace, ErrorCode.WRN_EmptySwitchBlock);
    }

    let caseClauses: NodeList | null = null;
    if (!openBrace.isMissing) {
      caseClauses = this.parseSwitchElements(ParseContext.SwitchElements);
    }

    let closeBrace = openBrace.isMissing
      ? this.createMissingToken(TokenKind.CloseBrace, this.currentToken.kind, false)
      : this.eat(TokenKind.CloseBrace);
    return new SwitchNode(
      switchKeyword,
      openParen,
      expression,
      closeParen,
      openBrace,
      caseSemicolon,
      caseClauses,
      closeBrace
    );
  }

  /**
   * Parses a switch case or default clause.
   *
   * Syntax:
   * - `CASE expression case-separator statement-list`
   * - `DEFAULT case-separator statement-list`
   */
  protected parseSwitchCase(label: TokenNode): SwitchCaseNode {
    let specifier = label.kind === TokenKind.Case ? this.parseExpression() : null;
    let separator = this.currentToken.kind === TokenKind.Colon || this.currentToken.kind === TokenKind.Semicolon
      ? this.eat(this.currentToken.kind)
      : this.createMissingTokenWithError(TokenKind.Colon, ErrorCode.ERR_CaseLabelSeparatorExpected);

    let statements = this.parseList(ParseContext.CaseClauseElements);
    return new SwitchCaseNode(label, specifier, separator, statements);
  }

  /**
   * Parses a list of switch case or default clauses.
   *
   * Syntax: `switch-case-list`
   *
   * Where `switch-case-list` is:
   * - `switch-case-list switch-case-clause`
   * - `switch-case-list switch-default-clause`
   */
  protected parseSwitchElements(context: ParseContext): NodeList | null {
    let clauses: SwitchCaseNode[] = [];
    let hasDefault = false;

    const savedContext = this.currentContext;
    this.addParseContext(context);

    while (!this.tokenEndsContext(context, this.currentToken.kind)) {
      if (this.tokenStartsContext(context, this.currentToken.kind)) {
        let label = this.eat(this.currentToken.kind);
        if (label.kind === TokenKind.Default) {
          if (hasDefault) {
            // @todo Technically this check can be done later, which could
            //   allow this method to be merged with parseList().
            label = this.addError(label, ErrorCode.ERR_MultipleDefaultSwitchLabels);
          }
          hasDefault = true;
        }
        let switchCase = this.parseSwitchCase(label);
        clauses.push(switchCase);
        continue;
      }

      if (this.isTokenValidInContexts(this.currentToken.kind)) {
        break;
      }

      this.skipToken();
    }

    this.currentContext = savedContext;

    return clauses.length > 0 ? this.factory.createList(clauses) : null;
  }

  /**
   * Parses a throw statement.
   *
   * Syntax: `THROW expr ;`
   */
  protected parseThrow(): ThrowNode {
    let throwKeyword = this.eat(TokenKind.Throw);
    let expression = this.parseExpression();
    let semicolon = this.parseStatementEnd();
    return new ThrowNode(throwKeyword, expression, semicolon);
  }

  /**
   * Parses a list of trait adaptations.
   *
   * Syntax: `trait-adaptation-list`
   *
   * Where `trait-adaptation-list` is:
   * - `trait-adaptation-list trait-adaptation`
   * - `trait-adaptation`
   *
   * Where `trait-adaptation` is:
   * - `trait-alias ;`
   * - `trait-precedence ;`
   *
   * Where `trait-precedence` is:
   * - `method-reference INSTEADOF qualified-name-list`
   */
  protected parseTraitAdaptationList(): NodeList | null {
    let adaptations: Array<TraitAliasNode | TraitPrecedenceNode | IncompleteNamedTraitAdaptationNode | IncompleteReferencedTraitAdaptationNode> = [];

    while (this.currentToken.kind !== TokenKind.CloseBrace && this.currentToken.kind !== TokenKind.EOF) {
      if (!this.isTraitAdaptationStart(this.currentToken.kind)) {
        // Method names used in a trait adaptation can also be keywords that
        // would otherwise be valid in an enclosing context.
        this.skipBadTraitUseTokens();
        continue;
      }

      //         -------- qualified name --------
      //         identifier  namespace  backslash  keyword
      // method  y           y          n          y
      // class   y           y          y          n

      let className: NameNode;

      // If part of a relative name, then this keyword is part of a class name,
      // otherwise it is a method name (eliminate column 2).
      if (this.currentToken.kind === TokenKind.Namespace) {
        let namespaceKeyword = this.eat(this.currentToken.kind);
        // Suppress TS2365: Current token changed after previous method call.
        if (<TokenKind>this.currentToken.kind === TokenKind.Backslash) {
          let leadingBackslash = this.eat(this.currentToken.kind);
          let namespaceName = this.factory.createList(this.parseNamespaceName());
          className = new RelativeNameNode(namespaceKeyword, leadingBackslash, namespaceName);
        }
        else {
          let alias = this.parseTraitAlias(namespaceKeyword);
          adaptations.push(alias);
          continue;
        }
      }
      // Only class names can be fully qualified (eliminate column 3).
      else if (this.currentToken.kind === TokenKind.Backslash) {
        className = this.parseQualifiedName();
      }
      // Only method names can be semi-reserved keywords (eliminate column 4).
      else if (TokenKindInfo.isSemiReservedKeyword(this.currentToken.kind)) {
        let alias = this.parseTraitAlias(this.eat(this.currentToken.kind));
        adaptations.push(alias);
        continue;
      }
      else {
        Debug.assert(this.currentToken.kind === TokenKind.Identifier);
        let namespaces = this.parseNamespaceName();

        // So there are now two possibilities:
        // - If more than one token was parsed then the name was qualified, and
        //   is therefore a class name that is part of a method reference.
        // - If only one token was parsed then it could still be both, but the
        //   next token should be '::' if it was meant as a class name, or 'as'
        //   if it was meant as a method name.
        if (namespaces.length === 1) {
          if (this.currentToken.kind === TokenKind.As) {
            let alias = this.parseTraitAlias(namespaces[0]);
            adaptations.push(alias);
            continue;
          }

          // Now there are two possible error scenarios:
          //
          // 1. The user is adding an adaptation.
          //    use A {
          //      A|  <-- cursor here
          // 2. The user is editing an existing adaptation.
          //    use B {
          //      B| insteadof C;
          //       ^-- cursor here

          // So if there is nothing the parser can work with, bail out now.
          if (this.currentToken.kind !== TokenKind.DoubleColon && this.currentToken.kind !== TokenKind.InsteadOf) {
            namespaces[0] = this.addError(namespaces[0], ErrorCode.ERR_IncompleteTraitAdaptation);
            adaptations.push(new IncompleteNamedTraitAdaptationNode(namespaces[0]));
            continue;
          }
        }

        className = new PartiallyQualifiedNameNode(this.factory.createList(namespaces));
      }

      // At this point, only a class name is being parsed.
      let doubleColon = this.currentToken.kind === TokenKind.DoubleColon
        ? this.eat(TokenKind.DoubleColon)
        : this.createMissingTokenWithError(TokenKind.DoubleColon, ErrorCode.ERR_MalformedMethodReference);

      // Before parsing the method name however, consider if a user has gone
      // back to add a trait use clause:
      //
      // class A {
      //   use B {
      //     B::| <-- cursor here
      //   public function x() {}
      // }
      //
      // The next modifier or 'function' keyword may be part of a member
      // declaration instead of being a continuation of the adaptation's
      // method reference.

      let methodName: TokenNode;
      if (this.isPossibleMemberDeclarationStart()) {
        // Since it is far more likely that the adaptation is incomplete in
        // this case, create a missing name now instead of consuming the name
        // and complaining about a missing 'as' or 'insteadof' in the middle
        // of the following declaration.
        methodName = this.createMissingToken(TokenKind.Identifier, this.currentToken.kind, false);
      }
      else {
        // Otherwise, a possible name is on the same line.
        if (this.isClassMemberIdentifier(this.currentToken.kind)) {
          methodName = this.eat(this.currentToken.kind);

          // NOTE: There should be no error correction here. If the parser
          // encounters "<keyword> name" here, it cannot choose between:
          //
          //   A::<missing> <keyword> name  -or-
          //   A::<keyword> <missing> name
          //
          // Additionally the user could also be adding an adaptation:
          //
          //   use A {
          //     A::insteadof|  <-- cursor here
          //     name as name;
          //   }
          //
          // This may result in a slightly odd "keyword expected" error later.
        }
        else {
          methodName = this.createMissingToken(TokenKind.Identifier, this.currentToken.kind, false);
        }
      }

      if (methodName.isMissing) {
        methodName = this.addError(methodName, ErrorCode.ERR_MethodNameExpected);
      }

      // The reference is FINALLY complete!
      let reference = new MethodReferenceNode(className, doubleColon, methodName);

      switch (this.currentToken.kind) {
        case TokenKind.As:
          adaptations.push(this.parseTraitAlias(reference));
          break;
        case TokenKind.InsteadOf:
          let insteadOfKeyword = this.eat(TokenKind.InsteadOf);
          let names = this.parseQualifiedNameList();
          let semicolon = this.parseStatementEnd();
          adaptations.push(new TraitPrecedenceNode(reference, insteadOfKeyword, names, semicolon));
          break;
        default:
          // If there was a problem with the reference, then it should already
          // have a diagnostic that is more useful.
          if (!doubleColon.isMissing && !methodName.isMissing) {
            reference = this.addError(reference, ErrorCode.ERR_TraitAdaptationKeywordExpected);
          }
          adaptations.push(new IncompleteReferencedTraitAdaptationNode(reference));
          break;
      }
    }

    return adaptations.length > 0 ? this.factory.createList(adaptations) : null;
  }

  /**
   * Parses a trait alias adaptation.
   *
   * Syntax:
   * - `trait-method AS IDENTIFIER`
   * - `trait-method AS non-modifier-keywords`
   * - `trait-method AS modifier member-name`
   * - `trait-method AS modifier`
   *
   * Where `trait-method` is:
   * - `member-name`
   * - `method-reference`
   */
  protected parseTraitAlias(methodNameOrReference: MethodReferenceNode | TokenNode): TraitAliasNode {
    let asKeyword = this.eat(TokenKind.As);

    let modifier: TokenNode | null = null;
    let alias: TokenNode | null = null;

    // If a trait use statement is being added, the next token may be part of
    // a declaration on the following line.
    //
    //   class A {
    //     use B {
    //       foo as|  <-- cursor here
    //     public function x() {}
    //   }
    //
    // In which case, the alias should end, instead of creating additional
    // diagnostics in the declaration.

    if (this.isPossibleMemberDeclarationStart()) {
      alias = this.createMissingTokenWithError(TokenKind.Identifier, ErrorCode.ERR_MethodNameExpected);
    }
    else {
      let flag = this.getModifierFlag(this.currentToken.kind);
      if (flag !== ModifierFlags.None) {
        modifier = this.eat(this.currentToken.kind);
        if ((flag & ModifierFlags.VisibilityMask) === 0) {
          modifier = this.addError(modifier, ErrorCode.ERR_BadTraitAliasModifier, TokenKindInfo.getText(modifier.kind));
        }
      }

      if (this.isClassMemberIdentifier(this.currentToken.kind)) {
        alias = this.eat(this.currentToken.kind);
      }
      else if (modifier === null) {
        alias = this.createMissingTokenWithError(TokenKind.Identifier, ErrorCode.ERR_MethodNameExpected);
      }
    }

    // At a minimum, an alias must contain a modifier or (missing) name.
    Debug.assert(!(modifier === null && alias === null));

    let semicolon = this.parseStatementEnd();
    return methodNameOrReference instanceof TokenNode
      ? new NamedTraitAliasNode(methodNameOrReference, asKeyword, modifier, alias, semicolon)
      : new ReferencedTraitAliasNode(methodNameOrReference, asKeyword, modifier, alias, semicolon);
  }

  /**
   * Parses a trait declaration statement.
   *
   * Syntax: `TRAIT name { trait-member-declarations }`
   */
  protected parseTraitDeclaration(): TraitDeclarationNode {
    let traitKeyword = this.eat(TokenKind.Trait);
    let identifier = this.eat(TokenKind.Identifier);
    let openBrace = this.eat(TokenKind.OpenBrace);

    let members: NodeList | null = null;
    if (!identifier.isMissing && !openBrace.isMissing) {
      members = this.parseClassMembers(ParseContext.TraitMembers);
    }

    let closeBrace = openBrace.isMissing
      ? this.createMissingToken(TokenKind.CloseBrace, this.currentToken.kind, false)
      : this.eat(TokenKind.CloseBrace);
    return new TraitDeclarationNode(
      traitKeyword,
      identifier,
      openBrace,
      members,
      closeBrace
    );
  }

  /**
   * Parses a trait import statement (also known as a trait use clause).
   *
   * Syntax:
   * - `USE qualified-name-list ;`
   * - `USE qualified-name-list { trait-adaptation-list }`
   */
  protected parseTraitUse(context: ParseContext): TraitUseNode | TraitUseGroupNode {
    let useKeyword = this.eat(TokenKind.Use);
    if (context === ParseContext.InterfaceMembers) {
      useKeyword = this.addError(useKeyword, ErrorCode.ERR_InterfaceTrait);
    }

    let names = this.parseQualifiedNameList();

    if (this.currentToken.kind === TokenKind.OpenBrace) {
      let openBrace = this.eat(TokenKind.OpenBrace);
      let adaptations = this.parseTraitAdaptationList();
      let closeBrace = openBrace.isMissing
        ? this.createMissingToken(TokenKind.CloseBrace, this.currentToken.kind, false)
        : this.eat(TokenKind.CloseBrace);
      return new TraitUseGroupNode(useKeyword, names, openBrace, adaptations, closeBrace);
    }

    let semicolon = this.isStatementEnd(this.currentToken.kind)
      ? this.parseStatementEnd()
      : this.createMissingTokenWithError(TokenKind.Semicolon, ErrorCode.ERR_IncompleteTraitUse);
    return new TraitUseNode(useKeyword, names, semicolon);
  }

  /**
   * Parses a try statement.
   *
   * Syntax:
   *  - `TRY { statement-list } catch-list`
   *  - `TRY { statement-list } catch-list finally-clause`
   *  - `TRY { statement-list } finally-clause`
   *
   * Where `catch-list` is:
   * - `catch-list catch-clause`
   * - `catch-clause`
   */
  protected parseTry(): TryNode {
    let tryKeyword = this.eat(TokenKind.Try);
    let statements = this.parseStatementBlock();

    let hasCatchOrFinally = false;
    let catchClause: NodeList | null = null;

    if (this.currentToken.kind === TokenKind.Catch) {
      let catches: TryCatchNode[] = [];
      while (this.currentToken.kind === TokenKind.Catch) {
        catches.push(this.parseTryCatch());
      }
      if (catches.length > 0) {
        catchClause = this.factory.createList(catches);
      }
      hasCatchOrFinally = true;
    }

    let finallyClause: TryFinallyNode | null = null;
    if (this.currentToken.kind === TokenKind.Finally) {
      finallyClause = this.parseTryFinally();
      hasCatchOrFinally = true;
    }

    if (!hasCatchOrFinally) {
      // @todo Implement INode.GetLastToken(/* allowMissing = false */) and
      //   append diagnostic to the try-statement's block using calculated
      //   offsets instead of making an artificial finally clause.

      let finallyKeyword = this.createMissingTokenWithError(TokenKind.Finally, ErrorCode.ERR_CatchOrFinallyExpected);
      let openBrace = this.createMissingToken(TokenKind.OpenBrace, this.currentToken.kind, false);
      let closeBrace = this.createMissingToken(TokenKind.OpenBrace, this.currentToken.kind, false);
      let finallyBlock = new StatementBlockNode(openBrace, null, closeBrace);
      finallyClause = new TryFinallyNode(finallyKeyword, finallyBlock);
    }

    return new TryNode(tryKeyword, statements, catchClause, finallyClause);
  }

  /**
   * Parses a try statement's catch clause.
   *
   * Syntax: `CATCH ( catch-name-list VARIABLE ) { statement-list }`
   *
   * Where `catch-name-list` is:
   * - `catch-name-list | qualified-name`
   * - `qualified-name`
   */
  protected parseTryCatch(): TryCatchNode {
    let catchKeyword = this.eat(TokenKind.Catch);
    let openParen = this.eat(TokenKind.OpenParen);

    let types: Array<NameNode | TokenNode> = [];
    types.push(this.parseTypeName());

    // @todo Implement `CatchClause` parse context?
    let kind = this.currentToken.kind;
    while (kind !== TokenKind.Dollar && kind !== TokenKind.Variable && kind !== TokenKind.CloseParen && kind !== TokenKind.EOF) {
      if (kind === TokenKind.VerticalBar || this.isNameStart(kind)) {
        types.push(this.eat(TokenKind.VerticalBar));
        types.push(this.parseTypeName());
        kind = this.currentToken.kind;
        continue;
      }

      if (this.isTokenValidInContexts(this.currentToken.kind)) {
        break;
      }

      this.skipToken();
      kind = this.currentToken.kind;
    }

    let typeUnion = this.factory.createList(types);
    if (types.length > 1 && !this.isSupportedVersion(PhpVersion.PHP7_1)) {
      typeUnion = this.addError(typeUnion, ErrorCode.ERR_FeatureTryCatchUnionTypes);
    }

    let variable: TokenNode;  // See also: parseParameter().
    if (this.currentToken.kind === TokenKind.Dollar) {
      variable = this.eat(TokenKind.Dollar);
      variable = this.addError(variable, ErrorCode.ERR_VariableNameExpected);
    }
    else {
      variable = this.currentToken.kind === TokenKind.Variable
        ? this.eat(TokenKind.Variable)
        : this.createMissingTokenWithError(TokenKind.Variable, ErrorCode.ERR_TryUnionOrVariableExpected);
    }

    let closeParen = this.eat(TokenKind.CloseParen);
    let statements = this.parseStatementBlock();
    return new TryCatchNode(
      catchKeyword,
      openParen,
      typeUnion,
      variable,
      closeParen,
      statements
    );
  }

  /**
   * Parses a try statement's finally clause.
   *
   * Syntax: `FINALLY { statement-list }`
   */
  protected parseTryFinally(): TryFinallyNode {
    let finallyKeyword = this.eat(TokenKind.Finally);
    let statements = this.parseStatementBlock();
    return new TryFinallyNode(finallyKeyword, statements);
  }

  /**
   * Parses a (nullable) type.
   *
   * Syntax: `? type`
   */
  protected parseType(/* isNullable = true */): NamedTypeNode | PredefinedTypeNode {
    let question = this.eatOptional(TokenKind.Question);
    if (question !== null && !this.isSupportedVersion(PhpVersion.PHP7_1)) {
      question = this.addError(question, ErrorCode.ERR_FeatureNullableTypes);
    }
    if (this.currentToken.kind === TokenKind.Array || this.currentToken.kind === TokenKind.Callable) {
      let typeKeyword = this.eat(this.currentToken.kind);
      return new PredefinedTypeNode(question, typeKeyword);
    }
    let name = this.parseTypeName();
    return new NamedTypeNode(question, name);
  }

  /**
   * Parses a qualified name that should be a type.
   *
   * This method is equivalent to `parseQualifiedName()`, but uses a custom
   * error message when the name is missing.
   */
  protected parseTypeName(): NameNode {
    if (this.isNameStart(this.currentToken.kind)) {
      return this.parseQualifiedName();
    }
    let identifier = this.createMissingTokenWithError(TokenKind.Identifier, ErrorCode.ERR_TypeExpected);
    let namespaceNames = this.factory.createList([identifier]);
    return new PartiallyQualifiedNameNode(namespaceNames);
  }

  /**
   * Parses an unset statement.
   *
   * Syntax: `UNSET ( unset-list ) ;`
   *
   * Where `unset-list` is:
   * - `unset-list , expr`
   * - `expr`
   */
  protected parseUnset(): UnsetNode {
    let unsetKeyword = this.eat(TokenKind.Unset);
    let openParen = this.eat(TokenKind.OpenParen);

    let expressions: Array<ExpressionNode | TokenNode> = [];
    expressions.push(this.parseExpression(ExpressionType.Explicit));

    while (this.currentToken.kind === TokenKind.Comma) {
      let comma = this.eat(TokenKind.Comma);
      if (!this.isExpressionStart(this.currentToken.kind)) {
        if (!this.isSupportedVersion(PhpVersion.PHP7_3)) {
          comma = this.addError(comma, ErrorCode.ERR_FeatureTrailingCommasInArgumentLists);
        }
        expressions.push(comma);
        break;
      }
      else {
        expressions.push(comma);
        expressions.push(this.parseExpression(ExpressionType.Explicit));
      }
    }

    let closeParen = this.currentToken.kind === TokenKind.CloseParen
      ? this.eat(TokenKind.CloseParen)
      : expressions.length & 1
        ? this.createMissingTokenWithError(TokenKind.CloseParen, ErrorCode.ERR_CommaOrCloseParenExpected)
        : this.createMissingTokenWithError(TokenKind.CloseParen, ErrorCode.ERR_ExpressionOrCloseParenExpected);
    let semicolon = this.parseStatementEnd();
    return new UnsetNode(
      unsetKeyword,
      openParen,
      this.factory.createList(expressions),
      closeParen,
      semicolon
    );
  }

  /**
   * @todo Document parseUseDeclaration().
   */
  protected parseUseDeclaration(): UseDeclarationNode | UseGroupDeclarationNode {
    let useKeyword = this.eat(TokenKind.Use);
    let useType = this.currentToken.kind === TokenKind.Const || this.currentToken.kind === TokenKind.Function
      ? this.eat(this.currentToken.kind) : null;

    let leadingBackslash = this.eatOptional(TokenKind.Backslash);
    let names: TokenNode[];
    if (this.currentToken.kind === TokenKind.Identifier) {
      names = this.parseNamespaceName(false);
    }
    else {
      let code = (useType !== null || leadingBackslash !== null) ? ErrorCode.ERR_IdentifierExpected : ErrorCode.ERR_UseTypeExpected;
      let identifier = this.createMissingTokenWithError(TokenKind.Identifier, code);
      names = [identifier];
    }

    if (names[names.length - 1].kind === TokenKind.Backslash) {
      // An opening brace must be present to parse a group declaration. If it
      // is not, then a simple use declaration is probably being added instead.
      //
      //   use A\B\|  <-- cursor here
      //
      if (this.currentToken.kind === TokenKind.OpenBrace) {
        let hasUseType = useType !== null;
        let rootNames = leadingBackslash ? [leadingBackslash].concat(names) : names;
        let openBrace = this.eat(TokenKind.OpenBrace);

        let elements: Array<UseElementNode | TokenNode> = [];
        elements.push(this.parseUseGroupElement(hasUseType));

        // Suppress TS2365: Current token changed after previous method call.
        while (<TokenKind>this.currentToken.kind === TokenKind.Comma) {
          let comma = this.eat(TokenKind.Comma);
          if (!this.isUseGroupElementStart(this.currentToken.kind) && <TokenKind>this.currentToken.kind !== TokenKind.Comma) {
            if (!this.isSupportedVersion(PhpVersion.PHP7_2)) {
              comma = this.addError(comma, ErrorCode.ERR_FeatureTrailingCommasInUseDeclarations);
            }
            elements.push(comma);
            break;
          }
          else {
            elements.push(comma);
            elements.push(this.parseUseGroupElement(hasUseType));
          }
        }

        // Error recovery is greatly simplified when everything can end in a
        // closing brace. It is just a matter of picking the right message...
        let closeBrace: TokenNode;
        if (<TokenKind>this.currentToken.kind === TokenKind.CloseBrace) {
          closeBrace = this.eat(TokenKind.CloseBrace);
        }
        else {
          let code: ErrorCode;
          if (elements.length & 1) {
            // Odd: Ended in use element.
            let lastElement = <UseElementNode>elements[elements.length - 1];
            code = lastElement.asKeyword !== null ? ErrorCode.ERR_CommaOrCloseBraceExpected : ErrorCode.ERR_IncompleteUseGroupDeclaration;
          }
          else {
            // Even: Ended in comma.
            code = hasUseType ? ErrorCode.ERR_IdentifierOrCloseBraceExpected : ErrorCode.ERR_UseTypeOrCloseBraceExpected;
          }
          closeBrace = this.createMissingTokenWithError(TokenKind.CloseBrace, code);
        }

        let semicolon = this.parseStatementEnd();

        return new UseGroupDeclarationNode(
          useKeyword,
          useType,
          this.factory.createList(rootNames),
          openBrace,
          this.factory.createList(elements),
          closeBrace,
          semicolon
        );
      }

      // The name is more likely to be incomplete.
      let identifier = this.createMissingTokenWithError(TokenKind.Identifier, ErrorCode.ERR_IncompleteUseName);
      names.push(identifier);
    }

    let nodes: Array<UseElementNode | TokenNode> = [];

    // Create the first element since the name has already been parsed.
    let typeName: NameNode = leadingBackslash
      ? new FullyQualifiedNameNode(leadingBackslash, this.factory.createList(names))
      : new PartiallyQualifiedNameNode(this.factory.createList(names));
    let asKeyword = this.eatOptional(TokenKind.As);
    let alias = asKeyword !== null ? this.eat(TokenKind.Identifier) : null;
    nodes.push(new UseElementNode(null, typeName, asKeyword, alias));

    while (this.currentToken.kind === TokenKind.Comma) {
      nodes.push(this.eat(TokenKind.Comma));
      nodes.push(this.parseUseElement());
    }

    let lastElement = <UseElementNode>nodes[nodes.length - 1];
    let code = lastElement.asKeyword !== null
      ? ErrorCode.ERR_CommaOrSemicolonExpected
      : ErrorCode.ERR_IncompleteUseDeclaration;

    let semicolon = this.isStatementEnd(this.currentToken.kind)
      ? this.parseStatementEnd()
      : this.createMissingTokenWithError(TokenKind.Semicolon, code);
    return new UseDeclarationNode(useKeyword, useType, this.factory.createList(nodes), semicolon);
  }

  /**
   * Parses a use element.
   *
   * Syntax: `use-inline-name AS IDENTIFIER`
   *
   * Where `use-inline-name` is:
   * - `name`
   * - `\ name`
   */
  protected parseUseElement(): UseElementNode {
    let name = this.parseQualifiedName(false);
    let asKeyword = this.eatOptional(TokenKind.As);
    let alias = asKeyword !== null ? this.eat(TokenKind.Identifier) : null;
    return new UseElementNode(null, name, asKeyword, alias);
  }

  /**
   * Parses a group use element.
   *
   * Syntax: `use-type name AS IDENTIFIER`
   *
   * Where `use-type` is:
   * - `CONST`
   * - `FUNCTION`
   *
   * @param {boolean} hasGroupUseType
   *   When `true`, the use declaration already specifies a type, and any use
   *   types found inside this clause should generate an error.
   */
  protected parseUseGroupElement(hasGroupUseType: boolean): UseElementNode {
    let useType = this.currentToken.kind === TokenKind.Const || this.currentToken.kind === TokenKind.Function
      ? this.eat(this.currentToken.kind) : null;
    if (useType !== null && hasGroupUseType) {
      useType = this.addError(useType, ErrorCode.ERR_UseTypeAlreadySpecified);
    }

    let name: PartiallyQualifiedNameNode;
    if (this.currentToken.kind !== TokenKind.Identifier) {
      let code = (useType !== null || hasGroupUseType) ? ErrorCode.ERR_IdentifierExpected : ErrorCode.ERR_UseTypeExpected;
      let identifier = this.createMissingTokenWithError(TokenKind.Identifier, code);
      let namespaceName = this.factory.createList([identifier]);
      name = new PartiallyQualifiedNameNode(namespaceName);
    }
    else {
      name = this.parsePartiallyQualifiedName();
    }

    let asKeyword = this.eatOptional(TokenKind.As);
    let alias = asKeyword !== null ? this.eat(TokenKind.Identifier) : null;
    return new UseElementNode(useType, name, asKeyword, alias);
  }

  /**
   * Parses a while statement.
   *
   * Syntax:
   * - `WHILE ( expr ) statement`
   * - `WHILE ( expr ) : statement-list ENDWHILE ;`
   */
  protected parseWhile(): WhileNode | WhileBlockNode {
    let whileKeyword = this.eat(TokenKind.While);
    let openParen = this.eat(TokenKind.OpenParen);
    let condition = this.parseExpression();
    let closeParen = this.eat(TokenKind.CloseParen);

    if (this.currentToken.kind === TokenKind.Colon) {
      let colon = this.eat(TokenKind.Colon);
      let statements = this.parseList(ParseContext.WhileBlockElements);
      let endWhile = this.eat(TokenKind.EndWhile);
      let semicolon = this.parseStatementEnd();
      return new WhileBlockNode(
        whileKeyword,
        openParen,
        condition,
        closeParen,
        colon,
        statements,
        endWhile,
        semicolon
      );
    }

    let statement = this.parseEmbeddedStatement(true, ErrorCode.ERR_StatementOrColonExpected);
    return new WhileNode(whileKeyword, openParen, condition, closeParen, statement);
  }

  // --------------------------------------------------------------------------
  // Productions (expressions)
  // --------------------------------------------------------------------------

  /**
   * Parses an expression.
   */
  protected parseExpression(expectedType = ExpressionType.Any, precedence = Precedence.None): ExpressionNode {
    let expr = this.parseExpressionTree(expectedType, precedence);
    let exprNode = <ExpressionNode>expr.node;
    // Add the mismatched expression type diagnostic, unless the expression
    // already contains an error; in which case, the parser should not make
    // any assumptions about the expression or its type.
    if (!exprNode.containsDiagnostics && expectedType === ExpressionType.Explicit && expr.type === ExpressionType.Implicit) {
      exprNode = this.addError(exprNode, ErrorCode.ERR_ExpressionNotAddressable);
    }
    return exprNode;
  }

  /**
   * Parses an expression or, if possible, a statement.
   */
  protected parseExpressionOrTopStatement(): StatementNode {
    // A top-level expression has no expected type.
    let expr = this.parseExpressionTree(ExpressionType.Any, Precedence.None, true);
    if (expr.type !== ExpressionType.Any) {
      Debug.assert(expr.node instanceof ExpressionNode);
      let semicolon = this.parseStatementEnd();
      return new ExpressionStatementNode(<ExpressionNode>expr.node, semicolon);
    }
    else {
      Debug.assert(expr.node instanceof StatementNode);
      return <StatementNode>expr.node;
    }
  }

  /**
   * Parses a sequence of one or more operands and zero or more operators into
   * a tree-like structure representing an expression.
   *
   * @param {ExpressionType=} expectedType
   *   The expected type of the term.
   * @param {Precedence=} precedence
   *   The precedence of the operator prior to this expression term.
   * @param {boolean=} isStatementExpected
   *   If `true`, a statement may be parsed instead of an expression. Defaults
   *   to `false`.
   */
  protected parseExpressionTree(expectedType = ExpressionType.Any, precedence = Precedence.None, isStatementExpected = false): Expression {
    let expr: Expression;

    let kind = this.currentToken.kind;
    if (this.isUnaryOperator(kind) && this.isUnaryOperatorExpected(kind, expectedType)) {
      // When a unary operator is encountered, the operand is treated as its
      // own independent expression, so the parser also expects a different
      // expression type for it as well.
      let unaryType = ExpressionType.Any;

      // The operand of a prefix-increment or prefix-decrement expression
      // requires an explicitly declared variable however.
      if (kind === TokenKind.Decrement || kind === TokenKind.Increment) {
        unaryType = ExpressionType.Explicit;
      }

      let unaryPrecedence = kind === TokenKind.Exclamation ? Precedence.LogicalNot : Precedence.Unary;

      let operator = this.eat(kind);
      let operand = this.parseExpression(unaryType, unaryPrecedence);

      let unaryNode = new UnaryNode(operator, operand);
      if (kind === TokenKind.RealCast) {
        // No version check; deprecation warnings are retroactive.
        unaryNode = this.addError(unaryNode, ErrorCode.WRN_RealCast);
      }
      if (kind === TokenKind.UnsetCast) {
        // No version check; deprecation warnings are retroactive.
        unaryNode = this.addError(unaryNode, ErrorCode.WRN_UnsetCast);
      }

      expr = new Expression(unaryNode, ExpressionType.Implicit);
    }
    else if (kind === TokenKind.Array || kind === TokenKind.OpenBracket) {
      expr = this.parseArrayOrDeconstruction();
    }
    else if (kind === TokenKind.Function) {
      expr = this.parseFunctionDeclarationOrClosure(isStatementExpected);
      if (expr.type === ExpressionType.Any) {
        return expr;  // Found a function declaration statement.
      }
    }
    else if (kind === TokenKind.Identifier) {
      expr = this.parseLabelOrExpression(isStatementExpected);
      if (expr.type === ExpressionType.Any) {
        return expr;  // Found a label declaration statement.
      }
    }
    else if (kind === TokenKind.Namespace) {
      expr = this.parseNamespaceDeclarationOrExpression(isStatementExpected);
      if (expr.type === ExpressionType.Any) {
        return expr;  // Found a namespace declaration statement.
      }
    }
    else if (kind === TokenKind.Static) {
      expr = this.parseStaticDeclarationOrExpression(isStatementExpected);
      if (expr.type === ExpressionType.Any) {
        return expr;  // Found a static variable declaration statement.
      }
    }
    else if (kind === TokenKind.List) {
      let lhs = this.parseListDestructure();
      let equal = this.eat(TokenKind.Equal);
      let rhs = this.parseExpression(ExpressionType.Any, Precedence.Assignment);
      let assignment = new DestructuringAssignmentNode(lhs, equal, rhs);
      return new Expression(assignment, ExpressionType.Implicit);
    }
    else {
      expr = this.parsePrimaryExpression(expectedType);
    }

    if (expr.type === ExpressionType.Explicit) {
      expr = this.parsePostfixExpression(expr, expectedType);
    }

    // There are no binary expressions that result in an explicit expression.
    return expectedType === ExpressionType.Explicit ? expr : this.parseBinaryExpression(expr, precedence);
  }

  /**
   * @todo Document parseBinaryExpression().
   */
  protected parseBinaryExpression(leftTerm: Expression, precedence = Precedence.None): Expression {
    // Statements should never be part of an expression.
    Debug.assert(leftTerm.node instanceof ExpressionNode);

    let leftExpr = <ExpressionNode>leftTerm.node;
    let leftType = leftTerm.type;

    // Operator precendence and associativity:
    // 1. low to high      a + b * c
    // 2. high to low      a * b + c
    // 3. same, left       a + b + c
    // 4. same, right      a ** b ** c
    // 5. same, non-assoc  a <= b <= c

    // @todo It is possible to exhaust the call stack here if a very long
    //   right associative expression is being parsed.

    // The precedence of the last operator parsed by this loop, which may not
    // be the same as the last operator that was parsed.
    let prevPrecedence = Precedence.None;

    while (this.isBinaryOperator(this.currentToken.kind) || this.currentToken.kind === TokenKind.Question) {
      // The LHS of an assignment expression must have an explicit variable.
      if (leftType !== ExpressionType.Explicit && this.isAssignmentOperator(this.currentToken.kind)) {
        break;
      }

      let nextPrecedence = this.getPrecedence(this.currentToken.kind);

      // All binary operators need a precedence.
      Debug.assert(nextPrecedence !== Precedence.None);

      if (nextPrecedence < precedence && !this.isBinaryOperatorExpected(this.currentToken.kind, leftType)) {
        break;
      }
      if (nextPrecedence === precedence && !this.isRightAssociative(this.currentToken.kind)) {
        break;
      }
      if (nextPrecedence === prevPrecedence && this.isNonAssociative(this.currentToken.kind)) {
        break;
      }

      let operator = this.eat(this.currentToken.kind);
      let rightExpr: ExpressionNode;

      if (this.isAssignmentOperator(operator.kind)) {
        let ampersand: TokenNode | null = null;
        if (operator.kind === TokenKind.Equal && this.currentToken.kind === TokenKind.Ampersand) {
          ampersand = this.eat(this.currentToken.kind);
          rightExpr = this.parseExpression(ExpressionType.Explicit, nextPrecedence);
        }
        else {
          rightExpr = this.parseExpression(ExpressionType.Any, nextPrecedence);
        }
        leftExpr = new AssignmentNode(leftExpr, operator, ampersand, rightExpr);
      }
      else if (operator.kind === TokenKind.InstanceOf) {
        leftExpr = this.parseInstanceOf(leftExpr, operator);
      }
      else if (operator.kind === TokenKind.Question) {
        leftExpr = this.parseConditionalExpression(leftExpr, operator);
      }
      else {
        rightExpr = this.parseExpression(ExpressionType.Any, nextPrecedence);
        leftExpr = new BinaryNode(leftExpr, operator, rightExpr);
      }

      leftType = ExpressionType.Implicit;
      prevPrecedence = nextPrecedence;
    }

    return new Expression(leftExpr, leftType);
  }

  /**
   * @todo Document parsePostfixExpression().
   */
  protected parsePostfixExpression(term: Expression, expectedType: ExpressionType): Expression {
    // Statements should not be reaching this point.
    Debug.assert(term.node instanceof ExpressionNode);
    // The LHS of a postfix expression must have an explicit variable.
    Debug.assert(term.type === ExpressionType.Explicit);

    let node = <ExpressionNode>term.node;
    let type = term.type;

    while (type === ExpressionType.Explicit) {
      switch (this.currentToken.kind) {
        case TokenKind.Decrement:
        case TokenKind.Increment:
          // If an explicit expression is expected (only true for prefix-
          // decrement, prefix-increment, and byref assignments), then the
          // operand is complete.
          //
          //   ++$i|  <-- cursor here
          //   ++$j;
          //
          // The parser should not continue and generate an "unusable address"
          // diagnostic on the postfix expression.
          if (expectedType === ExpressionType.Explicit) {
            return new Expression(node, type);
          }
          node = new PostfixUnaryNode(node, this.eat(this.currentToken.kind));
          type = ExpressionType.Implicit;
          break;
        case TokenKind.DoubleColon:
          // @todo Is it possible for this method to just return the node?
          let expr = this.parseScopedAccessOrInvocation(node, this.eat(TokenKind.DoubleColon));
          node = <ExpressionNode>expr.node;
          type = expr.type;
          break;
        case TokenKind.ObjectOperator:
          node = this.parseMemberAccessOrInvocation(node, true);
          break;
        case TokenKind.OpenBrace:
        case TokenKind.OpenBracket:
          node = this.parseElementAccess(node);
          break;
        case TokenKind.OpenParen:
          node = this.parseFunctionInvocation(node);
          break;
        default:
          return new Expression(node, type);
      }
    }

    // Found an expression that changed to an implicit type.
    return new Expression(node, type);
  }

  /**
   * @todo Document parsePrimaryExpression().
   */
  protected parsePrimaryExpression(expectedType: ExpressionType): Expression {
    let expr: ExpressionNode | null = null;
    let type = ExpressionType.Any;

    switch (this.currentToken.kind) {
      // Implicit expressions.
      case TokenKind.At:
        expr = this.parseErrorControl();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.Clone:
        expr = this.parseClone();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.DNumber:
      case TokenKind.LNumber:
        expr = new LiteralNode(this.eat(this.currentToken.kind));
        type = ExpressionType.Implicit;
        break;
      case TokenKind.Empty:
        expr = this.parseEmpty();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.Eval:
        expr = this.parseEval();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.Die:
      case TokenKind.Exit:
        expr = this.parseExit();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.FlexdocTemplate:
        expr = this.parseFlexdocTemplate();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.Fn:
        expr = this.parseArrowFunction(null);
        type = ExpressionType.Implicit;
        break;
      case TokenKind.HeredocTemplate:
        expr = this.parseHeredocTemplate();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.Include:
      case TokenKind.IncludeOnce:
      case TokenKind.Require:
      case TokenKind.RequireOnce:
        expr = this.parseScriptInclusion();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.IsSet:
        expr = this.parseIsSet();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.MagicClass:
      case TokenKind.MagicDirectory:
      case TokenKind.MagicFile:
      case TokenKind.MagicFunction:
      case TokenKind.MagicLine:
      case TokenKind.MagicMethod:
      case TokenKind.MagicNamespace:
      case TokenKind.MagicTrait:
        // Technically this could use a custom node.
        expr = new LiteralNode(this.eat(this.currentToken.kind));
        type = ExpressionType.Implicit;
        break;
      case TokenKind.New:
        expr = this.parseObjectCreationExpression();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.Print:
        expr = this.parsePrint();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.ShellCommandTemplate:
        expr = this.parseShellCommandTemplate();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.StringTemplate:
        expr = this.parseStringTemplate();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.Yield:
        expr = this.parseYield();
        type = ExpressionType.Implicit;
        break;
      case TokenKind.YieldFrom:
        expr = this.parseYieldFrom();
        type = ExpressionType.Implicit;
        break;

      // Explicit expressions.
      case TokenKind.Dollar:
      case TokenKind.Variable:
        expr = this.parseSimpleVariable();
        type = ExpressionType.Explicit;
        break;

      // Undetermined expressions.
      case TokenKind.Backslash:
      case TokenKind.Namespace:
        // A name is only implicit when used to reference a constant.
        let name = this.parseQualifiedName();
        return this.parseNamedExpression(name);
      case TokenKind.OpenParen:
        // A parenthetical expression may be implicit if it is standalone or
        // used to access a class constant, otherwise it is explicit.
        return this.parseExpressionGroup();
      case TokenKind.StringLiteral:
        // String literals are implicit if there is no dereference.
        return this.parseStringLiteral();

      default:
        // This point should have been reached intentionally. If not, then the
        // parser may not move forward and could enter an infinite loop.
        Debug.assert(!this.isExpressionStart(this.currentToken.kind) ||
          (this.isUnaryOperator(this.currentToken.kind) && !this.isUnaryOperatorExpected(this.currentToken.kind, expectedType)));

        // @todo Use variable if expectedType is explicit and identifier otherwise?
        let variable = this.createMissingToken(TokenKind.Variable, this.currentToken.kind, false);

        // Except for EOF, the text of all tokens being used in the error
        // message is known, as all other categories are pre-defined, ignored
        // (trivia), or would have started an expression.
        variable = this.currentToken.kind === TokenKind.EOF
          ? this.addError(variable, ErrorCode.ERR_ExpressionExpectedEOF)
          : this.addError(variable, ErrorCode.ERR_ExpressionExpected, TokenKindInfo.getText(this.currentToken.kind));

        expr = new LocalVariableNode(variable);
        type = ExpressionType.Implicit;
        break;
    }

    return new Expression(expr, type);
  }

  // --------------------------------------------------------------------------

  /**
   * Parses an anonymous class.
   *
   * Syntax:
   * - `CLASS class-base-clause class-interface-clause { class-member-declarations }`
   * - `CLASS ( argument-list ) class-base-clause class-interface-clause { class-member-declarations }`
   *
   * @see PhpParser.parseObjectCreationExpression()
   */
  protected parseAnonymousClass(): AnonymousClassNode {
    let classKeyword = this.eat(TokenKind.Class);

    let openParen: TokenNode | null = null;
    let argumentList: NodeList | null = null;
    let closeParen: TokenNode | null = null;

    if (this.currentToken.kind === TokenKind.OpenParen) {
      let invocationArgs = this.parseArgumentList();
      openParen = invocationArgs.openParen;
      argumentList = invocationArgs.argumentList;
      closeParen = invocationArgs.closeParen;
    }

    let extendsKeyword = this.eatOptional(TokenKind.Extends);
    let baseType: NameNode | null = null;
    if (extendsKeyword !== null) {
      baseType = this.parseTypeName();
    }

    let implementsKeyword = this.eatOptional(TokenKind.Implements);
    let interfaces: NodeList | null = null;
    if (implementsKeyword !== null) {
      interfaces = this.parseQualifiedNameList();
    }

    let code = openParen !== null
      ? ErrorCode.ERR_IncompleteClassDeclaration
      : ErrorCode.ERR_IncompleteAnonymousClassDeclaration;
    let openBrace = this.currentToken.kind !== TokenKind.OpenBrace && extendsKeyword === null && implementsKeyword === null
      ? this.createMissingTokenWithError(TokenKind.OpenBrace, code)
      : this.eat(TokenKind.OpenBrace);

    let members: NodeList | null = null;
    if (!openBrace.isMissing) {
      members = this.parseClassMembers(ParseContext.ClassMembers);
    }

    let closeBrace = openBrace.isMissing
      ? this.createMissingToken(TokenKind.CloseBrace, this.currentToken.kind, false)
      : this.eat(TokenKind.CloseBrace);

    return new AnonymousClassNode(
      classKeyword,
      openParen,
      argumentList,
      closeParen,
      extendsKeyword,
      baseType,
      implementsKeyword,
      interfaces,
      openBrace,
      members,
      closeBrace
    );
  }

  /**
   * Parses a list of arguments in an anonymous class, invocation, or object
   * creation expression.
   *
   * Syntax: `( argument-list )`
   *
   * Where `argument-list` is:
   * - `argument-list , argument`
   * - `argument`
   *
   * Where `argument` is:
   * - `ELLIPSIS expr`
   * - `expr`
   */
  protected parseArgumentList(): InvocationArguments {
    let args: Array<ArgumentNode | TokenNode> = [];
    let hasUnpack = false;

    let openParen = this.eat(TokenKind.OpenParen);

    if (!openParen.isMissing) {
      if (this.isArgumentStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.Comma) {
        let ellipsis = this.eatOptional(TokenKind.Ellipsis);
        let value = this.parseExpression();
        args.push(new ArgumentNode(ellipsis, value));

        if (ellipsis !== null) {
          hasUnpack = true;
        }
      }

      while (this.currentToken.kind !== TokenKind.CloseParen && this.currentToken.kind !== TokenKind.EOF) {
        if (this.isArgumentStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.Comma) {
          let comma = this.eat(TokenKind.Comma);

          if (!this.isArgumentStart(this.currentToken.kind)) {
            if (!this.isSupportedVersion(PhpVersion.PHP7_3)) {
              comma = this.addError(comma, ErrorCode.ERR_FeatureTrailingCommasInArgumentLists);
            }
            args.push(comma);
            break;
          }

          args.push(comma);

          let ellipsis = this.eatOptional(TokenKind.Ellipsis);
          let value = this.parseExpression();
          if (ellipsis === null && hasUnpack) {
            value = this.addError(value, ErrorCode.ERR_ArgumentAfterUnpack);
          }
          args.push(new ArgumentNode(ellipsis, value));

          if (ellipsis !== null) {
            hasUnpack = true;
          }

          continue;
        }

        this.skipBadArgumentListTokens();
      }
    }

    let closeParen: TokenNode;
    if (openParen.isMissing) {
      closeParen = this.createMissingToken(TokenKind.CloseParen, this.currentToken.kind, false);
    }
    else if (this.currentToken.kind === TokenKind.CloseParen) {
      closeParen = this.eat(TokenKind.CloseParen);
    }
    else {
      let code: ErrorCode;
      if (args.length & 1) {
        // Odd: Ended in an argument.
        code = ErrorCode.ERR_CommaOrCloseParenExpected;
      }
      else {
        // Even: Either there were no arguments or the list ended in a comma.
        code = hasUnpack ? ErrorCode.ERR_EllipsisOrCloseParenExpected : ErrorCode.ERR_ExpressionOrCloseParenExpected;
      }
      closeParen = this.createMissingTokenWithError(TokenKind.CloseParen, code);
    }

    // NOTE: It is not ideal to create these short-lived objects during a parse,
    // but it also allows the current node structure to remain, while also
    // standardizing how argument lists are parsed.
    return new InvocationArguments(
      openParen,
      args.length > 0 ? this.factory.createList(args) : null,
      closeParen
    );
  }

  /**
   * Parses an array initializer or list deconstruction.
   *
   * Syntax:
   * - `ARRAY ( array-elements )`
   * - `[ array-elements ]`
   */
  protected parseArray(): ArrayNode {
    if (this.currentToken.kind === TokenKind.Array) {
      let arrayKeyword = this.eat(TokenKind.Array);
      let openParen = this.eat(TokenKind.OpenParen);
      let arrayList = this.parseArrayElementList(TokenKind.CloseParen);
      let closeParen: TokenNode;
      // Suppress TS2365: Current token changed after previous method call.
      if (<TokenKind>this.currentToken.kind === TokenKind.CloseParen) {
        closeParen = this.eat(TokenKind.CloseParen);
      }
      else {
        let code = arrayList.length === 0 || (arrayList[arrayList.length - 1] instanceof TokenNode)
          ? ErrorCode.ERR_ExpressionOrCloseParenExpected
          : ErrorCode.ERR_CloseParenExpected;
        closeParen = this.createMissingTokenWithError(TokenKind.CloseParen, code);
      }
      return new ArrayNode(
        arrayKeyword,
        openParen,
        arrayList.length > 0 ? this.factory.createList(arrayList) : null,
        closeParen
      );
    }

    let openBracket = this.eat(TokenKind.OpenBracket);
    let arrayList = this.parseArrayElementList(TokenKind.CloseBracket);

    let code = arrayList.length === 0 || (arrayList[arrayList.length - 1] instanceof TokenNode)
      ? ErrorCode.ERR_IncompleteArrayOrDestructure
      : ErrorCode.ERR_CloseBracketExpected;
    let closeBracket = this.currentToken.kind === TokenKind.CloseBracket
      ? this.eat(TokenKind.CloseBracket)
      : this.createMissingTokenWithError(TokenKind.CloseBracket, code);

    return new ArrayNode(
      null,
      openBracket,
      arrayList.length > 0 ? this.factory.createList(arrayList) : null,
      closeBracket
    );
  }

  /**
   * Parses a comma-separated list of array elements.
   *
   * @param {TokenKind} end
   *   The token used to terminate the array.
   */
  protected parseArrayElementList(end: TokenKind): Array<ArrayElementNode | TokenNode> {
    let pairs: Array<ArrayElementNode | TokenNode> = [];
    if (this.isArrayElementStart(this.currentToken.kind)) {
      pairs.push(this.parseArrayElement());
    }

    while (this.currentToken.kind !== end && this.currentToken.kind !== TokenKind.EOF) {
      if (this.currentToken.kind === TokenKind.Comma || this.isArrayElementStart(this.currentToken.kind)) {
        pairs.push(this.eat(TokenKind.Comma));
        // A trailing comma is legal.
        if (this.isArrayElementStart(this.currentToken.kind)) {
          pairs.push(this.parseArrayElement());
        }
        continue;
      }

      if (this.isTokenValidInContexts(this.currentToken.kind)) {
        break;
      }

      this.skipToken();
    }

    return pairs;
  }

  /**
   * Parses an element of an array initializer.
   *
   * Syntax:
   * - `expr`
   * - `expr => expr`
   * - `& expr`
   * - `expr => & expr`
   * - `... expr`
   */
  protected parseArrayElement(): ArrayElementNode {
    let ampersand = this.eatOptional(TokenKind.Ampersand);
    if (ampersand !== null) {
      let byRefValue = this.parseExpression(ExpressionType.Explicit);
      return new ArrayElementNode(null, null, ampersand, byRefValue);
    }

    let ellipsis = this.eatOptional(TokenKind.Ellipsis);
    if (ellipsis !== null) {
      if (!this.isSupportedVersion(PhpVersion.PHP7_4)) {
        ellipsis = this.addError(ellipsis, ErrorCode.ERR_FeatureSpreadOperatorInArrays);
      }
      let spreadValue = this.parseExpression();
      return new ArrayElementNode(null, null, ellipsis, spreadValue);
    }

    let key: ExpressionNode | null = null;
    let doubleArrow: TokenNode | null = null;
    let value = this.parseExpression();

    if (this.currentToken.kind === TokenKind.DoubleArrow) {
      key = value;
      doubleArrow = this.eat(TokenKind.DoubleArrow);
      ampersand = this.eatOptional(TokenKind.Ampersand);
      value = this.parseExpression(ampersand ? ExpressionType.Explicit : ExpressionType.Any);
    }

    return new ArrayElementNode(key, doubleArrow, ampersand, value);
  }

  /**
   * @todo Document parseArrayOrDeconstruction().
   */
  protected parseArrayOrDeconstruction(): Expression {
    let arrayLiteral: ArrayNode;
    if (this.currentToken.kind === TokenKind.Array) {
      arrayLiteral = this.parseArray();
    }
    else {
      // Short syntax.
      arrayLiteral = this.parseArray();
      if (this.currentToken.kind === TokenKind.Equal) {
        if (!this.isSupportedVersion(PhpVersion.PHP7_1)) {
          arrayLiteral = this.addError(arrayLiteral, ErrorCode.ERR_FeatureListDeconstructionShortSyntax);
        }
        let operator = this.eat(TokenKind.Equal);
        let rhs = this.parseExpression(ExpressionType.Any, Precedence.Assignment);
        let assignment = new DestructuringAssignmentNode(arrayLiteral, operator, rhs);
        return new Expression(assignment, ExpressionType.Implicit);
      }
    }

    // An array is implicit if there is no dereference.
    let type = ExpressionType.Implicit;

    // NOTE: While PHP does allow an object operator after an array, it always
    // leads to an error. Additionally, while arrays cannot normally be used
    // with an argument list there is one exception:
    //
    //   ['class_name', 'method_name']();
    //
    // In this scenario, the array must only contain two elements that can be
    // converted to a string, and then a static method call.
    if (this.isElementAccessStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.OpenParen) {
      type = ExpressionType.Explicit;
    }

    return new Expression(arrayLiteral, type);
  }

  /**
   * Parses an anonymous function (closure) that returns an expression.
   *
   * Syntax:
   * - `FN & ( parameter-list ) return-type => expr`
   * - `STATIC FN & ( parameter-list ) return-type => expr`
   */
  protected parseArrowFunction(staticKeyword: TokenNode | null): ArrowFunctionNode {
    let fnKeyword = this.eat(TokenKind.Fn);
    let ampersand = this.eatOptional(TokenKind.Ampersand);

    let openParen: TokenNode;
    let parameters: NodeList | null;
    let closeParen: TokenNode;

    if (this.currentToken.kind === TokenKind.OpenParen) {
      let parameterList = this.parseParameterList();
      openParen = parameterList.openParen;
      parameters = parameterList.parameterList;
      closeParen = parameterList.closeParen;
    }
    else {
      let code = ampersand !== null ? ErrorCode.ERR_OpenParenExpected : ErrorCode.ERR_IncompleteArrowFunction;
      openParen = this.createMissingTokenWithError(TokenKind.OpenParen, code);
      parameters = null;
      closeParen = this.createMissingToken(TokenKind.CloseParen, this.currentToken.kind, false);
    }

    let colon = this.eatOptional(TokenKind.Colon);
    let returnType = colon !== null ? this.parseType() : null;

    let doubleArrow: TokenNode;
    if (this.currentToken.kind === TokenKind.DoubleArrow || colon !== null) {
      doubleArrow = this.eat(TokenKind.DoubleArrow);
    }
    else {
      doubleArrow = this.createMissingTokenWithError(TokenKind.DoubleArrow, ErrorCode.ERR_ColonOrDoubleArrowExpected);
    }
    let expr = this.parseExpression();

    return new ArrowFunctionNode(
      staticKeyword,
      fnKeyword,
      ampersand,
      openParen,
      parameters,
      closeParen,
      colon,
      returnType,
      doubleArrow,
      expr
    );
  }

  /**
   * Parses a reference to a class name.
   *
   * Syntax:
   * - `class-name`
   * - `class-reference`
   *
   * Where `class-name` is:
   * - `qualified-name`
   * - `STATIC`
   *
   * Where `class-reference` is:
   * - `simple-variable`
   * - `class-name :: simple-variable`
   * - `class-reference [ expr ]`
   * - `class-reference { expr }`
   * - `class-reference -> property-name`
   * - `class-reference :: simple-variable`
   */
  protected parseClassNameReference(): ExpressionNode | NameNode {
    let reference: ExpressionNode;
    if (this.isNameStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.Static) {
      // NOTE: TypeScript fails to perform actual type checking of this variable.
      let name: NameNode;
      if (this.currentToken.kind === TokenKind.Static) {
        let staticKeyword = this.eat(TokenKind.Static);
        name = new PartiallyQualifiedNameNode(this.factory.createList([staticKeyword]));
      }
      else {
        name = this.parseQualifiedName();
      }

      if (this.currentToken.kind !== TokenKind.DoubleColon) {
        return name;
      }

      // A static property that references a class name.
      let doubleColon = this.eat(TokenKind.DoubleColon);
      let variable = this.parseSimpleVariable();
      reference = new StaticPropertyNode(name, doubleColon, variable);
    }
    else {
      reference = this.parseSimpleVariable();
    }

    // An "access" expression that references a class name.
    while (this.isClassNameReferenceExpressionStart(this.currentToken.kind)) {
      switch (this.currentToken.kind) {
        case TokenKind.DoubleColon:
          let doubleColon = this.eat(TokenKind.DoubleColon);
          let variable = this.parseSimpleVariable();
          reference = new StaticPropertyNode(reference, doubleColon, variable);
          break;
        case TokenKind.ObjectOperator:
          reference = this.parseMemberAccessOrInvocation(reference, false);
          break;
        case TokenKind.OpenBrace:
        case TokenKind.OpenBracket:
          // NOTE: While PHP currently parses an optional expression when
          // using brackets, it always results in a "cannot use [] for reading"
          // error, and is therefore required here.
          let openKind = this.currentToken.kind;

          let openBraceOrBracket = this.eat(openKind);
          let index = this.parseExpression();
          let closeBraceOrBracket = openKind === TokenKind.OpenBrace
            ? this.eat(TokenKind.CloseBrace)
            : this.eat(TokenKind.CloseBracket);
          reference = new ElementAccessNode(reference, openBraceOrBracket, index, closeBraceOrBracket);
          break;
        default:
          throw new ParserException('Unexpected token in class name reference expression');
      }
    }

    return reference;
  }

  /**
   * Parses a clone expression.
   *
   * Syntax: `CLONE expr`
   */
  protected parseClone(): CloneNode {
    let cloneKeyword = this.eat(TokenKind.Clone);
    let expr = this.parseExpression();
    return new CloneNode(cloneKeyword, expr);
  }

  /**
   * Parses an anonymous function (closure).
   *
   * Syntax:
   * - `FUNCTION & ( parameter-list ) closure-use return-type statement-block`
   * - `STATIC FUNCTION & ( parameter-list ) closure-use return-type statement-block`
   */
  protected parseClosure(staticKeyword: TokenNode | null, functionKeyword: TokenNode, ampersand: TokenNode | null): AnonymousFunctionNode {
    let openParen: TokenNode;
    let parameters: NodeList | null;
    let closeParen: TokenNode;

    if (this.currentToken.kind === TokenKind.OpenParen) {
      let parameterList = this.parseParameterList();
      openParen = parameterList.openParen;
      parameters = parameterList.parameterList;
      closeParen = parameterList.closeParen;
    }
    else {
      // If there is no open parenthesis, then the parser cannot determine if
      // the existing tokens are for a function declaration or a closure.
      let code = ampersand !== null ? ErrorCode.ERR_IdentifierOrOpenParenExpected : ErrorCode.ERR_IncompleteFunctionDeclaration;
      openParen = this.createMissingTokenWithError(TokenKind.OpenParen, code);
      parameters = null;
      closeParen = this.createMissingToken(TokenKind.CloseParen, this.currentToken.kind, false);
    }

    let useClause: ClosureUseNode | null = null;
    if (this.currentToken.kind === TokenKind.Use) {
      useClause = this.parseClosureUseClause();
    }

    let colon = this.eatOptional(TokenKind.Colon);
    let returnType = colon !== null ? this.parseType() : null;

    let code = useClause === null && colon === null
      ? ErrorCode.ERR_IncompleteClosure
      : ErrorCode.ERR_OpenBraceOrColonExpected;

    let openBrace = this.currentToken.kind !== TokenKind.OpenBrace && colon === null
      ? this.createMissingTokenWithError(TokenKind.OpenBrace, code)
      : this.eat(TokenKind.OpenBrace);
    let statements = this.parseList(ParseContext.CompoundStatementElements);
    let closeBrace = openBrace.isMissing
      ? this.createMissingToken(TokenKind.CloseBrace, this.currentToken.kind, false)
      : this.eat(TokenKind.CloseBrace);

    return new AnonymousFunctionNode(
      staticKeyword,
      functionKeyword,
      ampersand,
      openParen,
      parameters,
      closeParen,
      useClause,
      colon,
      returnType,
      new StatementBlockNode(openBrace, statements, closeBrace)
    );
  }

  /**
   * Parses a closure use clause.
   *
   * Syntax: `USE ( lexical-variables )`
   *
   * Where `lexical-variables` is:
   * - `lexical-variables , lexical-variable`
   * - `lexical-variable`
   */
  protected parseClosureUseClause(): ClosureUseNode {
    let useKeyword = this.eat(TokenKind.Use);
    let openParen = this.eat(TokenKind.OpenParen);

    let vars: Array<LexicalVariableNode | TokenNode> = [];
    vars.push(this.parseLexicalVariable());

    while (this.currentToken.kind === TokenKind.Comma) {
      vars.push(this.eat(TokenKind.Comma));
      vars.push(this.parseLexicalVariable());
    }

    let closeParen = this.currentToken.kind === TokenKind.CloseParen
      ? this.eat(TokenKind.CloseParen)
      : this.createMissingTokenWithError(TokenKind.CloseParen, ErrorCode.ERR_CommaOrCloseParenExpected);
    return new ClosureUseNode(useKeyword, openParen, this.factory.createList(vars), closeParen);
  }

  /**
   * Parses a conditional (ternary) expression.
   *
   * Syntax:
   * - `expr ? expr : expr`
   * - `expr ? : expr`
   */
  protected parseConditionalExpression(condition: ExpressionNode, question: TokenNode): ConditionalNode {
    // The "true expression" does not require a precedence parameter since
    // there is only one way to correctly parse the expression:
    //
    //   $a ? $b ? 1 : 2 : $c;
    //
    //   $a ? ($b ? 1 : 2) : $c;
    //
    let trueExpr: ExpressionNode | null = null;
    if (this.isExpressionStart(this.currentToken.kind)) {
      trueExpr = this.parseExpression();
    }
    let colon = this.currentToken.kind !== TokenKind.Colon && trueExpr === null
      ? this.createMissingTokenWithError(TokenKind.Colon, ErrorCode.ERR_ExpressionOrColonExpected)
      : this.eat(TokenKind.Colon);
    let falseExpr = this.parseExpression(ExpressionType.Any, Precedence.Ternary);
    return new ConditionalNode(condition, question, trueExpr, colon, falseExpr);
  }

  /**
   * Parses an element access (subscript) expression.
   *
   * Syntax:
   * - `dereferenceable [ expr ]`
   * - `dereferenceable { expr }`
   */
  protected parseElementAccess(dereferenceable: ExpressionNode): ElementAccessNode {
    // @todo Add (warning) diagnostic for deprecated syntax.
    if (this.currentToken.kind === TokenKind.OpenBrace) {
      let openBrace = this.eat(TokenKind.OpenBrace);
      let index = this.parseExpression();
      let closeBrace = this.eat(TokenKind.CloseBrace);
      return new ElementAccessNode(dereferenceable, openBrace, index, closeBrace);
    }

    let openBracket = this.eat(TokenKind.OpenBracket);
    let index: ExpressionNode | null = null;
    if (this.isExpressionStart(this.currentToken.kind)) {
      index = this.parseExpression();
    }
    let closeBracket = this.eat(TokenKind.CloseBracket);
    return new ElementAccessNode(dereferenceable, openBracket, index, closeBracket);
  }

  /**
   * Parses an empty intrinsic expression.
   *
   * Syntax: `EMPTY ( expr )`
   */
  protected parseEmpty(): EmptyIntrinsicNode {
    let emptyKeyword = this.eat(TokenKind.Empty);
    let openParen = this.eat(TokenKind.OpenParen);
    let expr = this.parseExpression();
    let closeParen = this.eat(TokenKind.CloseParen);
    return new EmptyIntrinsicNode(emptyKeyword, openParen, expr, closeParen);
  }

  /**
   * Parses an error control expression.
   *
   * Syntax: `@ expr`
   */
  protected parseErrorControl(): ErrorControlNode {
    let at = this.eat(TokenKind.At);
    let expr = this.parseExpression();
    return new ErrorControlNode(at, expr);
  }

  /**
   * Parses an eval expression.
   *
   * Syntax: `EVAL ( expr )`
   */
  protected parseEval(): EvalIntrinsicNode {
    let evalKeyword = this.eat(TokenKind.Eval);
    let openParen = this.eat(TokenKind.OpenParen);
    let expr = this.parseExpression();
    let closeParen = this.eat(TokenKind.CloseParen);
    return new EvalIntrinsicNode(evalKeyword, openParen, expr, closeParen);
  }

  /**
   * Parses an exit intrinsic expression.
   *
   * Syntax:
   * - `EXIT`
   * - `EXIT ( )`
   * - `EXIT ( expr )`
   */
  protected parseExit(): ExitIntrinsicNode {
    // Only exit expressions should reach this point.
    Debug.assert(this.currentToken.kind === TokenKind.Die || this.currentToken.kind === TokenKind.Exit);

    let exitKeyword = this.eat(this.currentToken.kind);
    if (this.currentToken.kind !== TokenKind.OpenParen) {
      return new ExitIntrinsicNode(exitKeyword, null, null, null);
    }
    let openParen = this.eat(TokenKind.OpenParen);
    let expr = this.isExpressionStart(this.currentToken.kind) ? this.parseExpression() : null;
    let closeParen: TokenNode;
    // Suppress TS2365: Current token changed after previous method call.
    if (<TokenKind>this.currentToken.kind === TokenKind.CloseParen) {
      closeParen = this.eat(TokenKind.CloseParen);
    }
    else {
      let code = expr !== null ? ErrorCode.ERR_CloseParenExpected : ErrorCode.ERR_ExpressionOrCloseParenExpected;
      closeParen = this.createMissingTokenWithError(TokenKind.CloseParen, code);
    }
    return new ExitIntrinsicNode(exitKeyword, openParen, expr, closeParen);
  }

  /**
   * Parses an expression wrapped in parenthesis.
   *
   * Syntax: `( expr )`
   */
  protected parseExpressionGroup(): Expression {
    let openParen = this.eat(TokenKind.OpenParen);
    let expression = this.parseExpression();
    let closeParen = this.eat(TokenKind.CloseParen);

    let expr = new ExpressionGroupNode(openParen, expression, closeParen);
    let type = ExpressionType.Implicit;
    if (this.isDereferenceStart(this.currentToken.kind)) {
      type = ExpressionType.Explicit;
    }

    return new Expression(expr, type);
  }

  /**
   * Parses a flexible heredoc template.
   *
   * Syntax:
   * - `HEREDOC_START flexdoc-element-list HEREDOC_END`
   */
  protected parseFlexdocTemplate(): FlexibleHeredocTemplateNode {
    const fullSpan = new TextSpan(this.currentToken.offset, this.currentToken.length);
    const fullText = this.lexer.sourceText.slice(fullSpan);

    let templateSpans = this.lexer.templateSpans;
    let template = this.eat(TokenKind.FlexdocTemplate);

    // Create a temporary lexer and parser.
    let lexer = new PhpLexer(fullText);
    lexer.rescanInterpolatedFlexdoc(templateSpans);
    let parser = new PhpParser(lexer);
    parser.nextToken();

    let heredocStart = parser.eat(TokenKind.HeredocStart);
    heredocStart = heredocStart.withDiagnostics(template.diagnostics);
    heredocStart = heredocStart.withLeadingTrivia(template.leadingTrivia);

    let elements = parser.parseFlexdocTemplateElements();

    // If the end label was missing the lexer already added an error.
    let heredocEnd = parser.currentToken.kind === TokenKind.HeredocEnd
      ? parser.eat(TokenKind.HeredocEnd)
      : parser.createMissingToken(TokenKind.HeredocEnd, parser.currentToken.kind, false);

    return new FlexibleHeredocTemplateNode(heredocStart, elements, heredocEnd);
  }

  /**
   * Parses a list of optional lines in a flexible heredoc template.
   *
   * Syntax: `flexdoc-element-list`
   *
   * Where `flexdoc-element-list` is:
   * - `flexdoc-element-list STRING_NEWLINE flexdoc-element`
   * - `flexdoc-element`
   */
  protected parseFlexdocTemplateElements(): NodeList {
    let elements: Array<FlexibleHeredocElementNode | LiteralNode> = [];

    if (this.isFlexdocTemplateLineStart(this.currentToken.kind)) {
      elements.push(this.parseFlexdocTemplateLine());
    }

    while (this.currentToken.kind !== TokenKind.EOF && this.currentToken.kind !== TokenKind.HeredocEnd) {
      if (this.currentToken.kind === TokenKind.StringLineBreak) {
        elements.push(new LiteralNode(this.eat(TokenKind.StringLineBreak)));
        if (this.isFlexdocTemplateLineStart(this.currentToken.kind)) {
          elements.push(this.parseFlexdocTemplateLine());
        }
        continue;
      }

      this.skipToken();
    }

    if (elements.length === 0) {
      // Unreachable. There should always be an indent before the end label.
      throw new ParserException('Flexible heredoc template cannot be empty');
    }

    return this.factory.createList(elements);
  }

  /**
   * Parses a line in a flexible heredoc template.
   *
   * Syntax:
   * - `STRING_INDENT`
   * - `STRING_INDENT STRING_TEMPLATE_LITERAL`
   * - `STRING_INDENT string-template-list`
   */
  protected parseFlexdocTemplateLine(): FlexibleHeredocElementNode {
    let indent = this.currentToken.kind === TokenKind.StringIndent
      ? this.eat(TokenKind.StringIndent)
      : this.createMissingTokenWithError(TokenKind.StringIndent, ErrorCode.ERR_IndentExpected);

    if (this.currentToken.kind !== TokenKind.StringTemplateLiteral && !this.isStringTemplateElementStart(this.currentToken.kind)) {
      return new FlexibleHeredocElementNode(indent, null);
    }

    let nodes: ExpressionNode[] = [];

    if (this.currentToken.kind === TokenKind.StringTemplateLiteral) {
      nodes.push(this.parseStringTemplateLiteral());
      if (!this.isStringTemplateElementStart(this.currentToken.kind)) {
        return new FlexibleHeredocElementNode(indent, this.factory.createList(nodes));
      }
    }
    else {
      nodes.push(this.parseStringTemplateElement());
    }

    while (this.currentToken.kind !== TokenKind.EOF && this.currentToken.kind !== TokenKind.StringLineBreak) {
      if (this.currentToken.kind === TokenKind.StringTemplateLiteral) {
        nodes.push(this.parseStringTemplateLiteral());
        continue;
      }
      if (this.isStringTemplateElementStart(this.currentToken.kind)) {
        nodes.push(this.parseStringTemplateElement());
        continue;
      }

      // The parser can't be at the end of the heredoc until it has found the
      // indent before the end label, and an indent can't be found until a
      // the parser gets to an embedded line break (which would have been caught
      // by the while-condition), so the current token has to be something else.

      this.skipToken();  // @todo Use custom method?
    }

    return new FlexibleHeredocElementNode(indent, this.factory.createList(nodes));
  }

  /**
   * @todo Document parseFunctionDeclarationOrClosure().
   */
  protected parseFunctionDeclarationOrClosure(isStatementExpected: boolean): Expression {
    let functionKeyword = this.eat(TokenKind.Function);
    let ampersand = this.eatOptional(TokenKind.Ampersand);

    if (isStatementExpected && this.isFunctionIdentifier(this.currentToken.kind)) {
      let funcDecl = this.parseFunctionDeclaration(functionKeyword, ampersand);
      return new Expression(funcDecl, ExpressionType.Any);
    }

    let closure = this.parseClosure(null, functionKeyword, ampersand);
    return new Expression(closure, ExpressionType.Implicit);
  }

  /**
   * Parses a function invocation expression.
   *
   * Syntax:
   * - `name ( argument-list )`
   * - `expression ( argument-list )`
   *
   * @see PhpParser.parseMemberAccessOrInvocation()
   * @see PhpParser.parseScopedAccessOrInvocation()
   */
  protected parseFunctionInvocation(reference: ExpressionNode | NameNode): FunctionInvocationNode {
    let invocationArgs = this.parseArgumentList();
    return new FunctionInvocationNode(
      reference,
      invocationArgs.openParen,
      invocationArgs.argumentList,
      invocationArgs.closeParen
    );
  }

  /**
   * Parses a heredoc (or nowdoc) template.
   *
   * Syntax:
   * - `HEREDOC_START HEREDOC_END`
   * - `HEREDOC_START STRING_TEMPLATE_LITERAL HEREDOC_END`
   * - `HEREDOC_START string-template-list HEREDOC_END`
   *
   * @see PhpParser.parseFlexdocTemplate()
   * @see PhpParser.parseShellCommandTemplate()
   * @see PhpParser.parseStringTemplate()
   */
  protected parseHeredocTemplate(): HeredocTemplateNode {
    const fullSpan = new TextSpan(this.currentToken.offset, this.currentToken.length);
    const fullText = this.lexer.sourceText.slice(fullSpan);

    let templateSpans = this.lexer.templateSpans;
    let template = this.eat(TokenKind.HeredocTemplate);

    // Create a temporary lexer and parser.
    let lexer = new PhpLexer(fullText);
    lexer.rescanInterpolatedHeredoc(templateSpans);
    let parser = new PhpParser(lexer);
    parser.nextToken();

    let heredocStart = parser.eat(TokenKind.HeredocStart);
    heredocStart = heredocStart.withDiagnostics(template.diagnostics);
    heredocStart = heredocStart.withLeadingTrivia(template.leadingTrivia);

    let nodes: NodeList | null = null;
    if (parser.currentToken.kind === TokenKind.StringTemplateLiteral) {
      let stringLiteral = parser.parseStringTemplateLiteral();
      nodes = parser.isStringTemplateEnd(parser.currentToken.kind, TokenKind.HeredocEnd)
        ? parser.factory.createList([stringLiteral])
        : parser.parseStringTemplateElementList(stringLiteral, TokenKind.HeredocEnd);
    }
    else if (parser.isStringTemplateElementStart(parser.currentToken.kind)) {
      nodes = parser.parseStringTemplateElementList(null, TokenKind.HeredocEnd);
    }

    let heredocEnd: TokenNode;
    if (parser.currentToken.kind === TokenKind.HeredocEnd) {
      heredocEnd = parser.eat(TokenKind.HeredocEnd)
    }
    else {
      // The parser should always reach the end of a template.
      Debug.assert(parser.currentToken.kind === TokenKind.EOF);

      // If the end label was missing, the lexer already added an error.
      heredocEnd = parser.createMissingToken(TokenKind.HeredocEnd, parser.currentToken.kind, false);
      // Move any trailing trivia over to this parser.
      if (parser.leadingTrivia.length > 0) {
        this.leadingTrivia = this.leadingTrivia.concat(parser.leadingTrivia);
        this.leadingTriviaWidth += parser.leadingTriviaWidth;
      }
    }

    return new HeredocTemplateNode(heredocStart, nodes, heredocEnd);
  }

  /**
   * Parses an instanceof expression
   *
   * Syntax: `expr INSTANCEOF class-name-reference`
   */
  protected parseInstanceOf(leftOperand: ExpressionNode, operator: TokenNode): InstanceOfNode {
    if (!this.isClassNameReferenceStart(this.currentToken.kind)) {
      let identifier = this.createMissingTokenWithError(TokenKind.Identifier, ErrorCode.ERR_ClassNameOrReferenceExpected);
      let name = new PartiallyQualifiedNameNode(this.factory.createList([identifier]));
      return new InstanceOfNode(leftOperand, operator, name);
    }
    let reference = this.parseClassNameReference();
    return new InstanceOfNode(leftOperand, operator, reference);
  }

  /**
   * Parses an isset intrinsic expression.
   *
   * Syntax: `ISSET ( isset-list )`
   *
   * Where `isset-list` is:
   * - `isset-list , expr`
   * - `expr`
   */
  protected parseIsSet(): IsSetIntrinsicNode {
    let isSetKeyword = this.eat(TokenKind.IsSet);
    let openParen = this.eat(TokenKind.OpenParen);

    let expressions: Array<ExpressionNode | TokenNode> = [];
    expressions.push(this.parseExpression());

    while (this.currentToken.kind === TokenKind.Comma) {
      let comma = this.eat(TokenKind.Comma);
      if (!this.isExpressionStart(this.currentToken.kind)) {
        if (!this.isSupportedVersion(PhpVersion.PHP7_3)) {
          comma = this.addError(comma, ErrorCode.ERR_FeatureTrailingCommasInArgumentLists);
        }
        expressions.push(comma);
        break;
      }
      else {
        expressions.push(comma);
        expressions.push(this.parseExpression());
      }
    }

    let closeParen = this.currentToken.kind === TokenKind.CloseParen
      ? this.eat(TokenKind.CloseParen)
      : expressions.length & 1
        ? this.createMissingTokenWithError(TokenKind.CloseParen, ErrorCode.ERR_CommaOrCloseParenExpected)
        : this.createMissingTokenWithError(TokenKind.CloseParen, ErrorCode.ERR_ExpressionOrCloseParenExpected);
    return new IsSetIntrinsicNode(isSetKeyword, openParen, this.factory.createList(expressions), closeParen);
  }

  /**
   * @todo Document parseLabelOrExpression().
   */
  protected parseLabelOrExpression(isStatementExpected: boolean): Expression {
    // Fully qualified and relative names should not reach this method.
    Debug.assert(this.currentToken.kind === TokenKind.Identifier);

    let names = this.parseNamespaceName();
    if (isStatementExpected && names.length === 1 && this.currentToken.kind === TokenKind.Colon) {
      let colon = this.eat(TokenKind.Colon);
      let label = new LabelNode(names[0], colon);
      return new Expression(label, ExpressionType.Any);
    }

    let name = new PartiallyQualifiedNameNode(this.factory.createList(names));
    return this.parseNamedExpression(name);
  }

  /**
   * Parses a lexical variable.
   *
   * Syntax:
   * - `VARIABLE`
   * - `& VARIABLE`
   */
  protected parseLexicalVariable(): LexicalVariableNode {
    let ampersand = this.eatOptional(TokenKind.Ampersand);
    let variable = this.currentToken.kind === TokenKind.Variable
      ? this.eat(TokenKind.Variable)
      : this.createMissingTokenWithError(TokenKind.Variable, ErrorCode.ERR_VariableExpected);
    return new LexicalVariableNode(ampersand, variable);
  }

  /**
   * Parses a deconstruction (list intrinsic).
   *
   * Syntax: `LIST ( list-variables )`
   *
   * Where `list-variables` is:
   * - `list-variables , list-element`
   * - `list-element`
   */
  protected parseListDestructure(): ListDestructureNode {
    let listKeyword = this.eat(TokenKind.List);
    let openParen = this.eat(TokenKind.OpenParen);

    let isEmpty = true;
    let variables: Array<ListDestructureElementNode | TokenNode> = [];
    if (this.isListIntrinsicElementStart(this.currentToken.kind)) {
      variables.push(this.parseListDestructureElement());
      isEmpty = false;
    }

    while (this.currentToken.kind === TokenKind.Comma) {
      variables.push(this.eat(TokenKind.Comma));
      if (this.isListIntrinsicElementStart(this.currentToken.kind)) {
        variables.push(this.parseListDestructureElement());
        isEmpty = false;
      }
    }

    if (variables.length === 0 || isEmpty) {
      let variable = this.createMissingTokenWithError(TokenKind.Variable, ErrorCode.ERR_DeconstructVariableMissing);
      let value = new LocalVariableNode(variable);
      let element = new ListDestructureElementNode(null, null, null, value);
      variables.push(element);
    }

    let code = variables[variables.length - 1] instanceof TokenNode
      ? ErrorCode.ERR_ExpressionOrCloseParenExpected
      : ErrorCode.ERR_CommaOrCloseParenExpected;

    let closeParen = this.currentToken.kind === TokenKind.CloseParen
      ? this.eat(TokenKind.CloseParen)
      : this.createMissingTokenWithError(TokenKind.CloseParen, code);

    // Technically, if the variable list is empty, then a missing element
    // should be appended instead.
    return new ListDestructureNode(
      listKeyword,
      openParen,
      variables.length > 0 ? this.factory.createList(variables) : null,
      closeParen
    );
  }

  /**
   * Parses an element of a deconstruction (list intrinsic).
   *
   * Syntax:
   * - `expr`
   * - `expr => expr`
   * - `list-destructure`
   * - `expr => list-destructure`
   */
  protected parseListDestructureElement(): ListDestructureElementNode {
    if (this.currentToken.kind === TokenKind.List) {
      let list = this.parseListDestructure();
      return new ListDestructureElementNode(null, null, null, list);
    }

    let ampersand = this.eatOptional(TokenKind.Ampersand);
    if (ampersand !== null) {
      if (!this.isSupportedVersion(PhpVersion.PHP7_3)) {
        ampersand = this.addError(ampersand, ErrorCode.ERR_FeatureListDeconstructionByRef);
      }
      let byRefValue = this.parseExpression(ExpressionType.Explicit);
      return new ListDestructureElementNode(null, null, ampersand, byRefValue);
    }

    // The expected expression type can only be determined after parsing it, so
    // the expression needs to be parsed manually and possibly have an error
    // added later.
    let expr = this.parseExpressionTree();
    Debug.assert(expr.node instanceof ExpressionNode);

    if (this.currentToken.kind !== TokenKind.DoubleArrow) {
      // This is a value expression, which must be "explicit".
      let variable = <ExpressionNode>expr.node;
      if (!variable.containsDiagnostics && expr.type === ExpressionType.Implicit) {
        variable = this.addError(variable, ErrorCode.ERR_ExpressionNotAddressable);
      }
      return new ListDestructureElementNode(null, null, null, variable);
    }

    let key = <ExpressionNode>expr.node;
    let doubleArrow = this.eat(TokenKind.DoubleArrow);

    if (!this.isSupportedVersion(PhpVersion.PHP7_1)) {
      // The parser considers '=> $v' to be invalid, but it would also be
      // acceptable to place this error on the key, since the logical solution
      // is to remove '$k =>' instead.
      doubleArrow = this.addError(doubleArrow, ErrorCode.ERR_FeatureListDeconstructionKeys);
    }

    ampersand = this.eatOptional(TokenKind.Ampersand);
    if (ampersand !== null) {
      if (!this.isSupportedVersion(PhpVersion.PHP7_3)) {
        ampersand = this.addError(ampersand, ErrorCode.ERR_FeatureListDeconstructionByRef);
      }
      let byRefValue = this.parseExpression(ExpressionType.Explicit);
      return new ListDestructureElementNode(key, doubleArrow, ampersand, byRefValue);
    }

    // Suppress TS2365: Current token changed after previous method call.
    let value = <TokenKind>this.currentToken.kind === TokenKind.List
      ? this.parseListDestructure()
      : this.parseExpression(ExpressionType.Explicit);
    return new ListDestructureElementNode(key, doubleArrow, ampersand, value);
  }

  /**
   * Parses a member access expression.
   *
   * Syntax:
   * - `dereferenceable -> property-name`
   * - `dereferenceable -> property-name ( argument-list )`
   *
   * Where `property-name` is:
   * - `member-name`
   * - `simple-variable`
   * - `{ expr }`
   *
   * @param {ExpressionNode} dereferenceable
   *   An addressable expression.
   * @param {boolean} allowInvocation
   *   If `true`, parse an invocation expression when possible.
   */
  protected parseMemberAccessOrInvocation(dereferenceable: ExpressionNode, allowInvocation: boolean): MemberAccessNode | MemberInvocationNode {
    let objOperator = this.eat(TokenKind.ObjectOperator);

    let memberName: TokenNode | null = null;

    let openBrace: TokenNode | null = null;
    let memberReference: ExpressionNode | null = null;
    let closeBrace: TokenNode | null = null;

    // NOTE: PHP's lexer converts any text after an object operator into an
    // identifier. The lexer used by this parser does not do that, and as
    // such requires a slight modification to allow keywords.
    if (this.isClassMemberIdentifier(this.currentToken.kind)) {
      memberName = this.eat(this.currentToken.kind);
    }
    else if (this.currentToken.kind === TokenKind.OpenBrace) {
      openBrace = this.eat(TokenKind.OpenBrace);
      memberReference = this.parseExpression();
      closeBrace = this.eat(TokenKind.CloseBrace);
    }
    else if (this.currentToken.kind === TokenKind.Dollar || this.currentToken.kind === TokenKind.Variable) {
      memberReference = this.parseSimpleVariable();
    }
    else {
      // @todo ERR_ObjectMemberExpected "Identifier, variable, or '{' expected"  ...in member access expression
      //   See also: ERR_StaticMemberExpected
      memberName = this.createMissingToken(TokenKind.Identifier, this.currentToken.kind, true);
    }

    if (allowInvocation && this.currentToken.kind === TokenKind.OpenParen) {
      let invocationArgs = this.parseArgumentList();

      if (memberReference !== null) {
        return new IndirectMethodInvocationNode(
          dereferenceable,
          objOperator,
          openBrace,
          memberReference,
          closeBrace,
          invocationArgs.openParen,
          invocationArgs.argumentList,
          invocationArgs.closeParen
        );
      }
      if (memberName !== null) {
        return new NamedMethodInvocationNode(
          dereferenceable,
          objOperator,
          memberName,
          invocationArgs.openParen,
          invocationArgs.argumentList,
          invocationArgs.closeParen
        );
      }

      throw new ParserException('Invalid object member');  // Unreachable.
    }

    if (memberReference !== null) {
      return new IndirectMemberAccessNode(dereferenceable, objOperator, openBrace, memberReference, closeBrace);
    }
    if (memberName !== null) {
      return new NamedMemberAccessNode(dereferenceable, objOperator, memberName);
    }

    throw new ParserException('Invalid object member');  // Unreachable.
  }

  /**
   * @todo Document parseNamedExpression().
   */
  protected parseNamedExpression(name: NameNode): Expression {
    if (this.currentToken.kind === TokenKind.DoubleColon) {
      let doubleColon = this.eat(TokenKind.DoubleColon);
      return this.parseScopedAccessOrInvocation(name, doubleColon);
    }

    if (this.currentToken.kind === TokenKind.OpenParen) {
      let invocation = this.parseFunctionInvocation(name);
      return new Expression(invocation, ExpressionType.Explicit);
    }

    let type = this.currentToken.kind === TokenKind.OpenBracket
      ? ExpressionType.Explicit
      : ExpressionType.Implicit;

    let constant = new ConstantNode(name);
    return new Expression(constant, type);
  }

  /**
   * @todo Document parseNamespaceDeclarationOrExpression().
   */
  protected parseNamespaceDeclarationOrExpression(isStatementExpected: boolean): Expression {
    // Namespace declarations should only be expected as a top-level statement.
    Debug.assert(isStatementExpected && (this.isInContext(ParseContext.SourceElements) || this.isInContext(ParseContext.NamespaceElements)));

    let namespaceKeyword = this.eat(TokenKind.Namespace);

    // Even if the parser is in a top-statement context, a declaration should
    // not be parsed unless it is also expected:
    //
    //   if (namespace| A
    //                ^-- cursor here
    //
    if (isStatementExpected && (this.currentToken.kind === TokenKind.Identifier || this.currentToken.kind === TokenKind.OpenBrace)) {
      let namespace = this.parseNamespaceDeclaration(namespaceKeyword);
      if (this.isInContext(ParseContext.NamespaceElements)) {
        // Since a diagnostic on the node would overlap with diagnostics on
        // child statements, this error is customized to only cover the
        // namespace keyword and name (if present).
        let width = namespaceKeyword.width + (namespace.name !== null ? namespace.name.fullWidth : 0);
        let diagnostic = this.createDiagnostic(namespaceKeyword.leadingTriviaWidth, width, ErrorCode.ERR_NamespaceIsNested);
        namespace = namespace.withDiagnostics(namespace.diagnostics.concat([diagnostic]));
      }
      return new Expression(namespace, ExpressionType.Any);
    }

    let relativeName: RelativeNameNode;
    if (this.currentToken.kind === TokenKind.Backslash || !isStatementExpected) {
      let leadingBackslash = this.eat(TokenKind.Backslash);
      let names = this.parseNamespaceName();
      relativeName = new RelativeNameNode(namespaceKeyword, leadingBackslash, this.factory.createList(names));
    }
    else {
      // At this point the next token is not a backslash (relative name),
      // identifier, or opening brace (namespace declaration). To recover, a
      // nameless constant is used instead of a namespace declaration since
      // that would probably make name resolution harder.
      let leadingBackslash = this.createMissingTokenWithError(TokenKind.Backslash, ErrorCode.ERR_IncompleteNamespace);
      let identifier = this.createMissingToken(TokenKind.Identifier, this.currentToken.kind, false);
      relativeName = new RelativeNameNode(namespaceKeyword, leadingBackslash, this.factory.createList([identifier]));
    }

    let constant: ConstantNode;
    switch (this.currentToken.kind) {
      case TokenKind.DoubleColon:
        let doubleColon = this.eat(TokenKind.DoubleColon);
        return this.parseScopedAccessOrInvocation(relativeName, doubleColon);
      case TokenKind.OpenBracket:
        // The element access part of this will get parsed later.
        constant = new ConstantNode(relativeName);
        return new Expression(constant, ExpressionType.Explicit);
      case TokenKind.OpenParen:
        let invocation = this.parseFunctionInvocation(relativeName);
        return new Expression(invocation, ExpressionType.Explicit);
      default:
        constant = new ConstantNode(relativeName);
        return new Expression(constant, ExpressionType.Implicit);
    }
  }

  /**
   * Parses an object creation (new) expression.
   *
   * Syntax:
   * - `NEW anonymous-class-declaration`
   * - `NEW class-name-reference`
   * - `NEW class-name-reference ( argument-list )`
   */
  protected parseObjectCreationExpression(): ObjectCreationNode {
    let newKeyword = this.eat(TokenKind.New);

    if (this.currentToken.kind === TokenKind.Class) {
      let declaration = this.parseAnonymousClass();
      return new AnonymousObjectCreationNode(newKeyword, declaration);
    }
    else if (!this.isClassNameReferenceStart(this.currentToken.kind)) {
      let identifier = this.createMissingTokenWithError(TokenKind.Identifier, ErrorCode.ERR_ClassNameOrReferenceExpected);
      let name = new PartiallyQualifiedNameNode(this.factory.createList([identifier]));
      return new NamedObjectCreationNode(newKeyword, name, null, null, null);
    }

    let reference = this.parseClassNameReference();
    let openParen: TokenNode | null = null;
    let argumentList: NodeList | null = null;
    let closeParen: TokenNode | null = null;

    if (this.currentToken.kind === TokenKind.OpenParen) {
      let invocationArgs = this.parseArgumentList();
      openParen = invocationArgs.openParen;
      argumentList = invocationArgs.argumentList;
      closeParen = invocationArgs.closeParen;
    }

    return reference instanceof NameNode
      ? new NamedObjectCreationNode(newKeyword, reference, openParen, argumentList, closeParen)
      : new IndirectObjectCreationNode(newKeyword, reference, openParen, argumentList, closeParen);
  }

  /**
   * Parses a print intrinsic expression.
   *
   * Syntax: `PRINT expr`
   */
  protected parsePrint(): PrintIntrinsicNode {
    let printKeyword = this.eat(TokenKind.Print);
    let expr = this.parseExpression();
    return new PrintIntrinsicNode(printKeyword, expr);
  }

  /**
   * @todo Document parseScopedAccessOrInvocation().
   */
  protected parseScopedAccessOrInvocation(qualifier: ExpressionNode | NameNode, doubleColon: TokenNode): Expression {
    let kind = this.currentToken.kind;
    if (this.isClassMemberIdentifier(kind)) {
      let member = this.eat(this.currentToken.kind);

      if (this.currentToken.kind === TokenKind.OpenParen) {
        let invocationArgs = this.parseArgumentList();
        let invocation = new NamedScopedInvocationNode(
          qualifier,
          doubleColon,
          member,
          invocationArgs.openParen,
          invocationArgs.argumentList,
          invocationArgs.closeParen
        );
        return new Expression(invocation, ExpressionType.Explicit);
      }

      // If this is a class constant that is being dereferenced, then it is
      // being used as an explicit variable in part of an expression (the
      // actual element access will get parsed later).
      let type = this.currentToken.kind === TokenKind.OpenBracket
        ? ExpressionType.Explicit : ExpressionType.Implicit;

      let constant = new ClassConstantNode(qualifier, doubleColon, member);
      return new Expression(constant, type);
    }
    else if (kind === TokenKind.Dollar || kind === TokenKind.Variable) {
      let variable = this.parseSimpleVariable();

      // Suppress TS2365: Current token changed after previous method call.
      if (<TokenKind>this.currentToken.kind === TokenKind.OpenParen) {
        let invocationArgs = this.parseArgumentList();
        let invocation = new IndirectScopedInvocationNode(
          qualifier,
          doubleColon,
          null,
          variable,
          null,
          invocationArgs.openParen,
          invocationArgs.argumentList,
          invocationArgs.closeParen
        );
        return new Expression(invocation, ExpressionType.Explicit);
      }

      let property = new StaticPropertyNode(qualifier, doubleColon, variable);
      return new Expression(property, ExpressionType.Explicit);
    }
    else if (kind === TokenKind.OpenBrace) {
      let openBrace = this.eat(TokenKind.OpenBrace);
      let member = this.parseExpression();
      let closeBrace = this.eat(TokenKind.CloseBrace);
      let invocationArgs = this.parseArgumentList();
      let invocation = new IndirectScopedInvocationNode(
        qualifier,
        doubleColon,
        openBrace,
        member,
        closeBrace,
        invocationArgs.openParen,
        invocationArgs.argumentList,
        invocationArgs.closeParen
      );
      return new Expression(invocation, ExpressionType.Explicit);
    }
    else {
      let identifier = this.createMissingTokenWithError(TokenKind.Identifier, ErrorCode.ERR_StaticMemberExpected);
      let constant = new ClassConstantNode(qualifier, doubleColon, identifier);
      return new Expression(constant, ExpressionType.Implicit);
    }
  }

  /**
   * Parses an import or require expression.
   *
   * Syntax: `inclusion-keyword expr`
   *
   * Where `inclusion-keyword` is:
   * - `INCLUDE`
   * - `INCLUDE_ONCE`
   * - `REQUIRE`
   * - `REQUIRE_ONCE`
   */
  protected parseScriptInclusion(): ScriptInclusionNode {
    let keyword = this.eat(this.currentToken.kind);
    let expr = this.parseExpression();
    return new ScriptInclusionNode(keyword, expr);
  }

  /**
   * Parses a shell command (backquote) template.
   *
   * Syntax:
   * - `BACKQUOTE BACKQUOTE`
   * - `BACKQUOTE STRING_TEMPLATE_LITERAL BACKQUOTE`
   * - `BACKQUOTE string-template-list BACKQUOTE`
   */
  protected parseShellCommandTemplate(): ShellCommandTemplateNode {
    const fullSpan = new TextSpan(this.currentToken.offset, this.currentToken.length);
    const fullText = this.lexer.sourceText.slice(fullSpan);

    let templateSpans = this.lexer.templateSpans;
    let template = this.eat(TokenKind.ShellCommandTemplate);

    // Create a temporary lexer and parser.
    let lexer = new PhpLexer(fullText);
    lexer.rescanInterpolatedShellCommand(templateSpans);
    let parser = new PhpParser(lexer);
    parser.nextToken();

    let openBackQuote = parser.eat(TokenKind.BackQuote);
    openBackQuote = openBackQuote.withDiagnostics(template.diagnostics);
    openBackQuote = openBackQuote.withLeadingTrivia(template.leadingTrivia);

    let nodes: NodeList | null = null;
    if (parser.currentToken.kind === TokenKind.StringTemplateLiteral) {
      let stringLiteral = parser.parseStringTemplateLiteral();
      nodes = parser.isStringTemplateEnd(parser.currentToken.kind, TokenKind.BackQuote)
        ? parser.factory.createList([stringLiteral])
        : parser.parseStringTemplateElementList(stringLiteral, TokenKind.BackQuote);
    }
    else if (parser.isStringTemplateElementStart(parser.currentToken.kind)) {
      nodes = parser.parseStringTemplateElementList(null, TokenKind.BackQuote);
    }

    let closeBackQuote: TokenNode;
    if (parser.currentToken.kind === TokenKind.BackQuote) {
      closeBackQuote = parser.eat(TokenKind.BackQuote);
    }
    else {
      // The parser should always reach the end of a template.
      Debug.assert(parser.currentToken.kind === TokenKind.EOF);

      // If the closing backquote was missing the lexer already added an error.
      closeBackQuote = parser.createMissingToken(TokenKind.BackQuote, parser.currentToken.kind, false);
      // Move any trailing trivia over to this parser.
      if (parser.leadingTrivia.length > 0) {
        this.leadingTrivia = this.leadingTrivia.concat(parser.leadingTrivia);
        this.leadingTriviaWidth += parser.leadingTriviaWidth;
      }
    }

    return new ShellCommandTemplateNode(openBackQuote, nodes, closeBackQuote);
  }

  /**
   * Parses a simple variable.
   *
   * Syntax:
   * - `VARIABLE`
   * - `$ { expression }`
   * - `$ simple-variable`
   */
  protected parseSimpleVariable(): VariableNode {
    if (this.currentToken.kind === TokenKind.Dollar) {
      let dollar = this.eat(TokenKind.Dollar);
      // Suppress TS2365: Current token changed after previous method call.
      let kind = <TokenKind>this.currentToken.kind;
      if (kind === TokenKind.Variable || kind === TokenKind.Dollar) {
        let variable = this.parseSimpleVariable();
        return new IndirectVariableNode(dollar, null, variable, null);
      }
      else if (kind === TokenKind.OpenBrace) {
        let openBrace = this.eat(TokenKind.OpenBrace);
        let expression = this.parseExpression();
        let closeBrace = this.eat(TokenKind.CloseBrace);
        return new IndirectVariableNode(dollar, openBrace, expression, closeBrace);
      }
      else {
        // A '$' followed by nothing is usually an incomplete local variable.
        dollar = this.addError(dollar, ErrorCode.ERR_IncompleteVariable);
        return new LocalVariableNode(dollar);
      }
    }
    let variable = this.currentToken.kind === TokenKind.Variable
      ? this.eat(TokenKind.Variable)
      : this.createMissingTokenWithError(TokenKind.Variable, ErrorCode.ERR_VariableExpected);
    return new LocalVariableNode(variable);
  }

  /**
   * @todo Document parseStaticDeclartionOrExpression().
   */
  protected parseStaticDeclarationOrExpression(isStatementExpected: boolean): Expression {
    let staticKeyword = this.eat(TokenKind.Static);

    if (isStatementExpected && (this.currentToken.kind === TokenKind.Dollar || this.currentToken.kind === TokenKind.Variable)) {
      let decl = this.parseStatic(staticKeyword);
      return new Expression(decl, ExpressionType.Any);
    }

    if (this.currentToken.kind === TokenKind.Function) {
      let functionKeyword = this.eat(TokenKind.Function);
      let ampersand = this.eatOptional(TokenKind.Ampersand);
      let closure = this.parseClosure(staticKeyword, functionKeyword, ampersand);
      return new Expression(closure, ExpressionType.Implicit);
    }

    if (this.currentToken.kind === TokenKind.Fn) {
      let arrowFunction = this.parseArrowFunction(staticKeyword);
      return new Expression(arrowFunction, ExpressionType.Implicit);
    }

    // The qualifier of scoped access nodes cannot be a token.
    let name = new PartiallyQualifiedNameNode(this.factory.createList([staticKeyword]));

    if (this.currentToken.kind === TokenKind.DoubleColon) {
      let doubleColon = this.eat(TokenKind.DoubleColon);
      return this.parseScopedAccessOrInvocation(name, doubleColon);
    }

    let doubleColon = this.createMissingTokenWithError(TokenKind.DoubleColon, ErrorCode.ERR_StaticExpressionExpected);
    let identifier = this.createMissingToken(TokenKind.Identifier, this.currentToken.kind, false);
    let constant = new ClassConstantNode(name, doubleColon, identifier);
    return new Expression(constant, ExpressionType.Implicit);
  }

  /**
   * Parses a single-quoted string.
   */
  protected parseStringLiteral(): Expression {
    let literal = new LiteralNode(this.eat(TokenKind.StringLiteral));
    let type = ExpressionType.Implicit;
    if (this.isElementAccessStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.DoubleColon || this.currentToken.kind === TokenKind.OpenParen) {
      type = ExpressionType.Explicit;
    }
    return new Expression(literal, type);
  }

  /**
   * Parses a double-quoted template.
   *
   * Syntax: `" string-template-list "`
   */
  protected parseStringTemplate(): StringTemplateNode {
    const fullSpan = new TextSpan(this.currentToken.offset, this.currentToken.length);
    const fullText = this.lexer.sourceText.slice(fullSpan);

    let templateSpans = this.lexer.templateSpans;
    let template = this.eat(TokenKind.StringTemplate);

    // Create a temporary lexer and parser.
    let lexer = new PhpLexer(fullText);
    lexer.rescanInterpolatedString(templateSpans);
    let parser = new PhpParser(lexer);
    parser.nextToken();

    let openQuote = parser.eat(TokenKind.DoubleQuote);
    openQuote = openQuote.withDiagnostics(template.diagnostics);
    openQuote = openQuote.withLeadingTrivia(template.leadingTrivia);

    let nodes: NodeList | null = null;
    if (parser.currentToken.kind === TokenKind.StringTemplateLiteral) {
      let stringLiteral = parser.parseStringTemplateLiteral();

      // Unlike heredoc and shell command templates, if there is not at least
      // one interpolation, the lexer will not create a string template token.
      Debug.assert(parser.isStringTemplateElementStart(parser.currentToken.kind));

      nodes = parser.parseStringTemplateElementList(stringLiteral, TokenKind.DoubleQuote);
    }
    else {
      nodes = parser.parseStringTemplateElementList(null, TokenKind.DoubleQuote);
    }

    let closeQuote: TokenNode;
    if (parser.currentToken.kind === TokenKind.DoubleQuote) {
      closeQuote = parser.eat(TokenKind.DoubleQuote)
    }
    else {
      // The parser should always reach the end of a template.
      Debug.assert(parser.currentToken.kind === TokenKind.EOF);

      // If the closing quote was missing, the lexer already added an error.
      closeQuote = parser.createMissingToken(TokenKind.DoubleQuote, parser.currentToken.kind, false);
      // Move any trailing trivia over to this parser.
      if (parser.leadingTrivia.length > 0) {
        this.leadingTrivia = this.leadingTrivia.concat(parser.leadingTrivia);
        this.leadingTriviaWidth += parser.leadingTriviaWidth;
      }
    }

    return new StringTemplateNode(openQuote, nodes, closeQuote);
  }

  /**
   * Parses an interpolation in a string template.
   *
   * Syntax:
   * - `string-indirection`
   * - `string-variable`
   * - `{ expr }`
   */
  protected parseStringTemplateElement(): ExpressionNode {
    switch (this.currentToken.kind) {
      case TokenKind.Variable:
        return this.parseStringTemplateVariable();
      case TokenKind.DollarOpenBrace:
        return this.parseStringTemplateIndirection();
      case TokenKind.OpenBrace:
        // NOTE: To get this token the lexer must have scanned a `{$`.
        let openBrace = this.eat(TokenKind.OpenBrace);
        let expression = this.parseExpression(ExpressionType.Explicit);
        let closeBrace = this.eat(TokenKind.CloseBrace);
        return new StringExpressionNode(openBrace, expression, closeBrace);
      default:
        // This should only be reached under two conditions:
        // 1) There is a missing call to `isStringTemplateElement()`.
        // 2) The lexer failed to return a `StringTemplateLiteral` when it should have.
        throw new ParserException('Expected template variable not found');
    }
  }

  /**
   * Parses a list of literal strings and interpolations within a string template.
   *
   * Syntax: `string-template-list`
   *
   * Where `string-template-list` is:
   * - `string-template-list string-template-element`
   * - `string-template-list STRING_TEMPLATE_LITERAL`
   * - `string-template-element`
   * - `STRING_TEMPLATE_LITERAL string-template-element`
   *
   * @param {LiteralNode|null} templateLiteral
   *   The first literal within a string template.
   * @param {TokenKind} terminator
   *   The token used to terminate the string template.
   */
  protected parseStringTemplateElementList(templateLiteral: LiteralNode | null, terminator: TokenKind): NodeList {
    let nodes: ExpressionNode[] = [];

    if (templateLiteral !== null) {
      nodes.push(templateLiteral);
      nodes.push(this.parseStringTemplateElement());
    }
    else {
      nodes.push(this.parseStringTemplateElement());
    }

    while (this.currentToken.kind !== TokenKind.EOF && this.currentToken.kind !== terminator) {
      if (this.currentToken.kind === TokenKind.StringTemplateLiteral) {
        nodes.push(this.parseStringTemplateLiteral());
      }
      else if (this.isStringTemplateElementStart(this.currentToken.kind)) {
        nodes.push(this.parseStringTemplateElement());
      }
      else {
        // An interpolation can cause the lexer to remain in the "in script"
        // state which will cause it to return unexpected tokens.
        this.skipBadStringTemplateTokens(terminator);
      }
    }

    return this.factory.createList(nodes);
  }

  /**
   * Parses an expression that is used to determine a variable name within a
   * string template.
   *
   * Syntax:
   * - `${ expr }`
   * - `${ STRING_IDENTIFIER }`
   * - `${ STRING_IDENTIFIER [ expr ] }`
   */
  protected parseStringTemplateIndirection(): IndirectStringVariableNode {
    let dollarOpenBrace = this.eat(TokenKind.DollarOpenBrace);

    if (this.currentToken.kind !== TokenKind.StringIdentifier) {
      let expr: ExpressionNode;
      if (this.isExpressionStart(this.currentToken.kind)) {
        expr = this.parseExpression();
      }
      else {
        let identifier = this.createMissingTokenWithError(TokenKind.StringIdentifier, ErrorCode.ERR_StringVariableNameExpected);
        expr = new StringVariableNode(identifier);
      }
      let closeBrace = this.eat(TokenKind.CloseBrace);
      return new IndirectStringVariableNode(dollarOpenBrace, expr, closeBrace);
    }

    let variable = new StringVariableNode(this.eat(TokenKind.StringIdentifier));
    // Suppress TS2365: Current token changed after previous method call.
    if (<TokenKind>this.currentToken.kind === TokenKind.OpenBracket) {
      let openBracket = this.eat(TokenKind.OpenBracket);
      let index = this.parseExpression();
      let closeBracket = this.eat(TokenKind.CloseBracket);
      let reference = new ElementAccessNode(variable, openBracket, index, closeBracket);

      let closeBrace = this.eat(TokenKind.CloseBrace);
      return new IndirectStringVariableNode(dollarOpenBrace, reference, closeBrace);
    }

    let closeBrace = this.eat(TokenKind.CloseBrace);
    return new IndirectStringVariableNode(dollarOpenBrace, variable, closeBrace);
  }

  /**
   * Parses the text within a string template.
   */
  protected parseStringTemplateLiteral(): LiteralNode {
    return new LiteralNode(this.eat(TokenKind.StringTemplateLiteral));
  }

  /**
   * Parses a variable within a string template.
   *
   * Syntax:
   * - `VARIABLE`
   * - `VARIABLE [ string-offset ]`
   * - `VARIABLE -> member-name`
   *
   * Where `string-offset` is:
   * - `IDENTIFIER`
   * - `STRING_NUMBER`
   * - `- STRING_NUMBER`
   * - `VARIABLE`
   */
  protected parseStringTemplateVariable(): ExpressionNode {
    let variable = this.eat(TokenKind.Variable);
    if (this.currentToken.kind === TokenKind.OpenBracket) {
      let openBracket = this.eat(TokenKind.OpenBracket);
      let minus: TokenNode | null = null;
      let offset: TokenNode;
      if (this.isStringTemplateVariableOffset(this.currentToken.kind)) {
        offset = this.eat(this.currentToken.kind);
      }
      // Suppress TS2365: Current token changed after previous method call.
      else if (<TokenKind>this.currentToken.kind === TokenKind.Minus) {
        minus = this.eat(TokenKind.Minus);
        // Suppress TS2365: Current token changed after previous method call.
        offset = <TokenKind>this.currentToken.kind === TokenKind.StringNumber
          ? this.eat(TokenKind.StringNumber)
          : this.createMissingTokenWithError(TokenKind.StringNumber, ErrorCode.ERR_StringOffsetNumberExpected);
      }
      else {
        offset = this.createMissingTokenWithError(TokenKind.Variable, ErrorCode.ERR_StringOffsetExpected);
      }
      let closeBracket = this.eat(TokenKind.CloseBracket);
      return new StringElementAccessNode(variable, openBracket, minus, offset, closeBracket);
    }
    else if (this.currentToken.kind === TokenKind.ObjectOperator) {
      let dereferenceable = new LocalVariableNode(variable);
      let objOperator = this.eat(TokenKind.ObjectOperator);
      let identifier = this.isClassMemberIdentifier(this.currentToken.kind)
        ? this.eat(this.currentToken.kind)
        : this.createMissingToken(TokenKind.Identifier, this.currentToken.kind, true);
      return new NamedMemberAccessNode(dereferenceable, objOperator, identifier);
    }
    else {
      return new LocalVariableNode(variable);
    }
  }

  /**
   * Parses a yield expression.
   *
   * Syntax:
   * - `YIELD`
   * - `YIELD expr`
   * - `YIELD expr => expr`
   */
  protected parseYield(): YieldNode {
    let yieldKeyword = this.eat(TokenKind.Yield);
    if (!this.isExpressionStart(this.currentToken.kind)) {
      return new YieldNode(yieldKeyword, null, null, null);
    }

    let expr = this.parseExpression();
    if (this.currentToken.kind === TokenKind.DoubleArrow) {
      let doubleArrow = this.eat(TokenKind.DoubleArrow);
      let valueExpr = this.parseExpression();
      return new YieldNode(yieldKeyword, expr, doubleArrow, valueExpr);
    }

    return new YieldNode(yieldKeyword, null, null, expr);
  }

  /**
   * Parses a yield from expression.
   *
   * Syntax: `YIELD FROM expr`
   */
  protected parseYieldFrom(): YieldFromNode {
    let yieldFromKeyword = this.eat(TokenKind.YieldFrom);
    let expr = this.parseExpression();
    return new YieldFromNode(yieldFromKeyword, expr);
  }

  // --------------------------------------------------------------------------
  // Utility and error recovery methods
  // --------------------------------------------------------------------------

  /**
   * Gets a `ModifierFlag` for modifier keywords.
   */
  protected getModifierFlag(kind: TokenKind): ModifierFlags {
    switch (kind) {
      case TokenKind.Abstract:
        return ModifierFlags.Abstract;
      case TokenKind.Final:
        return ModifierFlags.Final;
      case TokenKind.Private:
        return ModifierFlags.Private;
      case TokenKind.Protected:
        return ModifierFlags.Protected;
      case TokenKind.Public:
        return ModifierFlags.Public;
      case TokenKind.Static:
        return ModifierFlags.Static;
      default:
        return ModifierFlags.None;
    }
  }

  /**
   * Gets the precedence of a specified *binary* operator.
   *
   * @param {TokenKind} kind
   *   An expression operator.
   *
   * @return {Precedence}
   *   The operator's precedence or `Precedence.None` if the token is not
   *   a known operator.
   */
  protected getPrecedence(kind: TokenKind): Precedence {
    switch (kind) {
      case TokenKind.LogicalOr:
        return Precedence.LogicalOr;
      case TokenKind.LogicalXor:
        return Precedence.LogicalXor;
      case TokenKind.LogicalAnd:
        return Precedence.LogicalAnd;
      case TokenKind.AndEqual:
      case TokenKind.CoalesceEqual:
      case TokenKind.ConcatEqual:
      case TokenKind.DivideEqual:
      case TokenKind.Equal:
      case TokenKind.MinusEqual:
      case TokenKind.ModEqual:
      case TokenKind.MultiplyEqual:
      case TokenKind.OrEqual:
      case TokenKind.PlusEqual:
      case TokenKind.PowEqual:
      case TokenKind.ShiftLeftEqual:
      case TokenKind.ShiftRightEqual:
      case TokenKind.XorEqual:
        return Precedence.Assignment;
      case TokenKind.Question:
        return Precedence.Ternary;
      case TokenKind.Coalesce:
        return Precedence.Coalesce;
      case TokenKind.BooleanOr:
        return Precedence.BooleanOr;
      case TokenKind.BooleanAnd:
        return Precedence.BooleanAnd;
      case TokenKind.VerticalBar:
        return Precedence.BitwiseOr;
      case TokenKind.Caret:
        return Precedence.BitwiseXor;
      case TokenKind.Ampersand:
        return Precedence.BitwiseAnd;
      case TokenKind.Inequality:
      case TokenKind.IsEqual:
      case TokenKind.IsIdentical:
      case TokenKind.IsNotEqual:
      case TokenKind.IsNotIdentical:
      case TokenKind.Spaceship:
        return Precedence.Equality;
      case TokenKind.GreaterThan:
      case TokenKind.IsGreaterThanOrEqual:
      case TokenKind.IsLessThanOrEqual:
      case TokenKind.LessThan:
        return Precedence.Relational;
      case TokenKind.ShiftLeft:
      case TokenKind.ShiftRight:
        return Precedence.Shift;
      case TokenKind.Minus:
      case TokenKind.Period:
      case TokenKind.Plus:
        return Precedence.Add;
      case TokenKind.Asterisk:
      case TokenKind.Percent:
      case TokenKind.Slash:
        return Precedence.Multiply;
      case TokenKind.InstanceOf:
        return Precedence.InstanceOf;
      case TokenKind.Pow:
        return Precedence.Pow;
      default:
        return Precedence.None;
    }
  }

  /**
   * Determines if the given modifier would make the declaration abstract
   * and private.
   */
  protected isAbstractAndPrivate(currentFlags: ModifierFlags, modifier: ModifierFlags): boolean {
    // This method should not be reached if the modifier is a duplicate.
    Debug.assert((currentFlags & modifier) === 0);

    if (currentFlags & ModifierFlags.Abstract) {
      return ((currentFlags | modifier) & ModifierFlags.Private) !== 0;
    }
    if (currentFlags & ModifierFlags.Private) {
      return ((currentFlags | modifier) & ModifierFlags.Abstract) !== 0;
    }
    return false;
  }

  /**
   * Determines if the specified binary operator is expected given the expression
   * type that has been parsed.
   *
   * @param {TokenKind} operator
   *   A binary operator.
   * @param {ExpressionType} type
   *   The expression type of the left operand.
   */
  protected isBinaryOperatorExpected(operator: TokenKind, type: ExpressionType): boolean {
    // Assignment operators require an explicit LHS, and may "override"
    // precedence rules to create a valid expression.
    if (type === ExpressionType.Explicit && this.isAssignmentOperator(operator)) {
      return true;
    }
    return false;
  }

  /**
   * Determines if a parameter is entirely missing.
   */
  protected isParameterMissing(parameter: ParameterNode): boolean {
    return parameter.ampersand === null && parameter.ellipsis === null && parameter.variable.isMissing;
  }

  /**
   * Determines if the next token may start a member declaration and is on a
   * different line.
   */
  protected isPossibleMemberDeclarationStart(): boolean {
    if (this.leadingTrivia.length === 0) {
      return false;
    }

    // @todo Ideally this would check for a line break anywhere in the trivia,
    //   and then check the next TWO tokens. However, since the parser does not
    //   have a "peek" method (yet?), settle for a strict check of an immediate
    //   line break.
    if (this.leadingTrivia[0].kind !== TokenKind.LineBreak) {
      return false;
    }

    switch (this.currentToken.kind) {
      case TokenKind.Const:
      case TokenKind.Function:
        return true;
      default:
        return this.getModifierFlag(this.currentToken.kind) !== ModifierFlags.None;
    }
  }

  /**
   * Determines if the specified unary operator is expected given the expression
   * type that should be parsed.
   *
   * @param {TokenKind} operator
   *   A unary operator.
   * @param {ExpressionType} type
   *   The expected expression type.
   */
  protected isUnaryOperatorExpected(operator: TokenKind, type: ExpressionType): boolean {
    // If the expected type is `Explicit` then this is the operand of a prefix-
    // decrement or prefix-increment expression (all other unary expressions
    // expect `Any`). In that case, the next operator cannot be '--' or '++' as
    // that would make the operand `Implicit`.
    if (type === ExpressionType.Explicit && (operator === TokenKind.Decrement || operator === TokenKind.Increment)) {
      return false;
    }
    return true;
  }

  /**
   * @todo Document skipBadArgumentListTokens().
   */
  protected skipBadArgumentListTokens(): void {
    this.skipToken();  // @todo Invalid token '%s' in argument list

    while (this.currentToken.kind !== TokenKind.EOF) {
      if (this.isArgumentStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.Comma) {
        break;  // @todo continue
      }
      if (this.currentToken.kind === TokenKind.CloseParen) {
        break;  // @todo abort
      }
      this.skipToken();
    }
  }

  /**
   * @todo Document skipBadForExpressionListTokens().
   */
  protected skipBadForExpressionListTokens(terminator: TokenKind): void {
    this.skipToken();  // @todo Invalid token '%s' in for expression

    let kind = this.currentToken.kind;
    while (kind !== TokenKind.EOF) {
      if (this.isExpressionStart(kind) || kind === TokenKind.Comma) {
        break;  // @todo continue
      }
      if (kind === TokenKind.CloseParen || kind === terminator) {
        break;  // @todo abort
      }
      this.skipToken();
      kind = this.currentToken.kind;
    }
  }

  /**
   * A custom recovery strategy that matches opening and closing braces.
   */
  protected skipBadMemberTokens(): void {
    let braceCount = 0;

    // Always consume at least one token.
    this.skipTokenWithError(ErrorCode.ERR_InvalidMemberDeclaration, TokenKindInfo.getText(this.currentToken.kind));

    let kind = this.currentToken.kind;
    while (kind !== TokenKind.EOF) {
      if (this.isClassMemberStart(kind)) {
        break;
      }

      if (kind === TokenKind.OpenBrace) {
        braceCount++;
      }
      else if (kind === TokenKind.CloseBrace) {
        if (braceCount === 0) {
          break;
        }
        braceCount--;
      }

      this.skipToken();
      kind = this.currentToken.kind;
    }
  }

  /**
   * @todo Document skipBadParameterListTokens().
   */
  protected skipBadParameterListTokens(): void {
    this.skipToken(); // @todo Invalid token '%s' in parameter list

    while (this.currentToken.kind !== TokenKind.EOF) {
      if (this.isParameterStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.Comma) {
        break;  // @todo continue
      }
      if (this.currentToken.kind === TokenKind.CloseParen) {
        break;  // @todo abort
      }
      this.skipToken();
    }
  }

  /**
   * @todo Document skipBadStringTemplateTokens().
   */
  protected skipBadStringTemplateTokens(terminator: TokenKind): void {
    this.skipToken();  // @todo Invalid token '%s' in string template

    while (this.currentToken.kind !== TokenKind.EOF) {
      if (this.isStringTemplateElementStart(this.currentToken.kind) || this.currentToken.kind === TokenKind.StringTemplateLiteral) {
        break;  // @todo continue
      }
      if (this.currentToken.kind === terminator) {
        break;  // @todo abort
      }
      this.skipToken();
    }
  }

  /**
   * @todo Document skipBadTraitUseTokens().
   */
  protected skipBadTraitUseTokens(): void {
    this.skipToken();  // @todo Invalid token '%s' in trait adaptation

    while (this.currentToken.kind !== TokenKind.EOF) {
      if (this.isTraitAdaptationStart(this.currentToken.kind)) {
        break;  // @todo continue
      }
      if (this.currentToken.kind === TokenKind.CloseBrace) {
        break;  // @todo abort
      }
      this.skipToken();
    }
  }

}
