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

// ----------------------------------------------------------------------------
// THIS IS A GENERATED FILE. DO NOT MODIFY.
// ----------------------------------------------------------------------------

'use strict';

export enum ErrorCode {

  /**
   * An error code that was unknown, but has since been found to be unnecessary.
   */
  Void = -1,
  /**
   * An error code that has yet to be determined.
   */
  Unknown = 0,
  /**
   * "The '%s' feature is experimental and unsupported, use %s to enable"
   */
  ERR_FeatureIsExperimental = 200,
  /**
   * "The '%s' feature requires PHP %s or later"
   */
  ERR_FeatureNotAvailable = 201,
  /**
   * "The feature 'class constant modifiers' requires PHP 7.1 or later"
   */
  ERR_FeatureClassConstantModifiers = 202,
  /**
   * "The feature 'list deconstruction with assignment by reference' requires PHP 7.3 or later"
   */
  ERR_FeatureListDeconstructionByRef = 203,
  /**
   * "The feature 'list deconstruction by keys' requires PHP 7.1 or later"
   */
  ERR_FeatureListDeconstructionKeys = 204,
  /**
   * "The feature 'shortened list deconstruction syntax' requires PHP 7.1 or later"
   */
  ERR_FeatureListDeconstructionShortSyntax = 205,
  /**
   * "The feature 'nullable types' requires PHP 7.1 or later"
   */
  ERR_FeatureNullableTypes = 206,
  /**
   * "The feature 'spread operators in array initializers' requires PHP 7.4 or later"
   */
  ERR_FeatureSpreadOperatorInArrays = 207,
  /**
   * "The feature 'trailing commas in argument lists' requires PHP 7.3 or later"
   */
  ERR_FeatureTrailingCommasInArgumentLists = 208,
  /**
   * "The feature 'trailing commas in use declarations' requires PHP 7.2 or later"
   */
  ERR_FeatureTrailingCommasInUseDeclarations = 209,
  /**
   * "The feature 'try-catch union types' requires PHP 7.1 or later"
   */
  ERR_FeatureTryCatchUnionTypes = 210,
  /**
   * "The feature 'typed properties' requires PHP 7.4 or later"
   */
  ERR_FeatureTypedProperties = 211,
  /**
   * "Unexpected character (%s: '%s') in source text"
   */
  ERR_UnexpectedCharacter = 1000,
  /**
   * "Indentation contains both space and tab characters"
   */
  ERR_HeredocIndentHasSpacesAndTabs = 1001,
  /**
   * "Indentation does not match that of the closing identifier"
   */
  ERR_HeredocIndentMismatch = 1002,
  /**
   * "Invalid number"
   */
  ERR_InvalidNumber = 1003,
  /**
   * "Invalid unicode escape sequence"
   */
  ERR_InvalidEscapeSequenceUnicode = 1004,
  /**
   * "Code point in unicode escape sequence is greater than U+10FFFF"
   */
  ERR_UnicodeEscapeSequenceOverflow = 1005,
  /**
   * "Unterminated string"
   */
  ERR_UnterminatedString = 1006,
  /**
   * "Unterminated string constant"
   */
  ERR_UnterminatedStringConstant = 1007,
  /**
   * "Unterminated unicode escape sequence, '}' expected"
   */
  ERR_UnterminatedUnicodeEscapeSequence = 1008,
  /**
   * "Invalid escape sequence"
   */
  WRN_InvalidEscapeSequence = 1009,
  /**
   * "Octal escape sequence cannot be greater than \377 (255)"
   */
  WRN_OctalEscapeSequenceOverflow = 1010,
  /**
   * "End of file found, '' expected"
   */
  WRN_UnterminatedComment = 1011,
  /**
   * "Syntax error, '%s' expected"
   */
  ERR_Syntax = 2000,
  /**
   * "Unexpected token '%s'"
   */
  ERR_UnexpectedToken = 2001,
  /**
   * "An abstract class cannot be final"
   */
  ERR_AbstractClassIsFinal = 2002,
  /**
   * "Abstract members cannot be final"
   */
  ERR_AbstractMemberIsFinal = 2003,
  /**
   * "Abstract members cannot be private"
   */
  ERR_AbstractMemberIsPrivate = 2004,
  /**
   * "An abstract method cannot have a body"
   */
  ERR_AbstractMethodHasBody = 2005,
  /**
   * "A positional argument must be used prior to unpacked arguments"
   */
  ERR_ArgumentAfterUnpack = 2006,
  /**
   * "Class constants cannot be abstract, final, or static"
   */
  ERR_BadConstantModifier = 2007,
  /**
   * "Interface members cannot be abstract or final"
   */
  ERR_BadInterfaceModifier = 2008,
  /**
   * "Class properties cannot be abstract or final"
   */
  ERR_BadPropertyModifier = 2009,
  /**
   * "The modifier '%s' cannot be used on a trait alias"
   */
  ERR_BadTraitAliasModifier = 2010,
  /**
   * "The modifier '%s' cannot be used on a class, interface, or trait"
   */
  ERR_BadTypeModifier = 2011,
  /**
   * "Base clause must precede an interface list"
   */
  ERR_BaseClauseAfterImplements = 2012,
  /**
   * "Expected ':' or ';' after case label"
   */
  ERR_CaseLabelSeparatorExpected = 2013,
  /**
   * "Expected 'catch' or 'finally'"
   */
  ERR_CatchOrFinallyExpected = 2014,
  /**
   * "Constant, method, or property declaration expected"
   */
  ERR_ClassMemberExpected = 2015,
  /**
   * "Expected a class name or a reference to evaluate as a class name"
   */
  ERR_ClassNameOrReferenceExpected = 2016,
  /**
   * "'}' expected"
   */
  ERR_CloseBraceExpected = 2017,
  /**
   * "']' expected"
   */
  ERR_CloseBracketExpected = 2018,
  /**
   * "')' expected"
   */
  ERR_CloseParenExpected = 2019,
  /**
   * "':' or '=>' expected"
   */
  ERR_ColonOrDoubleArrowExpected = 2020,
  /**
   * "':' or ';' expected"
   */
  ERR_ColonOrSemicolonExpected = 2021,
  /**
   * "',' or '}' expected"
   */
  ERR_CommaOrCloseBraceExpected = 2022,
  /**
   * "',' or ')' expected"
   */
  ERR_CommaOrCloseParenExpected = 2023,
  /**
   * "',' or '{' expected"
   */
  ERR_CommaOrOpenBraceExpected = 2024,
  /**
   * "',' or ';' expected"
   */
  ERR_CommaOrSemicolonExpected = 2025,
  /**
   * "At least one variable is required to deconstruct an expression"
   */
  ERR_DeconstructVariableMissing = 2026,
  /**
   * "A destructuring variable cannot be assigned by reference"
   */
  ERR_DeconstructVariableReference = 2027,
  /**
   * "'=>' or ')' expected"
   */
  ERR_DoubleArrowOrCloseParenExpected = 2028,
  /**
   * "Duplicate '%s' modifier"
   */
  ERR_DuplicateModifier = 2029,
  /**
   * "'...' or ')' expected"
   */
  ERR_EllipsisOrCloseParenExpected = 2030,
  /**
   * "Expression expected, got '%s'"
   */
  ERR_ExpressionExpected = 2031,
  /**
   * "End of file found, expression expected"
   */
  ERR_ExpressionExpectedEOF = 2032,
  /**
   * "The given expression does not have a usable address"
   */
  ERR_ExpressionNotAddressable = 2033,
  /**
   * "Expression or ')' expected"
   */
  ERR_ExpressionOrCloseParenExpected = 2034,
  /**
   * "Expression or ':' expected"
   */
  ERR_ExpressionOrColonExpected = 2035,
  /**
   * "Expression or ';' expected"
   */
  ERR_ExpressionOrSemicolonExpected = 2036,
  /**
   * "__halt_compiler() must be used in outermost scope"
   */
  ERR_HaltCompilerScope = 2037,
  /**
   * "Identifier expected"
   */
  ERR_IdentifierExpected = 2038,
  /**
   * "Identifier expected, '%s' is a keyword"
   */
  ERR_IdentifierExpectedKeyword = 2039,
  /**
   * "Identifier or '}' expected"
   */
  ERR_IdentifierOrCloseBraceExpected = 2040,
  /**
   * "Identifier or '(' expected"
   */
  ERR_IdentifierOrOpenParenExpected = 2041,
  /**
   * "Argument list, base clause, interface list, or '{' expected"
   */
  ERR_IncompleteAnonymousClassDeclaration = 2042,
  /**
   * "Expected an array initialization expression or destructuring assignment"
   */
  ERR_IncompleteArrayOrDestructure = 2043,
  /**
   * "Closure parameters or '&' expected"
   */
  ERR_IncompleteArrowFunction = 2044,
  /**
   * "Base clause, interface list, or '{' expected"
   */
  ERR_IncompleteClassDeclaration = 2045,
  /**
   * "Interface list or '{' expected"
   */
  ERR_IncompleteClassDeclarationWithExtends = 2046,
  /**
   * "Lexical variables, return type, or '{' expected"
   */
  ERR_IncompleteClosure = 2047,
  /**
   * "Function name, closure parameters, or '&' expected"
   */
  ERR_IncompleteFunctionDeclaration = 2048,
  /**
   * "Base clause or '{' expected"
   */
  ERR_IncompleteInterfaceDeclaration = 2049,
  /**
   * "Expected a namespace declaration or relative name"
   */
  ERR_IncompleteNamespace = 2050,
  /**
   * "Variable, '&' or '...' expected"
   */
  ERR_IncompleteParameter = 2051,
  /**
   * "Parameter list, initializer, or ')' expected"
   */
  ERR_IncompleteParameterList = 2052,
  /**
   * "Property list, initializer, or ';' expected"
   */
  ERR_IncompletePropertyDeclaration = 2053,
  /**
   * "Static variable list, initializer, or ';' expected"
   */
  ERR_IncompleteStaticDeclaration = 2054,
  /**
   * "Expected 'as' or '::' in trait adaptation"
   */
  ERR_IncompleteTraitAdaptation = 2055,
  /**
   * "Trait list, adaptation clause, or ';' expected"
   */
  ERR_IncompleteTraitUse = 2056,
  /**
   * "Expected additional imported names, an alias, or ';' in use declaration"
   */
  ERR_IncompleteUseDeclaration = 2057,
  /**
   * "Expected additional imported names, an alias, or '}' in use group clause"
   */
  ERR_IncompleteUseGroupDeclaration = 2058,
  /**
   * "Expected an identifier or use group clause"
   */
  ERR_IncompleteUseName = 2059,
  /**
   * "Expected a variable or indirect expression to evaluate as a variable name"
   */
  ERR_IncompleteVariable = 2060,
  /**
   * "Indentation expected"
   */
  ERR_IndentExpected = 2061,
  /**
   * "The keyword 'implements' cannot be used on an interface"
   */
  ERR_InterfaceImplementsList = 2062,
  /**
   * "Interfaces cannot contain method implementations"
   */
  ERR_InterfaceMethodDefinition = 2063,
  /**
   * "Constant or method declaration expected"
   */
  ERR_InterfaceMemberExpected = 2064,
  /**
   * "Interface members must be public"
   */
  ERR_InterfaceMemberNotPublic = 2065,
  /**
   * "Interfaces cannot contain properties"
   */
  ERR_InterfaceProperty = 2066,
  /**
   * "Interfaces cannot contain traits"
   */
  ERR_InterfaceTrait = 2067,
  /**
   * "Iteration depth in '%s' statement must be a constant integer"
   */
  ERR_InvalidIterationDepth = 2068,
  /**
   * "Invalid token '%s' in class, interface, or trait member declaration"
   */
  ERR_InvalidMemberDeclaration = 2069,
  /**
   * "Iteration depth or ';' expected"
   */
  ERR_IterationDepthOrSemicolonExpected = 2070,
  /**
   * "A method reference requires a '::' after a class name"
   */
  ERR_MalformedMethodReference = 2071,
  /**
   * "Method name expected"
   */
  ERR_MethodNameExpected = 2072,
  /**
   * "Method name or '&' expected"
   */
  ERR_MethodNameOrAmpersandExpected = 2073,
  /**
   * "Switch statements may only contain one 'default' label"
   */
  ERR_MultipleDefaultSwitchLabels = 2074,
  /**
   * "Classes may only inherit from one base class"
   */
  ERR_MultipleInheritance = 2075,
  /**
   * "The modifier '%s' cannot be used with another visibility modifier"
   */
  ERR_MultipleVisibilityModifiers = 2076,
  /**
   * "Namespace declarations cannot be nested"
   */
  ERR_NamespaceIsNested = 2077,
  /**
   * "'{' expected"
   */
  ERR_OpenBraceExpected = 2078,
  /**
   * "'{' or ':' expected"
   */
  ERR_OpenBraceOrColonExpected = 2079,
  /**
   * "'{' or ';' expected"
   */
  ERR_OpenBraceOrSemicolonExpected = 2080,
  /**
   * "'(' expected"
   */
  ERR_OpenParenExpected = 2081,
  /**
   * "Parameter expected"
   */
  ERR_ParameterExpected = 2082,
  /**
   * "Parameter or ')' expected"
   */
  ERR_ParameterOrCloseParenExpected = 2083,
  /**
   * "Property expected"
   */
  ERR_PropertyExpected = 2084,
  /**
   * "Property name expected after '$'"
   */
  ERR_PropertyNameExpected = 2085,
  /**
   * "';' expected"
   */
  ERR_SemicolonExpected = 2086,
  /**
   * "Statement expected"
   */
  ERR_StatementExpected = 2087,
  /**
   * "Statement or ':' expected"
   */
  ERR_StatementOrColonExpected = 2088,
  /**
   * "Closure, variable, or '::' expected"
   */
  ERR_StaticExpressionExpected = 2089,
  /**
   * "Identifier, variable, or '{' expected"
   */
  ERR_StaticMemberExpected = 2090,
  /**
   * "An interpolated element access expression must specify an offset"
   */
  ERR_StringOffsetExpected = 2091,
  /**
   * "Integer offset expected"
   */
  ERR_StringOffsetNumberExpected = 2092,
  /**
   * "Expected an expression or the name of a variable"
   */
  ERR_StringVariableNameExpected = 2093,
  /**
   * "Expected 'as' or 'insteadof' after method reference"
   */
  ERR_TraitAdaptationKeywordExpected = 2094,
  /**
   * "Traits cannot contain constants"
   */
  ERR_TraitConstant = 2095,
  /**
   * "Method or property declaration expected"
   */
  ERR_TraitMemberExpected = 2096,
  /**
   * "Type union or variable expected"
   */
  ERR_TryUnionOrVariableExpected = 2097,
  /**
   * "Type expected"
   */
  ERR_TypeExpected = 2098,
  /**
   * "A use type has already been specified"
   */
  ERR_UseTypeAlreadySpecified = 2099,
  /**
   * "Expected an imported type, constant, or function"
   */
  ERR_UseTypeExpected = 2100,
  /**
   * "Expected an imported type, constant, function, or '}'"
   */
  ERR_UseTypeOrCloseBraceExpected = 2101,
  /**
   * "Variable expected"
   */
  ERR_VariableExpected = 2102,
  /**
   * "Variable name expected after '$'"
   */
  ERR_VariableNameExpected = 2103,
  /**
   * "Variable or '...' expected"
   */
  ERR_VariableOrEllipsisExpected = 2104,
  /**
   * "A variadic parameter cannot have a default value"
   */
  ERR_VariadicHasDefaultValue = 2105,
  /**
   * "A variadic parameter must be the last parameter of a function or method signature"
   */
  ERR_VariadicIsNotLastParameter = 2106,
  /**
   * "Empty switch block"
   */
  WRN_EmptySwitchBlock = 2107,
  /**
   * "Possible mistaken empty statement (use '{}' if this was intended)"
   */
  WRN_PossibleMistakenEmptyStatement = 2108,
  /**
   * "The '(real)' type cast is deprecated, use '(float)' instead"
   */
  WRN_RealCast = 2109,
  /**
   * "The '(unset)' type cast is deprecated, use 'null' instead"
   */
  WRN_UnsetCast = 2110

}
