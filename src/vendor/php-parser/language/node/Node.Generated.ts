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

import { Hash } from '../../../php-common';

import {
  AnonymousClassSyntaxNode,
  AnonymousFunctionSyntaxNode,
  AnonymousObjectCreationSyntaxNode,
  ArgumentSyntaxNode,
  ArraySyntaxNode,
  ArrayElementSyntaxNode,
  ArrowFunctionSyntaxNode,
  AssignmentSyntaxNode,
  BinarySyntaxNode,
  BreakSyntaxNode,
  ClassConstantSyntaxNode,
  ClassConstantDeclarationSyntaxNode,
  ClassConstantElementSyntaxNode,
  ClassDeclarationSyntaxNode,
  CloneSyntaxNode,
  ClosureUseSyntaxNode,
  ConditionalSyntaxNode,
  ConstantSyntaxNode,
  ConstantDeclarationSyntaxNode,
  ConstantElementSyntaxNode,
  ContinueSyntaxNode,
  DeclareSyntaxNode,
  DeclareBlockSyntaxNode,
  DestructuringAssignmentSyntaxNode,
  DoWhileSyntaxNode,
  EchoSyntaxNode,
  ElementAccessSyntaxNode,
  ElseSyntaxNode,
  ElseBlockSyntaxNode,
  ElseIfSyntaxNode,
  ElseIfBlockSyntaxNode,
  EmptyIntrinsicSyntaxNode,
  ErrorControlSyntaxNode,
  EvalIntrinsicSyntaxNode,
  ExitIntrinsicSyntaxNode,
  ExpressionGroupSyntaxNode,
  ExpressionStatementSyntaxNode,
  FlexibleHeredocElementSyntaxNode,
  FlexibleHeredocTemplateSyntaxNode,
  ForSyntaxNode,
  ForBlockSyntaxNode,
  ForEachSyntaxNode,
  ForEachBlockSyntaxNode,
  FullyQualifiedNameSyntaxNode,
  FunctionDeclarationSyntaxNode,
  FunctionInvocationSyntaxNode,
  GlobalSyntaxNode,
  GoToSyntaxNode,
  HaltCompilerSyntaxNode,
  HeredocTemplateSyntaxNode,
  IfSyntaxNode,
  IfBlockSyntaxNode,
  IncompleteMemberSyntaxNode,
  IncompleteNamedTraitAdaptationSyntaxNode,
  IncompleteReferencedTraitAdaptationSyntaxNode,
  IndirectMemberAccessSyntaxNode,
  IndirectMethodInvocationSyntaxNode,
  IndirectObjectCreationSyntaxNode,
  IndirectScopedInvocationSyntaxNode,
  IndirectStringVariableSyntaxNode,
  IndirectVariableSyntaxNode,
  InstanceOfSyntaxNode,
  InterfaceDeclarationSyntaxNode,
  IsSetIntrinsicSyntaxNode,
  LabelSyntaxNode,
  LexicalVariableSyntaxNode,
  ListDestructureSyntaxNode,
  ListDestructureElementSyntaxNode,
  LiteralSyntaxNode,
  LocalVariableSyntaxNode,
  MethodDeclarationSyntaxNode,
  MethodReferenceSyntaxNode,
  NamedMemberAccessSyntaxNode,
  NamedMethodInvocationSyntaxNode,
  NamedObjectCreationSyntaxNode,
  NamedScopedInvocationSyntaxNode,
  NamedTraitAliasSyntaxNode,
  NamedTypeSyntaxNode,
  NamespaceDeclarationSyntaxNode,
  NamespaceGroupDeclarationSyntaxNode,
  ParameterSyntaxNode,
  PartiallyQualifiedNameSyntaxNode,
  PostfixUnarySyntaxNode,
  PredefinedTypeSyntaxNode,
  PrintIntrinsicSyntaxNode,
  PropertyDeclarationSyntaxNode,
  PropertyElementSyntaxNode,
  ReferencedTraitAliasSyntaxNode,
  RelativeNameSyntaxNode,
  ReturnSyntaxNode,
  ScriptInclusionSyntaxNode,
  ShellCommandTemplateSyntaxNode,
  StatementBlockSyntaxNode,
  StaticSyntaxNode,
  StaticElementSyntaxNode,
  StaticPropertySyntaxNode,
  StringElementAccessSyntaxNode,
  StringExpressionSyntaxNode,
  StringTemplateSyntaxNode,
  StringVariableSyntaxNode,
  SwitchSyntaxNode,
  SwitchBlockSyntaxNode,
  SwitchCaseSyntaxNode,
  ThrowSyntaxNode,
  TraitDeclarationSyntaxNode,
  TraitPrecedenceSyntaxNode,
  TraitUseSyntaxNode,
  TraitUseGroupSyntaxNode,
  TrySyntaxNode,
  TryCatchSyntaxNode,
  TryFinallySyntaxNode,
  UnarySyntaxNode,
  UnsetSyntaxNode,
  UseDeclarationSyntaxNode,
  UseElementSyntaxNode,
  UseGroupDeclarationSyntaxNode,
  WhileSyntaxNode,
  WhileBlockSyntaxNode,
  YieldSyntaxNode,
  YieldFromSyntaxNode,
} from '../syntax/SyntaxNode.Generated';
import { INode } from './INode';
import { Node } from './Node';
import { NodeFlags } from './NodeFlags';
import { NodeList } from './NodeList';
import { NodeTransform } from './NodeTransform.Generated';
import { NodeVisitor } from './NodeVisitor.Generated';
import { SyntaxDiagnostic } from '../../diagnostics/SyntaxDiagnostic';
import { SyntaxNode } from '../syntax/SyntaxNode';
import { TokenNode } from './TokenNode';

export abstract class ExpressionNode extends Node {

}
export abstract class NameNode extends Node {

  public abstract readonly namespaceName: NodeList;

}
export abstract class StatementNode extends Node {

}
export abstract class TraitAliasNode extends Node {

  public abstract readonly asKeyword: TokenNode;
  public abstract readonly modifier: TokenNode | null;
  public abstract readonly alias: TokenNode | null;
  public abstract readonly semicolon: TokenNode;

}
export abstract class TypeNode extends Node {

  public abstract readonly question: TokenNode | null;

}
export class AnonymousClassNode extends Node {

