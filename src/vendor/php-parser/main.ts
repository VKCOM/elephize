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

export * from './diagnostics/Diagnostic';
export * from './diagnostics/DiagnosticSeverity';
export * from './diagnostics/ErrorCode.Generated';
export { ErrorCodeInfo } from './diagnostics/ErrorCodeInfo.Generated';
export * from './diagnostics/SyntaxDiagnostic';

export * from './language/TokenKind';

export * from './language/syntax/ISyntaxNode';
export * from './language/syntax/ISyntaxNodeQueryable';
export * from './language/syntax/ISyntaxToken';
export * from './language/syntax/ISyntaxTreeTraversable';
export * from './language/syntax/ISyntaxTrivia';
export * from './language/syntax/ISyntaxTriviaList';
export * from './language/syntax/ISyntaxVisitorAccess';
export * from './language/syntax/SourceTextSyntaxNode';
export { SyntaxList } from './language/syntax/SyntaxList';
export * from './language/syntax/SyntaxNode.Generated';
export * from './language/syntax/SyntaxNode';
export * from './language/syntax/SyntaxNodeExtensions';
export * from './language/syntax/SyntaxToken';
export * from './language/syntax/SyntaxTransform.Generated';
export * from './language/syntax/SyntaxTrivia';
export * from './language/syntax/SyntaxTriviaList';
export * from './language/syntax/SyntaxVisitor.Generated';
export * from './language/syntax/SyntaxWalker';
export * from './language/syntax/SyntaxWalkerDepth';

// export * from './parser/Character';
export * from './parser/DocumentationMode';
// export * from './parser/ExpressionType';
export * from './parser/Lexer';
// export * from './parser/ModifierFlags';
// export * from './parser/ParseContext';
export * from './parser/Parser';
export * from './parser/PhpLexer';
export * from './parser/PhpLexerState';
export * from './parser/PhpParser';
export * from './parser/PhpParserOptions';
export * from './parser/PhpSyntaxTree';
export * from './parser/PhpVersion';
// export * from './parser/Precedence';
export * from './parser/SyntaxTree';
export * from './parser/TemplateSpan';
export * from './parser/Token';

export * from './text/BomKind';
export * from './text/Encoding';
export * from './text/ISourceText';
export * from './text/ISourceTextContainer';
export * from './text/LinePosition';
export * from './text/SourceTextBase';
export * from './text/SourceTextFactory';
export * from './text/TextChange';
export * from './text/TextSpan';