  public readonly classKeyword: TokenNode;
  public readonly openParen: TokenNode | null;
  public readonly argumentList: NodeList | null;
  public readonly closeParen: TokenNode | null;
  public readonly extendsKeyword: TokenNode | null;
  public readonly baseType: NameNode | null;
  public readonly implementsKeyword: TokenNode | null;
  public readonly interfaces: NodeList | null;
  public readonly openBrace: TokenNode;
  public readonly members: NodeList | null;
  public readonly closeBrace: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(classKeyword: TokenNode, openParen: TokenNode | null, argumentList: NodeList | null, closeParen: TokenNode | null, extendsKeyword: TokenNode | null, baseType: NameNode | null, implementsKeyword: TokenNode | null, interfaces: NodeList | null, openBrace: TokenNode, members: NodeList | null, closeBrace: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.classKeyword = classKeyword;
    this.openParen = openParen;
    this.argumentList = argumentList;
    this.closeParen = closeParen;
    this.extendsKeyword = extendsKeyword;
    this.baseType = baseType;
    this.implementsKeyword = implementsKeyword;
    this.interfaces = interfaces;
    this.openBrace = openBrace;
    this.members = members;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(classKeyword.flags, classKeyword.fullWidth);
    if (openParen !== null) {
      this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    }
    if (argumentList !== null) {
      this.updateFlagsAndWidth(argumentList.flags, argumentList.fullWidth);
    }
    if (closeParen !== null) {
      this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    }
    if (extendsKeyword !== null) {
      this.updateFlagsAndWidth(extendsKeyword.flags, extendsKeyword.fullWidth);
    }
    if (baseType !== null) {
      this.updateFlagsAndWidth(baseType.flags, baseType.fullWidth);
    }
    if (implementsKeyword !== null) {
      this.updateFlagsAndWidth(implementsKeyword.flags, implementsKeyword.fullWidth);
    }
    if (interfaces !== null) {
      this.updateFlagsAndWidth(interfaces.flags, interfaces.fullWidth);
    }
    this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    if (members !== null) {
      this.updateFlagsAndWidth(members.flags, members.fullWidth);
    }
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 11;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitAnonymousClass(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitAnonymousClass(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.classKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.argumentList;
      case 3:
        return this.closeParen;
      case 4:
        return this.extendsKeyword;
      case 5:
        return this.baseType;
      case 6:
        return this.implementsKeyword;
      case 7:
        return this.interfaces;
      case 8:
        return this.openBrace;
      case 9:
        return this.members;
      case 10:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): AnonymousClassSyntaxNode {
    return new AnonymousClassSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = AnonymousClassNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): AnonymousClassNode {
    return new AnonymousClassNode(this.classKeyword, this.openParen, this.argumentList, this.closeParen, this.extendsKeyword, this.baseType, this.implementsKeyword, this.interfaces, this.openBrace, this.members, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8714);
    hash = Hash.combine(this.classKeyword.hashCode(), hash);
    hash = this.openParen !== null ? Hash.combine(this.openParen.hashCode(), hash) : hash;
    hash = this.argumentList !== null ? Hash.combine(this.argumentList.hashCode(), hash) : hash;
    hash = this.closeParen !== null ? Hash.combine(this.closeParen.hashCode(), hash) : hash;
    hash = this.extendsKeyword !== null ? Hash.combine(this.extendsKeyword.hashCode(), hash) : hash;
    hash = this.baseType !== null ? Hash.combine(this.baseType.hashCode(), hash) : hash;
    hash = this.implementsKeyword !== null ? Hash.combine(this.implementsKeyword.hashCode(), hash) : hash;
    hash = this.interfaces !== null ? Hash.combine(this.interfaces.hashCode(), hash) : hash;
    hash = Hash.combine(this.openBrace.hashCode(), hash);
    hash = this.members !== null ? Hash.combine(this.members.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ArgumentNode extends Node {

  public readonly ellipsis: TokenNode | null;
  public readonly value: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(ellipsis: TokenNode | null, value: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.ellipsis = ellipsis;
    this.value = value;

    if (ellipsis !== null) {
      this.updateFlagsAndWidth(ellipsis.flags, ellipsis.fullWidth);
    }
    this.updateFlagsAndWidth(value.flags, value.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitArgument(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitArgument(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.ellipsis;
      case 1:
        return this.value;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ArgumentSyntaxNode {
    return new ArgumentSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ArgumentNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ArgumentNode {
    return new ArgumentNode(this.ellipsis, this.value, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8715);
    hash = this.ellipsis !== null ? Hash.combine(this.ellipsis.hashCode(), hash) : hash;
    hash = Hash.combine(this.value.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ArrayElementNode extends Node {

  public readonly key: ExpressionNode | null;
  public readonly doubleArrow: TokenNode | null;
  public readonly valueOperator: TokenNode | null;
  public readonly value: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(key: ExpressionNode | null, doubleArrow: TokenNode | null, valueOperator: TokenNode | null, value: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.key = key;
    this.doubleArrow = doubleArrow;
    this.valueOperator = valueOperator;
    this.value = value;

    if (key !== null) {
      this.updateFlagsAndWidth(key.flags, key.fullWidth);
    }
    if (doubleArrow !== null) {
      this.updateFlagsAndWidth(doubleArrow.flags, doubleArrow.fullWidth);
    }
    if (valueOperator !== null) {
      this.updateFlagsAndWidth(valueOperator.flags, valueOperator.fullWidth);
    }
    this.updateFlagsAndWidth(value.flags, value.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitArrayElement(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitArrayElement(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.key;
      case 1:
        return this.doubleArrow;
      case 2:
        return this.valueOperator;
      case 3:
        return this.value;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ArrayElementSyntaxNode {
    return new ArrayElementSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ArrayElementNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ArrayElementNode {
    return new ArrayElementNode(this.key, this.doubleArrow, this.valueOperator, this.value, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8716);
    hash = this.key !== null ? Hash.combine(this.key.hashCode(), hash) : hash;
    hash = this.doubleArrow !== null ? Hash.combine(this.doubleArrow.hashCode(), hash) : hash;
    hash = this.valueOperator !== null ? Hash.combine(this.valueOperator.hashCode(), hash) : hash;
    hash = Hash.combine(this.value.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ClassConstantElementNode extends Node {

  public readonly identifierOrKeyword: TokenNode;
  public readonly equal: TokenNode;
  public readonly expression: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(identifierOrKeyword: TokenNode, equal: TokenNode, expression: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.identifierOrKeyword = identifierOrKeyword;
    this.equal = equal;
    this.expression = expression;

    this.updateFlagsAndWidth(identifierOrKeyword.flags, identifierOrKeyword.fullWidth);
    this.updateFlagsAndWidth(equal.flags, equal.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitClassConstantElement(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitClassConstantElement(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.identifierOrKeyword;
      case 1:
        return this.equal;
      case 2:
        return this.expression;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ClassConstantElementSyntaxNode {
    return new ClassConstantElementSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ClassConstantElementNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ClassConstantElementNode {
    return new ClassConstantElementNode(this.identifierOrKeyword, this.equal, this.expression, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8717);
    hash = Hash.combine(this.identifierOrKeyword.hashCode(), hash);
    hash = Hash.combine(this.equal.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ClosureUseNode extends Node {

  public readonly useKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly variables: NodeList;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(useKeyword: TokenNode, openParen: TokenNode, variables: NodeList, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.useKeyword = useKeyword;
    this.openParen = openParen;
    this.variables = variables;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(useKeyword.flags, useKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(variables.flags, variables.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitClosureUse(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitClosureUse(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.useKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.variables;
      case 3:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ClosureUseSyntaxNode {
    return new ClosureUseSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ClosureUseNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ClosureUseNode {
    return new ClosureUseNode(this.useKeyword, this.openParen, this.variables, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8718);
    hash = Hash.combine(this.useKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.variables.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ConstantElementNode extends Node {

  public readonly identifier: TokenNode;
  public readonly equal: TokenNode;
  public readonly expression: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(identifier: TokenNode, equal: TokenNode, expression: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.identifier = identifier;
    this.equal = equal;
    this.expression = expression;

    this.updateFlagsAndWidth(identifier.flags, identifier.fullWidth);
    this.updateFlagsAndWidth(equal.flags, equal.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitConstantElement(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitConstantElement(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.identifier;
      case 1:
        return this.equal;
      case 2:
        return this.expression;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ConstantElementSyntaxNode {
    return new ConstantElementSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ConstantElementNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ConstantElementNode {
    return new ConstantElementNode(this.identifier, this.equal, this.expression, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8719);
    hash = Hash.combine(this.identifier.hashCode(), hash);
    hash = Hash.combine(this.equal.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ElseNode extends Node {

  public readonly elseKeyword: TokenNode;
  public readonly statement: StatementNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(elseKeyword: TokenNode, statement: StatementNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.elseKeyword = elseKeyword;
    this.statement = statement;

    this.updateFlagsAndWidth(elseKeyword.flags, elseKeyword.fullWidth);
    this.updateFlagsAndWidth(statement.flags, statement.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitElse(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitElse(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.elseKeyword;
      case 1:
        return this.statement;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ElseSyntaxNode {
    return new ElseSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ElseNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ElseNode {
    return new ElseNode(this.elseKeyword, this.statement, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8720);
    hash = Hash.combine(this.elseKeyword.hashCode(), hash);
    hash = Hash.combine(this.statement.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ElseBlockNode extends Node {

  public readonly elseKeyword: TokenNode;
  public readonly colon: TokenNode;
  public readonly statements: NodeList | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(elseKeyword: TokenNode, colon: TokenNode, statements: NodeList | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.elseKeyword = elseKeyword;
    this.colon = colon;
    this.statements = statements;

    this.updateFlagsAndWidth(elseKeyword.flags, elseKeyword.fullWidth);
    this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitElseBlock(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitElseBlock(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.elseKeyword;
      case 1:
        return this.colon;
      case 2:
        return this.statements;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ElseBlockSyntaxNode {
    return new ElseBlockSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ElseBlockNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ElseBlockNode {
    return new ElseBlockNode(this.elseKeyword, this.colon, this.statements, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8721);
    hash = Hash.combine(this.elseKeyword.hashCode(), hash);
    hash = Hash.combine(this.colon.hashCode(), hash);
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ElseIfNode extends Node {

  public readonly elseIfKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly condition: ExpressionNode;
  public readonly closeParen: TokenNode;
  public readonly statement: StatementNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(elseIfKeyword: TokenNode, openParen: TokenNode, condition: ExpressionNode, closeParen: TokenNode, statement: StatementNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.elseIfKeyword = elseIfKeyword;
    this.openParen = openParen;
    this.condition = condition;
    this.closeParen = closeParen;
    this.statement = statement;

    this.updateFlagsAndWidth(elseIfKeyword.flags, elseIfKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(condition.flags, condition.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(statement.flags, statement.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitElseIf(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitElseIf(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.elseIfKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.condition;
      case 3:
        return this.closeParen;
      case 4:
        return this.statement;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ElseIfSyntaxNode {
    return new ElseIfSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ElseIfNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ElseIfNode {
    return new ElseIfNode(this.elseIfKeyword, this.openParen, this.condition, this.closeParen, this.statement, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8722);
    hash = Hash.combine(this.elseIfKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.condition.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.statement.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ElseIfBlockNode extends Node {

  public readonly elseIfKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly condition: ExpressionNode;
  public readonly closeParen: TokenNode;
  public readonly colon: TokenNode;
  public readonly statements: NodeList | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(elseIfKeyword: TokenNode, openParen: TokenNode, condition: ExpressionNode, closeParen: TokenNode, colon: TokenNode, statements: NodeList | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.elseIfKeyword = elseIfKeyword;
    this.openParen = openParen;
    this.condition = condition;
    this.closeParen = closeParen;
    this.colon = colon;
    this.statements = statements;

    this.updateFlagsAndWidth(elseIfKeyword.flags, elseIfKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(condition.flags, condition.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 6;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitElseIfBlock(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitElseIfBlock(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.elseIfKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.condition;
      case 3:
        return this.closeParen;
      case 4:
        return this.colon;
      case 5:
        return this.statements;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ElseIfBlockSyntaxNode {
    return new ElseIfBlockSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ElseIfBlockNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ElseIfBlockNode {
    return new ElseIfBlockNode(this.elseIfKeyword, this.openParen, this.condition, this.closeParen, this.colon, this.statements, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8723);
    hash = Hash.combine(this.elseIfKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.condition.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.colon.hashCode(), hash);
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class FlexibleHeredocElementNode extends Node {

  public readonly indent: TokenNode;
  public readonly template: NodeList | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(indent: TokenNode, template: NodeList | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.indent = indent;
    this.template = template;

    this.updateFlagsAndWidth(indent.flags, indent.fullWidth);
    if (template !== null) {
      this.updateFlagsAndWidth(template.flags, template.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitFlexibleHeredocElement(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitFlexibleHeredocElement(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.indent;
      case 1:
        return this.template;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): FlexibleHeredocElementSyntaxNode {
    return new FlexibleHeredocElementSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = FlexibleHeredocElementNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): FlexibleHeredocElementNode {
    return new FlexibleHeredocElementNode(this.indent, this.template, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8724);
    hash = Hash.combine(this.indent.hashCode(), hash);
    hash = this.template !== null ? Hash.combine(this.template.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IncompleteNamedTraitAdaptationNode extends Node {

  public readonly identifierOrKeyword: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(identifierOrKeyword: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.identifierOrKeyword = identifierOrKeyword;

    this.updateFlagsAndWidth(identifierOrKeyword.flags, identifierOrKeyword.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 1;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitIncompleteNamedTraitAdapatation(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitIncompleteNamedTraitAdapatation(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.identifierOrKeyword;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IncompleteNamedTraitAdaptationSyntaxNode {
    return new IncompleteNamedTraitAdaptationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IncompleteNamedTraitAdaptationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IncompleteNamedTraitAdaptationNode {
    return new IncompleteNamedTraitAdaptationNode(this.identifierOrKeyword, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8725);
    hash = Hash.combine(this.identifierOrKeyword.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IncompleteReferencedTraitAdaptationNode extends Node {

  public readonly reference: MethodReferenceNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(reference: MethodReferenceNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.reference = reference;

    this.updateFlagsAndWidth(reference.flags, reference.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 1;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitIncompleteReferencedTraitAdaptation(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitIncompleteReferencedTraitAdaptation(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.reference;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IncompleteReferencedTraitAdaptationSyntaxNode {
    return new IncompleteReferencedTraitAdaptationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IncompleteReferencedTraitAdaptationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IncompleteReferencedTraitAdaptationNode {
    return new IncompleteReferencedTraitAdaptationNode(this.reference, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8726);
    hash = Hash.combine(this.reference.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ListDestructureNode extends Node {

  public readonly listKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly variables: NodeList | null;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(listKeyword: TokenNode, openParen: TokenNode, variables: NodeList | null, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.listKeyword = listKeyword;
    this.openParen = openParen;
    this.variables = variables;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(listKeyword.flags, listKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (variables !== null) {
      this.updateFlagsAndWidth(variables.flags, variables.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitListDestructure(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitListDestructure(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.listKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.variables;
      case 3:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ListDestructureSyntaxNode {
    return new ListDestructureSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ListDestructureNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ListDestructureNode {
    return new ListDestructureNode(this.listKeyword, this.openParen, this.variables, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8727);
    hash = Hash.combine(this.listKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.variables !== null ? Hash.combine(this.variables.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ListDestructureElementNode extends Node {

  public readonly key: ExpressionNode | null;
  public readonly doubleArrow: TokenNode | null;
  public readonly ampersand: TokenNode | null;
  public readonly value: ExpressionNode | ListDestructureNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(key: ExpressionNode | null, doubleArrow: TokenNode | null, ampersand: TokenNode | null, value: ExpressionNode | ListDestructureNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.key = key;
    this.doubleArrow = doubleArrow;
    this.ampersand = ampersand;
    this.value = value;

    if (key !== null) {
      this.updateFlagsAndWidth(key.flags, key.fullWidth);
    }
    if (doubleArrow !== null) {
      this.updateFlagsAndWidth(doubleArrow.flags, doubleArrow.fullWidth);
    }
    if (ampersand !== null) {
      this.updateFlagsAndWidth(ampersand.flags, ampersand.fullWidth);
    }
    this.updateFlagsAndWidth(value.flags, value.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitListDestructureElement(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitListDestructureElement(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.key;
      case 1:
        return this.doubleArrow;
      case 2:
        return this.ampersand;
      case 3:
        return this.value;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ListDestructureElementSyntaxNode {
    return new ListDestructureElementSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ListDestructureElementNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ListDestructureElementNode {
    return new ListDestructureElementNode(this.key, this.doubleArrow, this.ampersand, this.value, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8728);
    hash = this.key !== null ? Hash.combine(this.key.hashCode(), hash) : hash;
    hash = this.doubleArrow !== null ? Hash.combine(this.doubleArrow.hashCode(), hash) : hash;
    hash = this.ampersand !== null ? Hash.combine(this.ampersand.hashCode(), hash) : hash;
    hash = Hash.combine(this.value.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class MethodReferenceNode extends Node {

  public readonly className: NameNode;
  public readonly doubleColon: TokenNode;
  public readonly methodName: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(className: NameNode, doubleColon: TokenNode, methodName: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.className = className;
    this.doubleColon = doubleColon;
    this.methodName = methodName;

    this.updateFlagsAndWidth(className.flags, className.fullWidth);
    this.updateFlagsAndWidth(doubleColon.flags, doubleColon.fullWidth);
    this.updateFlagsAndWidth(methodName.flags, methodName.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitMethodReference(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitMethodReference(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.className;
      case 1:
        return this.doubleColon;
      case 2:
        return this.methodName;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): MethodReferenceSyntaxNode {
    return new MethodReferenceSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = MethodReferenceNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): MethodReferenceNode {
    return new MethodReferenceNode(this.className, this.doubleColon, this.methodName, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8729);
    hash = Hash.combine(this.className.hashCode(), hash);
    hash = Hash.combine(this.doubleColon.hashCode(), hash);
    hash = Hash.combine(this.methodName.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ParameterNode extends Node {

  public readonly type: NamedTypeNode | PredefinedTypeNode | null;
  public readonly ampersand: TokenNode | null;
  public readonly ellipsis: TokenNode | null;
  public readonly variable: TokenNode;
  public readonly equal: TokenNode | null;
  public readonly expression: ExpressionNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(type: NamedTypeNode | PredefinedTypeNode | null, ampersand: TokenNode | null, ellipsis: TokenNode | null, variable: TokenNode, equal: TokenNode | null, expression: ExpressionNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.type = type;
    this.ampersand = ampersand;
    this.ellipsis = ellipsis;
    this.variable = variable;
    this.equal = equal;
    this.expression = expression;

    if (type !== null) {
      this.updateFlagsAndWidth(type.flags, type.fullWidth);
    }
    if (ampersand !== null) {
      this.updateFlagsAndWidth(ampersand.flags, ampersand.fullWidth);
    }
    if (ellipsis !== null) {
      this.updateFlagsAndWidth(ellipsis.flags, ellipsis.fullWidth);
    }
    this.updateFlagsAndWidth(variable.flags, variable.fullWidth);
    if (equal !== null) {
      this.updateFlagsAndWidth(equal.flags, equal.fullWidth);
    }
    if (expression !== null) {
      this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 6;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitParameter(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitParameter(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.type;
      case 1:
        return this.ampersand;
      case 2:
        return this.ellipsis;
      case 3:
        return this.variable;
      case 4:
        return this.equal;
      case 5:
        return this.expression;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ParameterSyntaxNode {
    return new ParameterSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ParameterNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ParameterNode {
    return new ParameterNode(this.type, this.ampersand, this.ellipsis, this.variable, this.equal, this.expression, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8730);
    hash = this.type !== null ? Hash.combine(this.type.hashCode(), hash) : hash;
    hash = this.ampersand !== null ? Hash.combine(this.ampersand.hashCode(), hash) : hash;
    hash = this.ellipsis !== null ? Hash.combine(this.ellipsis.hashCode(), hash) : hash;
    hash = Hash.combine(this.variable.hashCode(), hash);
    hash = this.equal !== null ? Hash.combine(this.equal.hashCode(), hash) : hash;
    hash = this.expression !== null ? Hash.combine(this.expression.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class PropertyElementNode extends Node {

  public readonly variable: TokenNode;
  public readonly equal: TokenNode | null;
  public readonly expression: ExpressionNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(variable: TokenNode, equal: TokenNode | null, expression: ExpressionNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.variable = variable;
    this.equal = equal;
    this.expression = expression;

    this.updateFlagsAndWidth(variable.flags, variable.fullWidth);
    if (equal !== null) {
      this.updateFlagsAndWidth(equal.flags, equal.fullWidth);
    }
    if (expression !== null) {
      this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitPropertyElement(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitPropertyElement(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.variable;
      case 1:
        return this.equal;
      case 2:
        return this.expression;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): PropertyElementSyntaxNode {
    return new PropertyElementSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = PropertyElementNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): PropertyElementNode {
    return new PropertyElementNode(this.variable, this.equal, this.expression, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8731);
    hash = Hash.combine(this.variable.hashCode(), hash);
    hash = this.equal !== null ? Hash.combine(this.equal.hashCode(), hash) : hash;
    hash = this.expression !== null ? Hash.combine(this.expression.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class StaticElementNode extends Node {

  public readonly variable: TokenNode;
  public readonly equal: TokenNode | null;
  public readonly expression: ExpressionNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(variable: TokenNode, equal: TokenNode | null, expression: ExpressionNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.variable = variable;
    this.equal = equal;
    this.expression = expression;

    this.updateFlagsAndWidth(variable.flags, variable.fullWidth);
    if (equal !== null) {
      this.updateFlagsAndWidth(equal.flags, equal.fullWidth);
    }
    if (expression !== null) {
      this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitStaticElement(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitStaticElement(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.variable;
      case 1:
        return this.equal;
      case 2:
        return this.expression;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): StaticElementSyntaxNode {
    return new StaticElementSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = StaticElementNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): StaticElementNode {
    return new StaticElementNode(this.variable, this.equal, this.expression, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8732);
    hash = Hash.combine(this.variable.hashCode(), hash);
    hash = this.equal !== null ? Hash.combine(this.equal.hashCode(), hash) : hash;
    hash = this.expression !== null ? Hash.combine(this.expression.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class SwitchCaseNode extends Node {

  public readonly clauseKeyword: TokenNode;
  public readonly expression: ExpressionNode | null;
  public readonly separator: TokenNode;
  public readonly statements: NodeList | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(clauseKeyword: TokenNode, expression: ExpressionNode | null, separator: TokenNode, statements: NodeList | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.clauseKeyword = clauseKeyword;
    this.expression = expression;
    this.separator = separator;
    this.statements = statements;

    this.updateFlagsAndWidth(clauseKeyword.flags, clauseKeyword.fullWidth);
    if (expression !== null) {
      this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    }
    this.updateFlagsAndWidth(separator.flags, separator.fullWidth);
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitSwitchCase(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitSwitchCase(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.clauseKeyword;
      case 1:
        return this.expression;
      case 2:
        return this.separator;
      case 3:
        return this.statements;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): SwitchCaseSyntaxNode {
    return new SwitchCaseSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = SwitchCaseNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): SwitchCaseNode {
    return new SwitchCaseNode(this.clauseKeyword, this.expression, this.separator, this.statements, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8733);
    hash = Hash.combine(this.clauseKeyword.hashCode(), hash);
    hash = this.expression !== null ? Hash.combine(this.expression.hashCode(), hash) : hash;
    hash = Hash.combine(this.separator.hashCode(), hash);
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class TraitPrecedenceNode extends Node {

  public readonly methodReference: MethodReferenceNode;
  public readonly insteadOfKeyword: TokenNode;
  public readonly traitNames: NodeList;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(methodReference: MethodReferenceNode, insteadOfKeyword: TokenNode, traitNames: NodeList, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.methodReference = methodReference;
    this.insteadOfKeyword = insteadOfKeyword;
    this.traitNames = traitNames;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(methodReference.flags, methodReference.fullWidth);
    this.updateFlagsAndWidth(insteadOfKeyword.flags, insteadOfKeyword.fullWidth);
    this.updateFlagsAndWidth(traitNames.flags, traitNames.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitTraitPrecedence(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitTraitPrecedence(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.methodReference;
      case 1:
        return this.insteadOfKeyword;
      case 2:
        return this.traitNames;
      case 3:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): TraitPrecedenceSyntaxNode {
    return new TraitPrecedenceSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = TraitPrecedenceNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TraitPrecedenceNode {
    return new TraitPrecedenceNode(this.methodReference, this.insteadOfKeyword, this.traitNames, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8734);
    hash = Hash.combine(this.methodReference.hashCode(), hash);
    hash = Hash.combine(this.insteadOfKeyword.hashCode(), hash);
    hash = Hash.combine(this.traitNames.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class TryCatchNode extends Node {

  public readonly catchKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly typeNames: NodeList;
  public readonly variable: TokenNode;
  public readonly closeParen: TokenNode;
  public readonly statements: StatementBlockNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(catchKeyword: TokenNode, openParen: TokenNode, typeNames: NodeList, variable: TokenNode, closeParen: TokenNode, statements: StatementBlockNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.catchKeyword = catchKeyword;
    this.openParen = openParen;
    this.typeNames = typeNames;
    this.variable = variable;
    this.closeParen = closeParen;
    this.statements = statements;

    this.updateFlagsAndWidth(catchKeyword.flags, catchKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(typeNames.flags, typeNames.fullWidth);
    this.updateFlagsAndWidth(variable.flags, variable.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(statements.flags, statements.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 6;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitTryCatch(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitTryCatch(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.catchKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.typeNames;
      case 3:
        return this.variable;
      case 4:
        return this.closeParen;
      case 5:
        return this.statements;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): TryCatchSyntaxNode {
    return new TryCatchSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = TryCatchNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TryCatchNode {
    return new TryCatchNode(this.catchKeyword, this.openParen, this.typeNames, this.variable, this.closeParen, this.statements, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8735);
    hash = Hash.combine(this.catchKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.typeNames.hashCode(), hash);
    hash = Hash.combine(this.variable.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.statements.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class TryFinallyNode extends Node {

  public readonly finallyKeyword: TokenNode;
  public readonly statements: StatementBlockNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(finallyKeyword: TokenNode, statements: StatementBlockNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.finallyKeyword = finallyKeyword;
    this.statements = statements;

    this.updateFlagsAndWidth(finallyKeyword.flags, finallyKeyword.fullWidth);
    this.updateFlagsAndWidth(statements.flags, statements.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitTryFinally(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitTryFinally(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.finallyKeyword;
      case 1:
        return this.statements;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): TryFinallySyntaxNode {
    return new TryFinallySyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = TryFinallyNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TryFinallyNode {
    return new TryFinallyNode(this.finallyKeyword, this.statements, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8736);
    hash = Hash.combine(this.finallyKeyword.hashCode(), hash);
    hash = Hash.combine(this.statements.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class UseElementNode extends Node {

  public readonly typeKeyword: TokenNode | null;
  public readonly target: NameNode;
  public readonly asKeyword: TokenNode | null;
  public readonly alias: TokenNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(typeKeyword: TokenNode | null, target: NameNode, asKeyword: TokenNode | null, alias: TokenNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.typeKeyword = typeKeyword;
    this.target = target;
    this.asKeyword = asKeyword;
    this.alias = alias;

    if (typeKeyword !== null) {
      this.updateFlagsAndWidth(typeKeyword.flags, typeKeyword.fullWidth);
    }
    this.updateFlagsAndWidth(target.flags, target.fullWidth);
    if (asKeyword !== null) {
      this.updateFlagsAndWidth(asKeyword.flags, asKeyword.fullWidth);
    }
    if (alias !== null) {
      this.updateFlagsAndWidth(alias.flags, alias.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitUseElement(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitUseElement(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.typeKeyword;
      case 1:
        return this.target;
      case 2:
        return this.asKeyword;
      case 3:
        return this.alias;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): UseElementSyntaxNode {
    return new UseElementSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = UseElementNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): UseElementNode {
    return new UseElementNode(this.typeKeyword, this.target, this.asKeyword, this.alias, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8737);
    hash = this.typeKeyword !== null ? Hash.combine(this.typeKeyword.hashCode(), hash) : hash;
    hash = Hash.combine(this.target.hashCode(), hash);
    hash = this.asKeyword !== null ? Hash.combine(this.asKeyword.hashCode(), hash) : hash;
    hash = this.alias !== null ? Hash.combine(this.alias.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export abstract class IntrinsicNode extends ExpressionNode {

}
export abstract class InvocationNode extends ExpressionNode {

  public abstract readonly openParen: TokenNode;
  public abstract readonly argumentList: NodeList | null;
  public abstract readonly closeParen: TokenNode;

}
export abstract class IterationNode extends StatementNode {

}
export abstract class JumpNode extends StatementNode {

}
export abstract class MemberAccessNode extends ExpressionNode {

  public abstract readonly dereferencable: ExpressionNode;
  public abstract readonly objectOperator: TokenNode;

}
export abstract class MemberInvocationNode extends InvocationNode {

  public abstract readonly dereferenceable: ExpressionNode;
  public abstract readonly objectOperator: TokenNode;
  public abstract readonly openParen: TokenNode;
  public abstract readonly argumentList: NodeList | null;
  public abstract readonly closeParen: TokenNode;

}
export abstract class ObjectCreationNode extends ExpressionNode {

  public abstract readonly newKeyword: TokenNode;

}
export abstract class ScopedAccessNode extends ExpressionNode {

  public abstract readonly qualifier: ExpressionNode | NameNode;
  public abstract readonly doubleColon: TokenNode;

}
export abstract class ScopedInvocationNode extends InvocationNode {

  public abstract readonly qualifier: ExpressionNode | NameNode;
  public abstract readonly doubleColon: TokenNode;
  public abstract readonly openParen: TokenNode;
  public abstract readonly argumentList: NodeList | null;
  public abstract readonly closeParen: TokenNode;

}
export abstract class SelectionNode extends StatementNode {

}
export abstract class TypeDeclarationNode extends StatementNode {

  public abstract readonly identifier: TokenNode;
  public abstract readonly openBrace: TokenNode;
  public abstract readonly members: NodeList | null;
  public abstract readonly closeBrace: TokenNode;

}
export abstract class VariableNode extends ExpressionNode {

}
export class AnonymousFunctionNode extends ExpressionNode {

  public readonly staticKeyword: TokenNode | null;
  public readonly functionKeyword: TokenNode;
  public readonly ampersand: TokenNode | null;
  public readonly openParen: TokenNode;
  public readonly parameters: NodeList | null;
  public readonly closeParen: TokenNode;
  public readonly useClause: ClosureUseNode | null;
  public readonly colon: TokenNode | null;
  public readonly returnType: NamedTypeNode | PredefinedTypeNode | null;
  public readonly statements: StatementBlockNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(staticKeyword: TokenNode | null, functionKeyword: TokenNode, ampersand: TokenNode | null, openParen: TokenNode, parameters: NodeList | null, closeParen: TokenNode, useClause: ClosureUseNode | null, colon: TokenNode | null, returnType: NamedTypeNode | PredefinedTypeNode | null, statements: StatementBlockNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.staticKeyword = staticKeyword;
    this.functionKeyword = functionKeyword;
    this.ampersand = ampersand;
    this.openParen = openParen;
    this.parameters = parameters;
    this.closeParen = closeParen;
    this.useClause = useClause;
    this.colon = colon;
    this.returnType = returnType;
    this.statements = statements;

    if (staticKeyword !== null) {
      this.updateFlagsAndWidth(staticKeyword.flags, staticKeyword.fullWidth);
    }
    this.updateFlagsAndWidth(functionKeyword.flags, functionKeyword.fullWidth);
    if (ampersand !== null) {
      this.updateFlagsAndWidth(ampersand.flags, ampersand.fullWidth);
    }
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (parameters !== null) {
      this.updateFlagsAndWidth(parameters.flags, parameters.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    if (useClause !== null) {
      this.updateFlagsAndWidth(useClause.flags, useClause.fullWidth);
    }
    if (colon !== null) {
      this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    }
    if (returnType !== null) {
      this.updateFlagsAndWidth(returnType.flags, returnType.fullWidth);
    }
    this.updateFlagsAndWidth(statements.flags, statements.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 10;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitAnonymousFunction(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitAnonymousFunction(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.staticKeyword;
      case 1:
        return this.functionKeyword;
      case 2:
        return this.ampersand;
      case 3:
        return this.openParen;
      case 4:
        return this.parameters;
      case 5:
        return this.closeParen;
      case 6:
        return this.useClause;
      case 7:
        return this.colon;
      case 8:
        return this.returnType;
      case 9:
        return this.statements;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): AnonymousFunctionSyntaxNode {
    return new AnonymousFunctionSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = AnonymousFunctionNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): AnonymousFunctionNode {
    return new AnonymousFunctionNode(this.staticKeyword, this.functionKeyword, this.ampersand, this.openParen, this.parameters, this.closeParen, this.useClause, this.colon, this.returnType, this.statements, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8750);
    hash = this.staticKeyword !== null ? Hash.combine(this.staticKeyword.hashCode(), hash) : hash;
    hash = Hash.combine(this.functionKeyword.hashCode(), hash);
    hash = this.ampersand !== null ? Hash.combine(this.ampersand.hashCode(), hash) : hash;
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.parameters !== null ? Hash.combine(this.parameters.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = this.useClause !== null ? Hash.combine(this.useClause.hashCode(), hash) : hash;
    hash = this.colon !== null ? Hash.combine(this.colon.hashCode(), hash) : hash;
    hash = this.returnType !== null ? Hash.combine(this.returnType.hashCode(), hash) : hash;
    hash = Hash.combine(this.statements.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class AnonymousObjectCreationNode extends ObjectCreationNode {

  public readonly newKeyword: TokenNode;
  public readonly anonymousClass: AnonymousClassNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(newKeyword: TokenNode, anonymousClass: AnonymousClassNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.newKeyword = newKeyword;
    this.anonymousClass = anonymousClass;

    this.updateFlagsAndWidth(newKeyword.flags, newKeyword.fullWidth);
    this.updateFlagsAndWidth(anonymousClass.flags, anonymousClass.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitAnonymousObjectCreation(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitAnonymousObjectCreation(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.newKeyword;
      case 1:
        return this.anonymousClass;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): AnonymousObjectCreationSyntaxNode {
    return new AnonymousObjectCreationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = AnonymousObjectCreationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): AnonymousObjectCreationNode {
    return new AnonymousObjectCreationNode(this.newKeyword, this.anonymousClass, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8751);
    hash = Hash.combine(this.newKeyword.hashCode(), hash);
    hash = Hash.combine(this.anonymousClass.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ArrayNode extends ExpressionNode {

  public readonly arrayKeyword: TokenNode | null;
  public readonly openParenOrBracket: TokenNode;
  public readonly initializerList: NodeList | null;
  public readonly closeParenOrBracket: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(arrayKeyword: TokenNode | null, openParenOrBracket: TokenNode, initializerList: NodeList | null, closeParenOrBracket: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.arrayKeyword = arrayKeyword;
    this.openParenOrBracket = openParenOrBracket;
    this.initializerList = initializerList;
    this.closeParenOrBracket = closeParenOrBracket;

    if (arrayKeyword !== null) {
      this.updateFlagsAndWidth(arrayKeyword.flags, arrayKeyword.fullWidth);
    }
    this.updateFlagsAndWidth(openParenOrBracket.flags, openParenOrBracket.fullWidth);
    if (initializerList !== null) {
      this.updateFlagsAndWidth(initializerList.flags, initializerList.fullWidth);
    }
    this.updateFlagsAndWidth(closeParenOrBracket.flags, closeParenOrBracket.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitArray(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitArray(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.arrayKeyword;
      case 1:
        return this.openParenOrBracket;
      case 2:
        return this.initializerList;
      case 3:
        return this.closeParenOrBracket;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ArraySyntaxNode {
    return new ArraySyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ArrayNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ArrayNode {
    return new ArrayNode(this.arrayKeyword, this.openParenOrBracket, this.initializerList, this.closeParenOrBracket, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8752);
    hash = this.arrayKeyword !== null ? Hash.combine(this.arrayKeyword.hashCode(), hash) : hash;
    hash = Hash.combine(this.openParenOrBracket.hashCode(), hash);
    hash = this.initializerList !== null ? Hash.combine(this.initializerList.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParenOrBracket.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ArrowFunctionNode extends ExpressionNode {

  public readonly staticKeyword: TokenNode | null;
  public readonly fnKeyword: TokenNode;
  public readonly ampersand: TokenNode | null;
  public readonly openParen: TokenNode;
  public readonly parameters: NodeList | null;
  public readonly closeParen: TokenNode;
  public readonly colon: TokenNode | null;
  public readonly returnType: NamedTypeNode | PredefinedTypeNode | null;
  public readonly doubleArrow: TokenNode;
  public readonly expr: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(staticKeyword: TokenNode | null, fnKeyword: TokenNode, ampersand: TokenNode | null, openParen: TokenNode, parameters: NodeList | null, closeParen: TokenNode, colon: TokenNode | null, returnType: NamedTypeNode | PredefinedTypeNode | null, doubleArrow: TokenNode, expr: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.staticKeyword = staticKeyword;
    this.fnKeyword = fnKeyword;
    this.ampersand = ampersand;
    this.openParen = openParen;
    this.parameters = parameters;
    this.closeParen = closeParen;
    this.colon = colon;
    this.returnType = returnType;
    this.doubleArrow = doubleArrow;
    this.expr = expr;

    if (staticKeyword !== null) {
      this.updateFlagsAndWidth(staticKeyword.flags, staticKeyword.fullWidth);
    }
    this.updateFlagsAndWidth(fnKeyword.flags, fnKeyword.fullWidth);
    if (ampersand !== null) {
      this.updateFlagsAndWidth(ampersand.flags, ampersand.fullWidth);
    }
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (parameters !== null) {
      this.updateFlagsAndWidth(parameters.flags, parameters.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    if (colon !== null) {
      this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    }
    if (returnType !== null) {
      this.updateFlagsAndWidth(returnType.flags, returnType.fullWidth);
    }
    this.updateFlagsAndWidth(doubleArrow.flags, doubleArrow.fullWidth);
    this.updateFlagsAndWidth(expr.flags, expr.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 10;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitArrowFunction(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitArrowFunction(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.staticKeyword;
      case 1:
        return this.fnKeyword;
      case 2:
        return this.ampersand;
      case 3:
        return this.openParen;
      case 4:
        return this.parameters;
      case 5:
        return this.closeParen;
      case 6:
        return this.colon;
      case 7:
        return this.returnType;
      case 8:
        return this.doubleArrow;
      case 9:
        return this.expr;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ArrowFunctionSyntaxNode {
    return new ArrowFunctionSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ArrowFunctionNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ArrowFunctionNode {
    return new ArrowFunctionNode(this.staticKeyword, this.fnKeyword, this.ampersand, this.openParen, this.parameters, this.closeParen, this.colon, this.returnType, this.doubleArrow, this.expr, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8753);
    hash = this.staticKeyword !== null ? Hash.combine(this.staticKeyword.hashCode(), hash) : hash;
    hash = Hash.combine(this.fnKeyword.hashCode(), hash);
    hash = this.ampersand !== null ? Hash.combine(this.ampersand.hashCode(), hash) : hash;
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.parameters !== null ? Hash.combine(this.parameters.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = this.colon !== null ? Hash.combine(this.colon.hashCode(), hash) : hash;
    hash = this.returnType !== null ? Hash.combine(this.returnType.hashCode(), hash) : hash;
    hash = Hash.combine(this.doubleArrow.hashCode(), hash);
    hash = Hash.combine(this.expr.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class AssignmentNode extends ExpressionNode {

  public readonly leftOperand: ExpressionNode;
  public readonly operator: TokenNode;
  public readonly ampersand: TokenNode | null;
  public readonly rightOperand: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(leftOperand: ExpressionNode, operator: TokenNode, ampersand: TokenNode | null, rightOperand: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.leftOperand = leftOperand;
    this.operator = operator;
    this.ampersand = ampersand;
    this.rightOperand = rightOperand;

    this.updateFlagsAndWidth(leftOperand.flags, leftOperand.fullWidth);
    this.updateFlagsAndWidth(operator.flags, operator.fullWidth);
    if (ampersand !== null) {
      this.updateFlagsAndWidth(ampersand.flags, ampersand.fullWidth);
    }
    this.updateFlagsAndWidth(rightOperand.flags, rightOperand.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitAssignmentExpression(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitAssignmentExpression(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.leftOperand;
      case 1:
        return this.operator;
      case 2:
        return this.ampersand;
      case 3:
        return this.rightOperand;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): AssignmentSyntaxNode {
    return new AssignmentSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = AssignmentNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): AssignmentNode {
    return new AssignmentNode(this.leftOperand, this.operator, this.ampersand, this.rightOperand, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8754);
    hash = Hash.combine(this.leftOperand.hashCode(), hash);
    hash = Hash.combine(this.operator.hashCode(), hash);
    hash = this.ampersand !== null ? Hash.combine(this.ampersand.hashCode(), hash) : hash;
    hash = Hash.combine(this.rightOperand.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class BinaryNode extends ExpressionNode {

  public readonly leftOperand: ExpressionNode;
  public readonly operator: TokenNode;
  public readonly rightOperand: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(leftOperand: ExpressionNode, operator: TokenNode, rightOperand: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.leftOperand = leftOperand;
    this.operator = operator;
    this.rightOperand = rightOperand;

    this.updateFlagsAndWidth(leftOperand.flags, leftOperand.fullWidth);
    this.updateFlagsAndWidth(operator.flags, operator.fullWidth);
    this.updateFlagsAndWidth(rightOperand.flags, rightOperand.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitBinaryExpression(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitBinaryExpression(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.leftOperand;
      case 1:
        return this.operator;
      case 2:
        return this.rightOperand;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): BinarySyntaxNode {
    return new BinarySyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = BinaryNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): BinaryNode {
    return new BinaryNode(this.leftOperand, this.operator, this.rightOperand, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8755);
    hash = Hash.combine(this.leftOperand.hashCode(), hash);
    hash = Hash.combine(this.operator.hashCode(), hash);
    hash = Hash.combine(this.rightOperand.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class BreakNode extends JumpNode {

  public readonly breakKeyword: TokenNode;
  public readonly depth: ExpressionNode | null;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(breakKeyword: TokenNode, depth: ExpressionNode | null, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.breakKeyword = breakKeyword;
    this.depth = depth;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(breakKeyword.flags, breakKeyword.fullWidth);
    if (depth !== null) {
      this.updateFlagsAndWidth(depth.flags, depth.fullWidth);
    }
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitBreak(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitBreak(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.breakKeyword;
      case 1:
        return this.depth;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): BreakSyntaxNode {
    return new BreakSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = BreakNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): BreakNode {
    return new BreakNode(this.breakKeyword, this.depth, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8756);
    hash = Hash.combine(this.breakKeyword.hashCode(), hash);
    hash = this.depth !== null ? Hash.combine(this.depth.hashCode(), hash) : hash;
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ClassConstantNode extends ScopedAccessNode {

  public readonly qualifier: ExpressionNode | NameNode;
  public readonly doubleColon: TokenNode;
  public readonly identifier: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(qualifier: ExpressionNode | NameNode, doubleColon: TokenNode, identifier: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.qualifier = qualifier;
    this.doubleColon = doubleColon;
    this.identifier = identifier;

    this.updateFlagsAndWidth(qualifier.flags, qualifier.fullWidth);
    this.updateFlagsAndWidth(doubleColon.flags, doubleColon.fullWidth);
    this.updateFlagsAndWidth(identifier.flags, identifier.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitClassConstant(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitClassConstant(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.qualifier;
      case 1:
        return this.doubleColon;
      case 2:
        return this.identifier;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ClassConstantSyntaxNode {
    return new ClassConstantSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ClassConstantNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ClassConstantNode {
    return new ClassConstantNode(this.qualifier, this.doubleColon, this.identifier, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8757);
    hash = Hash.combine(this.qualifier.hashCode(), hash);
    hash = Hash.combine(this.doubleColon.hashCode(), hash);
    hash = Hash.combine(this.identifier.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ClassConstantDeclarationNode extends StatementNode {

  public readonly modifiers: NodeList | null;
  public readonly constKeyword: TokenNode;
  public readonly elements: NodeList;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(modifiers: NodeList | null, constKeyword: TokenNode, elements: NodeList, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.modifiers = modifiers;
    this.constKeyword = constKeyword;
    this.elements = elements;
    this.semicolon = semicolon;

    if (modifiers !== null) {
      this.updateFlagsAndWidth(modifiers.flags, modifiers.fullWidth);
    }
    this.updateFlagsAndWidth(constKeyword.flags, constKeyword.fullWidth);
    this.updateFlagsAndWidth(elements.flags, elements.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitClassConstantDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitClassConstantDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.modifiers;
      case 1:
        return this.constKeyword;
      case 2:
        return this.elements;
      case 3:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ClassConstantDeclarationSyntaxNode {
    return new ClassConstantDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ClassConstantDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ClassConstantDeclarationNode {
    return new ClassConstantDeclarationNode(this.modifiers, this.constKeyword, this.elements, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8758);
    hash = this.modifiers !== null ? Hash.combine(this.modifiers.hashCode(), hash) : hash;
    hash = Hash.combine(this.constKeyword.hashCode(), hash);
    hash = Hash.combine(this.elements.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ClassDeclarationNode extends TypeDeclarationNode {

  public readonly modifiers: NodeList | null;
  public readonly classKeyword: TokenNode;
  public readonly identifier: TokenNode;
  public readonly extendsKeyword: TokenNode | null;
  public readonly baseType: NameNode | null;
  public readonly implementsKeyword: TokenNode | null;
  public readonly interfaces: NodeList | null;
  public readonly openBrace: TokenNode;
  public readonly members: NodeList | null;
  public readonly closeBrace: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(modifiers: NodeList | null, classKeyword: TokenNode, identifier: TokenNode, extendsKeyword: TokenNode | null, baseType: NameNode | null, implementsKeyword: TokenNode | null, interfaces: NodeList | null, openBrace: TokenNode, members: NodeList | null, closeBrace: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.modifiers = modifiers;
    this.classKeyword = classKeyword;
    this.identifier = identifier;
    this.extendsKeyword = extendsKeyword;
    this.baseType = baseType;
    this.implementsKeyword = implementsKeyword;
    this.interfaces = interfaces;
    this.openBrace = openBrace;
    this.members = members;
    this.closeBrace = closeBrace;

    if (modifiers !== null) {
      this.updateFlagsAndWidth(modifiers.flags, modifiers.fullWidth);
    }
    this.updateFlagsAndWidth(classKeyword.flags, classKeyword.fullWidth);
    this.updateFlagsAndWidth(identifier.flags, identifier.fullWidth);
    if (extendsKeyword !== null) {
      this.updateFlagsAndWidth(extendsKeyword.flags, extendsKeyword.fullWidth);
    }
    if (baseType !== null) {
      this.updateFlagsAndWidth(baseType.flags, baseType.fullWidth);
    }
    if (implementsKeyword !== null) {
      this.updateFlagsAndWidth(implementsKeyword.flags, implementsKeyword.fullWidth);
    }
    if (interfaces !== null) {
      this.updateFlagsAndWidth(interfaces.flags, interfaces.fullWidth);
    }
    this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    if (members !== null) {
      this.updateFlagsAndWidth(members.flags, members.fullWidth);
    }
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 10;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitClassDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitClassDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.modifiers;
      case 1:
        return this.classKeyword;
      case 2:
        return this.identifier;
      case 3:
        return this.extendsKeyword;
      case 4:
        return this.baseType;
      case 5:
        return this.implementsKeyword;
      case 6:
        return this.interfaces;
      case 7:
        return this.openBrace;
      case 8:
        return this.members;
      case 9:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ClassDeclarationSyntaxNode {
    return new ClassDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ClassDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ClassDeclarationNode {
    return new ClassDeclarationNode(this.modifiers, this.classKeyword, this.identifier, this.extendsKeyword, this.baseType, this.implementsKeyword, this.interfaces, this.openBrace, this.members, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8759);
    hash = this.modifiers !== null ? Hash.combine(this.modifiers.hashCode(), hash) : hash;
    hash = Hash.combine(this.classKeyword.hashCode(), hash);
    hash = Hash.combine(this.identifier.hashCode(), hash);
    hash = this.extendsKeyword !== null ? Hash.combine(this.extendsKeyword.hashCode(), hash) : hash;
    hash = this.baseType !== null ? Hash.combine(this.baseType.hashCode(), hash) : hash;
    hash = this.implementsKeyword !== null ? Hash.combine(this.implementsKeyword.hashCode(), hash) : hash;
    hash = this.interfaces !== null ? Hash.combine(this.interfaces.hashCode(), hash) : hash;
    hash = Hash.combine(this.openBrace.hashCode(), hash);
    hash = this.members !== null ? Hash.combine(this.members.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class CloneNode extends ExpressionNode {

  public readonly cloneKeyword: TokenNode;
  public readonly expression: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(cloneKeyword: TokenNode, expression: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.cloneKeyword = cloneKeyword;
    this.expression = expression;

    this.updateFlagsAndWidth(cloneKeyword.flags, cloneKeyword.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitClone(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitClone(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.cloneKeyword;
      case 1:
        return this.expression;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): CloneSyntaxNode {
    return new CloneSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = CloneNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): CloneNode {
    return new CloneNode(this.cloneKeyword, this.expression, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8760);
    hash = Hash.combine(this.cloneKeyword.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ConditionalNode extends ExpressionNode {

  public readonly condition: ExpressionNode;
  public readonly question: TokenNode;
  public readonly trueExpr: ExpressionNode | null;
  public readonly colon: TokenNode;
  public readonly falseExpr: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(condition: ExpressionNode, question: TokenNode, trueExpr: ExpressionNode | null, colon: TokenNode, falseExpr: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.condition = condition;
    this.question = question;
    this.trueExpr = trueExpr;
    this.colon = colon;
    this.falseExpr = falseExpr;

    this.updateFlagsAndWidth(condition.flags, condition.fullWidth);
    this.updateFlagsAndWidth(question.flags, question.fullWidth);
    if (trueExpr !== null) {
      this.updateFlagsAndWidth(trueExpr.flags, trueExpr.fullWidth);
    }
    this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    this.updateFlagsAndWidth(falseExpr.flags, falseExpr.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitConditionalExpression(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitConditionalExpression(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.condition;
      case 1:
        return this.question;
      case 2:
        return this.trueExpr;
      case 3:
        return this.colon;
      case 4:
        return this.falseExpr;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ConditionalSyntaxNode {
    return new ConditionalSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ConditionalNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ConditionalNode {
    return new ConditionalNode(this.condition, this.question, this.trueExpr, this.colon, this.falseExpr, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8761);
    hash = Hash.combine(this.condition.hashCode(), hash);
    hash = Hash.combine(this.question.hashCode(), hash);
    hash = this.trueExpr !== null ? Hash.combine(this.trueExpr.hashCode(), hash) : hash;
    hash = Hash.combine(this.colon.hashCode(), hash);
    hash = Hash.combine(this.falseExpr.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ConstantNode extends ExpressionNode {

  public readonly name: NameNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(name: NameNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.name = name;

    this.updateFlagsAndWidth(name.flags, name.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 1;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitConstant(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitConstant(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.name;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ConstantSyntaxNode {
    return new ConstantSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ConstantNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ConstantNode {
    return new ConstantNode(this.name, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8762);
    hash = Hash.combine(this.name.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ConstantDeclarationNode extends StatementNode {

  public readonly constKeyword: TokenNode;
  public readonly elements: NodeList;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(constKeyword: TokenNode, elements: NodeList, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.constKeyword = constKeyword;
    this.elements = elements;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(constKeyword.flags, constKeyword.fullWidth);
    this.updateFlagsAndWidth(elements.flags, elements.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitConstantDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitConstantDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.constKeyword;
      case 1:
        return this.elements;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ConstantDeclarationSyntaxNode {
    return new ConstantDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ConstantDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ConstantDeclarationNode {
    return new ConstantDeclarationNode(this.constKeyword, this.elements, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8763);
    hash = Hash.combine(this.constKeyword.hashCode(), hash);
    hash = Hash.combine(this.elements.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ContinueNode extends JumpNode {

  public readonly continueKeyword: TokenNode;
  public readonly depth: ExpressionNode | null;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(continueKeyword: TokenNode, depth: ExpressionNode | null, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.continueKeyword = continueKeyword;
    this.depth = depth;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(continueKeyword.flags, continueKeyword.fullWidth);
    if (depth !== null) {
      this.updateFlagsAndWidth(depth.flags, depth.fullWidth);
    }
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitContinue(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitContinue(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.continueKeyword;
      case 1:
        return this.depth;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ContinueSyntaxNode {
    return new ContinueSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ContinueNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ContinueNode {
    return new ContinueNode(this.continueKeyword, this.depth, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8764);
    hash = Hash.combine(this.continueKeyword.hashCode(), hash);
    hash = this.depth !== null ? Hash.combine(this.depth.hashCode(), hash) : hash;
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class DeclareNode extends StatementNode {

  public readonly declareKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly directives: NodeList;
  public readonly closeParen: TokenNode;
  public readonly statement: StatementNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(declareKeyword: TokenNode, openParen: TokenNode, directives: NodeList, closeParen: TokenNode, statement: StatementNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.declareKeyword = declareKeyword;
    this.openParen = openParen;
    this.directives = directives;
    this.closeParen = closeParen;
    this.statement = statement;

    this.updateFlagsAndWidth(declareKeyword.flags, declareKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(directives.flags, directives.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(statement.flags, statement.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitDeclare(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitDeclare(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.declareKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.directives;
      case 3:
        return this.closeParen;
      case 4:
        return this.statement;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): DeclareSyntaxNode {
    return new DeclareSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = DeclareNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): DeclareNode {
    return new DeclareNode(this.declareKeyword, this.openParen, this.directives, this.closeParen, this.statement, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8765);
    hash = Hash.combine(this.declareKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.directives.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.statement.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class DeclareBlockNode extends StatementNode {

  public readonly declareKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly directives: NodeList;
  public readonly closeParen: TokenNode;
  public readonly colon: TokenNode;
  public readonly statements: NodeList | null;
  public readonly endDeclare: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(declareKeyword: TokenNode, openParen: TokenNode, directives: NodeList, closeParen: TokenNode, colon: TokenNode, statements: NodeList | null, endDeclare: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.declareKeyword = declareKeyword;
    this.openParen = openParen;
    this.directives = directives;
    this.closeParen = closeParen;
    this.colon = colon;
    this.statements = statements;
    this.endDeclare = endDeclare;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(declareKeyword.flags, declareKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(directives.flags, directives.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }
    this.updateFlagsAndWidth(endDeclare.flags, endDeclare.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 8;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitDeclareBlock(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitDeclareBlock(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.declareKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.directives;
      case 3:
        return this.closeParen;
      case 4:
        return this.colon;
      case 5:
        return this.statements;
      case 6:
        return this.endDeclare;
      case 7:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): DeclareBlockSyntaxNode {
    return new DeclareBlockSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = DeclareBlockNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): DeclareBlockNode {
    return new DeclareBlockNode(this.declareKeyword, this.openParen, this.directives, this.closeParen, this.colon, this.statements, this.endDeclare, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8766);
    hash = Hash.combine(this.declareKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.directives.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.colon.hashCode(), hash);
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    hash = Hash.combine(this.endDeclare.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class DestructuringAssignmentNode extends ExpressionNode {

  public readonly unpackedList: ArrayNode | ListDestructureNode;
  public readonly operator: TokenNode;
  public readonly operand: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(unpackedList: ArrayNode | ListDestructureNode, operator: TokenNode, operand: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.unpackedList = unpackedList;
    this.operator = operator;
    this.operand = operand;

    this.updateFlagsAndWidth(unpackedList.flags, unpackedList.fullWidth);
    this.updateFlagsAndWidth(operator.flags, operator.fullWidth);
    this.updateFlagsAndWidth(operand.flags, operand.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitDestructuringAssignment(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitDestructuringAssignment(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.unpackedList;
      case 1:
        return this.operator;
      case 2:
        return this.operand;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): DestructuringAssignmentSyntaxNode {
    return new DestructuringAssignmentSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = DestructuringAssignmentNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): DestructuringAssignmentNode {
    return new DestructuringAssignmentNode(this.unpackedList, this.operator, this.operand, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8767);
    hash = Hash.combine(this.unpackedList.hashCode(), hash);
    hash = Hash.combine(this.operator.hashCode(), hash);
    hash = Hash.combine(this.operand.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class DoWhileNode extends IterationNode {

  public readonly doKeyword: TokenNode;
  public readonly statement: StatementNode;
  public readonly whileKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly condition: ExpressionNode;
  public readonly closeParen: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(doKeyword: TokenNode, statement: StatementNode, whileKeyword: TokenNode, openParen: TokenNode, condition: ExpressionNode, closeParen: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.doKeyword = doKeyword;
    this.statement = statement;
    this.whileKeyword = whileKeyword;
    this.openParen = openParen;
    this.condition = condition;
    this.closeParen = closeParen;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(doKeyword.flags, doKeyword.fullWidth);
    this.updateFlagsAndWidth(statement.flags, statement.fullWidth);
    this.updateFlagsAndWidth(whileKeyword.flags, whileKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(condition.flags, condition.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 7;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitDoWhile(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitDoWhile(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.doKeyword;
      case 1:
        return this.statement;
      case 2:
        return this.whileKeyword;
      case 3:
        return this.openParen;
      case 4:
        return this.condition;
      case 5:
        return this.closeParen;
      case 6:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): DoWhileSyntaxNode {
    return new DoWhileSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = DoWhileNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): DoWhileNode {
    return new DoWhileNode(this.doKeyword, this.statement, this.whileKeyword, this.openParen, this.condition, this.closeParen, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8768);
    hash = Hash.combine(this.doKeyword.hashCode(), hash);
    hash = Hash.combine(this.statement.hashCode(), hash);
    hash = Hash.combine(this.whileKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.condition.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class EchoNode extends StatementNode {

  public readonly echoKeyword: TokenNode | null;
  public readonly expressionList: NodeList;
  public readonly semicolon: TokenNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(echoKeyword: TokenNode | null, expressionList: NodeList, semicolon: TokenNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.echoKeyword = echoKeyword;
    this.expressionList = expressionList;
    this.semicolon = semicolon;

    if (echoKeyword !== null) {
      this.updateFlagsAndWidth(echoKeyword.flags, echoKeyword.fullWidth);
    }
    this.updateFlagsAndWidth(expressionList.flags, expressionList.fullWidth);
    if (semicolon !== null) {
      this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitEcho(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitEcho(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.echoKeyword;
      case 1:
        return this.expressionList;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): EchoSyntaxNode {
    return new EchoSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = EchoNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): EchoNode {
    return new EchoNode(this.echoKeyword, this.expressionList, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8769);
    hash = this.echoKeyword !== null ? Hash.combine(this.echoKeyword.hashCode(), hash) : hash;
    hash = Hash.combine(this.expressionList.hashCode(), hash);
    hash = this.semicolon !== null ? Hash.combine(this.semicolon.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ElementAccessNode extends ExpressionNode {

  public readonly dereferencable: ExpressionNode;
  public readonly openBraceOrBracket: TokenNode;
  public readonly index: ExpressionNode | null;
  public readonly closeBraceOrBracket: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(dereferencable: ExpressionNode, openBraceOrBracket: TokenNode, index: ExpressionNode | null, closeBraceOrBracket: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.dereferencable = dereferencable;
    this.openBraceOrBracket = openBraceOrBracket;
    this.index = index;
    this.closeBraceOrBracket = closeBraceOrBracket;

    this.updateFlagsAndWidth(dereferencable.flags, dereferencable.fullWidth);
    this.updateFlagsAndWidth(openBraceOrBracket.flags, openBraceOrBracket.fullWidth);
    if (index !== null) {
      this.updateFlagsAndWidth(index.flags, index.fullWidth);
    }
    this.updateFlagsAndWidth(closeBraceOrBracket.flags, closeBraceOrBracket.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitElementAccess(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitElementAccess(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.dereferencable;
      case 1:
        return this.openBraceOrBracket;
      case 2:
        return this.index;
      case 3:
        return this.closeBraceOrBracket;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ElementAccessSyntaxNode {
    return new ElementAccessSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ElementAccessNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ElementAccessNode {
    return new ElementAccessNode(this.dereferencable, this.openBraceOrBracket, this.index, this.closeBraceOrBracket, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8770);
    hash = Hash.combine(this.dereferencable.hashCode(), hash);
    hash = Hash.combine(this.openBraceOrBracket.hashCode(), hash);
    hash = this.index !== null ? Hash.combine(this.index.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeBraceOrBracket.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class EmptyIntrinsicNode extends IntrinsicNode {

  public readonly emptyKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly expression: ExpressionNode;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(emptyKeyword: TokenNode, openParen: TokenNode, expression: ExpressionNode, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.emptyKeyword = emptyKeyword;
    this.openParen = openParen;
    this.expression = expression;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(emptyKeyword.flags, emptyKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitEmptyIntrinsic(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitEmptyIntrinsic(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.emptyKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.expression;
      case 3:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): EmptyIntrinsicSyntaxNode {
    return new EmptyIntrinsicSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = EmptyIntrinsicNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): EmptyIntrinsicNode {
    return new EmptyIntrinsicNode(this.emptyKeyword, this.openParen, this.expression, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8771);
    hash = Hash.combine(this.emptyKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ErrorControlNode extends ExpressionNode {

  public readonly at: TokenNode;
  public readonly expression: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(at: TokenNode, expression: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.at = at;
    this.expression = expression;

    this.updateFlagsAndWidth(at.flags, at.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitErrorControl(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitErrorControl(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.at;
      case 1:
        return this.expression;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ErrorControlSyntaxNode {
    return new ErrorControlSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ErrorControlNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ErrorControlNode {
    return new ErrorControlNode(this.at, this.expression, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8772);
    hash = Hash.combine(this.at.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class EvalIntrinsicNode extends IntrinsicNode {

  public readonly evalKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly expression: ExpressionNode;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(evalKeyword: TokenNode, openParen: TokenNode, expression: ExpressionNode, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.evalKeyword = evalKeyword;
    this.openParen = openParen;
    this.expression = expression;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(evalKeyword.flags, evalKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitEvalIntrinsic(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitEvalIntrinsic(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.evalKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.expression;
      case 3:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): EvalIntrinsicSyntaxNode {
    return new EvalIntrinsicSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = EvalIntrinsicNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): EvalIntrinsicNode {
    return new EvalIntrinsicNode(this.evalKeyword, this.openParen, this.expression, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8773);
    hash = Hash.combine(this.evalKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ExitIntrinsicNode extends IntrinsicNode {

  public readonly exitOrDieKeyword: TokenNode;
  public readonly openParen: TokenNode | null;
  public readonly expression: ExpressionNode | null;
  public readonly closeParen: TokenNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(exitOrDieKeyword: TokenNode, openParen: TokenNode | null, expression: ExpressionNode | null, closeParen: TokenNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.exitOrDieKeyword = exitOrDieKeyword;
    this.openParen = openParen;
    this.expression = expression;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(exitOrDieKeyword.flags, exitOrDieKeyword.fullWidth);
    if (openParen !== null) {
      this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    }
    if (expression !== null) {
      this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    }
    if (closeParen !== null) {
      this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitExitIntrinsic(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitExitIntrinsic(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.exitOrDieKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.expression;
      case 3:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ExitIntrinsicSyntaxNode {
    return new ExitIntrinsicSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ExitIntrinsicNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ExitIntrinsicNode {
    return new ExitIntrinsicNode(this.exitOrDieKeyword, this.openParen, this.expression, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8774);
    hash = Hash.combine(this.exitOrDieKeyword.hashCode(), hash);
    hash = this.openParen !== null ? Hash.combine(this.openParen.hashCode(), hash) : hash;
    hash = this.expression !== null ? Hash.combine(this.expression.hashCode(), hash) : hash;
    hash = this.closeParen !== null ? Hash.combine(this.closeParen.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ExpressionGroupNode extends ExpressionNode {

  public readonly openParen: TokenNode;
  public readonly expression: ExpressionNode;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(openParen: TokenNode, expression: ExpressionNode, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.openParen = openParen;
    this.expression = expression;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitExpressionGroup(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitExpressionGroup(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.openParen;
      case 1:
        return this.expression;
      case 2:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ExpressionGroupSyntaxNode {
    return new ExpressionGroupSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ExpressionGroupNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ExpressionGroupNode {
    return new ExpressionGroupNode(this.openParen, this.expression, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8775);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ExpressionStatementNode extends StatementNode {

  public readonly expression: ExpressionNode | null;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(expression: ExpressionNode | null, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.expression = expression;
    this.semicolon = semicolon;

    if (expression !== null) {
      this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    }
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitExpressionStatement(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitExpressionStatement(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.expression;
      case 1:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ExpressionStatementSyntaxNode {
    return new ExpressionStatementSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ExpressionStatementNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ExpressionStatementNode {
    return new ExpressionStatementNode(this.expression, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8776);
    hash = this.expression !== null ? Hash.combine(this.expression.hashCode(), hash) : hash;
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class FlexibleHeredocTemplateNode extends ExpressionNode {

  public readonly heredocStart: TokenNode;
  public readonly flexibleElements: NodeList;
  public readonly heredocEnd: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(heredocStart: TokenNode, flexibleElements: NodeList, heredocEnd: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.heredocStart = heredocStart;
    this.flexibleElements = flexibleElements;
    this.heredocEnd = heredocEnd;

    this.updateFlagsAndWidth(heredocStart.flags, heredocStart.fullWidth);
    this.updateFlagsAndWidth(flexibleElements.flags, flexibleElements.fullWidth);
    this.updateFlagsAndWidth(heredocEnd.flags, heredocEnd.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitFlexibleHeredocTemplate(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitFlexibleHeredocTemplate(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.heredocStart;
      case 1:
        return this.flexibleElements;
      case 2:
        return this.heredocEnd;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): FlexibleHeredocTemplateSyntaxNode {
    return new FlexibleHeredocTemplateSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = FlexibleHeredocTemplateNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): FlexibleHeredocTemplateNode {
    return new FlexibleHeredocTemplateNode(this.heredocStart, this.flexibleElements, this.heredocEnd, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8777);
    hash = Hash.combine(this.heredocStart.hashCode(), hash);
    hash = Hash.combine(this.flexibleElements.hashCode(), hash);
    hash = Hash.combine(this.heredocEnd.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ForNode extends IterationNode {

  public readonly forKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly initializers: NodeList | null;
  public readonly firstSemicolon: TokenNode;
  public readonly conditions: NodeList | null;
  public readonly secondSemicolon: TokenNode;
  public readonly incrementors: NodeList | null;
  public readonly closeParen: TokenNode;
  public readonly statement: StatementNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(forKeyword: TokenNode, openParen: TokenNode, initializers: NodeList | null, firstSemicolon: TokenNode, conditions: NodeList | null, secondSemicolon: TokenNode, incrementors: NodeList | null, closeParen: TokenNode, statement: StatementNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.forKeyword = forKeyword;
    this.openParen = openParen;
    this.initializers = initializers;
    this.firstSemicolon = firstSemicolon;
    this.conditions = conditions;
    this.secondSemicolon = secondSemicolon;
    this.incrementors = incrementors;
    this.closeParen = closeParen;
    this.statement = statement;

    this.updateFlagsAndWidth(forKeyword.flags, forKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (initializers !== null) {
      this.updateFlagsAndWidth(initializers.flags, initializers.fullWidth);
    }
    this.updateFlagsAndWidth(firstSemicolon.flags, firstSemicolon.fullWidth);
    if (conditions !== null) {
      this.updateFlagsAndWidth(conditions.flags, conditions.fullWidth);
    }
    this.updateFlagsAndWidth(secondSemicolon.flags, secondSemicolon.fullWidth);
    if (incrementors !== null) {
      this.updateFlagsAndWidth(incrementors.flags, incrementors.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(statement.flags, statement.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 9;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitFor(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitFor(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.forKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.initializers;
      case 3:
        return this.firstSemicolon;
      case 4:
        return this.conditions;
      case 5:
        return this.secondSemicolon;
      case 6:
        return this.incrementors;
      case 7:
        return this.closeParen;
      case 8:
        return this.statement;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ForSyntaxNode {
    return new ForSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ForNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ForNode {
    return new ForNode(this.forKeyword, this.openParen, this.initializers, this.firstSemicolon, this.conditions, this.secondSemicolon, this.incrementors, this.closeParen, this.statement, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8778);
    hash = Hash.combine(this.forKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.initializers !== null ? Hash.combine(this.initializers.hashCode(), hash) : hash;
    hash = Hash.combine(this.firstSemicolon.hashCode(), hash);
    hash = this.conditions !== null ? Hash.combine(this.conditions.hashCode(), hash) : hash;
    hash = Hash.combine(this.secondSemicolon.hashCode(), hash);
    hash = this.incrementors !== null ? Hash.combine(this.incrementors.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.statement.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ForBlockNode extends IterationNode {

  public readonly forKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly initializers: NodeList | null;
  public readonly firstSemicolon: TokenNode;
  public readonly conditions: NodeList | null;
  public readonly secondSemicolon: TokenNode;
  public readonly incrementors: NodeList | null;
  public readonly closeParen: TokenNode;
  public readonly colon: TokenNode;
  public readonly statements: NodeList | null;
  public readonly endForKeyword: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(forKeyword: TokenNode, openParen: TokenNode, initializers: NodeList | null, firstSemicolon: TokenNode, conditions: NodeList | null, secondSemicolon: TokenNode, incrementors: NodeList | null, closeParen: TokenNode, colon: TokenNode, statements: NodeList | null, endForKeyword: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.forKeyword = forKeyword;
    this.openParen = openParen;
    this.initializers = initializers;
    this.firstSemicolon = firstSemicolon;
    this.conditions = conditions;
    this.secondSemicolon = secondSemicolon;
    this.incrementors = incrementors;
    this.closeParen = closeParen;
    this.colon = colon;
    this.statements = statements;
    this.endForKeyword = endForKeyword;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(forKeyword.flags, forKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (initializers !== null) {
      this.updateFlagsAndWidth(initializers.flags, initializers.fullWidth);
    }
    this.updateFlagsAndWidth(firstSemicolon.flags, firstSemicolon.fullWidth);
    if (conditions !== null) {
      this.updateFlagsAndWidth(conditions.flags, conditions.fullWidth);
    }
    this.updateFlagsAndWidth(secondSemicolon.flags, secondSemicolon.fullWidth);
    if (incrementors !== null) {
      this.updateFlagsAndWidth(incrementors.flags, incrementors.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }
    this.updateFlagsAndWidth(endForKeyword.flags, endForKeyword.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 12;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitForBlock(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitForBlock(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.forKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.initializers;
      case 3:
        return this.firstSemicolon;
      case 4:
        return this.conditions;
      case 5:
        return this.secondSemicolon;
      case 6:
        return this.incrementors;
      case 7:
        return this.closeParen;
      case 8:
        return this.colon;
      case 9:
        return this.statements;
      case 10:
        return this.endForKeyword;
      case 11:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ForBlockSyntaxNode {
    return new ForBlockSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ForBlockNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ForBlockNode {
    return new ForBlockNode(this.forKeyword, this.openParen, this.initializers, this.firstSemicolon, this.conditions, this.secondSemicolon, this.incrementors, this.closeParen, this.colon, this.statements, this.endForKeyword, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8779);
    hash = Hash.combine(this.forKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.initializers !== null ? Hash.combine(this.initializers.hashCode(), hash) : hash;
    hash = Hash.combine(this.firstSemicolon.hashCode(), hash);
    hash = this.conditions !== null ? Hash.combine(this.conditions.hashCode(), hash) : hash;
    hash = Hash.combine(this.secondSemicolon.hashCode(), hash);
    hash = this.incrementors !== null ? Hash.combine(this.incrementors.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.colon.hashCode(), hash);
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    hash = Hash.combine(this.endForKeyword.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ForEachNode extends IterationNode {

  public readonly forEachKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly source: ExpressionNode;
  public readonly asKeyword: TokenNode;
  public readonly key: ExpressionNode | null;
  public readonly doubleArrow: TokenNode | null;
  public readonly ampersand: TokenNode | null;
  public readonly value: ExpressionNode | ListDestructureNode;
  public readonly closeParen: TokenNode;
  public readonly statement: StatementNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(forEachKeyword: TokenNode, openParen: TokenNode, source: ExpressionNode, asKeyword: TokenNode, key: ExpressionNode | null, doubleArrow: TokenNode | null, ampersand: TokenNode | null, value: ExpressionNode | ListDestructureNode, closeParen: TokenNode, statement: StatementNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.forEachKeyword = forEachKeyword;
    this.openParen = openParen;
    this.source = source;
    this.asKeyword = asKeyword;
    this.key = key;
    this.doubleArrow = doubleArrow;
    this.ampersand = ampersand;
    this.value = value;
    this.closeParen = closeParen;
    this.statement = statement;

    this.updateFlagsAndWidth(forEachKeyword.flags, forEachKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(source.flags, source.fullWidth);
    this.updateFlagsAndWidth(asKeyword.flags, asKeyword.fullWidth);
    if (key !== null) {
      this.updateFlagsAndWidth(key.flags, key.fullWidth);
    }
    if (doubleArrow !== null) {
      this.updateFlagsAndWidth(doubleArrow.flags, doubleArrow.fullWidth);
    }
    if (ampersand !== null) {
      this.updateFlagsAndWidth(ampersand.flags, ampersand.fullWidth);
    }
    this.updateFlagsAndWidth(value.flags, value.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(statement.flags, statement.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 10;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitForEach(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitForEach(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.forEachKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.source;
      case 3:
        return this.asKeyword;
      case 4:
        return this.key;
      case 5:
        return this.doubleArrow;
      case 6:
        return this.ampersand;
      case 7:
        return this.value;
      case 8:
        return this.closeParen;
      case 9:
        return this.statement;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ForEachSyntaxNode {
    return new ForEachSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ForEachNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ForEachNode {
    return new ForEachNode(this.forEachKeyword, this.openParen, this.source, this.asKeyword, this.key, this.doubleArrow, this.ampersand, this.value, this.closeParen, this.statement, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8780);
    hash = Hash.combine(this.forEachKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.source.hashCode(), hash);
    hash = Hash.combine(this.asKeyword.hashCode(), hash);
    hash = this.key !== null ? Hash.combine(this.key.hashCode(), hash) : hash;
    hash = this.doubleArrow !== null ? Hash.combine(this.doubleArrow.hashCode(), hash) : hash;
    hash = this.ampersand !== null ? Hash.combine(this.ampersand.hashCode(), hash) : hash;
    hash = Hash.combine(this.value.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.statement.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ForEachBlockNode extends IterationNode {

  public readonly forEachKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly source: ExpressionNode;
  public readonly asKeyword: TokenNode;
  public readonly key: ExpressionNode | null;
  public readonly doubleArrow: TokenNode | null;
  public readonly ampersand: TokenNode | null;
  public readonly value: ExpressionNode | ListDestructureNode;
  public readonly closeParen: TokenNode;
  public readonly colon: TokenNode;
  public readonly statements: NodeList | null;
  public readonly endForEach: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(forEachKeyword: TokenNode, openParen: TokenNode, source: ExpressionNode, asKeyword: TokenNode, key: ExpressionNode | null, doubleArrow: TokenNode | null, ampersand: TokenNode | null, value: ExpressionNode | ListDestructureNode, closeParen: TokenNode, colon: TokenNode, statements: NodeList | null, endForEach: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.forEachKeyword = forEachKeyword;
    this.openParen = openParen;
    this.source = source;
    this.asKeyword = asKeyword;
    this.key = key;
    this.doubleArrow = doubleArrow;
    this.ampersand = ampersand;
    this.value = value;
    this.closeParen = closeParen;
    this.colon = colon;
    this.statements = statements;
    this.endForEach = endForEach;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(forEachKeyword.flags, forEachKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(source.flags, source.fullWidth);
    this.updateFlagsAndWidth(asKeyword.flags, asKeyword.fullWidth);
    if (key !== null) {
      this.updateFlagsAndWidth(key.flags, key.fullWidth);
    }
    if (doubleArrow !== null) {
      this.updateFlagsAndWidth(doubleArrow.flags, doubleArrow.fullWidth);
    }
    if (ampersand !== null) {
      this.updateFlagsAndWidth(ampersand.flags, ampersand.fullWidth);
    }
    this.updateFlagsAndWidth(value.flags, value.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }
    this.updateFlagsAndWidth(endForEach.flags, endForEach.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 13;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitForEachBlock(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitForEachBlock(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.forEachKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.source;
      case 3:
        return this.asKeyword;
      case 4:
        return this.key;
      case 5:
        return this.doubleArrow;
      case 6:
        return this.ampersand;
      case 7:
        return this.value;
      case 8:
        return this.closeParen;
      case 9:
        return this.colon;
      case 10:
        return this.statements;
      case 11:
        return this.endForEach;
      case 12:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ForEachBlockSyntaxNode {
    return new ForEachBlockSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ForEachBlockNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ForEachBlockNode {
    return new ForEachBlockNode(this.forEachKeyword, this.openParen, this.source, this.asKeyword, this.key, this.doubleArrow, this.ampersand, this.value, this.closeParen, this.colon, this.statements, this.endForEach, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8781);
    hash = Hash.combine(this.forEachKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.source.hashCode(), hash);
    hash = Hash.combine(this.asKeyword.hashCode(), hash);
    hash = this.key !== null ? Hash.combine(this.key.hashCode(), hash) : hash;
    hash = this.doubleArrow !== null ? Hash.combine(this.doubleArrow.hashCode(), hash) : hash;
    hash = this.ampersand !== null ? Hash.combine(this.ampersand.hashCode(), hash) : hash;
    hash = Hash.combine(this.value.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.colon.hashCode(), hash);
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    hash = Hash.combine(this.endForEach.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class FullyQualifiedNameNode extends NameNode {

  public readonly leadingBackslash: TokenNode;
  public readonly namespaceName: NodeList;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(leadingBackslash: TokenNode, namespaceName: NodeList, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.leadingBackslash = leadingBackslash;
    this.namespaceName = namespaceName;

    this.updateFlagsAndWidth(leadingBackslash.flags, leadingBackslash.fullWidth);
    this.updateFlagsAndWidth(namespaceName.flags, namespaceName.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitFullyQualifiedName(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitFullyQualifiedName(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.leadingBackslash;
      case 1:
        return this.namespaceName;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): FullyQualifiedNameSyntaxNode {
    return new FullyQualifiedNameSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = FullyQualifiedNameNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): FullyQualifiedNameNode {
    return new FullyQualifiedNameNode(this.leadingBackslash, this.namespaceName, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8782);
    hash = Hash.combine(this.leadingBackslash.hashCode(), hash);
    hash = Hash.combine(this.namespaceName.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class FunctionDeclarationNode extends StatementNode {

  public readonly functionKeyword: TokenNode;
  public readonly ampersand: TokenNode | null;
  public readonly identifier: TokenNode;
  public readonly openParen: TokenNode;
  public readonly parameters: NodeList | null;
  public readonly closeParen: TokenNode;
  public readonly colon: TokenNode | null;
  public readonly returnType: NamedTypeNode | PredefinedTypeNode | null;
  public readonly statements: StatementBlockNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(functionKeyword: TokenNode, ampersand: TokenNode | null, identifier: TokenNode, openParen: TokenNode, parameters: NodeList | null, closeParen: TokenNode, colon: TokenNode | null, returnType: NamedTypeNode | PredefinedTypeNode | null, statements: StatementBlockNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.functionKeyword = functionKeyword;
    this.ampersand = ampersand;
    this.identifier = identifier;
    this.openParen = openParen;
    this.parameters = parameters;
    this.closeParen = closeParen;
    this.colon = colon;
    this.returnType = returnType;
    this.statements = statements;

    this.updateFlagsAndWidth(functionKeyword.flags, functionKeyword.fullWidth);
    if (ampersand !== null) {
      this.updateFlagsAndWidth(ampersand.flags, ampersand.fullWidth);
    }
    this.updateFlagsAndWidth(identifier.flags, identifier.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (parameters !== null) {
      this.updateFlagsAndWidth(parameters.flags, parameters.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    if (colon !== null) {
      this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    }
    if (returnType !== null) {
      this.updateFlagsAndWidth(returnType.flags, returnType.fullWidth);
    }
    this.updateFlagsAndWidth(statements.flags, statements.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 9;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitFunctionDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitFunctionDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.functionKeyword;
      case 1:
        return this.ampersand;
      case 2:
        return this.identifier;
      case 3:
        return this.openParen;
      case 4:
        return this.parameters;
      case 5:
        return this.closeParen;
      case 6:
        return this.colon;
      case 7:
        return this.returnType;
      case 8:
        return this.statements;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): FunctionDeclarationSyntaxNode {
    return new FunctionDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = FunctionDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): FunctionDeclarationNode {
    return new FunctionDeclarationNode(this.functionKeyword, this.ampersand, this.identifier, this.openParen, this.parameters, this.closeParen, this.colon, this.returnType, this.statements, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8783);
    hash = Hash.combine(this.functionKeyword.hashCode(), hash);
    hash = this.ampersand !== null ? Hash.combine(this.ampersand.hashCode(), hash) : hash;
    hash = Hash.combine(this.identifier.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.parameters !== null ? Hash.combine(this.parameters.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = this.colon !== null ? Hash.combine(this.colon.hashCode(), hash) : hash;
    hash = this.returnType !== null ? Hash.combine(this.returnType.hashCode(), hash) : hash;
    hash = Hash.combine(this.statements.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class FunctionInvocationNode extends InvocationNode {

  public readonly reference: ExpressionNode | NameNode;
  public readonly openParen: TokenNode;
  public readonly argumentList: NodeList | null;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(reference: ExpressionNode | NameNode, openParen: TokenNode, argumentList: NodeList | null, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.reference = reference;
    this.openParen = openParen;
    this.argumentList = argumentList;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(reference.flags, reference.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (argumentList !== null) {
      this.updateFlagsAndWidth(argumentList.flags, argumentList.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitFunctionInvocation(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitFunctionInvocation(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.reference;
      case 1:
        return this.openParen;
      case 2:
        return this.argumentList;
      case 3:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): FunctionInvocationSyntaxNode {
    return new FunctionInvocationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = FunctionInvocationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): FunctionInvocationNode {
    return new FunctionInvocationNode(this.reference, this.openParen, this.argumentList, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8784);
    hash = Hash.combine(this.reference.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.argumentList !== null ? Hash.combine(this.argumentList.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class GlobalNode extends StatementNode {

  public readonly globalKeyword: TokenNode;
  public readonly variables: NodeList;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(globalKeyword: TokenNode, variables: NodeList, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.globalKeyword = globalKeyword;
    this.variables = variables;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(globalKeyword.flags, globalKeyword.fullWidth);
    this.updateFlagsAndWidth(variables.flags, variables.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitGlobalDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitGlobalDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.globalKeyword;
      case 1:
        return this.variables;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): GlobalSyntaxNode {
    return new GlobalSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = GlobalNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): GlobalNode {
    return new GlobalNode(this.globalKeyword, this.variables, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8785);
    hash = Hash.combine(this.globalKeyword.hashCode(), hash);
    hash = Hash.combine(this.variables.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class GoToNode extends JumpNode {

  public readonly gotoKeyword: TokenNode;
  public readonly label: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(gotoKeyword: TokenNode, label: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.gotoKeyword = gotoKeyword;
    this.label = label;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(gotoKeyword.flags, gotoKeyword.fullWidth);
    this.updateFlagsAndWidth(label.flags, label.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitGoTo(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitGoTo(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.gotoKeyword;
      case 1:
        return this.label;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): GoToSyntaxNode {
    return new GoToSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = GoToNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): GoToNode {
    return new GoToNode(this.gotoKeyword, this.label, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8786);
    hash = Hash.combine(this.gotoKeyword.hashCode(), hash);
    hash = Hash.combine(this.label.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class HaltCompilerNode extends StatementNode {

  public readonly haltCompilerKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly closeParen: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(haltCompilerKeyword: TokenNode, openParen: TokenNode, closeParen: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.haltCompilerKeyword = haltCompilerKeyword;
    this.openParen = openParen;
    this.closeParen = closeParen;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(haltCompilerKeyword.flags, haltCompilerKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitHaltCompiler(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitHaltCompiler(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.haltCompilerKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.closeParen;
      case 3:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): HaltCompilerSyntaxNode {
    return new HaltCompilerSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = HaltCompilerNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): HaltCompilerNode {
    return new HaltCompilerNode(this.haltCompilerKeyword, this.openParen, this.closeParen, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8787);
    hash = Hash.combine(this.haltCompilerKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class HeredocTemplateNode extends ExpressionNode {

  public readonly heredocStart: TokenNode;
  public readonly template: NodeList | null;
  public readonly heredocEnd: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(heredocStart: TokenNode, template: NodeList | null, heredocEnd: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.heredocStart = heredocStart;
    this.template = template;
    this.heredocEnd = heredocEnd;

    this.updateFlagsAndWidth(heredocStart.flags, heredocStart.fullWidth);
    if (template !== null) {
      this.updateFlagsAndWidth(template.flags, template.fullWidth);
    }
    this.updateFlagsAndWidth(heredocEnd.flags, heredocEnd.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitHeredocTemplate(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitHeredocTemplate(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.heredocStart;
      case 1:
        return this.template;
      case 2:
        return this.heredocEnd;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): HeredocTemplateSyntaxNode {
    return new HeredocTemplateSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = HeredocTemplateNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): HeredocTemplateNode {
    return new HeredocTemplateNode(this.heredocStart, this.template, this.heredocEnd, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8788);
    hash = Hash.combine(this.heredocStart.hashCode(), hash);
    hash = this.template !== null ? Hash.combine(this.template.hashCode(), hash) : hash;
    hash = Hash.combine(this.heredocEnd.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IfNode extends SelectionNode {

  public readonly ifKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly condition: ExpressionNode;
  public readonly closeParen: TokenNode;
  public readonly statement: StatementNode;
  public readonly elseIfClauses: NodeList | null;
  public readonly elseClause: ElseNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(ifKeyword: TokenNode, openParen: TokenNode, condition: ExpressionNode, closeParen: TokenNode, statement: StatementNode, elseIfClauses: NodeList | null, elseClause: ElseNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.ifKeyword = ifKeyword;
    this.openParen = openParen;
    this.condition = condition;
    this.closeParen = closeParen;
    this.statement = statement;
    this.elseIfClauses = elseIfClauses;
    this.elseClause = elseClause;

    this.updateFlagsAndWidth(ifKeyword.flags, ifKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(condition.flags, condition.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(statement.flags, statement.fullWidth);
    if (elseIfClauses !== null) {
      this.updateFlagsAndWidth(elseIfClauses.flags, elseIfClauses.fullWidth);
    }
    if (elseClause !== null) {
      this.updateFlagsAndWidth(elseClause.flags, elseClause.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 7;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitIf(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitIf(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.ifKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.condition;
      case 3:
        return this.closeParen;
      case 4:
        return this.statement;
      case 5:
        return this.elseIfClauses;
      case 6:
        return this.elseClause;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IfSyntaxNode {
    return new IfSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IfNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IfNode {
    return new IfNode(this.ifKeyword, this.openParen, this.condition, this.closeParen, this.statement, this.elseIfClauses, this.elseClause, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8789);
    hash = Hash.combine(this.ifKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.condition.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.statement.hashCode(), hash);
    hash = this.elseIfClauses !== null ? Hash.combine(this.elseIfClauses.hashCode(), hash) : hash;
    hash = this.elseClause !== null ? Hash.combine(this.elseClause.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IfBlockNode extends SelectionNode {

  public readonly ifKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly condition: ExpressionNode;
  public readonly closeParen: TokenNode;
  public readonly colon: TokenNode;
  public readonly statements: NodeList | null;
  public readonly elseIfClauses: NodeList | null;
  public readonly elseClause: ElseBlockNode | null;
  public readonly endIfKeyword: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(ifKeyword: TokenNode, openParen: TokenNode, condition: ExpressionNode, closeParen: TokenNode, colon: TokenNode, statements: NodeList | null, elseIfClauses: NodeList | null, elseClause: ElseBlockNode | null, endIfKeyword: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.ifKeyword = ifKeyword;
    this.openParen = openParen;
    this.condition = condition;
    this.closeParen = closeParen;
    this.colon = colon;
    this.statements = statements;
    this.elseIfClauses = elseIfClauses;
    this.elseClause = elseClause;
    this.endIfKeyword = endIfKeyword;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(ifKeyword.flags, ifKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(condition.flags, condition.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }
    if (elseIfClauses !== null) {
      this.updateFlagsAndWidth(elseIfClauses.flags, elseIfClauses.fullWidth);
    }
    if (elseClause !== null) {
      this.updateFlagsAndWidth(elseClause.flags, elseClause.fullWidth);
    }
    this.updateFlagsAndWidth(endIfKeyword.flags, endIfKeyword.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 10;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitIfBlock(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitIfBlock(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.ifKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.condition;
      case 3:
        return this.closeParen;
      case 4:
        return this.colon;
      case 5:
        return this.statements;
      case 6:
        return this.elseIfClauses;
      case 7:
        return this.elseClause;
      case 8:
        return this.endIfKeyword;
      case 9:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IfBlockSyntaxNode {
    return new IfBlockSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IfBlockNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IfBlockNode {
    return new IfBlockNode(this.ifKeyword, this.openParen, this.condition, this.closeParen, this.colon, this.statements, this.elseIfClauses, this.elseClause, this.endIfKeyword, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8790);
    hash = Hash.combine(this.ifKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.condition.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.colon.hashCode(), hash);
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    hash = this.elseIfClauses !== null ? Hash.combine(this.elseIfClauses.hashCode(), hash) : hash;
    hash = this.elseClause !== null ? Hash.combine(this.elseClause.hashCode(), hash) : hash;
    hash = Hash.combine(this.endIfKeyword.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IncompleteMemberNode extends StatementNode {

  public readonly modifiers: NodeList;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(modifiers: NodeList, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.modifiers = modifiers;

    this.updateFlagsAndWidth(modifiers.flags, modifiers.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 1;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitIncompleteMember(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitIncompleteMember(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.modifiers;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IncompleteMemberSyntaxNode {
    return new IncompleteMemberSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IncompleteMemberNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IncompleteMemberNode {
    return new IncompleteMemberNode(this.modifiers, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8791);
    hash = Hash.combine(this.modifiers.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IndirectMemberAccessNode extends MemberAccessNode {

  public readonly dereferencable: ExpressionNode;
  public readonly objectOperator: TokenNode;
  public readonly openBrace: TokenNode | null;
  public readonly member: ExpressionNode;
  public readonly closeBrace: TokenNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(dereferencable: ExpressionNode, objectOperator: TokenNode, openBrace: TokenNode | null, member: ExpressionNode, closeBrace: TokenNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.dereferencable = dereferencable;
    this.objectOperator = objectOperator;
    this.openBrace = openBrace;
    this.member = member;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(dereferencable.flags, dereferencable.fullWidth);
    this.updateFlagsAndWidth(objectOperator.flags, objectOperator.fullWidth);
    if (openBrace !== null) {
      this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    }
    this.updateFlagsAndWidth(member.flags, member.fullWidth);
    if (closeBrace !== null) {
      this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitMemberAccess(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitMemberAccess(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.dereferencable;
      case 1:
        return this.objectOperator;
      case 2:
        return this.openBrace;
      case 3:
        return this.member;
      case 4:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IndirectMemberAccessSyntaxNode {
    return new IndirectMemberAccessSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IndirectMemberAccessNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IndirectMemberAccessNode {
    return new IndirectMemberAccessNode(this.dereferencable, this.objectOperator, this.openBrace, this.member, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8792);
    hash = Hash.combine(this.dereferencable.hashCode(), hash);
    hash = Hash.combine(this.objectOperator.hashCode(), hash);
    hash = this.openBrace !== null ? Hash.combine(this.openBrace.hashCode(), hash) : hash;
    hash = Hash.combine(this.member.hashCode(), hash);
    hash = this.closeBrace !== null ? Hash.combine(this.closeBrace.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IndirectMethodInvocationNode extends MemberInvocationNode {

  public readonly dereferenceable: ExpressionNode;
  public readonly objectOperator: TokenNode;
  public readonly openBrace: TokenNode | null;
  public readonly member: ExpressionNode;
  public readonly closeBrace: TokenNode | null;
  public readonly openParen: TokenNode;
  public readonly argumentList: NodeList | null;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(dereferenceable: ExpressionNode, objectOperator: TokenNode, openBrace: TokenNode | null, member: ExpressionNode, closeBrace: TokenNode | null, openParen: TokenNode, argumentList: NodeList | null, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.dereferenceable = dereferenceable;
    this.objectOperator = objectOperator;
    this.openBrace = openBrace;
    this.member = member;
    this.closeBrace = closeBrace;
    this.openParen = openParen;
    this.argumentList = argumentList;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(dereferenceable.flags, dereferenceable.fullWidth);
    this.updateFlagsAndWidth(objectOperator.flags, objectOperator.fullWidth);
    if (openBrace !== null) {
      this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    }
    this.updateFlagsAndWidth(member.flags, member.fullWidth);
    if (closeBrace !== null) {
      this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);
    }
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (argumentList !== null) {
      this.updateFlagsAndWidth(argumentList.flags, argumentList.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 8;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitMethodInvocation(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitMethodInvocation(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.dereferenceable;
      case 1:
        return this.objectOperator;
      case 2:
        return this.openBrace;
      case 3:
        return this.member;
      case 4:
        return this.closeBrace;
      case 5:
        return this.openParen;
      case 6:
        return this.argumentList;
      case 7:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IndirectMethodInvocationSyntaxNode {
    return new IndirectMethodInvocationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IndirectMethodInvocationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IndirectMethodInvocationNode {
    return new IndirectMethodInvocationNode(this.dereferenceable, this.objectOperator, this.openBrace, this.member, this.closeBrace, this.openParen, this.argumentList, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8793);
    hash = Hash.combine(this.dereferenceable.hashCode(), hash);
    hash = Hash.combine(this.objectOperator.hashCode(), hash);
    hash = this.openBrace !== null ? Hash.combine(this.openBrace.hashCode(), hash) : hash;
    hash = Hash.combine(this.member.hashCode(), hash);
    hash = this.closeBrace !== null ? Hash.combine(this.closeBrace.hashCode(), hash) : hash;
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.argumentList !== null ? Hash.combine(this.argumentList.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IndirectObjectCreationNode extends ObjectCreationNode {

  public readonly newKeyword: TokenNode;
  public readonly classNameReference: ExpressionNode;
  public readonly openParen: TokenNode | null;
  public readonly argumentList: NodeList | null;
  public readonly closeParen: TokenNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(newKeyword: TokenNode, classNameReference: ExpressionNode, openParen: TokenNode | null, argumentList: NodeList | null, closeParen: TokenNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.newKeyword = newKeyword;
    this.classNameReference = classNameReference;
    this.openParen = openParen;
    this.argumentList = argumentList;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(newKeyword.flags, newKeyword.fullWidth);
    this.updateFlagsAndWidth(classNameReference.flags, classNameReference.fullWidth);
    if (openParen !== null) {
      this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    }
    if (argumentList !== null) {
      this.updateFlagsAndWidth(argumentList.flags, argumentList.fullWidth);
    }
    if (closeParen !== null) {
      this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitObjectCreation(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitObjectCreation(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.newKeyword;
      case 1:
        return this.classNameReference;
      case 2:
        return this.openParen;
      case 3:
        return this.argumentList;
      case 4:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IndirectObjectCreationSyntaxNode {
    return new IndirectObjectCreationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IndirectObjectCreationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IndirectObjectCreationNode {
    return new IndirectObjectCreationNode(this.newKeyword, this.classNameReference, this.openParen, this.argumentList, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8794);
    hash = Hash.combine(this.newKeyword.hashCode(), hash);
    hash = Hash.combine(this.classNameReference.hashCode(), hash);
    hash = this.openParen !== null ? Hash.combine(this.openParen.hashCode(), hash) : hash;
    hash = this.argumentList !== null ? Hash.combine(this.argumentList.hashCode(), hash) : hash;
    hash = this.closeParen !== null ? Hash.combine(this.closeParen.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IndirectScopedInvocationNode extends ScopedInvocationNode {

  public readonly qualifier: ExpressionNode | NameNode;
  public readonly doubleColon: TokenNode;
  public readonly openBrace: TokenNode | null;
  public readonly member: ExpressionNode;
  public readonly closeBrace: TokenNode | null;
  public readonly openParen: TokenNode;
  public readonly argumentList: NodeList | null;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(qualifier: ExpressionNode | NameNode, doubleColon: TokenNode, openBrace: TokenNode | null, member: ExpressionNode, closeBrace: TokenNode | null, openParen: TokenNode, argumentList: NodeList | null, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.qualifier = qualifier;
    this.doubleColon = doubleColon;
    this.openBrace = openBrace;
    this.member = member;
    this.closeBrace = closeBrace;
    this.openParen = openParen;
    this.argumentList = argumentList;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(qualifier.flags, qualifier.fullWidth);
    this.updateFlagsAndWidth(doubleColon.flags, doubleColon.fullWidth);
    if (openBrace !== null) {
      this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    }
    this.updateFlagsAndWidth(member.flags, member.fullWidth);
    if (closeBrace !== null) {
      this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);
    }
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (argumentList !== null) {
      this.updateFlagsAndWidth(argumentList.flags, argumentList.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 8;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitScopedInvocation(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitScopedInvocation(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.qualifier;
      case 1:
        return this.doubleColon;
      case 2:
        return this.openBrace;
      case 3:
        return this.member;
      case 4:
        return this.closeBrace;
      case 5:
        return this.openParen;
      case 6:
        return this.argumentList;
      case 7:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IndirectScopedInvocationSyntaxNode {
    return new IndirectScopedInvocationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IndirectScopedInvocationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IndirectScopedInvocationNode {
    return new IndirectScopedInvocationNode(this.qualifier, this.doubleColon, this.openBrace, this.member, this.closeBrace, this.openParen, this.argumentList, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8795);
    hash = Hash.combine(this.qualifier.hashCode(), hash);
    hash = Hash.combine(this.doubleColon.hashCode(), hash);
    hash = this.openBrace !== null ? Hash.combine(this.openBrace.hashCode(), hash) : hash;
    hash = Hash.combine(this.member.hashCode(), hash);
    hash = this.closeBrace !== null ? Hash.combine(this.closeBrace.hashCode(), hash) : hash;
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.argumentList !== null ? Hash.combine(this.argumentList.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IndirectStringVariableNode extends ExpressionNode {

  public readonly dollarOpenBrace: TokenNode;
  public readonly expression: ExpressionNode;
  public readonly closeBrace: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(dollarOpenBrace: TokenNode, expression: ExpressionNode, closeBrace: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.dollarOpenBrace = dollarOpenBrace;
    this.expression = expression;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(dollarOpenBrace.flags, dollarOpenBrace.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitIndirectStringVariable(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitIndirectStringVariable(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.dollarOpenBrace;
      case 1:
        return this.expression;
      case 2:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IndirectStringVariableSyntaxNode {
    return new IndirectStringVariableSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IndirectStringVariableNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IndirectStringVariableNode {
    return new IndirectStringVariableNode(this.dollarOpenBrace, this.expression, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8796);
    hash = Hash.combine(this.dollarOpenBrace.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IndirectVariableNode extends VariableNode {

  public readonly dollar: TokenNode;
  public readonly openBrace: TokenNode | null;
  public readonly expression: ExpressionNode;
  public readonly closeBrace: TokenNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(dollar: TokenNode, openBrace: TokenNode | null, expression: ExpressionNode, closeBrace: TokenNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.dollar = dollar;
    this.openBrace = openBrace;
    this.expression = expression;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(dollar.flags, dollar.fullWidth);
    if (openBrace !== null) {
      this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    }
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    if (closeBrace !== null) {
      this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitIndirectVariable(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitIndirectVariable(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.dollar;
      case 1:
        return this.openBrace;
      case 2:
        return this.expression;
      case 3:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IndirectVariableSyntaxNode {
    return new IndirectVariableSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IndirectVariableNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IndirectVariableNode {
    return new IndirectVariableNode(this.dollar, this.openBrace, this.expression, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8797);
    hash = Hash.combine(this.dollar.hashCode(), hash);
    hash = this.openBrace !== null ? Hash.combine(this.openBrace.hashCode(), hash) : hash;
    hash = Hash.combine(this.expression.hashCode(), hash);
    hash = this.closeBrace !== null ? Hash.combine(this.closeBrace.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class InstanceOfNode extends ExpressionNode {

  public readonly operand: ExpressionNode;
  public readonly instanceOfKeyword: TokenNode;
  public readonly classNameOrReference: ExpressionNode | NameNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(operand: ExpressionNode, instanceOfKeyword: TokenNode, classNameOrReference: ExpressionNode | NameNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.operand = operand;
    this.instanceOfKeyword = instanceOfKeyword;
    this.classNameOrReference = classNameOrReference;

    this.updateFlagsAndWidth(operand.flags, operand.fullWidth);
    this.updateFlagsAndWidth(instanceOfKeyword.flags, instanceOfKeyword.fullWidth);
    this.updateFlagsAndWidth(classNameOrReference.flags, classNameOrReference.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitInstanceOf(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitInstanceOf(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.operand;
      case 1:
        return this.instanceOfKeyword;
      case 2:
        return this.classNameOrReference;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): InstanceOfSyntaxNode {
    return new InstanceOfSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = InstanceOfNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): InstanceOfNode {
    return new InstanceOfNode(this.operand, this.instanceOfKeyword, this.classNameOrReference, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8798);
    hash = Hash.combine(this.operand.hashCode(), hash);
    hash = Hash.combine(this.instanceOfKeyword.hashCode(), hash);
    hash = Hash.combine(this.classNameOrReference.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class InterfaceDeclarationNode extends TypeDeclarationNode {

  public readonly interfaceKeyword: TokenNode;
  public readonly identifier: TokenNode;
  public readonly extendsKeyword: TokenNode | null;
  public readonly baseInterfaces: NodeList | null;
  public readonly openBrace: TokenNode;
  public readonly members: NodeList | null;
  public readonly closeBrace: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(interfaceKeyword: TokenNode, identifier: TokenNode, extendsKeyword: TokenNode | null, baseInterfaces: NodeList | null, openBrace: TokenNode, members: NodeList | null, closeBrace: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.interfaceKeyword = interfaceKeyword;
    this.identifier = identifier;
    this.extendsKeyword = extendsKeyword;
    this.baseInterfaces = baseInterfaces;
    this.openBrace = openBrace;
    this.members = members;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(interfaceKeyword.flags, interfaceKeyword.fullWidth);
    this.updateFlagsAndWidth(identifier.flags, identifier.fullWidth);
    if (extendsKeyword !== null) {
      this.updateFlagsAndWidth(extendsKeyword.flags, extendsKeyword.fullWidth);
    }
    if (baseInterfaces !== null) {
      this.updateFlagsAndWidth(baseInterfaces.flags, baseInterfaces.fullWidth);
    }
    this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    if (members !== null) {
      this.updateFlagsAndWidth(members.flags, members.fullWidth);
    }
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 7;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitInterfaceDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitInterfaceDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.interfaceKeyword;
      case 1:
        return this.identifier;
      case 2:
        return this.extendsKeyword;
      case 3:
        return this.baseInterfaces;
      case 4:
        return this.openBrace;
      case 5:
        return this.members;
      case 6:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): InterfaceDeclarationSyntaxNode {
    return new InterfaceDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = InterfaceDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): InterfaceDeclarationNode {
    return new InterfaceDeclarationNode(this.interfaceKeyword, this.identifier, this.extendsKeyword, this.baseInterfaces, this.openBrace, this.members, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8799);
    hash = Hash.combine(this.interfaceKeyword.hashCode(), hash);
    hash = Hash.combine(this.identifier.hashCode(), hash);
    hash = this.extendsKeyword !== null ? Hash.combine(this.extendsKeyword.hashCode(), hash) : hash;
    hash = this.baseInterfaces !== null ? Hash.combine(this.baseInterfaces.hashCode(), hash) : hash;
    hash = Hash.combine(this.openBrace.hashCode(), hash);
    hash = this.members !== null ? Hash.combine(this.members.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class IsSetIntrinsicNode extends IntrinsicNode {

  public readonly isSetKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly expressions: NodeList;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(isSetKeyword: TokenNode, openParen: TokenNode, expressions: NodeList, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.isSetKeyword = isSetKeyword;
    this.openParen = openParen;
    this.expressions = expressions;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(isSetKeyword.flags, isSetKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(expressions.flags, expressions.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitIsSetIntrinsic(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitIsSetIntrinsic(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.isSetKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.expressions;
      case 3:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): IsSetIntrinsicSyntaxNode {
    return new IsSetIntrinsicSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = IsSetIntrinsicNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): IsSetIntrinsicNode {
    return new IsSetIntrinsicNode(this.isSetKeyword, this.openParen, this.expressions, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8800);
    hash = Hash.combine(this.isSetKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.expressions.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class LabelNode extends StatementNode {

  public readonly label: TokenNode;
  public readonly colon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(label: TokenNode, colon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.label = label;
    this.colon = colon;

    this.updateFlagsAndWidth(label.flags, label.fullWidth);
    this.updateFlagsAndWidth(colon.flags, colon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitLabel(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitLabel(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.label;
      case 1:
        return this.colon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): LabelSyntaxNode {
    return new LabelSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = LabelNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): LabelNode {
    return new LabelNode(this.label, this.colon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8801);
    hash = Hash.combine(this.label.hashCode(), hash);
    hash = Hash.combine(this.colon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class LexicalVariableNode extends VariableNode {

  public readonly ampersand: TokenNode | null;
  public readonly variable: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(ampersand: TokenNode | null, variable: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.ampersand = ampersand;
    this.variable = variable;

    if (ampersand !== null) {
      this.updateFlagsAndWidth(ampersand.flags, ampersand.fullWidth);
    }
    this.updateFlagsAndWidth(variable.flags, variable.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitLexicalVariable(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitLexicalVariable(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.ampersand;
      case 1:
        return this.variable;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): LexicalVariableSyntaxNode {
    return new LexicalVariableSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = LexicalVariableNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): LexicalVariableNode {
    return new LexicalVariableNode(this.ampersand, this.variable, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8802);
    hash = this.ampersand !== null ? Hash.combine(this.ampersand.hashCode(), hash) : hash;
    hash = Hash.combine(this.variable.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class LiteralNode extends ExpressionNode {

  public readonly value: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(value: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.value = value;

    this.updateFlagsAndWidth(value.flags, value.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 1;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitLiteral(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitLiteral(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.value;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): LiteralSyntaxNode {
    return new LiteralSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = LiteralNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): LiteralNode {
    return new LiteralNode(this.value, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8803);
    hash = Hash.combine(this.value.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class LocalVariableNode extends VariableNode {

  public readonly variable: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(variable: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.variable = variable;

    this.updateFlagsAndWidth(variable.flags, variable.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 1;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitLocalVariable(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitLocalVariable(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.variable;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): LocalVariableSyntaxNode {
    return new LocalVariableSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = LocalVariableNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): LocalVariableNode {
    return new LocalVariableNode(this.variable, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8804);
    hash = Hash.combine(this.variable.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class MethodDeclarationNode extends StatementNode {

  public readonly modifiers: NodeList | null;
  public readonly functionKeyword: TokenNode;
  public readonly ampersand: TokenNode | null;
  public readonly identifierOrKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly parameters: NodeList | null;
  public readonly closeParen: TokenNode;
  public readonly colon: TokenNode | null;
  public readonly returnType: NamedTypeNode | PredefinedTypeNode | null;
  public readonly statements: StatementBlockNode | null;
  public readonly semicolon: TokenNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(modifiers: NodeList | null, functionKeyword: TokenNode, ampersand: TokenNode | null, identifierOrKeyword: TokenNode, openParen: TokenNode, parameters: NodeList | null, closeParen: TokenNode, colon: TokenNode | null, returnType: NamedTypeNode | PredefinedTypeNode | null, statements: StatementBlockNode | null, semicolon: TokenNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.modifiers = modifiers;
    this.functionKeyword = functionKeyword;
    this.ampersand = ampersand;
    this.identifierOrKeyword = identifierOrKeyword;
    this.openParen = openParen;
    this.parameters = parameters;
    this.closeParen = closeParen;
    this.colon = colon;
    this.returnType = returnType;
    this.statements = statements;
    this.semicolon = semicolon;

    if (modifiers !== null) {
      this.updateFlagsAndWidth(modifiers.flags, modifiers.fullWidth);
    }
    this.updateFlagsAndWidth(functionKeyword.flags, functionKeyword.fullWidth);
    if (ampersand !== null) {
      this.updateFlagsAndWidth(ampersand.flags, ampersand.fullWidth);
    }
    this.updateFlagsAndWidth(identifierOrKeyword.flags, identifierOrKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (parameters !== null) {
      this.updateFlagsAndWidth(parameters.flags, parameters.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    if (colon !== null) {
      this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    }
    if (returnType !== null) {
      this.updateFlagsAndWidth(returnType.flags, returnType.fullWidth);
    }
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }
    if (semicolon !== null) {
      this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 11;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitMethodDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitMethodDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.modifiers;
      case 1:
        return this.functionKeyword;
      case 2:
        return this.ampersand;
      case 3:
        return this.identifierOrKeyword;
      case 4:
        return this.openParen;
      case 5:
        return this.parameters;
      case 6:
        return this.closeParen;
      case 7:
        return this.colon;
      case 8:
        return this.returnType;
      case 9:
        return this.statements;
      case 10:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): MethodDeclarationSyntaxNode {
    return new MethodDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = MethodDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): MethodDeclarationNode {
    return new MethodDeclarationNode(this.modifiers, this.functionKeyword, this.ampersand, this.identifierOrKeyword, this.openParen, this.parameters, this.closeParen, this.colon, this.returnType, this.statements, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8805);
    hash = this.modifiers !== null ? Hash.combine(this.modifiers.hashCode(), hash) : hash;
    hash = Hash.combine(this.functionKeyword.hashCode(), hash);
    hash = this.ampersand !== null ? Hash.combine(this.ampersand.hashCode(), hash) : hash;
    hash = Hash.combine(this.identifierOrKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.parameters !== null ? Hash.combine(this.parameters.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = this.colon !== null ? Hash.combine(this.colon.hashCode(), hash) : hash;
    hash = this.returnType !== null ? Hash.combine(this.returnType.hashCode(), hash) : hash;
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    hash = this.semicolon !== null ? Hash.combine(this.semicolon.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class NamedMemberAccessNode extends MemberAccessNode {

  public readonly dereferencable: ExpressionNode;
  public readonly objectOperator: TokenNode;
  public readonly member: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(dereferencable: ExpressionNode, objectOperator: TokenNode, member: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.dereferencable = dereferencable;
    this.objectOperator = objectOperator;
    this.member = member;

    this.updateFlagsAndWidth(dereferencable.flags, dereferencable.fullWidth);
    this.updateFlagsAndWidth(objectOperator.flags, objectOperator.fullWidth);
    this.updateFlagsAndWidth(member.flags, member.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitMemberAccess(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitMemberAccess(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.dereferencable;
      case 1:
        return this.objectOperator;
      case 2:
        return this.member;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): NamedMemberAccessSyntaxNode {
    return new NamedMemberAccessSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = NamedMemberAccessNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): NamedMemberAccessNode {
    return new NamedMemberAccessNode(this.dereferencable, this.objectOperator, this.member, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8806);
    hash = Hash.combine(this.dereferencable.hashCode(), hash);
    hash = Hash.combine(this.objectOperator.hashCode(), hash);
    hash = Hash.combine(this.member.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class NamedMethodInvocationNode extends MemberInvocationNode {

  public readonly dereferenceable: ExpressionNode;
  public readonly objectOperator: TokenNode;
  public readonly identifierOrKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly argumentList: NodeList | null;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(dereferenceable: ExpressionNode, objectOperator: TokenNode, identifierOrKeyword: TokenNode, openParen: TokenNode, argumentList: NodeList | null, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.dereferenceable = dereferenceable;
    this.objectOperator = objectOperator;
    this.identifierOrKeyword = identifierOrKeyword;
    this.openParen = openParen;
    this.argumentList = argumentList;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(dereferenceable.flags, dereferenceable.fullWidth);
    this.updateFlagsAndWidth(objectOperator.flags, objectOperator.fullWidth);
    this.updateFlagsAndWidth(identifierOrKeyword.flags, identifierOrKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (argumentList !== null) {
      this.updateFlagsAndWidth(argumentList.flags, argumentList.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 6;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitMethodInvocation(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitMethodInvocation(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.dereferenceable;
      case 1:
        return this.objectOperator;
      case 2:
        return this.identifierOrKeyword;
      case 3:
        return this.openParen;
      case 4:
        return this.argumentList;
      case 5:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): NamedMethodInvocationSyntaxNode {
    return new NamedMethodInvocationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = NamedMethodInvocationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): NamedMethodInvocationNode {
    return new NamedMethodInvocationNode(this.dereferenceable, this.objectOperator, this.identifierOrKeyword, this.openParen, this.argumentList, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8807);
    hash = Hash.combine(this.dereferenceable.hashCode(), hash);
    hash = Hash.combine(this.objectOperator.hashCode(), hash);
    hash = Hash.combine(this.identifierOrKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.argumentList !== null ? Hash.combine(this.argumentList.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class NamedObjectCreationNode extends ObjectCreationNode {

  public readonly newKeyword: TokenNode;
  public readonly className: NameNode;
  public readonly openParen: TokenNode | null;
  public readonly argumentList: NodeList | null;
  public readonly closeParen: TokenNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(newKeyword: TokenNode, className: NameNode, openParen: TokenNode | null, argumentList: NodeList | null, closeParen: TokenNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.newKeyword = newKeyword;
    this.className = className;
    this.openParen = openParen;
    this.argumentList = argumentList;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(newKeyword.flags, newKeyword.fullWidth);
    this.updateFlagsAndWidth(className.flags, className.fullWidth);
    if (openParen !== null) {
      this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    }
    if (argumentList !== null) {
      this.updateFlagsAndWidth(argumentList.flags, argumentList.fullWidth);
    }
    if (closeParen !== null) {
      this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitObjectCreation(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitObjectCreation(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.newKeyword;
      case 1:
        return this.className;
      case 2:
        return this.openParen;
      case 3:
        return this.argumentList;
      case 4:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): NamedObjectCreationSyntaxNode {
    return new NamedObjectCreationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = NamedObjectCreationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): NamedObjectCreationNode {
    return new NamedObjectCreationNode(this.newKeyword, this.className, this.openParen, this.argumentList, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8808);
    hash = Hash.combine(this.newKeyword.hashCode(), hash);
    hash = Hash.combine(this.className.hashCode(), hash);
    hash = this.openParen !== null ? Hash.combine(this.openParen.hashCode(), hash) : hash;
    hash = this.argumentList !== null ? Hash.combine(this.argumentList.hashCode(), hash) : hash;
    hash = this.closeParen !== null ? Hash.combine(this.closeParen.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class NamedScopedInvocationNode extends ScopedInvocationNode {

  public readonly qualifier: ExpressionNode | NameNode;
  public readonly doubleColon: TokenNode;
  public readonly member: TokenNode;
  public readonly openParen: TokenNode;
  public readonly argumentList: NodeList | null;
  public readonly closeParen: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(qualifier: ExpressionNode | NameNode, doubleColon: TokenNode, member: TokenNode, openParen: TokenNode, argumentList: NodeList | null, closeParen: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.qualifier = qualifier;
    this.doubleColon = doubleColon;
    this.member = member;
    this.openParen = openParen;
    this.argumentList = argumentList;
    this.closeParen = closeParen;

    this.updateFlagsAndWidth(qualifier.flags, qualifier.fullWidth);
    this.updateFlagsAndWidth(doubleColon.flags, doubleColon.fullWidth);
    this.updateFlagsAndWidth(member.flags, member.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    if (argumentList !== null) {
      this.updateFlagsAndWidth(argumentList.flags, argumentList.fullWidth);
    }
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 6;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitScopedInvocation(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitScopedInvocation(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.qualifier;
      case 1:
        return this.doubleColon;
      case 2:
        return this.member;
      case 3:
        return this.openParen;
      case 4:
        return this.argumentList;
      case 5:
        return this.closeParen;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): NamedScopedInvocationSyntaxNode {
    return new NamedScopedInvocationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = NamedScopedInvocationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): NamedScopedInvocationNode {
    return new NamedScopedInvocationNode(this.qualifier, this.doubleColon, this.member, this.openParen, this.argumentList, this.closeParen, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8809);
    hash = Hash.combine(this.qualifier.hashCode(), hash);
    hash = Hash.combine(this.doubleColon.hashCode(), hash);
    hash = Hash.combine(this.member.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = this.argumentList !== null ? Hash.combine(this.argumentList.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class NamedTraitAliasNode extends TraitAliasNode {

  public readonly methodName: TokenNode;
  public readonly asKeyword: TokenNode;
  public readonly modifier: TokenNode | null;
  public readonly alias: TokenNode | null;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(methodName: TokenNode, asKeyword: TokenNode, modifier: TokenNode | null, alias: TokenNode | null, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.methodName = methodName;
    this.asKeyword = asKeyword;
    this.modifier = modifier;
    this.alias = alias;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(methodName.flags, methodName.fullWidth);
    this.updateFlagsAndWidth(asKeyword.flags, asKeyword.fullWidth);
    if (modifier !== null) {
      this.updateFlagsAndWidth(modifier.flags, modifier.fullWidth);
    }
    if (alias !== null) {
      this.updateFlagsAndWidth(alias.flags, alias.fullWidth);
    }
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitTraitAlias(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitTraitAlias(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.methodName;
      case 1:
        return this.asKeyword;
      case 2:
        return this.modifier;
      case 3:
        return this.alias;
      case 4:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): NamedTraitAliasSyntaxNode {
    return new NamedTraitAliasSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = NamedTraitAliasNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): NamedTraitAliasNode {
    return new NamedTraitAliasNode(this.methodName, this.asKeyword, this.modifier, this.alias, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8810);
    hash = Hash.combine(this.methodName.hashCode(), hash);
    hash = Hash.combine(this.asKeyword.hashCode(), hash);
    hash = this.modifier !== null ? Hash.combine(this.modifier.hashCode(), hash) : hash;
    hash = this.alias !== null ? Hash.combine(this.alias.hashCode(), hash) : hash;
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class NamedTypeNode extends TypeNode {

  public readonly question: TokenNode | null;
  public readonly typeName: NameNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(question: TokenNode | null, typeName: NameNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.question = question;
    this.typeName = typeName;

    if (question !== null) {
      this.updateFlagsAndWidth(question.flags, question.fullWidth);
    }
    this.updateFlagsAndWidth(typeName.flags, typeName.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitType(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitType(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.question;
      case 1:
        return this.typeName;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): NamedTypeSyntaxNode {
    return new NamedTypeSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = NamedTypeNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): NamedTypeNode {
    return new NamedTypeNode(this.question, this.typeName, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8811);
    hash = this.question !== null ? Hash.combine(this.question.hashCode(), hash) : hash;
    hash = Hash.combine(this.typeName.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class NamespaceDeclarationNode extends StatementNode {

  public readonly namespaceKeyword: TokenNode;
  public readonly name: NameNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(namespaceKeyword: TokenNode, name: NameNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.namespaceKeyword = namespaceKeyword;
    this.name = name;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(namespaceKeyword.flags, namespaceKeyword.fullWidth);
    this.updateFlagsAndWidth(name.flags, name.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitNamespaceDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitNamespaceDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.namespaceKeyword;
      case 1:
        return this.name;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): NamespaceDeclarationSyntaxNode {
    return new NamespaceDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = NamespaceDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): NamespaceDeclarationNode {
    return new NamespaceDeclarationNode(this.namespaceKeyword, this.name, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8812);
    hash = Hash.combine(this.namespaceKeyword.hashCode(), hash);
    hash = Hash.combine(this.name.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class NamespaceGroupDeclarationNode extends StatementNode {

  public readonly namespaceKeyword: TokenNode;
  public readonly name: NameNode | null;
  public readonly openBrace: TokenNode;
  public readonly statements: NodeList | null;
  public readonly closeBrace: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(namespaceKeyword: TokenNode, name: NameNode | null, openBrace: TokenNode, statements: NodeList | null, closeBrace: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.namespaceKeyword = namespaceKeyword;
    this.name = name;
    this.openBrace = openBrace;
    this.statements = statements;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(namespaceKeyword.flags, namespaceKeyword.fullWidth);
    if (name !== null) {
      this.updateFlagsAndWidth(name.flags, name.fullWidth);
    }
    this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitNamespaceGroupDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitNamespaceGroupDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.namespaceKeyword;
      case 1:
        return this.name;
      case 2:
        return this.openBrace;
      case 3:
        return this.statements;
      case 4:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): NamespaceGroupDeclarationSyntaxNode {
    return new NamespaceGroupDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = NamespaceGroupDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): NamespaceGroupDeclarationNode {
    return new NamespaceGroupDeclarationNode(this.namespaceKeyword, this.name, this.openBrace, this.statements, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8813);
    hash = Hash.combine(this.namespaceKeyword.hashCode(), hash);
    hash = this.name !== null ? Hash.combine(this.name.hashCode(), hash) : hash;
    hash = Hash.combine(this.openBrace.hashCode(), hash);
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class PartiallyQualifiedNameNode extends NameNode {

  public readonly namespaceName: NodeList;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(namespaceName: NodeList, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.namespaceName = namespaceName;

    this.updateFlagsAndWidth(namespaceName.flags, namespaceName.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 1;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitPartiallyQualifiedName(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitPartiallyQualifiedName(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.namespaceName;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): PartiallyQualifiedNameSyntaxNode {
    return new PartiallyQualifiedNameSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = PartiallyQualifiedNameNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): PartiallyQualifiedNameNode {
    return new PartiallyQualifiedNameNode(this.namespaceName, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8814);
    hash = Hash.combine(this.namespaceName.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class PostfixUnaryNode extends ExpressionNode {

  public readonly operand: ExpressionNode;
  public readonly operator: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(operand: ExpressionNode, operator: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.operand = operand;
    this.operator = operator;

    this.updateFlagsAndWidth(operand.flags, operand.fullWidth);
    this.updateFlagsAndWidth(operator.flags, operator.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitPostfixUnaryExpression(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitPostfixUnaryExpression(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.operand;
      case 1:
        return this.operator;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): PostfixUnarySyntaxNode {
    return new PostfixUnarySyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = PostfixUnaryNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): PostfixUnaryNode {
    return new PostfixUnaryNode(this.operand, this.operator, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8815);
    hash = Hash.combine(this.operand.hashCode(), hash);
    hash = Hash.combine(this.operator.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class PredefinedTypeNode extends TypeNode {

  public readonly question: TokenNode | null;
  public readonly keyword: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(question: TokenNode | null, keyword: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.question = question;
    this.keyword = keyword;

    if (question !== null) {
      this.updateFlagsAndWidth(question.flags, question.fullWidth);
    }
    this.updateFlagsAndWidth(keyword.flags, keyword.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitType(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitType(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.question;
      case 1:
        return this.keyword;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): PredefinedTypeSyntaxNode {
    return new PredefinedTypeSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = PredefinedTypeNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): PredefinedTypeNode {
    return new PredefinedTypeNode(this.question, this.keyword, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8816);
    hash = this.question !== null ? Hash.combine(this.question.hashCode(), hash) : hash;
    hash = Hash.combine(this.keyword.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class PrintIntrinsicNode extends IntrinsicNode {

  public readonly printKeyword: TokenNode;
  public readonly expression: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(printKeyword: TokenNode, expression: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.printKeyword = printKeyword;
    this.expression = expression;

    this.updateFlagsAndWidth(printKeyword.flags, printKeyword.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitPrintIntrinsic(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitPrintIntrinsic(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.printKeyword;
      case 1:
        return this.expression;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): PrintIntrinsicSyntaxNode {
    return new PrintIntrinsicSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = PrintIntrinsicNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): PrintIntrinsicNode {
    return new PrintIntrinsicNode(this.printKeyword, this.expression, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8817);
    hash = Hash.combine(this.printKeyword.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class PropertyDeclarationNode extends StatementNode {

  public readonly modifiers: NodeList;
  public readonly type: NamedTypeNode | PredefinedTypeNode | null;
  public readonly properties: NodeList;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(modifiers: NodeList, type: NamedTypeNode | PredefinedTypeNode | null, properties: NodeList, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.modifiers = modifiers;
    this.type = type;
    this.properties = properties;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(modifiers.flags, modifiers.fullWidth);
    if (type !== null) {
      this.updateFlagsAndWidth(type.flags, type.fullWidth);
    }
    this.updateFlagsAndWidth(properties.flags, properties.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitPropertyDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitPropertyDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.modifiers;
      case 1:
        return this.type;
      case 2:
        return this.properties;
      case 3:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): PropertyDeclarationSyntaxNode {
    return new PropertyDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = PropertyDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): PropertyDeclarationNode {
    return new PropertyDeclarationNode(this.modifiers, this.type, this.properties, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8818);
    hash = Hash.combine(this.modifiers.hashCode(), hash);
    hash = this.type !== null ? Hash.combine(this.type.hashCode(), hash) : hash;
    hash = Hash.combine(this.properties.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ReferencedTraitAliasNode extends TraitAliasNode {

  public readonly reference: MethodReferenceNode;
  public readonly asKeyword: TokenNode;
  public readonly modifier: TokenNode | null;
  public readonly alias: TokenNode | null;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(reference: MethodReferenceNode, asKeyword: TokenNode, modifier: TokenNode | null, alias: TokenNode | null, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.reference = reference;
    this.asKeyword = asKeyword;
    this.modifier = modifier;
    this.alias = alias;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(reference.flags, reference.fullWidth);
    this.updateFlagsAndWidth(asKeyword.flags, asKeyword.fullWidth);
    if (modifier !== null) {
      this.updateFlagsAndWidth(modifier.flags, modifier.fullWidth);
    }
    if (alias !== null) {
      this.updateFlagsAndWidth(alias.flags, alias.fullWidth);
    }
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitTraitAlias(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitTraitAlias(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.reference;
      case 1:
        return this.asKeyword;
      case 2:
        return this.modifier;
      case 3:
        return this.alias;
      case 4:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ReferencedTraitAliasSyntaxNode {
    return new ReferencedTraitAliasSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ReferencedTraitAliasNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ReferencedTraitAliasNode {
    return new ReferencedTraitAliasNode(this.reference, this.asKeyword, this.modifier, this.alias, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8819);
    hash = Hash.combine(this.reference.hashCode(), hash);
    hash = Hash.combine(this.asKeyword.hashCode(), hash);
    hash = this.modifier !== null ? Hash.combine(this.modifier.hashCode(), hash) : hash;
    hash = this.alias !== null ? Hash.combine(this.alias.hashCode(), hash) : hash;
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class RelativeNameNode extends NameNode {

  public readonly namespaceKeyword: TokenNode;
  public readonly leadingBackslash: TokenNode;
  public readonly namespaceName: NodeList;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(namespaceKeyword: TokenNode, leadingBackslash: TokenNode, namespaceName: NodeList, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.namespaceKeyword = namespaceKeyword;
    this.leadingBackslash = leadingBackslash;
    this.namespaceName = namespaceName;

    this.updateFlagsAndWidth(namespaceKeyword.flags, namespaceKeyword.fullWidth);
    this.updateFlagsAndWidth(leadingBackslash.flags, leadingBackslash.fullWidth);
    this.updateFlagsAndWidth(namespaceName.flags, namespaceName.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitRelativeName(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitRelativeName(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.namespaceKeyword;
      case 1:
        return this.leadingBackslash;
      case 2:
        return this.namespaceName;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): RelativeNameSyntaxNode {
    return new RelativeNameSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = RelativeNameNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): RelativeNameNode {
    return new RelativeNameNode(this.namespaceKeyword, this.leadingBackslash, this.namespaceName, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8820);
    hash = Hash.combine(this.namespaceKeyword.hashCode(), hash);
    hash = Hash.combine(this.leadingBackslash.hashCode(), hash);
    hash = Hash.combine(this.namespaceName.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ReturnNode extends JumpNode {

  public readonly returnKeyword: TokenNode;
  public readonly expression: ExpressionNode | null;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(returnKeyword: TokenNode, expression: ExpressionNode | null, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.returnKeyword = returnKeyword;
    this.expression = expression;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(returnKeyword.flags, returnKeyword.fullWidth);
    if (expression !== null) {
      this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    }
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitReturn(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitReturn(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.returnKeyword;
      case 1:
        return this.expression;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ReturnSyntaxNode {
    return new ReturnSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ReturnNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ReturnNode {
    return new ReturnNode(this.returnKeyword, this.expression, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8821);
    hash = Hash.combine(this.returnKeyword.hashCode(), hash);
    hash = this.expression !== null ? Hash.combine(this.expression.hashCode(), hash) : hash;
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ScriptInclusionNode extends IntrinsicNode {

  public readonly inclusionKeyword: TokenNode;
  public readonly expression: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(inclusionKeyword: TokenNode, expression: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.inclusionKeyword = inclusionKeyword;
    this.expression = expression;

    this.updateFlagsAndWidth(inclusionKeyword.flags, inclusionKeyword.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitScriptInclusion(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitScriptInclusion(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.inclusionKeyword;
      case 1:
        return this.expression;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ScriptInclusionSyntaxNode {
    return new ScriptInclusionSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ScriptInclusionNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ScriptInclusionNode {
    return new ScriptInclusionNode(this.inclusionKeyword, this.expression, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8822);
    hash = Hash.combine(this.inclusionKeyword.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ShellCommandTemplateNode extends ExpressionNode {

  public readonly openBackQuote: TokenNode;
  public readonly template: NodeList | null;
  public readonly closeBackQuote: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(openBackQuote: TokenNode, template: NodeList | null, closeBackQuote: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.openBackQuote = openBackQuote;
    this.template = template;
    this.closeBackQuote = closeBackQuote;

    this.updateFlagsAndWidth(openBackQuote.flags, openBackQuote.fullWidth);
    if (template !== null) {
      this.updateFlagsAndWidth(template.flags, template.fullWidth);
    }
    this.updateFlagsAndWidth(closeBackQuote.flags, closeBackQuote.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitShellCommandTemplate(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitShellCommandTemplate(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.openBackQuote;
      case 1:
        return this.template;
      case 2:
        return this.closeBackQuote;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ShellCommandTemplateSyntaxNode {
    return new ShellCommandTemplateSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ShellCommandTemplateNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ShellCommandTemplateNode {
    return new ShellCommandTemplateNode(this.openBackQuote, this.template, this.closeBackQuote, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8823);
    hash = Hash.combine(this.openBackQuote.hashCode(), hash);
    hash = this.template !== null ? Hash.combine(this.template.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeBackQuote.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class StatementBlockNode extends StatementNode {

  public readonly openBrace: TokenNode;
  public readonly statements: NodeList | null;
  public readonly closeBrace: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(openBrace: TokenNode, statements: NodeList | null, closeBrace: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.openBrace = openBrace;
    this.statements = statements;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitStatementBlock(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitStatementBlock(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.openBrace;
      case 1:
        return this.statements;
      case 2:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): StatementBlockSyntaxNode {
    return new StatementBlockSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = StatementBlockNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): StatementBlockNode {
    return new StatementBlockNode(this.openBrace, this.statements, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8824);
    hash = Hash.combine(this.openBrace.hashCode(), hash);
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class StaticNode extends StatementNode {

  public readonly staticKeyword: TokenNode;
  public readonly variables: NodeList;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(staticKeyword: TokenNode, variables: NodeList, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.staticKeyword = staticKeyword;
    this.variables = variables;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(staticKeyword.flags, staticKeyword.fullWidth);
    this.updateFlagsAndWidth(variables.flags, variables.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitStaticDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitStaticDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.staticKeyword;
      case 1:
        return this.variables;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): StaticSyntaxNode {
    return new StaticSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = StaticNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): StaticNode {
    return new StaticNode(this.staticKeyword, this.variables, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8825);
    hash = Hash.combine(this.staticKeyword.hashCode(), hash);
    hash = Hash.combine(this.variables.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class StaticPropertyNode extends ScopedAccessNode {

  public readonly qualifier: ExpressionNode | NameNode;
  public readonly doubleColon: TokenNode;
  public readonly member: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(qualifier: ExpressionNode | NameNode, doubleColon: TokenNode, member: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.qualifier = qualifier;
    this.doubleColon = doubleColon;
    this.member = member;

    this.updateFlagsAndWidth(qualifier.flags, qualifier.fullWidth);
    this.updateFlagsAndWidth(doubleColon.flags, doubleColon.fullWidth);
    this.updateFlagsAndWidth(member.flags, member.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitStaticProperty(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitStaticProperty(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.qualifier;
      case 1:
        return this.doubleColon;
      case 2:
        return this.member;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): StaticPropertySyntaxNode {
    return new StaticPropertySyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = StaticPropertyNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): StaticPropertyNode {
    return new StaticPropertyNode(this.qualifier, this.doubleColon, this.member, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8826);
    hash = Hash.combine(this.qualifier.hashCode(), hash);
    hash = Hash.combine(this.doubleColon.hashCode(), hash);
    hash = Hash.combine(this.member.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class StringElementAccessNode extends ExpressionNode {

  public readonly variable: TokenNode;
  public readonly openBracket: TokenNode;
  public readonly minus: TokenNode | null;
  public readonly index: TokenNode;
  public readonly closeBracket: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(variable: TokenNode, openBracket: TokenNode, minus: TokenNode | null, index: TokenNode, closeBracket: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.variable = variable;
    this.openBracket = openBracket;
    this.minus = minus;
    this.index = index;
    this.closeBracket = closeBracket;

    this.updateFlagsAndWidth(variable.flags, variable.fullWidth);
    this.updateFlagsAndWidth(openBracket.flags, openBracket.fullWidth);
    if (minus !== null) {
      this.updateFlagsAndWidth(minus.flags, minus.fullWidth);
    }
    this.updateFlagsAndWidth(index.flags, index.fullWidth);
    this.updateFlagsAndWidth(closeBracket.flags, closeBracket.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitStringElementAccess(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitStringElementAccess(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.variable;
      case 1:
        return this.openBracket;
      case 2:
        return this.minus;
      case 3:
        return this.index;
      case 4:
        return this.closeBracket;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): StringElementAccessSyntaxNode {
    return new StringElementAccessSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = StringElementAccessNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): StringElementAccessNode {
    return new StringElementAccessNode(this.variable, this.openBracket, this.minus, this.index, this.closeBracket, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8827);
    hash = Hash.combine(this.variable.hashCode(), hash);
    hash = Hash.combine(this.openBracket.hashCode(), hash);
    hash = this.minus !== null ? Hash.combine(this.minus.hashCode(), hash) : hash;
    hash = Hash.combine(this.index.hashCode(), hash);
    hash = Hash.combine(this.closeBracket.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class StringExpressionNode extends ExpressionNode {

  public readonly openBrace: TokenNode;
  public readonly expression: ExpressionNode;
  public readonly closeBrace: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(openBrace: TokenNode, expression: ExpressionNode, closeBrace: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.openBrace = openBrace;
    this.expression = expression;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitStringExpression(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitStringExpression(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.openBrace;
      case 1:
        return this.expression;
      case 2:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): StringExpressionSyntaxNode {
    return new StringExpressionSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = StringExpressionNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): StringExpressionNode {
    return new StringExpressionNode(this.openBrace, this.expression, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8828);
    hash = Hash.combine(this.openBrace.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class StringTemplateNode extends ExpressionNode {

  public readonly openQuote: TokenNode;
  public readonly template: NodeList;
  public readonly closeQuote: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(openQuote: TokenNode, template: NodeList, closeQuote: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.openQuote = openQuote;
    this.template = template;
    this.closeQuote = closeQuote;

    this.updateFlagsAndWidth(openQuote.flags, openQuote.fullWidth);
    this.updateFlagsAndWidth(template.flags, template.fullWidth);
    this.updateFlagsAndWidth(closeQuote.flags, closeQuote.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitStringTemplate(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitStringTemplate(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.openQuote;
      case 1:
        return this.template;
      case 2:
        return this.closeQuote;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): StringTemplateSyntaxNode {
    return new StringTemplateSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = StringTemplateNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): StringTemplateNode {
    return new StringTemplateNode(this.openQuote, this.template, this.closeQuote, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8829);
    hash = Hash.combine(this.openQuote.hashCode(), hash);
    hash = Hash.combine(this.template.hashCode(), hash);
    hash = Hash.combine(this.closeQuote.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class StringVariableNode extends VariableNode {

  public readonly identifier: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(identifier: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.identifier = identifier;

    this.updateFlagsAndWidth(identifier.flags, identifier.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 1;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitStringVariable(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitStringVariable(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.identifier;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): StringVariableSyntaxNode {
    return new StringVariableSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = StringVariableNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): StringVariableNode {
    return new StringVariableNode(this.identifier, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8830);
    hash = Hash.combine(this.identifier.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class SwitchNode extends SelectionNode {

  public readonly switchKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly expression: ExpressionNode;
  public readonly closeParen: TokenNode;
  public readonly openBrace: TokenNode;
  public readonly caseSemicolon: TokenNode | null;
  public readonly caseClauses: NodeList | null;
  public readonly closeBrace: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(switchKeyword: TokenNode, openParen: TokenNode, expression: ExpressionNode, closeParen: TokenNode, openBrace: TokenNode, caseSemicolon: TokenNode | null, caseClauses: NodeList | null, closeBrace: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.switchKeyword = switchKeyword;
    this.openParen = openParen;
    this.expression = expression;
    this.closeParen = closeParen;
    this.openBrace = openBrace;
    this.caseSemicolon = caseSemicolon;
    this.caseClauses = caseClauses;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(switchKeyword.flags, switchKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    if (caseSemicolon !== null) {
      this.updateFlagsAndWidth(caseSemicolon.flags, caseSemicolon.fullWidth);
    }
    if (caseClauses !== null) {
      this.updateFlagsAndWidth(caseClauses.flags, caseClauses.fullWidth);
    }
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 8;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitSwitch(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitSwitch(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.switchKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.expression;
      case 3:
        return this.closeParen;
      case 4:
        return this.openBrace;
      case 5:
        return this.caseSemicolon;
      case 6:
        return this.caseClauses;
      case 7:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): SwitchSyntaxNode {
    return new SwitchSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = SwitchNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): SwitchNode {
    return new SwitchNode(this.switchKeyword, this.openParen, this.expression, this.closeParen, this.openBrace, this.caseSemicolon, this.caseClauses, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8831);
    hash = Hash.combine(this.switchKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.openBrace.hashCode(), hash);
    hash = this.caseSemicolon !== null ? Hash.combine(this.caseSemicolon.hashCode(), hash) : hash;
    hash = this.caseClauses !== null ? Hash.combine(this.caseClauses.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class SwitchBlockNode extends SelectionNode {

  public readonly switchKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly expression: ExpressionNode;
  public readonly closeParen: TokenNode;
  public readonly colon: TokenNode;
  public readonly caseSemicolon: TokenNode | null;
  public readonly caseClauses: NodeList | null;
  public readonly endSwitch: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(switchKeyword: TokenNode, openParen: TokenNode, expression: ExpressionNode, closeParen: TokenNode, colon: TokenNode, caseSemicolon: TokenNode | null, caseClauses: NodeList | null, endSwitch: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.switchKeyword = switchKeyword;
    this.openParen = openParen;
    this.expression = expression;
    this.closeParen = closeParen;
    this.colon = colon;
    this.caseSemicolon = caseSemicolon;
    this.caseClauses = caseClauses;
    this.endSwitch = endSwitch;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(switchKeyword.flags, switchKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    if (caseSemicolon !== null) {
      this.updateFlagsAndWidth(caseSemicolon.flags, caseSemicolon.fullWidth);
    }
    if (caseClauses !== null) {
      this.updateFlagsAndWidth(caseClauses.flags, caseClauses.fullWidth);
    }
    this.updateFlagsAndWidth(endSwitch.flags, endSwitch.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 9;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitSwitchBlock(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitSwitchBlock(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.switchKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.expression;
      case 3:
        return this.closeParen;
      case 4:
        return this.colon;
      case 5:
        return this.caseSemicolon;
      case 6:
        return this.caseClauses;
      case 7:
        return this.endSwitch;
      case 8:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): SwitchBlockSyntaxNode {
    return new SwitchBlockSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = SwitchBlockNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): SwitchBlockNode {
    return new SwitchBlockNode(this.switchKeyword, this.openParen, this.expression, this.closeParen, this.colon, this.caseSemicolon, this.caseClauses, this.endSwitch, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8832);
    hash = Hash.combine(this.switchKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.colon.hashCode(), hash);
    hash = this.caseSemicolon !== null ? Hash.combine(this.caseSemicolon.hashCode(), hash) : hash;
    hash = this.caseClauses !== null ? Hash.combine(this.caseClauses.hashCode(), hash) : hash;
    hash = Hash.combine(this.endSwitch.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class ThrowNode extends StatementNode {

  public readonly throwKeyword: TokenNode;
  public readonly expression: ExpressionNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(throwKeyword: TokenNode, expression: ExpressionNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.throwKeyword = throwKeyword;
    this.expression = expression;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(throwKeyword.flags, throwKeyword.fullWidth);
    this.updateFlagsAndWidth(expression.flags, expression.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitThrow(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitThrow(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.throwKeyword;
      case 1:
        return this.expression;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): ThrowSyntaxNode {
    return new ThrowSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = ThrowNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): ThrowNode {
    return new ThrowNode(this.throwKeyword, this.expression, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8833);
    hash = Hash.combine(this.throwKeyword.hashCode(), hash);
    hash = Hash.combine(this.expression.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class TraitDeclarationNode extends TypeDeclarationNode {

  public readonly traitKeyword: TokenNode;
  public readonly identifier: TokenNode;
  public readonly openBrace: TokenNode;
  public readonly members: NodeList | null;
  public readonly closeBrace: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(traitKeyword: TokenNode, identifier: TokenNode, openBrace: TokenNode, members: NodeList | null, closeBrace: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.traitKeyword = traitKeyword;
    this.identifier = identifier;
    this.openBrace = openBrace;
    this.members = members;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(traitKeyword.flags, traitKeyword.fullWidth);
    this.updateFlagsAndWidth(identifier.flags, identifier.fullWidth);
    this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    if (members !== null) {
      this.updateFlagsAndWidth(members.flags, members.fullWidth);
    }
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitTraitDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitTraitDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.traitKeyword;
      case 1:
        return this.identifier;
      case 2:
        return this.openBrace;
      case 3:
        return this.members;
      case 4:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): TraitDeclarationSyntaxNode {
    return new TraitDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = TraitDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TraitDeclarationNode {
    return new TraitDeclarationNode(this.traitKeyword, this.identifier, this.openBrace, this.members, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8834);
    hash = Hash.combine(this.traitKeyword.hashCode(), hash);
    hash = Hash.combine(this.identifier.hashCode(), hash);
    hash = Hash.combine(this.openBrace.hashCode(), hash);
    hash = this.members !== null ? Hash.combine(this.members.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class TraitUseNode extends StatementNode {

  public readonly useKeyword: TokenNode;
  public readonly traitNames: NodeList;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(useKeyword: TokenNode, traitNames: NodeList, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.useKeyword = useKeyword;
    this.traitNames = traitNames;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(useKeyword.flags, useKeyword.fullWidth);
    this.updateFlagsAndWidth(traitNames.flags, traitNames.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 3;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitTraitUse(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitTraitUse(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.useKeyword;
      case 1:
        return this.traitNames;
      case 2:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): TraitUseSyntaxNode {
    return new TraitUseSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = TraitUseNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TraitUseNode {
    return new TraitUseNode(this.useKeyword, this.traitNames, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8835);
    hash = Hash.combine(this.useKeyword.hashCode(), hash);
    hash = Hash.combine(this.traitNames.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class TraitUseGroupNode extends StatementNode {

  public readonly useKeyword: TokenNode;
  public readonly traitNames: NodeList;
  public readonly openBrace: TokenNode;
  public readonly adaptations: NodeList | null;
  public readonly closeBrace: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(useKeyword: TokenNode, traitNames: NodeList, openBrace: TokenNode, adaptations: NodeList | null, closeBrace: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.useKeyword = useKeyword;
    this.traitNames = traitNames;
    this.openBrace = openBrace;
    this.adaptations = adaptations;
    this.closeBrace = closeBrace;

    this.updateFlagsAndWidth(useKeyword.flags, useKeyword.fullWidth);
    this.updateFlagsAndWidth(traitNames.flags, traitNames.fullWidth);
    this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    if (adaptations !== null) {
      this.updateFlagsAndWidth(adaptations.flags, adaptations.fullWidth);
    }
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitTraitUseGroup(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitTraitUseGroup(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.useKeyword;
      case 1:
        return this.traitNames;
      case 2:
        return this.openBrace;
      case 3:
        return this.adaptations;
      case 4:
        return this.closeBrace;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): TraitUseGroupSyntaxNode {
    return new TraitUseGroupSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = TraitUseGroupNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TraitUseGroupNode {
    return new TraitUseGroupNode(this.useKeyword, this.traitNames, this.openBrace, this.adaptations, this.closeBrace, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8836);
    hash = Hash.combine(this.useKeyword.hashCode(), hash);
    hash = Hash.combine(this.traitNames.hashCode(), hash);
    hash = Hash.combine(this.openBrace.hashCode(), hash);
    hash = this.adaptations !== null ? Hash.combine(this.adaptations.hashCode(), hash) : hash;
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class TryNode extends StatementNode {

  public readonly tryKeyword: TokenNode;
  public readonly statements: StatementBlockNode;
  public readonly catchClauses: NodeList | null;
  public readonly finallyClause: TryFinallyNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(tryKeyword: TokenNode, statements: StatementBlockNode, catchClauses: NodeList | null, finallyClause: TryFinallyNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.tryKeyword = tryKeyword;
    this.statements = statements;
    this.catchClauses = catchClauses;
    this.finallyClause = finallyClause;

    this.updateFlagsAndWidth(tryKeyword.flags, tryKeyword.fullWidth);
    this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    if (catchClauses !== null) {
      this.updateFlagsAndWidth(catchClauses.flags, catchClauses.fullWidth);
    }
    if (finallyClause !== null) {
      this.updateFlagsAndWidth(finallyClause.flags, finallyClause.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitTry(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitTry(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.tryKeyword;
      case 1:
        return this.statements;
      case 2:
        return this.catchClauses;
      case 3:
        return this.finallyClause;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): TrySyntaxNode {
    return new TrySyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = TryNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): TryNode {
    return new TryNode(this.tryKeyword, this.statements, this.catchClauses, this.finallyClause, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8837);
    hash = Hash.combine(this.tryKeyword.hashCode(), hash);
    hash = Hash.combine(this.statements.hashCode(), hash);
    hash = this.catchClauses !== null ? Hash.combine(this.catchClauses.hashCode(), hash) : hash;
    hash = this.finallyClause !== null ? Hash.combine(this.finallyClause.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class UnaryNode extends ExpressionNode {

  public readonly operator: TokenNode;
  public readonly operand: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(operator: TokenNode, operand: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.operator = operator;
    this.operand = operand;

    this.updateFlagsAndWidth(operator.flags, operator.fullWidth);
    this.updateFlagsAndWidth(operand.flags, operand.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitUnaryExpression(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitUnaryExpression(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.operator;
      case 1:
        return this.operand;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): UnarySyntaxNode {
    return new UnarySyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = UnaryNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): UnaryNode {
    return new UnaryNode(this.operator, this.operand, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8838);
    hash = Hash.combine(this.operator.hashCode(), hash);
    hash = Hash.combine(this.operand.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class UnsetNode extends StatementNode {

  public readonly unsetKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly expressionList: NodeList;
  public readonly closeParen: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(unsetKeyword: TokenNode, openParen: TokenNode, expressionList: NodeList, closeParen: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.unsetKeyword = unsetKeyword;
    this.openParen = openParen;
    this.expressionList = expressionList;
    this.closeParen = closeParen;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(unsetKeyword.flags, unsetKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(expressionList.flags, expressionList.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitUnset(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitUnset(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.unsetKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.expressionList;
      case 3:
        return this.closeParen;
      case 4:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): UnsetSyntaxNode {
    return new UnsetSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = UnsetNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): UnsetNode {
    return new UnsetNode(this.unsetKeyword, this.openParen, this.expressionList, this.closeParen, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8839);
    hash = Hash.combine(this.unsetKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.expressionList.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class UseDeclarationNode extends StatementNode {

  public readonly useKeyword: TokenNode;
  public readonly useType: TokenNode | null;
  public readonly declarations: NodeList;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(useKeyword: TokenNode, useType: TokenNode | null, declarations: NodeList, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.useKeyword = useKeyword;
    this.useType = useType;
    this.declarations = declarations;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(useKeyword.flags, useKeyword.fullWidth);
    if (useType !== null) {
      this.updateFlagsAndWidth(useType.flags, useType.fullWidth);
    }
    this.updateFlagsAndWidth(declarations.flags, declarations.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitUseDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitUseDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.useKeyword;
      case 1:
        return this.useType;
      case 2:
        return this.declarations;
      case 3:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): UseDeclarationSyntaxNode {
    return new UseDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = UseDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): UseDeclarationNode {
    return new UseDeclarationNode(this.useKeyword, this.useType, this.declarations, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8840);
    hash = Hash.combine(this.useKeyword.hashCode(), hash);
    hash = this.useType !== null ? Hash.combine(this.useType.hashCode(), hash) : hash;
    hash = Hash.combine(this.declarations.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class UseGroupDeclarationNode extends StatementNode {

  public readonly useKeyword: TokenNode;
  public readonly useType: TokenNode | null;
  public readonly rootName: NodeList;
  public readonly openBrace: TokenNode;
  public readonly declarations: NodeList;
  public readonly closeBrace: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(useKeyword: TokenNode, useType: TokenNode | null, rootName: NodeList, openBrace: TokenNode, declarations: NodeList, closeBrace: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.useKeyword = useKeyword;
    this.useType = useType;
    this.rootName = rootName;
    this.openBrace = openBrace;
    this.declarations = declarations;
    this.closeBrace = closeBrace;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(useKeyword.flags, useKeyword.fullWidth);
    if (useType !== null) {
      this.updateFlagsAndWidth(useType.flags, useType.fullWidth);
    }
    this.updateFlagsAndWidth(rootName.flags, rootName.fullWidth);
    this.updateFlagsAndWidth(openBrace.flags, openBrace.fullWidth);
    this.updateFlagsAndWidth(declarations.flags, declarations.fullWidth);
    this.updateFlagsAndWidth(closeBrace.flags, closeBrace.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 7;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitUseGroupDeclaration(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitUseGroupDeclaration(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.useKeyword;
      case 1:
        return this.useType;
      case 2:
        return this.rootName;
      case 3:
        return this.openBrace;
      case 4:
        return this.declarations;
      case 5:
        return this.closeBrace;
      case 6:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): UseGroupDeclarationSyntaxNode {
    return new UseGroupDeclarationSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = UseGroupDeclarationNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): UseGroupDeclarationNode {
    return new UseGroupDeclarationNode(this.useKeyword, this.useType, this.rootName, this.openBrace, this.declarations, this.closeBrace, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8841);
    hash = Hash.combine(this.useKeyword.hashCode(), hash);
    hash = this.useType !== null ? Hash.combine(this.useType.hashCode(), hash) : hash;
    hash = Hash.combine(this.rootName.hashCode(), hash);
    hash = Hash.combine(this.openBrace.hashCode(), hash);
    hash = Hash.combine(this.declarations.hashCode(), hash);
    hash = Hash.combine(this.closeBrace.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class WhileNode extends IterationNode {

  public readonly whileKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly condition: ExpressionNode;
  public readonly closeParen: TokenNode;
  public readonly statement: StatementNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(whileKeyword: TokenNode, openParen: TokenNode, condition: ExpressionNode, closeParen: TokenNode, statement: StatementNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.whileKeyword = whileKeyword;
    this.openParen = openParen;
    this.condition = condition;
    this.closeParen = closeParen;
    this.statement = statement;

    this.updateFlagsAndWidth(whileKeyword.flags, whileKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(condition.flags, condition.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(statement.flags, statement.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 5;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitWhile(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitWhile(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.whileKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.condition;
      case 3:
        return this.closeParen;
      case 4:
        return this.statement;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): WhileSyntaxNode {
    return new WhileSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = WhileNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): WhileNode {
    return new WhileNode(this.whileKeyword, this.openParen, this.condition, this.closeParen, this.statement, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8842);
    hash = Hash.combine(this.whileKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.condition.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.statement.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class WhileBlockNode extends IterationNode {

  public readonly whileKeyword: TokenNode;
  public readonly openParen: TokenNode;
  public readonly condition: ExpressionNode;
  public readonly closeParen: TokenNode;
  public readonly colon: TokenNode;
  public readonly statements: NodeList | null;
  public readonly endWhileKeyword: TokenNode;
  public readonly semicolon: TokenNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(whileKeyword: TokenNode, openParen: TokenNode, condition: ExpressionNode, closeParen: TokenNode, colon: TokenNode, statements: NodeList | null, endWhileKeyword: TokenNode, semicolon: TokenNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.whileKeyword = whileKeyword;
    this.openParen = openParen;
    this.condition = condition;
    this.closeParen = closeParen;
    this.colon = colon;
    this.statements = statements;
    this.endWhileKeyword = endWhileKeyword;
    this.semicolon = semicolon;

    this.updateFlagsAndWidth(whileKeyword.flags, whileKeyword.fullWidth);
    this.updateFlagsAndWidth(openParen.flags, openParen.fullWidth);
    this.updateFlagsAndWidth(condition.flags, condition.fullWidth);
    this.updateFlagsAndWidth(closeParen.flags, closeParen.fullWidth);
    this.updateFlagsAndWidth(colon.flags, colon.fullWidth);
    if (statements !== null) {
      this.updateFlagsAndWidth(statements.flags, statements.fullWidth);
    }
    this.updateFlagsAndWidth(endWhileKeyword.flags, endWhileKeyword.fullWidth);
    this.updateFlagsAndWidth(semicolon.flags, semicolon.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 8;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitWhileBlock(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitWhileBlock(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.whileKeyword;
      case 1:
        return this.openParen;
      case 2:
        return this.condition;
      case 3:
        return this.closeParen;
      case 4:
        return this.colon;
      case 5:
        return this.statements;
      case 6:
        return this.endWhileKeyword;
      case 7:
        return this.semicolon;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): WhileBlockSyntaxNode {
    return new WhileBlockSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = WhileBlockNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): WhileBlockNode {
    return new WhileBlockNode(this.whileKeyword, this.openParen, this.condition, this.closeParen, this.colon, this.statements, this.endWhileKeyword, this.semicolon, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8843);
    hash = Hash.combine(this.whileKeyword.hashCode(), hash);
    hash = Hash.combine(this.openParen.hashCode(), hash);
    hash = Hash.combine(this.condition.hashCode(), hash);
    hash = Hash.combine(this.closeParen.hashCode(), hash);
    hash = Hash.combine(this.colon.hashCode(), hash);
    hash = this.statements !== null ? Hash.combine(this.statements.hashCode(), hash) : hash;
    hash = Hash.combine(this.endWhileKeyword.hashCode(), hash);
    hash = Hash.combine(this.semicolon.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class YieldNode extends ExpressionNode {

  public readonly yieldKeyword: TokenNode;
  public readonly key: ExpressionNode | null;
  public readonly doubleArrow: TokenNode | null;
  public readonly value: ExpressionNode | null;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(yieldKeyword: TokenNode, key: ExpressionNode | null, doubleArrow: TokenNode | null, value: ExpressionNode | null, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.yieldKeyword = yieldKeyword;
    this.key = key;
    this.doubleArrow = doubleArrow;
    this.value = value;

    this.updateFlagsAndWidth(yieldKeyword.flags, yieldKeyword.fullWidth);
    if (key !== null) {
      this.updateFlagsAndWidth(key.flags, key.fullWidth);
    }
    if (doubleArrow !== null) {
      this.updateFlagsAndWidth(doubleArrow.flags, doubleArrow.fullWidth);
    }
    if (value !== null) {
      this.updateFlagsAndWidth(value.flags, value.fullWidth);
    }

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 4;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitYield(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitYield(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.yieldKeyword;
      case 1:
        return this.key;
      case 2:
        return this.doubleArrow;
      case 3:
        return this.value;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): YieldSyntaxNode {
    return new YieldSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = YieldNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): YieldNode {
    return new YieldNode(this.yieldKeyword, this.key, this.doubleArrow, this.value, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8844);
    hash = Hash.combine(this.yieldKeyword.hashCode(), hash);
    hash = this.key !== null ? Hash.combine(this.key.hashCode(), hash) : hash;
    hash = this.doubleArrow !== null ? Hash.combine(this.doubleArrow.hashCode(), hash) : hash;
    hash = this.value !== null ? Hash.combine(this.value.hashCode(), hash) : hash;
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
export class YieldFromNode extends ExpressionNode {

  public readonly yieldFromKeyword: TokenNode;
  public readonly delegate: ExpressionNode;

  protected _flags: NodeFlags;
  protected _fullWidth: number;
  protected hash: number;

  constructor(yieldFromKeyword: TokenNode, delegate: ExpressionNode, diagnostics?: ReadonlyArray<SyntaxDiagnostic>) {
    super(diagnostics || Node.EmptyDiagnosticList);
    this._flags = NodeFlags.None;
    this._fullWidth = 0;
    this.hash = 0;

    this.yieldFromKeyword = yieldFromKeyword;
    this.delegate = delegate;

    this.updateFlagsAndWidth(yieldFromKeyword.flags, yieldFromKeyword.fullWidth);
    this.updateFlagsAndWidth(delegate.flags, delegate.fullWidth);

    if (diagnostics !== void 0 && diagnostics.length > 0) {
      this._flags = this._flags | NodeFlags.ContainsDiagnostics;
    }
  }

  public get count(): number {
    return 2;
  }

  public get flags(): number {
    return this._flags;
  }

  public get fullWidth(): number {
    return this._fullWidth;
  }

  public accept(visitor: NodeVisitor): void {
    visitor.visitYieldFrom(this);
  }

  public acceptResult<T>(visitor: NodeTransform<T>): T {
    return visitor.visitYieldFrom(this);
  }

  public childAt(index: number): INode | null {
    switch (index) {
      case 0:
        return this.yieldFromKeyword;
      case 1:
        return this.delegate;
      default:
        return null;
    }
  }

  public createSyntaxNode(parent: SyntaxNode, offset: number): YieldFromSyntaxNode {
    return new YieldFromSyntaxNode(this, parent, offset);
  }

  public hashCode(): number {
    if (this.hash === 0) {
      this.hash = YieldFromNode.prototype.computeHashCode.call(this);
    }
    return this.hash;
  }

  public withDiagnostics(diagnostics: ReadonlyArray<SyntaxDiagnostic>): YieldFromNode {
    return new YieldFromNode(this.yieldFromKeyword, this.delegate, diagnostics);
  }

  protected computeHashCode(): number {
    let hash = Hash.combine(this._fullWidth, this._flags ^ 8845);
    hash = Hash.combine(this.yieldFromKeyword.hashCode(), hash);
    hash = Hash.combine(this.delegate.hashCode(), hash);
    return hash;
  }

  protected updateFlagsAndWidth(flags: NodeFlags, fullWidth: number): void {
    this._flags = this._flags | (flags & NodeFlags.InheritMask);
    this._fullWidth = this._fullWidth + fullWidth;
  }

}
