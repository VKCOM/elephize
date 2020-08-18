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

import { InvalidOperationException } from '@mattacosta/php-common';
import {
  AnonymousClassNode,
  AnonymousFunctionNode,
  AnonymousObjectCreationNode,
  ArgumentNode,
  ArrayNode,
  ArrayElementNode,
  ArrowFunctionNode,
  AssignmentNode,
  BinaryNode,
  BreakNode,
  ClassConstantNode,
  ClassConstantDeclarationNode,
  ClassConstantElementNode,
  ClassDeclarationNode,
  CloneNode,
  ClosureUseNode,
  ConditionalNode,
  ConstantNode,
  ConstantDeclarationNode,
  ConstantElementNode,
  ContinueNode,
  DeclareNode,
  DeclareBlockNode,
  DestructuringAssignmentNode,
  DoWhileNode,
  EchoNode,
  ElementAccessNode,
  ElseNode,
  ElseBlockNode,
  ElseIfNode,
  ElseIfBlockNode,
  EmptyIntrinsicNode,
  ErrorControlNode,
  EvalIntrinsicNode,
  ExitIntrinsicNode,
  ExpressionGroupNode,
  ExpressionStatementNode,
  FlexibleHeredocElementNode,
  FlexibleHeredocTemplateNode,
  ForNode,
  ForBlockNode,
  ForEachNode,
  ForEachBlockNode,
  FullyQualifiedNameNode,
  FunctionDeclarationNode,
  FunctionInvocationNode,
  GlobalNode,
  GoToNode,
  HaltCompilerNode,
  HeredocTemplateNode,
  IfNode,
  IfBlockNode,
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
  InvocationNode,
  IsSetIntrinsicNode,
  LabelNode,
  LexicalVariableNode,
  ListDestructureNode,
  ListDestructureElementNode,
  LiteralNode,
  LocalVariableNode,
  MemberAccessNode,
  MemberInvocationNode,
  MethodDeclarationNode,
  MethodReferenceNode,
  NameNode,
  NamedMemberAccessNode,
  NamedMethodInvocationNode,
  NamedObjectCreationNode,
  NamedScopedInvocationNode,
  NamedTraitAliasNode,
  NamedTypeNode,
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
  ScopedAccessNode,
  ScopedInvocationNode,
  ScriptInclusionNode,
  ShellCommandTemplateNode,
  StatementBlockNode,
  StaticNode,
  StaticElementNode,
  StaticPropertyNode,
  StringElementAccessNode,
  StringExpressionNode,
  StringTemplateNode,
  StringVariableNode,
  SwitchNode,
  SwitchBlockNode,
  SwitchCaseNode,
  ThrowNode,
  TraitAliasNode,
  TraitDeclarationNode,
  TraitPrecedenceNode,
  TraitUseNode,
  TraitUseGroupNode,
  TryNode,
  TryCatchNode,
  TryFinallyNode,
  TypeNode,
  TypeDeclarationNode,
  UnaryNode,
  UnsetNode,
  UseDeclarationNode,
  UseElementNode,
  UseGroupDeclarationNode,
  WhileNode,
  WhileBlockNode,
  YieldNode,
  YieldFromNode,
} from '../node/Node.Generated';
import { INode } from '../node/INode';
import { ISyntaxNode } from './ISyntaxNode';
import { SyntaxList } from './SyntaxList';
import { SyntaxNode } from './SyntaxNode';
import { SyntaxNodeBase } from './SyntaxNodeBase';
import { SyntaxToken } from './SyntaxToken';
import { SyntaxTransform } from './SyntaxTransform.Generated';
import { SyntaxVisitor } from './SyntaxVisitor.Generated';

export abstract class ExpressionSyntaxNode extends SyntaxNode {

}
export abstract class NameSyntaxNode extends SyntaxNode {

  public abstract readonly namespaceName: SyntaxList;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

}
export abstract class StatementSyntaxNode extends SyntaxNode {

}
export abstract class TraitAliasSyntaxNode extends SyntaxNode {

  public abstract readonly asKeyword: SyntaxToken;
  public abstract readonly modifier: SyntaxToken | null;
  public abstract readonly alias: SyntaxToken | null;
  public abstract readonly semicolon: SyntaxToken;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

}
export abstract class TypeSyntaxNode extends SyntaxNode {

  public abstract readonly question: SyntaxToken | null;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

}
export class AnonymousClassSyntaxNode extends SyntaxNode {

  protected _argumentList?: SyntaxList | null = undefined;
  protected _baseType?: NameSyntaxNode | null = undefined;
  protected _interfaces?: SyntaxList | null = undefined;
  protected _members?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get classKeyword(): SyntaxToken {
    return new SyntaxToken((<AnonymousClassNode>this.node).classKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken | null {
    let token = (<AnonymousClassNode>this.node).openParen;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get argumentList(): SyntaxList | null {
    if (this._argumentList === void 0) {
      this._argumentList = this.createChildNode<SyntaxList>(2);
    }
    return this._argumentList;
  }
  public get closeParen(): SyntaxToken | null {
    let token = (<AnonymousClassNode>this.node).closeParen;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(3), this.relativeIndexAt(3));
    }
    return null;
  }
  public get extendsKeyword(): SyntaxToken | null {
    let token = (<AnonymousClassNode>this.node).extendsKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(4), this.relativeIndexAt(4));
    }
    return null;
  }
  public get baseType(): NameSyntaxNode | null {
    if (this._baseType === void 0) {
      this._baseType = this.createChildNode<NameSyntaxNode>(5);
    }
    return this._baseType;
  }
  public get implementsKeyword(): SyntaxToken | null {
    let token = (<AnonymousClassNode>this.node).implementsKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(6), this.relativeIndexAt(6));
    }
    return null;
  }
  public get interfaces(): SyntaxList | null {
    if (this._interfaces === void 0) {
      this._interfaces = this.createChildNode<SyntaxList>(7);
    }
    return this._interfaces;
  }
  public get openBrace(): SyntaxToken {
    return new SyntaxToken((<AnonymousClassNode>this.node).openBrace, this, this.offsetAt(8), this.relativeIndexAt(8));
  }
  public get members(): SyntaxList | null {
    if (this._members === void 0) {
      this._members = this.createChildNode<SyntaxList>(9);
    }
    return this._members;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<AnonymousClassNode>this.node).closeBrace, this, this.offsetAt(10), this.relativeIndexAt(10));
  }

  protected get count(): number {
    return 11;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitAnonymousClass(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitAnonymousClass(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._argumentList !== void 0 ? this._argumentList : null;
      case 5:
        return this._baseType !== void 0 ? this._baseType : null;
      case 7:
        return this._interfaces !== void 0 ? this._interfaces : null;
      case 9:
        return this._members !== void 0 ? this._members : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._argumentList === void 0) {
          this._argumentList = this.createChildNode<SyntaxList>(2);
        }
        return this._argumentList;
      case 5:
        if (this._baseType === void 0) {
          this._baseType = this.createChildNode<NameSyntaxNode>(5);
        }
        return this._baseType;
      case 7:
        if (this._interfaces === void 0) {
          this._interfaces = this.createChildNode<SyntaxList>(7);
        }
        return this._interfaces;
      case 9:
        if (this._members === void 0) {
          this._members = this.createChildNode<SyntaxList>(9);
        }
        return this._members;
      default:
        return null;
    }
  }

}
export class ArgumentSyntaxNode extends SyntaxNode {

  protected _value?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get ellipsis(): SyntaxToken | null {
    let token = (<ArgumentNode>this.node).ellipsis;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(0), this.relativeIndexAt(0));
    }
    return null;
  }
  public get value(): ExpressionSyntaxNode {
    if (this._value === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._value = node;
    }
    return this._value;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitArgument(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitArgument(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._value !== void 0 ? this._value : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._value === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._value = node;
        }
        return this._value;
      default:
        return null;
    }
  }

}
export class ArrayElementSyntaxNode extends SyntaxNode {

  protected _key?: ExpressionSyntaxNode | null = undefined;
  protected _value?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get key(): ExpressionSyntaxNode | null {
    if (this._key === void 0) {
      this._key = this.createFirstChildNode<ExpressionSyntaxNode>();
    }
    return this._key;
  }
  public get doubleArrow(): SyntaxToken | null {
    let token = (<ArrayElementNode>this.node).doubleArrow;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get valueOperator(): SyntaxToken | null {
    let token = (<ArrayElementNode>this.node).valueOperator;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get value(): ExpressionSyntaxNode {
    if (this._value === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(3);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._value = node;
    }
    return this._value;
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitArrayElement(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitArrayElement(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._key !== void 0 ? this._key : null;
      case 3:
        return this._value !== void 0 ? this._value : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._key === void 0) {
          this._key = this.createFirstChildNode<ExpressionSyntaxNode>();
        }
        return this._key;
      case 3:
        if (this._value === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(3);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._value = node;
        }
        return this._value;
      default:
        return null;
    }
  }

}
export class ClassConstantElementSyntaxNode extends SyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get identifierOrKeyword(): SyntaxToken {
    return new SyntaxToken((<ClassConstantElementNode>this.node).identifierOrKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get equal(): SyntaxToken {
    return new SyntaxToken((<ClassConstantElementNode>this.node).equal, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitClassConstantElement(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitClassConstantElement(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class ClosureUseSyntaxNode extends SyntaxNode {

  protected _variables?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get useKeyword(): SyntaxToken {
    return new SyntaxToken((<ClosureUseNode>this.node).useKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<ClosureUseNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get variables(): SyntaxList {
    if (this._variables === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._variables = node;
    }
    return this._variables;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<ClosureUseNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitClosureUse(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitClosureUse(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._variables !== void 0 ? this._variables : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._variables === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._variables = node;
        }
        return this._variables;
      default:
        return null;
    }
  }

}
export class ConstantElementSyntaxNode extends SyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get identifier(): SyntaxToken {
    return new SyntaxToken((<ConstantElementNode>this.node).identifier, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get equal(): SyntaxToken {
    return new SyntaxToken((<ConstantElementNode>this.node).equal, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitConstantElement(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitConstantElement(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class ElseSyntaxNode extends SyntaxNode {

  protected _statement?: StatementSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get elseKeyword(): SyntaxToken {
    return new SyntaxToken((<ElseNode>this.node).elseKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get statement(): StatementSyntaxNode {
    if (this._statement === void 0) {
      let node: StatementSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statement = node;
    }
    return this._statement;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitElse(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitElse(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._statement !== void 0 ? this._statement : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._statement === void 0) {
          let node: StatementSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statement = node;
        }
        return this._statement;
      default:
        return null;
    }
  }

}
export class ElseBlockSyntaxNode extends SyntaxNode {

  protected _statements?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get elseKeyword(): SyntaxToken {
    return new SyntaxToken((<ElseBlockNode>this.node).elseKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get colon(): SyntaxToken {
    return new SyntaxToken((<ElseBlockNode>this.node).colon, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<SyntaxList>(2);
    }
    return this._statements;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitElseBlock(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitElseBlock(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<SyntaxList>(2);
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class ElseIfSyntaxNode extends SyntaxNode {

  protected _condition?: ExpressionSyntaxNode = undefined;
  protected _statement?: StatementSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get elseIfKeyword(): SyntaxToken {
    return new SyntaxToken((<ElseIfNode>this.node).elseIfKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<ElseIfNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get condition(): ExpressionSyntaxNode {
    if (this._condition === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._condition = node;
    }
    return this._condition;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<ElseIfNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get statement(): StatementSyntaxNode {
    if (this._statement === void 0) {
      let node: StatementSyntaxNode | null = this.createChildNode(4);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statement = node;
    }
    return this._statement;
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitElseIf(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitElseIf(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._condition !== void 0 ? this._condition : null;
      case 4:
        return this._statement !== void 0 ? this._statement : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._condition === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._condition = node;
        }
        return this._condition;
      case 4:
        if (this._statement === void 0) {
          let node: StatementSyntaxNode | null = this.createChildNode(4);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statement = node;
        }
        return this._statement;
      default:
        return null;
    }
  }

}
export class ElseIfBlockSyntaxNode extends SyntaxNode {

  protected _condition?: ExpressionSyntaxNode = undefined;
  protected _statements?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get elseIfKeyword(): SyntaxToken {
    return new SyntaxToken((<ElseIfBlockNode>this.node).elseIfKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<ElseIfBlockNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get condition(): ExpressionSyntaxNode {
    if (this._condition === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._condition = node;
    }
    return this._condition;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<ElseIfBlockNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get colon(): SyntaxToken {
    return new SyntaxToken((<ElseIfBlockNode>this.node).colon, this, this.offsetAt(4), this.relativeIndexAt(4));
  }
  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<SyntaxList>(5);
    }
    return this._statements;
  }

  protected get count(): number {
    return 6;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitElseIfBlock(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitElseIfBlock(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._condition !== void 0 ? this._condition : null;
      case 5:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._condition === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._condition = node;
        }
        return this._condition;
      case 5:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<SyntaxList>(5);
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class FlexibleHeredocElementSyntaxNode extends SyntaxNode {

  protected _template?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get indent(): SyntaxToken {
    return new SyntaxToken((<FlexibleHeredocElementNode>this.node).indent, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get template(): SyntaxList | null {
    if (this._template === void 0) {
      this._template = this.createChildNode<SyntaxList>(1);
    }
    return this._template;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitFlexibleHeredocElement(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitFlexibleHeredocElement(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._template !== void 0 ? this._template : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._template === void 0) {
          this._template = this.createChildNode<SyntaxList>(1);
        }
        return this._template;
      default:
        return null;
    }
  }

}
export class IncompleteNamedTraitAdaptationSyntaxNode extends SyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get identifierOrKeyword(): SyntaxToken {
    return new SyntaxToken((<IncompleteNamedTraitAdaptationNode>this.node).identifierOrKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }

  protected get count(): number {
    return 1;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitIncompleteNamedTraitAdapatation(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitIncompleteNamedTraitAdapatation(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class IncompleteReferencedTraitAdaptationSyntaxNode extends SyntaxNode {

  protected _reference?: MethodReferenceSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get reference(): MethodReferenceSyntaxNode {
    if (this._reference === void 0) {
      let node: MethodReferenceSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._reference = node;
    }
    return this._reference;
  }

  protected get count(): number {
    return 1;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitIncompleteReferencedTraitAdaptation(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitIncompleteReferencedTraitAdaptation(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._reference !== void 0 ? this._reference : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._reference === void 0) {
          let node: MethodReferenceSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._reference = node;
        }
        return this._reference;
      default:
        return null;
    }
  }

}
export class ListDestructureSyntaxNode extends SyntaxNode {

  protected _variables?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get listKeyword(): SyntaxToken {
    return new SyntaxToken((<ListDestructureNode>this.node).listKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<ListDestructureNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get variables(): SyntaxList | null {
    if (this._variables === void 0) {
      this._variables = this.createChildNode<SyntaxList>(2);
    }
    return this._variables;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<ListDestructureNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitListDestructure(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitListDestructure(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._variables !== void 0 ? this._variables : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._variables === void 0) {
          this._variables = this.createChildNode<SyntaxList>(2);
        }
        return this._variables;
      default:
        return null;
    }
  }

}
export class ListDestructureElementSyntaxNode extends SyntaxNode {

  protected _key?: ExpressionSyntaxNode | null = undefined;
  protected _value?: ExpressionSyntaxNode | ListDestructureSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get key(): ExpressionSyntaxNode | null {
    if (this._key === void 0) {
      this._key = this.createFirstChildNode<ExpressionSyntaxNode>();
    }
    return this._key;
  }
  public get doubleArrow(): SyntaxToken | null {
    let token = (<ListDestructureElementNode>this.node).doubleArrow;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get ampersand(): SyntaxToken | null {
    let token = (<ListDestructureElementNode>this.node).ampersand;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get value(): ExpressionSyntaxNode | ListDestructureSyntaxNode {
    if (this._value === void 0) {
      let node: ExpressionSyntaxNode | ListDestructureSyntaxNode | null = this.createChildNode(3);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._value = node;
    }
    return this._value;
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitListDestructureElement(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitListDestructureElement(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._key !== void 0 ? this._key : null;
      case 3:
        return this._value !== void 0 ? this._value : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._key === void 0) {
          this._key = this.createFirstChildNode<ExpressionSyntaxNode>();
        }
        return this._key;
      case 3:
        if (this._value === void 0) {
          let node: ExpressionSyntaxNode | ListDestructureSyntaxNode | null = this.createChildNode(3);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._value = node;
        }
        return this._value;
      default:
        return null;
    }
  }

}
export class MethodReferenceSyntaxNode extends SyntaxNode {

  protected _className?: NameSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get className(): NameSyntaxNode {
    if (this._className === void 0) {
      let node: NameSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._className = node;
    }
    return this._className;
  }
  public get doubleColon(): SyntaxToken {
    return new SyntaxToken((<MethodReferenceNode>this.node).doubleColon, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get methodName(): SyntaxToken {
    return new SyntaxToken((<MethodReferenceNode>this.node).methodName, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitMethodReference(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitMethodReference(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._className !== void 0 ? this._className : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._className === void 0) {
          let node: NameSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._className = node;
        }
        return this._className;
      default:
        return null;
    }
  }

}
export class ParameterSyntaxNode extends SyntaxNode {

  protected _type?: NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null = undefined;
  protected _expression?: ExpressionSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get type(): NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null {
    if (this._type === void 0) {
      this._type = this.createFirstChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>();
    }
    return this._type;
  }
  public get ampersand(): SyntaxToken | null {
    let token = (<ParameterNode>this.node).ampersand;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get ellipsis(): SyntaxToken | null {
    let token = (<ParameterNode>this.node).ellipsis;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get variable(): SyntaxToken {
    return new SyntaxToken((<ParameterNode>this.node).variable, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get equal(): SyntaxToken | null {
    let token = (<ParameterNode>this.node).equal;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(4), this.relativeIndexAt(4));
    }
    return null;
  }
  public get expression(): ExpressionSyntaxNode | null {
    if (this._expression === void 0) {
      this._expression = this.createChildNode<ExpressionSyntaxNode>(5);
    }
    return this._expression;
  }

  protected get count(): number {
    return 6;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitParameter(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitParameter(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._type !== void 0 ? this._type : null;
      case 5:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._type === void 0) {
          this._type = this.createFirstChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>();
        }
        return this._type;
      case 5:
        if (this._expression === void 0) {
          this._expression = this.createChildNode<ExpressionSyntaxNode>(5);
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class PropertyElementSyntaxNode extends SyntaxNode {

  protected _expression?: ExpressionSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get variable(): SyntaxToken {
    return new SyntaxToken((<PropertyElementNode>this.node).variable, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get equal(): SyntaxToken | null {
    let token = (<PropertyElementNode>this.node).equal;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get expression(): ExpressionSyntaxNode | null {
    if (this._expression === void 0) {
      this._expression = this.createChildNode<ExpressionSyntaxNode>(2);
    }
    return this._expression;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitPropertyElement(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitPropertyElement(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expression === void 0) {
          this._expression = this.createChildNode<ExpressionSyntaxNode>(2);
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class StaticElementSyntaxNode extends SyntaxNode {

  protected _expression?: ExpressionSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get variable(): SyntaxToken {
    return new SyntaxToken((<StaticElementNode>this.node).variable, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get equal(): SyntaxToken | null {
    let token = (<StaticElementNode>this.node).equal;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get expression(): ExpressionSyntaxNode | null {
    if (this._expression === void 0) {
      this._expression = this.createChildNode<ExpressionSyntaxNode>(2);
    }
    return this._expression;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitStaticElement(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitStaticElement(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expression === void 0) {
          this._expression = this.createChildNode<ExpressionSyntaxNode>(2);
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class SwitchCaseSyntaxNode extends SyntaxNode {

  protected _expression?: ExpressionSyntaxNode | null = undefined;
  protected _statements?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get clauseKeyword(): SyntaxToken {
    return new SyntaxToken((<SwitchCaseNode>this.node).clauseKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get expression(): ExpressionSyntaxNode | null {
    if (this._expression === void 0) {
      this._expression = this.createChildNode<ExpressionSyntaxNode>(1);
    }
    return this._expression;
  }
  public get separator(): SyntaxToken {
    return new SyntaxToken((<SwitchCaseNode>this.node).separator, this, this.offsetAt(2), this.relativeIndexAt(2));
  }
  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<SyntaxList>(3);
    }
    return this._statements;
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitSwitchCase(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitSwitchCase(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expression !== void 0 ? this._expression : null;
      case 3:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expression === void 0) {
          this._expression = this.createChildNode<ExpressionSyntaxNode>(1);
        }
        return this._expression;
      case 3:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<SyntaxList>(3);
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class TraitPrecedenceSyntaxNode extends SyntaxNode {

  protected _methodReference?: MethodReferenceSyntaxNode = undefined;
  protected _traitNames?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get methodReference(): MethodReferenceSyntaxNode {
    if (this._methodReference === void 0) {
      let node: MethodReferenceSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._methodReference = node;
    }
    return this._methodReference;
  }
  public get insteadOfKeyword(): SyntaxToken {
    return new SyntaxToken((<TraitPrecedenceNode>this.node).insteadOfKeyword, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get traitNames(): SyntaxList {
    if (this._traitNames === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._traitNames = node;
    }
    return this._traitNames;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<TraitPrecedenceNode>this.node).semicolon, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitTraitPrecedence(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitTraitPrecedence(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._methodReference !== void 0 ? this._methodReference : null;
      case 2:
        return this._traitNames !== void 0 ? this._traitNames : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._methodReference === void 0) {
          let node: MethodReferenceSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._methodReference = node;
        }
        return this._methodReference;
      case 2:
        if (this._traitNames === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._traitNames = node;
        }
        return this._traitNames;
      default:
        return null;
    }
  }

}
export class TryCatchSyntaxNode extends SyntaxNode {

  protected _typeNames?: SyntaxList = undefined;
  protected _statements?: StatementBlockSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get catchKeyword(): SyntaxToken {
    return new SyntaxToken((<TryCatchNode>this.node).catchKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<TryCatchNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get typeNames(): SyntaxList {
    if (this._typeNames === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._typeNames = node;
    }
    return this._typeNames;
  }
  public get variable(): SyntaxToken {
    return new SyntaxToken((<TryCatchNode>this.node).variable, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<TryCatchNode>this.node).closeParen, this, this.offsetAt(4), this.relativeIndexAt(4));
  }
  public get statements(): StatementBlockSyntaxNode {
    if (this._statements === void 0) {
      let node: StatementBlockSyntaxNode | null = this.createChildNode(5);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statements = node;
    }
    return this._statements;
  }

  protected get count(): number {
    return 6;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitTryCatch(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitTryCatch(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._typeNames !== void 0 ? this._typeNames : null;
      case 5:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._typeNames === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._typeNames = node;
        }
        return this._typeNames;
      case 5:
        if (this._statements === void 0) {
          let node: StatementBlockSyntaxNode | null = this.createChildNode(5);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statements = node;
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class TryFinallySyntaxNode extends SyntaxNode {

  protected _statements?: StatementBlockSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get finallyKeyword(): SyntaxToken {
    return new SyntaxToken((<TryFinallyNode>this.node).finallyKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get statements(): StatementBlockSyntaxNode {
    if (this._statements === void 0) {
      let node: StatementBlockSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statements = node;
    }
    return this._statements;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitTryFinally(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitTryFinally(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._statements === void 0) {
          let node: StatementBlockSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statements = node;
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class UseElementSyntaxNode extends SyntaxNode {

  protected _target?: NameSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get typeKeyword(): SyntaxToken | null {
    let token = (<UseElementNode>this.node).typeKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(0), this.relativeIndexAt(0));
    }
    return null;
  }
  public get target(): NameSyntaxNode {
    if (this._target === void 0) {
      let node: NameSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._target = node;
    }
    return this._target;
  }
  public get asKeyword(): SyntaxToken | null {
    let token = (<UseElementNode>this.node).asKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get alias(): SyntaxToken | null {
    let token = (<UseElementNode>this.node).alias;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(3), this.relativeIndexAt(3));
    }
    return null;
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitUseElement(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitUseElement(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._target !== void 0 ? this._target : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._target === void 0) {
          let node: NameSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._target = node;
        }
        return this._target;
      default:
        return null;
    }
  }

}
export abstract class IntrinsicSyntaxNode extends ExpressionSyntaxNode {

}
export abstract class InvocationSyntaxNode extends ExpressionSyntaxNode {

  public abstract readonly openParen: SyntaxToken;
  public abstract readonly argumentList: SyntaxList | null;
  public abstract readonly closeParen: SyntaxToken;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

}
export abstract class IterationSyntaxNode extends StatementSyntaxNode {

}
export abstract class JumpSyntaxNode extends StatementSyntaxNode {

}
export abstract class MemberAccessSyntaxNode extends ExpressionSyntaxNode {

  public abstract readonly dereferencable: ExpressionSyntaxNode;
  public abstract readonly objectOperator: SyntaxToken;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

}
export abstract class MemberInvocationSyntaxNode extends InvocationSyntaxNode {

  public abstract readonly dereferenceable: ExpressionSyntaxNode;
  public abstract readonly objectOperator: SyntaxToken;
  public abstract readonly openParen: SyntaxToken;
  public abstract readonly argumentList: SyntaxList | null;
  public abstract readonly closeParen: SyntaxToken;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

}
export abstract class ObjectCreationSyntaxNode extends ExpressionSyntaxNode {

  public abstract readonly newKeyword: SyntaxToken;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

}
export abstract class ScopedAccessSyntaxNode extends ExpressionSyntaxNode {

  public abstract readonly qualifier: ExpressionSyntaxNode | NameSyntaxNode;
  public abstract readonly doubleColon: SyntaxToken;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

}
export abstract class ScopedInvocationSyntaxNode extends InvocationSyntaxNode {

  public abstract readonly qualifier: ExpressionSyntaxNode | NameSyntaxNode;
  public abstract readonly doubleColon: SyntaxToken;
  public abstract readonly openParen: SyntaxToken;
  public abstract readonly argumentList: SyntaxList | null;
  public abstract readonly closeParen: SyntaxToken;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

}
export abstract class SelectionSyntaxNode extends StatementSyntaxNode {

}
export abstract class TypeDeclarationSyntaxNode extends StatementSyntaxNode {

  public abstract readonly identifier: SyntaxToken;
  public abstract readonly openBrace: SyntaxToken;
  public abstract readonly members: SyntaxList | null;
  public abstract readonly closeBrace: SyntaxToken;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

}
export abstract class VariableSyntaxNode extends ExpressionSyntaxNode {

}
export class AnonymousFunctionSyntaxNode extends ExpressionSyntaxNode {

  protected _parameters?: SyntaxList | null = undefined;
  protected _useClause?: ClosureUseSyntaxNode | null = undefined;
  protected _returnType?: NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null = undefined;
  protected _statements?: StatementBlockSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get staticKeyword(): SyntaxToken | null {
    let token = (<AnonymousFunctionNode>this.node).staticKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(0), this.relativeIndexAt(0));
    }
    return null;
  }
  public get functionKeyword(): SyntaxToken {
    return new SyntaxToken((<AnonymousFunctionNode>this.node).functionKeyword, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get ampersand(): SyntaxToken | null {
    let token = (<AnonymousFunctionNode>this.node).ampersand;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<AnonymousFunctionNode>this.node).openParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get parameters(): SyntaxList | null {
    if (this._parameters === void 0) {
      this._parameters = this.createChildNode<SyntaxList>(4);
    }
    return this._parameters;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<AnonymousFunctionNode>this.node).closeParen, this, this.offsetAt(5), this.relativeIndexAt(5));
  }
  public get useClause(): ClosureUseSyntaxNode | null {
    if (this._useClause === void 0) {
      this._useClause = this.createChildNode<ClosureUseSyntaxNode>(6);
    }
    return this._useClause;
  }
  public get colon(): SyntaxToken | null {
    let token = (<AnonymousFunctionNode>this.node).colon;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(7), this.relativeIndexAt(7));
    }
    return null;
  }
  public get returnType(): NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null {
    if (this._returnType === void 0) {
      this._returnType = this.createChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>(8);
    }
    return this._returnType;
  }
  public get statements(): StatementBlockSyntaxNode {
    if (this._statements === void 0) {
      let node: StatementBlockSyntaxNode | null = this.createChildNode(9);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statements = node;
    }
    return this._statements;
  }

  protected get count(): number {
    return 10;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitAnonymousFunction(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitAnonymousFunction(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 4:
        return this._parameters !== void 0 ? this._parameters : null;
      case 6:
        return this._useClause !== void 0 ? this._useClause : null;
      case 8:
        return this._returnType !== void 0 ? this._returnType : null;
      case 9:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 4:
        if (this._parameters === void 0) {
          this._parameters = this.createChildNode<SyntaxList>(4);
        }
        return this._parameters;
      case 6:
        if (this._useClause === void 0) {
          this._useClause = this.createChildNode<ClosureUseSyntaxNode>(6);
        }
        return this._useClause;
      case 8:
        if (this._returnType === void 0) {
          this._returnType = this.createChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>(8);
        }
        return this._returnType;
      case 9:
        if (this._statements === void 0) {
          let node: StatementBlockSyntaxNode | null = this.createChildNode(9);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statements = node;
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class AnonymousObjectCreationSyntaxNode extends ObjectCreationSyntaxNode {

  protected _anonymousClass?: AnonymousClassSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get newKeyword(): SyntaxToken {
    return new SyntaxToken((<AnonymousObjectCreationNode>this.node).newKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get anonymousClass(): AnonymousClassSyntaxNode {
    if (this._anonymousClass === void 0) {
      let node: AnonymousClassSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._anonymousClass = node;
    }
    return this._anonymousClass;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitAnonymousObjectCreation(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitAnonymousObjectCreation(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._anonymousClass !== void 0 ? this._anonymousClass : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._anonymousClass === void 0) {
          let node: AnonymousClassSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._anonymousClass = node;
        }
        return this._anonymousClass;
      default:
        return null;
    }
  }

}
export class ArraySyntaxNode extends ExpressionSyntaxNode {

  protected _initializerList?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get arrayKeyword(): SyntaxToken | null {
    let token = (<ArrayNode>this.node).arrayKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(0), this.relativeIndexAt(0));
    }
    return null;
  }
  public get openParenOrBracket(): SyntaxToken {
    return new SyntaxToken((<ArrayNode>this.node).openParenOrBracket, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get initializerList(): SyntaxList | null {
    if (this._initializerList === void 0) {
      this._initializerList = this.createChildNode<SyntaxList>(2);
    }
    return this._initializerList;
  }
  public get closeParenOrBracket(): SyntaxToken {
    return new SyntaxToken((<ArrayNode>this.node).closeParenOrBracket, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitArray(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitArray(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._initializerList !== void 0 ? this._initializerList : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._initializerList === void 0) {
          this._initializerList = this.createChildNode<SyntaxList>(2);
        }
        return this._initializerList;
      default:
        return null;
    }
  }

}
export class ArrowFunctionSyntaxNode extends ExpressionSyntaxNode {

  protected _parameters?: SyntaxList | null = undefined;
  protected _returnType?: NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null = undefined;
  protected _expr?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get staticKeyword(): SyntaxToken | null {
    let token = (<ArrowFunctionNode>this.node).staticKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(0), this.relativeIndexAt(0));
    }
    return null;
  }
  public get fnKeyword(): SyntaxToken {
    return new SyntaxToken((<ArrowFunctionNode>this.node).fnKeyword, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get ampersand(): SyntaxToken | null {
    let token = (<ArrowFunctionNode>this.node).ampersand;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<ArrowFunctionNode>this.node).openParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get parameters(): SyntaxList | null {
    if (this._parameters === void 0) {
      this._parameters = this.createChildNode<SyntaxList>(4);
    }
    return this._parameters;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<ArrowFunctionNode>this.node).closeParen, this, this.offsetAt(5), this.relativeIndexAt(5));
  }
  public get colon(): SyntaxToken | null {
    let token = (<ArrowFunctionNode>this.node).colon;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(6), this.relativeIndexAt(6));
    }
    return null;
  }
  public get returnType(): NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null {
    if (this._returnType === void 0) {
      this._returnType = this.createChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>(7);
    }
    return this._returnType;
  }
  public get doubleArrow(): SyntaxToken {
    return new SyntaxToken((<ArrowFunctionNode>this.node).doubleArrow, this, this.offsetAt(8), this.relativeIndexAt(8));
  }
  public get expr(): ExpressionSyntaxNode {
    if (this._expr === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(9);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expr = node;
    }
    return this._expr;
  }

  protected get count(): number {
    return 10;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitArrowFunction(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitArrowFunction(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 4:
        return this._parameters !== void 0 ? this._parameters : null;
      case 7:
        return this._returnType !== void 0 ? this._returnType : null;
      case 9:
        return this._expr !== void 0 ? this._expr : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 4:
        if (this._parameters === void 0) {
          this._parameters = this.createChildNode<SyntaxList>(4);
        }
        return this._parameters;
      case 7:
        if (this._returnType === void 0) {
          this._returnType = this.createChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>(7);
        }
        return this._returnType;
      case 9:
        if (this._expr === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(9);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expr = node;
        }
        return this._expr;
      default:
        return null;
    }
  }

}
export class AssignmentSyntaxNode extends ExpressionSyntaxNode {

  protected _leftOperand?: ExpressionSyntaxNode = undefined;
  protected _rightOperand?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get leftOperand(): ExpressionSyntaxNode {
    if (this._leftOperand === void 0) {
      let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._leftOperand = node;
    }
    return this._leftOperand;
  }
  public get operator(): SyntaxToken {
    return new SyntaxToken((<AssignmentNode>this.node).operator, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get ampersand(): SyntaxToken | null {
    let token = (<AssignmentNode>this.node).ampersand;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get rightOperand(): ExpressionSyntaxNode {
    if (this._rightOperand === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(3);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._rightOperand = node;
    }
    return this._rightOperand;
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitAssignmentExpression(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitAssignmentExpression(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._leftOperand !== void 0 ? this._leftOperand : null;
      case 3:
        return this._rightOperand !== void 0 ? this._rightOperand : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._leftOperand === void 0) {
          let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._leftOperand = node;
        }
        return this._leftOperand;
      case 3:
        if (this._rightOperand === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(3);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._rightOperand = node;
        }
        return this._rightOperand;
      default:
        return null;
    }
  }

}
export class BinarySyntaxNode extends ExpressionSyntaxNode {

  protected _leftOperand?: ExpressionSyntaxNode = undefined;
  protected _rightOperand?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get leftOperand(): ExpressionSyntaxNode {
    if (this._leftOperand === void 0) {
      let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._leftOperand = node;
    }
    return this._leftOperand;
  }
  public get operator(): SyntaxToken {
    return new SyntaxToken((<BinaryNode>this.node).operator, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get rightOperand(): ExpressionSyntaxNode {
    if (this._rightOperand === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._rightOperand = node;
    }
    return this._rightOperand;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitBinaryExpression(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitBinaryExpression(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._leftOperand !== void 0 ? this._leftOperand : null;
      case 2:
        return this._rightOperand !== void 0 ? this._rightOperand : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._leftOperand === void 0) {
          let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._leftOperand = node;
        }
        return this._leftOperand;
      case 2:
        if (this._rightOperand === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._rightOperand = node;
        }
        return this._rightOperand;
      default:
        return null;
    }
  }

}
export class BreakSyntaxNode extends JumpSyntaxNode {

  protected _depth?: ExpressionSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get breakKeyword(): SyntaxToken {
    return new SyntaxToken((<BreakNode>this.node).breakKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get depth(): ExpressionSyntaxNode | null {
    if (this._depth === void 0) {
      this._depth = this.createChildNode<ExpressionSyntaxNode>(1);
    }
    return this._depth;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<BreakNode>this.node).semicolon, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitBreak(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitBreak(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._depth !== void 0 ? this._depth : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._depth === void 0) {
          this._depth = this.createChildNode<ExpressionSyntaxNode>(1);
        }
        return this._depth;
      default:
        return null;
    }
  }

}
export class ClassConstantSyntaxNode extends ScopedAccessSyntaxNode {

  protected _qualifier?: ExpressionSyntaxNode | NameSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get qualifier(): ExpressionSyntaxNode | NameSyntaxNode {
    if (this._qualifier === void 0) {
      let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._qualifier = node;
    }
    return this._qualifier;
  }
  public get doubleColon(): SyntaxToken {
    return new SyntaxToken((<ClassConstantNode>this.node).doubleColon, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get identifier(): SyntaxToken {
    return new SyntaxToken((<ClassConstantNode>this.node).identifier, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitClassConstant(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitClassConstant(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._qualifier !== void 0 ? this._qualifier : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._qualifier === void 0) {
          let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._qualifier = node;
        }
        return this._qualifier;
      default:
        return null;
    }
  }

}
export class ClassConstantDeclarationSyntaxNode extends StatementSyntaxNode {

  protected _modifiers?: SyntaxList | null = undefined;
  protected _elements?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get modifiers(): SyntaxList | null {
    if (this._modifiers === void 0) {
      this._modifiers = this.createFirstChildNode<SyntaxList>();
    }
    return this._modifiers;
  }
  public get constKeyword(): SyntaxToken {
    return new SyntaxToken((<ClassConstantDeclarationNode>this.node).constKeyword, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get elements(): SyntaxList {
    if (this._elements === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._elements = node;
    }
    return this._elements;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<ClassConstantDeclarationNode>this.node).semicolon, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitClassConstantDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitClassConstantDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._modifiers !== void 0 ? this._modifiers : null;
      case 2:
        return this._elements !== void 0 ? this._elements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._modifiers === void 0) {
          this._modifiers = this.createFirstChildNode<SyntaxList>();
        }
        return this._modifiers;
      case 2:
        if (this._elements === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._elements = node;
        }
        return this._elements;
      default:
        return null;
    }
  }

}
export class ClassDeclarationSyntaxNode extends TypeDeclarationSyntaxNode {

  protected _modifiers?: SyntaxList | null = undefined;
  protected _baseType?: NameSyntaxNode | null = undefined;
  protected _interfaces?: SyntaxList | null = undefined;
  protected _members?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get modifiers(): SyntaxList | null {
    if (this._modifiers === void 0) {
      this._modifiers = this.createFirstChildNode<SyntaxList>();
    }
    return this._modifiers;
  }
  public get classKeyword(): SyntaxToken {
    return new SyntaxToken((<ClassDeclarationNode>this.node).classKeyword, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get identifier(): SyntaxToken {
    return new SyntaxToken((<ClassDeclarationNode>this.node).identifier, this, this.offsetAt(2), this.relativeIndexAt(2));
  }
  public get extendsKeyword(): SyntaxToken | null {
    let token = (<ClassDeclarationNode>this.node).extendsKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(3), this.relativeIndexAt(3));
    }
    return null;
  }
  public get baseType(): NameSyntaxNode | null {
    if (this._baseType === void 0) {
      this._baseType = this.createChildNode<NameSyntaxNode>(4);
    }
    return this._baseType;
  }
  public get implementsKeyword(): SyntaxToken | null {
    let token = (<ClassDeclarationNode>this.node).implementsKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(5), this.relativeIndexAt(5));
    }
    return null;
  }
  public get interfaces(): SyntaxList | null {
    if (this._interfaces === void 0) {
      this._interfaces = this.createChildNode<SyntaxList>(6);
    }
    return this._interfaces;
  }
  public get openBrace(): SyntaxToken {
    return new SyntaxToken((<ClassDeclarationNode>this.node).openBrace, this, this.offsetAt(7), this.relativeIndexAt(7));
  }
  public get members(): SyntaxList | null {
    if (this._members === void 0) {
      this._members = this.createChildNode<SyntaxList>(8);
    }
    return this._members;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<ClassDeclarationNode>this.node).closeBrace, this, this.offsetAt(9), this.relativeIndexAt(9));
  }

  protected get count(): number {
    return 10;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitClassDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitClassDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._modifiers !== void 0 ? this._modifiers : null;
      case 4:
        return this._baseType !== void 0 ? this._baseType : null;
      case 6:
        return this._interfaces !== void 0 ? this._interfaces : null;
      case 8:
        return this._members !== void 0 ? this._members : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._modifiers === void 0) {
          this._modifiers = this.createFirstChildNode<SyntaxList>();
        }
        return this._modifiers;
      case 4:
        if (this._baseType === void 0) {
          this._baseType = this.createChildNode<NameSyntaxNode>(4);
        }
        return this._baseType;
      case 6:
        if (this._interfaces === void 0) {
          this._interfaces = this.createChildNode<SyntaxList>(6);
        }
        return this._interfaces;
      case 8:
        if (this._members === void 0) {
          this._members = this.createChildNode<SyntaxList>(8);
        }
        return this._members;
      default:
        return null;
    }
  }

}
export class CloneSyntaxNode extends ExpressionSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get cloneKeyword(): SyntaxToken {
    return new SyntaxToken((<CloneNode>this.node).cloneKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitClone(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitClone(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class ConditionalSyntaxNode extends ExpressionSyntaxNode {

  protected _condition?: ExpressionSyntaxNode = undefined;
  protected _trueExpr?: ExpressionSyntaxNode | null = undefined;
  protected _falseExpr?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get condition(): ExpressionSyntaxNode {
    if (this._condition === void 0) {
      let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._condition = node;
    }
    return this._condition;
  }
  public get question(): SyntaxToken {
    return new SyntaxToken((<ConditionalNode>this.node).question, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get trueExpr(): ExpressionSyntaxNode | null {
    if (this._trueExpr === void 0) {
      this._trueExpr = this.createChildNode<ExpressionSyntaxNode>(2);
    }
    return this._trueExpr;
  }
  public get colon(): SyntaxToken {
    return new SyntaxToken((<ConditionalNode>this.node).colon, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get falseExpr(): ExpressionSyntaxNode {
    if (this._falseExpr === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(4);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._falseExpr = node;
    }
    return this._falseExpr;
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitConditionalExpression(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitConditionalExpression(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._condition !== void 0 ? this._condition : null;
      case 2:
        return this._trueExpr !== void 0 ? this._trueExpr : null;
      case 4:
        return this._falseExpr !== void 0 ? this._falseExpr : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._condition === void 0) {
          let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._condition = node;
        }
        return this._condition;
      case 2:
        if (this._trueExpr === void 0) {
          this._trueExpr = this.createChildNode<ExpressionSyntaxNode>(2);
        }
        return this._trueExpr;
      case 4:
        if (this._falseExpr === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(4);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._falseExpr = node;
        }
        return this._falseExpr;
      default:
        return null;
    }
  }

}
export class ConstantSyntaxNode extends ExpressionSyntaxNode {

  protected _name?: NameSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get name(): NameSyntaxNode {
    if (this._name === void 0) {
      let node: NameSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._name = node;
    }
    return this._name;
  }

  protected get count(): number {
    return 1;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitConstant(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitConstant(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._name !== void 0 ? this._name : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._name === void 0) {
          let node: NameSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._name = node;
        }
        return this._name;
      default:
        return null;
    }
  }

}
export class ConstantDeclarationSyntaxNode extends StatementSyntaxNode {

  protected _elements?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get constKeyword(): SyntaxToken {
    return new SyntaxToken((<ConstantDeclarationNode>this.node).constKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get elements(): SyntaxList {
    if (this._elements === void 0) {
      let node: SyntaxList | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._elements = node;
    }
    return this._elements;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<ConstantDeclarationNode>this.node).semicolon, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitConstantDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitConstantDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._elements !== void 0 ? this._elements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._elements === void 0) {
          let node: SyntaxList | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._elements = node;
        }
        return this._elements;
      default:
        return null;
    }
  }

}
export class ContinueSyntaxNode extends JumpSyntaxNode {

  protected _depth?: ExpressionSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get continueKeyword(): SyntaxToken {
    return new SyntaxToken((<ContinueNode>this.node).continueKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get depth(): ExpressionSyntaxNode | null {
    if (this._depth === void 0) {
      this._depth = this.createChildNode<ExpressionSyntaxNode>(1);
    }
    return this._depth;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<ContinueNode>this.node).semicolon, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitContinue(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitContinue(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._depth !== void 0 ? this._depth : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._depth === void 0) {
          this._depth = this.createChildNode<ExpressionSyntaxNode>(1);
        }
        return this._depth;
      default:
        return null;
    }
  }

}
export class DeclareSyntaxNode extends StatementSyntaxNode {

  protected _directives?: SyntaxList = undefined;
  protected _statement?: StatementSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get declareKeyword(): SyntaxToken {
    return new SyntaxToken((<DeclareNode>this.node).declareKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<DeclareNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get directives(): SyntaxList {
    if (this._directives === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._directives = node;
    }
    return this._directives;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<DeclareNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get statement(): StatementSyntaxNode {
    if (this._statement === void 0) {
      let node: StatementSyntaxNode | null = this.createChildNode(4);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statement = node;
    }
    return this._statement;
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitDeclare(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitDeclare(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._directives !== void 0 ? this._directives : null;
      case 4:
        return this._statement !== void 0 ? this._statement : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._directives === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._directives = node;
        }
        return this._directives;
      case 4:
        if (this._statement === void 0) {
          let node: StatementSyntaxNode | null = this.createChildNode(4);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statement = node;
        }
        return this._statement;
      default:
        return null;
    }
  }

}
export class DeclareBlockSyntaxNode extends StatementSyntaxNode {

  protected _directives?: SyntaxList = undefined;
  protected _statements?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get declareKeyword(): SyntaxToken {
    return new SyntaxToken((<DeclareBlockNode>this.node).declareKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<DeclareBlockNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get directives(): SyntaxList {
    if (this._directives === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._directives = node;
    }
    return this._directives;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<DeclareBlockNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get colon(): SyntaxToken {
    return new SyntaxToken((<DeclareBlockNode>this.node).colon, this, this.offsetAt(4), this.relativeIndexAt(4));
  }
  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<SyntaxList>(5);
    }
    return this._statements;
  }
  public get endDeclare(): SyntaxToken {
    return new SyntaxToken((<DeclareBlockNode>this.node).endDeclare, this, this.offsetAt(6), this.relativeIndexAt(6));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<DeclareBlockNode>this.node).semicolon, this, this.offsetAt(7), this.relativeIndexAt(7));
  }

  protected get count(): number {
    return 8;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitDeclareBlock(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitDeclareBlock(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._directives !== void 0 ? this._directives : null;
      case 5:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._directives === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._directives = node;
        }
        return this._directives;
      case 5:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<SyntaxList>(5);
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class DestructuringAssignmentSyntaxNode extends ExpressionSyntaxNode {

  protected _unpackedList?: ArraySyntaxNode | ListDestructureSyntaxNode = undefined;
  protected _operand?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get unpackedList(): ArraySyntaxNode | ListDestructureSyntaxNode {
    if (this._unpackedList === void 0) {
      let node: ArraySyntaxNode | ListDestructureSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._unpackedList = node;
    }
    return this._unpackedList;
  }
  public get operator(): SyntaxToken {
    return new SyntaxToken((<DestructuringAssignmentNode>this.node).operator, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get operand(): ExpressionSyntaxNode {
    if (this._operand === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._operand = node;
    }
    return this._operand;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitDestructuringAssignment(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitDestructuringAssignment(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._unpackedList !== void 0 ? this._unpackedList : null;
      case 2:
        return this._operand !== void 0 ? this._operand : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._unpackedList === void 0) {
          let node: ArraySyntaxNode | ListDestructureSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._unpackedList = node;
        }
        return this._unpackedList;
      case 2:
        if (this._operand === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._operand = node;
        }
        return this._operand;
      default:
        return null;
    }
  }

}
export class DoWhileSyntaxNode extends IterationSyntaxNode {

  protected _statement?: StatementSyntaxNode = undefined;
  protected _condition?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get doKeyword(): SyntaxToken {
    return new SyntaxToken((<DoWhileNode>this.node).doKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get statement(): StatementSyntaxNode {
    if (this._statement === void 0) {
      let node: StatementSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statement = node;
    }
    return this._statement;
  }
  public get whileKeyword(): SyntaxToken {
    return new SyntaxToken((<DoWhileNode>this.node).whileKeyword, this, this.offsetAt(2), this.relativeIndexAt(2));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<DoWhileNode>this.node).openParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get condition(): ExpressionSyntaxNode {
    if (this._condition === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(4);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._condition = node;
    }
    return this._condition;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<DoWhileNode>this.node).closeParen, this, this.offsetAt(5), this.relativeIndexAt(5));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<DoWhileNode>this.node).semicolon, this, this.offsetAt(6), this.relativeIndexAt(6));
  }

  protected get count(): number {
    return 7;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitDoWhile(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitDoWhile(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._statement !== void 0 ? this._statement : null;
      case 4:
        return this._condition !== void 0 ? this._condition : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._statement === void 0) {
          let node: StatementSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statement = node;
        }
        return this._statement;
      case 4:
        if (this._condition === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(4);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._condition = node;
        }
        return this._condition;
      default:
        return null;
    }
  }

}
export class EchoSyntaxNode extends StatementSyntaxNode {

  protected _expressionList?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get echoKeyword(): SyntaxToken | null {
    let token = (<EchoNode>this.node).echoKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(0), this.relativeIndexAt(0));
    }
    return null;
  }
  public get expressionList(): SyntaxList {
    if (this._expressionList === void 0) {
      let node: SyntaxList | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expressionList = node;
    }
    return this._expressionList;
  }
  public get semicolon(): SyntaxToken | null {
    let token = (<EchoNode>this.node).semicolon;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitEcho(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitEcho(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expressionList !== void 0 ? this._expressionList : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expressionList === void 0) {
          let node: SyntaxList | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expressionList = node;
        }
        return this._expressionList;
      default:
        return null;
    }
  }

}
export class ElementAccessSyntaxNode extends ExpressionSyntaxNode {

  protected _dereferencable?: ExpressionSyntaxNode = undefined;
  protected _index?: ExpressionSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get dereferencable(): ExpressionSyntaxNode {
    if (this._dereferencable === void 0) {
      let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._dereferencable = node;
    }
    return this._dereferencable;
  }
  public get openBraceOrBracket(): SyntaxToken {
    return new SyntaxToken((<ElementAccessNode>this.node).openBraceOrBracket, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get index(): ExpressionSyntaxNode | null {
    if (this._index === void 0) {
      this._index = this.createChildNode<ExpressionSyntaxNode>(2);
    }
    return this._index;
  }
  public get closeBraceOrBracket(): SyntaxToken {
    return new SyntaxToken((<ElementAccessNode>this.node).closeBraceOrBracket, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitElementAccess(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitElementAccess(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._dereferencable !== void 0 ? this._dereferencable : null;
      case 2:
        return this._index !== void 0 ? this._index : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._dereferencable === void 0) {
          let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._dereferencable = node;
        }
        return this._dereferencable;
      case 2:
        if (this._index === void 0) {
          this._index = this.createChildNode<ExpressionSyntaxNode>(2);
        }
        return this._index;
      default:
        return null;
    }
  }

}
export class EmptyIntrinsicSyntaxNode extends IntrinsicSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get emptyKeyword(): SyntaxToken {
    return new SyntaxToken((<EmptyIntrinsicNode>this.node).emptyKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<EmptyIntrinsicNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<EmptyIntrinsicNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitEmptyIntrinsic(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitEmptyIntrinsic(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class ErrorControlSyntaxNode extends ExpressionSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get at(): SyntaxToken {
    return new SyntaxToken((<ErrorControlNode>this.node).at, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitErrorControl(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitErrorControl(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class EvalIntrinsicSyntaxNode extends IntrinsicSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get evalKeyword(): SyntaxToken {
    return new SyntaxToken((<EvalIntrinsicNode>this.node).evalKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<EvalIntrinsicNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<EvalIntrinsicNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitEvalIntrinsic(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitEvalIntrinsic(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class ExitIntrinsicSyntaxNode extends IntrinsicSyntaxNode {

  protected _expression?: ExpressionSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get exitOrDieKeyword(): SyntaxToken {
    return new SyntaxToken((<ExitIntrinsicNode>this.node).exitOrDieKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken | null {
    let token = (<ExitIntrinsicNode>this.node).openParen;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get expression(): ExpressionSyntaxNode | null {
    if (this._expression === void 0) {
      this._expression = this.createChildNode<ExpressionSyntaxNode>(2);
    }
    return this._expression;
  }
  public get closeParen(): SyntaxToken | null {
    let token = (<ExitIntrinsicNode>this.node).closeParen;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(3), this.relativeIndexAt(3));
    }
    return null;
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitExitIntrinsic(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitExitIntrinsic(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expression === void 0) {
          this._expression = this.createChildNode<ExpressionSyntaxNode>(2);
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class ExpressionGroupSyntaxNode extends ExpressionSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get openParen(): SyntaxToken {
    return new SyntaxToken((<ExpressionGroupNode>this.node).openParen, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<ExpressionGroupNode>this.node).closeParen, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitExpressionGroup(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitExpressionGroup(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class ExpressionStatementSyntaxNode extends StatementSyntaxNode {

  protected _expression?: ExpressionSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get expression(): ExpressionSyntaxNode | null {
    if (this._expression === void 0) {
      this._expression = this.createFirstChildNode<ExpressionSyntaxNode>();
    }
    return this._expression;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<ExpressionStatementNode>this.node).semicolon, this, this.offsetAt(1), this.relativeIndexAt(1));
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitExpressionStatement(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitExpressionStatement(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._expression === void 0) {
          this._expression = this.createFirstChildNode<ExpressionSyntaxNode>();
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class FlexibleHeredocTemplateSyntaxNode extends ExpressionSyntaxNode {

  protected _flexibleElements?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get heredocStart(): SyntaxToken {
    return new SyntaxToken((<FlexibleHeredocTemplateNode>this.node).heredocStart, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get flexibleElements(): SyntaxList {
    if (this._flexibleElements === void 0) {
      let node: SyntaxList | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._flexibleElements = node;
    }
    return this._flexibleElements;
  }
  public get heredocEnd(): SyntaxToken {
    return new SyntaxToken((<FlexibleHeredocTemplateNode>this.node).heredocEnd, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitFlexibleHeredocTemplate(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitFlexibleHeredocTemplate(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._flexibleElements !== void 0 ? this._flexibleElements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._flexibleElements === void 0) {
          let node: SyntaxList | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._flexibleElements = node;
        }
        return this._flexibleElements;
      default:
        return null;
    }
  }

}
export class ForSyntaxNode extends IterationSyntaxNode {

  protected _initializers?: SyntaxList | null = undefined;
  protected _conditions?: SyntaxList | null = undefined;
  protected _incrementors?: SyntaxList | null = undefined;
  protected _statement?: StatementSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get forKeyword(): SyntaxToken {
    return new SyntaxToken((<ForNode>this.node).forKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<ForNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get initializers(): SyntaxList | null {
    if (this._initializers === void 0) {
      this._initializers = this.createChildNode<SyntaxList>(2);
    }
    return this._initializers;
  }
  public get firstSemicolon(): SyntaxToken {
    return new SyntaxToken((<ForNode>this.node).firstSemicolon, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get conditions(): SyntaxList | null {
    if (this._conditions === void 0) {
      this._conditions = this.createChildNode<SyntaxList>(4);
    }
    return this._conditions;
  }
  public get secondSemicolon(): SyntaxToken {
    return new SyntaxToken((<ForNode>this.node).secondSemicolon, this, this.offsetAt(5), this.relativeIndexAt(5));
  }
  public get incrementors(): SyntaxList | null {
    if (this._incrementors === void 0) {
      this._incrementors = this.createChildNode<SyntaxList>(6);
    }
    return this._incrementors;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<ForNode>this.node).closeParen, this, this.offsetAt(7), this.relativeIndexAt(7));
  }
  public get statement(): StatementSyntaxNode {
    if (this._statement === void 0) {
      let node: StatementSyntaxNode | null = this.createChildNode(8);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statement = node;
    }
    return this._statement;
  }

  protected get count(): number {
    return 9;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitFor(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitFor(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._initializers !== void 0 ? this._initializers : null;
      case 4:
        return this._conditions !== void 0 ? this._conditions : null;
      case 6:
        return this._incrementors !== void 0 ? this._incrementors : null;
      case 8:
        return this._statement !== void 0 ? this._statement : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._initializers === void 0) {
          this._initializers = this.createChildNode<SyntaxList>(2);
        }
        return this._initializers;
      case 4:
        if (this._conditions === void 0) {
          this._conditions = this.createChildNode<SyntaxList>(4);
        }
        return this._conditions;
      case 6:
        if (this._incrementors === void 0) {
          this._incrementors = this.createChildNode<SyntaxList>(6);
        }
        return this._incrementors;
      case 8:
        if (this._statement === void 0) {
          let node: StatementSyntaxNode | null = this.createChildNode(8);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statement = node;
        }
        return this._statement;
      default:
        return null;
    }
  }

}
export class ForBlockSyntaxNode extends IterationSyntaxNode {

  protected _initializers?: SyntaxList | null = undefined;
  protected _conditions?: SyntaxList | null = undefined;
  protected _incrementors?: SyntaxList | null = undefined;
  protected _statements?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get forKeyword(): SyntaxToken {
    return new SyntaxToken((<ForBlockNode>this.node).forKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<ForBlockNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get initializers(): SyntaxList | null {
    if (this._initializers === void 0) {
      this._initializers = this.createChildNode<SyntaxList>(2);
    }
    return this._initializers;
  }
  public get firstSemicolon(): SyntaxToken {
    return new SyntaxToken((<ForBlockNode>this.node).firstSemicolon, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get conditions(): SyntaxList | null {
    if (this._conditions === void 0) {
      this._conditions = this.createChildNode<SyntaxList>(4);
    }
    return this._conditions;
  }
  public get secondSemicolon(): SyntaxToken {
    return new SyntaxToken((<ForBlockNode>this.node).secondSemicolon, this, this.offsetAt(5), this.relativeIndexAt(5));
  }
  public get incrementors(): SyntaxList | null {
    if (this._incrementors === void 0) {
      this._incrementors = this.createChildNode<SyntaxList>(6);
    }
    return this._incrementors;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<ForBlockNode>this.node).closeParen, this, this.offsetAt(7), this.relativeIndexAt(7));
  }
  public get colon(): SyntaxToken {
    return new SyntaxToken((<ForBlockNode>this.node).colon, this, this.offsetAt(8), this.relativeIndexAt(8));
  }
  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<SyntaxList>(9);
    }
    return this._statements;
  }
  public get endForKeyword(): SyntaxToken {
    return new SyntaxToken((<ForBlockNode>this.node).endForKeyword, this, this.offsetAt(10), this.relativeIndexAt(10));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<ForBlockNode>this.node).semicolon, this, this.offsetAt(11), this.relativeIndexAt(11));
  }

  protected get count(): number {
    return 12;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitForBlock(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitForBlock(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._initializers !== void 0 ? this._initializers : null;
      case 4:
        return this._conditions !== void 0 ? this._conditions : null;
      case 6:
        return this._incrementors !== void 0 ? this._incrementors : null;
      case 9:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._initializers === void 0) {
          this._initializers = this.createChildNode<SyntaxList>(2);
        }
        return this._initializers;
      case 4:
        if (this._conditions === void 0) {
          this._conditions = this.createChildNode<SyntaxList>(4);
        }
        return this._conditions;
      case 6:
        if (this._incrementors === void 0) {
          this._incrementors = this.createChildNode<SyntaxList>(6);
        }
        return this._incrementors;
      case 9:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<SyntaxList>(9);
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class ForEachSyntaxNode extends IterationSyntaxNode {

  protected _source?: ExpressionSyntaxNode = undefined;
  protected _key?: ExpressionSyntaxNode | null = undefined;
  protected _value?: ExpressionSyntaxNode | ListDestructureSyntaxNode = undefined;
  protected _statement?: StatementSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get forEachKeyword(): SyntaxToken {
    return new SyntaxToken((<ForEachNode>this.node).forEachKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<ForEachNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get source(): ExpressionSyntaxNode {
    if (this._source === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._source = node;
    }
    return this._source;
  }
  public get asKeyword(): SyntaxToken {
    return new SyntaxToken((<ForEachNode>this.node).asKeyword, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get key(): ExpressionSyntaxNode | null {
    if (this._key === void 0) {
      this._key = this.createChildNode<ExpressionSyntaxNode>(4);
    }
    return this._key;
  }
  public get doubleArrow(): SyntaxToken | null {
    let token = (<ForEachNode>this.node).doubleArrow;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(5), this.relativeIndexAt(5));
    }
    return null;
  }
  public get ampersand(): SyntaxToken | null {
    let token = (<ForEachNode>this.node).ampersand;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(6), this.relativeIndexAt(6));
    }
    return null;
  }
  public get value(): ExpressionSyntaxNode | ListDestructureSyntaxNode {
    if (this._value === void 0) {
      let node: ExpressionSyntaxNode | ListDestructureSyntaxNode | null = this.createChildNode(7);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._value = node;
    }
    return this._value;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<ForEachNode>this.node).closeParen, this, this.offsetAt(8), this.relativeIndexAt(8));
  }
  public get statement(): StatementSyntaxNode {
    if (this._statement === void 0) {
      let node: StatementSyntaxNode | null = this.createChildNode(9);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statement = node;
    }
    return this._statement;
  }

  protected get count(): number {
    return 10;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitForEach(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitForEach(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._source !== void 0 ? this._source : null;
      case 4:
        return this._key !== void 0 ? this._key : null;
      case 7:
        return this._value !== void 0 ? this._value : null;
      case 9:
        return this._statement !== void 0 ? this._statement : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._source === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._source = node;
        }
        return this._source;
      case 4:
        if (this._key === void 0) {
          this._key = this.createChildNode<ExpressionSyntaxNode>(4);
        }
        return this._key;
      case 7:
        if (this._value === void 0) {
          let node: ExpressionSyntaxNode | ListDestructureSyntaxNode | null = this.createChildNode(7);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._value = node;
        }
        return this._value;
      case 9:
        if (this._statement === void 0) {
          let node: StatementSyntaxNode | null = this.createChildNode(9);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statement = node;
        }
        return this._statement;
      default:
        return null;
    }
  }

}
export class ForEachBlockSyntaxNode extends IterationSyntaxNode {

  protected _source?: ExpressionSyntaxNode = undefined;
  protected _key?: ExpressionSyntaxNode | null = undefined;
  protected _value?: ExpressionSyntaxNode | ListDestructureSyntaxNode = undefined;
  protected _statements?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get forEachKeyword(): SyntaxToken {
    return new SyntaxToken((<ForEachBlockNode>this.node).forEachKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<ForEachBlockNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get source(): ExpressionSyntaxNode {
    if (this._source === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._source = node;
    }
    return this._source;
  }
  public get asKeyword(): SyntaxToken {
    return new SyntaxToken((<ForEachBlockNode>this.node).asKeyword, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get key(): ExpressionSyntaxNode | null {
    if (this._key === void 0) {
      this._key = this.createChildNode<ExpressionSyntaxNode>(4);
    }
    return this._key;
  }
  public get doubleArrow(): SyntaxToken | null {
    let token = (<ForEachBlockNode>this.node).doubleArrow;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(5), this.relativeIndexAt(5));
    }
    return null;
  }
  public get ampersand(): SyntaxToken | null {
    let token = (<ForEachBlockNode>this.node).ampersand;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(6), this.relativeIndexAt(6));
    }
    return null;
  }
  public get value(): ExpressionSyntaxNode | ListDestructureSyntaxNode {
    if (this._value === void 0) {
      let node: ExpressionSyntaxNode | ListDestructureSyntaxNode | null = this.createChildNode(7);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._value = node;
    }
    return this._value;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<ForEachBlockNode>this.node).closeParen, this, this.offsetAt(8), this.relativeIndexAt(8));
  }
  public get colon(): SyntaxToken {
    return new SyntaxToken((<ForEachBlockNode>this.node).colon, this, this.offsetAt(9), this.relativeIndexAt(9));
  }
  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<SyntaxList>(10);
    }
    return this._statements;
  }
  public get endForEach(): SyntaxToken {
    return new SyntaxToken((<ForEachBlockNode>this.node).endForEach, this, this.offsetAt(11), this.relativeIndexAt(11));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<ForEachBlockNode>this.node).semicolon, this, this.offsetAt(12), this.relativeIndexAt(12));
  }

  protected get count(): number {
    return 13;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitForEachBlock(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitForEachBlock(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._source !== void 0 ? this._source : null;
      case 4:
        return this._key !== void 0 ? this._key : null;
      case 7:
        return this._value !== void 0 ? this._value : null;
      case 10:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._source === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._source = node;
        }
        return this._source;
      case 4:
        if (this._key === void 0) {
          this._key = this.createChildNode<ExpressionSyntaxNode>(4);
        }
        return this._key;
      case 7:
        if (this._value === void 0) {
          let node: ExpressionSyntaxNode | ListDestructureSyntaxNode | null = this.createChildNode(7);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._value = node;
        }
        return this._value;
      case 10:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<SyntaxList>(10);
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class FullyQualifiedNameSyntaxNode extends NameSyntaxNode {

  protected _namespaceName?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get leadingBackslash(): SyntaxToken {
    return new SyntaxToken((<FullyQualifiedNameNode>this.node).leadingBackslash, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get namespaceName(): SyntaxList {
    if (this._namespaceName === void 0) {
      let node: SyntaxList | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._namespaceName = node;
    }
    return this._namespaceName;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitFullyQualifiedName(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitFullyQualifiedName(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._namespaceName !== void 0 ? this._namespaceName : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._namespaceName === void 0) {
          let node: SyntaxList | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._namespaceName = node;
        }
        return this._namespaceName;
      default:
        return null;
    }
  }

}
export class FunctionDeclarationSyntaxNode extends StatementSyntaxNode {

  protected _parameters?: SyntaxList | null = undefined;
  protected _returnType?: NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null = undefined;
  protected _statements?: StatementBlockSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get functionKeyword(): SyntaxToken {
    return new SyntaxToken((<FunctionDeclarationNode>this.node).functionKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get ampersand(): SyntaxToken | null {
    let token = (<FunctionDeclarationNode>this.node).ampersand;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get identifier(): SyntaxToken {
    return new SyntaxToken((<FunctionDeclarationNode>this.node).identifier, this, this.offsetAt(2), this.relativeIndexAt(2));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<FunctionDeclarationNode>this.node).openParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get parameters(): SyntaxList | null {
    if (this._parameters === void 0) {
      this._parameters = this.createChildNode<SyntaxList>(4);
    }
    return this._parameters;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<FunctionDeclarationNode>this.node).closeParen, this, this.offsetAt(5), this.relativeIndexAt(5));
  }
  public get colon(): SyntaxToken | null {
    let token = (<FunctionDeclarationNode>this.node).colon;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(6), this.relativeIndexAt(6));
    }
    return null;
  }
  public get returnType(): NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null {
    if (this._returnType === void 0) {
      this._returnType = this.createChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>(7);
    }
    return this._returnType;
  }
  public get statements(): StatementBlockSyntaxNode {
    if (this._statements === void 0) {
      let node: StatementBlockSyntaxNode | null = this.createChildNode(8);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statements = node;
    }
    return this._statements;
  }

  protected get count(): number {
    return 9;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitFunctionDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitFunctionDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 4:
        return this._parameters !== void 0 ? this._parameters : null;
      case 7:
        return this._returnType !== void 0 ? this._returnType : null;
      case 8:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 4:
        if (this._parameters === void 0) {
          this._parameters = this.createChildNode<SyntaxList>(4);
        }
        return this._parameters;
      case 7:
        if (this._returnType === void 0) {
          this._returnType = this.createChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>(7);
        }
        return this._returnType;
      case 8:
        if (this._statements === void 0) {
          let node: StatementBlockSyntaxNode | null = this.createChildNode(8);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statements = node;
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class FunctionInvocationSyntaxNode extends InvocationSyntaxNode {

  protected _reference?: ExpressionSyntaxNode | NameSyntaxNode = undefined;
  protected _argumentList?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get reference(): ExpressionSyntaxNode | NameSyntaxNode {
    if (this._reference === void 0) {
      let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._reference = node;
    }
    return this._reference;
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<FunctionInvocationNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get argumentList(): SyntaxList | null {
    if (this._argumentList === void 0) {
      this._argumentList = this.createChildNode<SyntaxList>(2);
    }
    return this._argumentList;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<FunctionInvocationNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitFunctionInvocation(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitFunctionInvocation(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._reference !== void 0 ? this._reference : null;
      case 2:
        return this._argumentList !== void 0 ? this._argumentList : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._reference === void 0) {
          let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._reference = node;
        }
        return this._reference;
      case 2:
        if (this._argumentList === void 0) {
          this._argumentList = this.createChildNode<SyntaxList>(2);
        }
        return this._argumentList;
      default:
        return null;
    }
  }

}
export class GlobalSyntaxNode extends StatementSyntaxNode {

  protected _variables?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get globalKeyword(): SyntaxToken {
    return new SyntaxToken((<GlobalNode>this.node).globalKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get variables(): SyntaxList {
    if (this._variables === void 0) {
      let node: SyntaxList | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._variables = node;
    }
    return this._variables;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<GlobalNode>this.node).semicolon, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitGlobalDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitGlobalDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._variables !== void 0 ? this._variables : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._variables === void 0) {
          let node: SyntaxList | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._variables = node;
        }
        return this._variables;
      default:
        return null;
    }
  }

}
export class GoToSyntaxNode extends JumpSyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get gotoKeyword(): SyntaxToken {
    return new SyntaxToken((<GoToNode>this.node).gotoKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get label(): SyntaxToken {
    return new SyntaxToken((<GoToNode>this.node).label, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<GoToNode>this.node).semicolon, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitGoTo(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitGoTo(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class HaltCompilerSyntaxNode extends StatementSyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get haltCompilerKeyword(): SyntaxToken {
    return new SyntaxToken((<HaltCompilerNode>this.node).haltCompilerKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<HaltCompilerNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<HaltCompilerNode>this.node).closeParen, this, this.offsetAt(2), this.relativeIndexAt(2));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<HaltCompilerNode>this.node).semicolon, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitHaltCompiler(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitHaltCompiler(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class HeredocTemplateSyntaxNode extends ExpressionSyntaxNode {

  protected _template?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get heredocStart(): SyntaxToken {
    return new SyntaxToken((<HeredocTemplateNode>this.node).heredocStart, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get template(): SyntaxList | null {
    if (this._template === void 0) {
      this._template = this.createChildNode<SyntaxList>(1);
    }
    return this._template;
  }
  public get heredocEnd(): SyntaxToken {
    return new SyntaxToken((<HeredocTemplateNode>this.node).heredocEnd, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitHeredocTemplate(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitHeredocTemplate(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._template !== void 0 ? this._template : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._template === void 0) {
          this._template = this.createChildNode<SyntaxList>(1);
        }
        return this._template;
      default:
        return null;
    }
  }

}
export class IfSyntaxNode extends SelectionSyntaxNode {

  protected _condition?: ExpressionSyntaxNode = undefined;
  protected _statement?: StatementSyntaxNode = undefined;
  protected _elseIfClauses?: SyntaxList | null = undefined;
  protected _elseClause?: ElseSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get ifKeyword(): SyntaxToken {
    return new SyntaxToken((<IfNode>this.node).ifKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<IfNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get condition(): ExpressionSyntaxNode {
    if (this._condition === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._condition = node;
    }
    return this._condition;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<IfNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get statement(): StatementSyntaxNode {
    if (this._statement === void 0) {
      let node: StatementSyntaxNode | null = this.createChildNode(4);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statement = node;
    }
    return this._statement;
  }
  public get elseIfClauses(): SyntaxList | null {
    if (this._elseIfClauses === void 0) {
      this._elseIfClauses = this.createChildNode<SyntaxList>(5);
    }
    return this._elseIfClauses;
  }
  public get elseClause(): ElseSyntaxNode | null {
    if (this._elseClause === void 0) {
      this._elseClause = this.createChildNode<ElseSyntaxNode>(6);
    }
    return this._elseClause;
  }

  protected get count(): number {
    return 7;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitIf(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitIf(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._condition !== void 0 ? this._condition : null;
      case 4:
        return this._statement !== void 0 ? this._statement : null;
      case 5:
        return this._elseIfClauses !== void 0 ? this._elseIfClauses : null;
      case 6:
        return this._elseClause !== void 0 ? this._elseClause : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._condition === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._condition = node;
        }
        return this._condition;
      case 4:
        if (this._statement === void 0) {
          let node: StatementSyntaxNode | null = this.createChildNode(4);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statement = node;
        }
        return this._statement;
      case 5:
        if (this._elseIfClauses === void 0) {
          this._elseIfClauses = this.createChildNode<SyntaxList>(5);
        }
        return this._elseIfClauses;
      case 6:
        if (this._elseClause === void 0) {
          this._elseClause = this.createChildNode<ElseSyntaxNode>(6);
        }
        return this._elseClause;
      default:
        return null;
    }
  }

}
export class IfBlockSyntaxNode extends SelectionSyntaxNode {

  protected _condition?: ExpressionSyntaxNode = undefined;
  protected _statements?: SyntaxList | null = undefined;
  protected _elseIfClauses?: SyntaxList | null = undefined;
  protected _elseClause?: ElseBlockSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get ifKeyword(): SyntaxToken {
    return new SyntaxToken((<IfBlockNode>this.node).ifKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<IfBlockNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get condition(): ExpressionSyntaxNode {
    if (this._condition === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._condition = node;
    }
    return this._condition;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<IfBlockNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get colon(): SyntaxToken {
    return new SyntaxToken((<IfBlockNode>this.node).colon, this, this.offsetAt(4), this.relativeIndexAt(4));
  }
  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<SyntaxList>(5);
    }
    return this._statements;
  }
  public get elseIfClauses(): SyntaxList | null {
    if (this._elseIfClauses === void 0) {
      this._elseIfClauses = this.createChildNode<SyntaxList>(6);
    }
    return this._elseIfClauses;
  }
  public get elseClause(): ElseBlockSyntaxNode | null {
    if (this._elseClause === void 0) {
      this._elseClause = this.createChildNode<ElseBlockSyntaxNode>(7);
    }
    return this._elseClause;
  }
  public get endIfKeyword(): SyntaxToken {
    return new SyntaxToken((<IfBlockNode>this.node).endIfKeyword, this, this.offsetAt(8), this.relativeIndexAt(8));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<IfBlockNode>this.node).semicolon, this, this.offsetAt(9), this.relativeIndexAt(9));
  }

  protected get count(): number {
    return 10;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitIfBlock(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitIfBlock(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._condition !== void 0 ? this._condition : null;
      case 5:
        return this._statements !== void 0 ? this._statements : null;
      case 6:
        return this._elseIfClauses !== void 0 ? this._elseIfClauses : null;
      case 7:
        return this._elseClause !== void 0 ? this._elseClause : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._condition === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._condition = node;
        }
        return this._condition;
      case 5:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<SyntaxList>(5);
        }
        return this._statements;
      case 6:
        if (this._elseIfClauses === void 0) {
          this._elseIfClauses = this.createChildNode<SyntaxList>(6);
        }
        return this._elseIfClauses;
      case 7:
        if (this._elseClause === void 0) {
          this._elseClause = this.createChildNode<ElseBlockSyntaxNode>(7);
        }
        return this._elseClause;
      default:
        return null;
    }
  }

}
export class IncompleteMemberSyntaxNode extends StatementSyntaxNode {

  protected _modifiers?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get modifiers(): SyntaxList {
    if (this._modifiers === void 0) {
      let node: SyntaxList | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._modifiers = node;
    }
    return this._modifiers;
  }

  protected get count(): number {
    return 1;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitIncompleteMember(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitIncompleteMember(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._modifiers !== void 0 ? this._modifiers : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._modifiers === void 0) {
          let node: SyntaxList | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._modifiers = node;
        }
        return this._modifiers;
      default:
        return null;
    }
  }

}
export class IndirectMemberAccessSyntaxNode extends MemberAccessSyntaxNode {

  protected _dereferencable?: ExpressionSyntaxNode = undefined;
  protected _member?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get dereferencable(): ExpressionSyntaxNode {
    if (this._dereferencable === void 0) {
      let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._dereferencable = node;
    }
    return this._dereferencable;
  }
  public get objectOperator(): SyntaxToken {
    return new SyntaxToken((<IndirectMemberAccessNode>this.node).objectOperator, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get openBrace(): SyntaxToken | null {
    let token = (<IndirectMemberAccessNode>this.node).openBrace;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get member(): ExpressionSyntaxNode {
    if (this._member === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(3);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._member = node;
    }
    return this._member;
  }
  public get closeBrace(): SyntaxToken | null {
    let token = (<IndirectMemberAccessNode>this.node).closeBrace;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(4), this.relativeIndexAt(4));
    }
    return null;
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitMemberAccess(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitMemberAccess(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._dereferencable !== void 0 ? this._dereferencable : null;
      case 3:
        return this._member !== void 0 ? this._member : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._dereferencable === void 0) {
          let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._dereferencable = node;
        }
        return this._dereferencable;
      case 3:
        if (this._member === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(3);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._member = node;
        }
        return this._member;
      default:
        return null;
    }
  }

}
export class IndirectMethodInvocationSyntaxNode extends MemberInvocationSyntaxNode {

  protected _dereferenceable?: ExpressionSyntaxNode = undefined;
  protected _member?: ExpressionSyntaxNode = undefined;
  protected _argumentList?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get dereferenceable(): ExpressionSyntaxNode {
    if (this._dereferenceable === void 0) {
      let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._dereferenceable = node;
    }
    return this._dereferenceable;
  }
  public get objectOperator(): SyntaxToken {
    return new SyntaxToken((<IndirectMethodInvocationNode>this.node).objectOperator, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get openBrace(): SyntaxToken | null {
    let token = (<IndirectMethodInvocationNode>this.node).openBrace;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get member(): ExpressionSyntaxNode {
    if (this._member === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(3);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._member = node;
    }
    return this._member;
  }
  public get closeBrace(): SyntaxToken | null {
    let token = (<IndirectMethodInvocationNode>this.node).closeBrace;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(4), this.relativeIndexAt(4));
    }
    return null;
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<IndirectMethodInvocationNode>this.node).openParen, this, this.offsetAt(5), this.relativeIndexAt(5));
  }
  public get argumentList(): SyntaxList | null {
    if (this._argumentList === void 0) {
      this._argumentList = this.createChildNode<SyntaxList>(6);
    }
    return this._argumentList;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<IndirectMethodInvocationNode>this.node).closeParen, this, this.offsetAt(7), this.relativeIndexAt(7));
  }

  protected get count(): number {
    return 8;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitMethodInvocation(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitMethodInvocation(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._dereferenceable !== void 0 ? this._dereferenceable : null;
      case 3:
        return this._member !== void 0 ? this._member : null;
      case 6:
        return this._argumentList !== void 0 ? this._argumentList : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._dereferenceable === void 0) {
          let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._dereferenceable = node;
        }
        return this._dereferenceable;
      case 3:
        if (this._member === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(3);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._member = node;
        }
        return this._member;
      case 6:
        if (this._argumentList === void 0) {
          this._argumentList = this.createChildNode<SyntaxList>(6);
        }
        return this._argumentList;
      default:
        return null;
    }
  }

}
export class IndirectObjectCreationSyntaxNode extends ObjectCreationSyntaxNode {

  protected _classNameReference?: ExpressionSyntaxNode = undefined;
  protected _argumentList?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get newKeyword(): SyntaxToken {
    return new SyntaxToken((<IndirectObjectCreationNode>this.node).newKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get classNameReference(): ExpressionSyntaxNode {
    if (this._classNameReference === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._classNameReference = node;
    }
    return this._classNameReference;
  }
  public get openParen(): SyntaxToken | null {
    let token = (<IndirectObjectCreationNode>this.node).openParen;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get argumentList(): SyntaxList | null {
    if (this._argumentList === void 0) {
      this._argumentList = this.createChildNode<SyntaxList>(3);
    }
    return this._argumentList;
  }
  public get closeParen(): SyntaxToken | null {
    let token = (<IndirectObjectCreationNode>this.node).closeParen;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(4), this.relativeIndexAt(4));
    }
    return null;
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitObjectCreation(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitObjectCreation(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._classNameReference !== void 0 ? this._classNameReference : null;
      case 3:
        return this._argumentList !== void 0 ? this._argumentList : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._classNameReference === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._classNameReference = node;
        }
        return this._classNameReference;
      case 3:
        if (this._argumentList === void 0) {
          this._argumentList = this.createChildNode<SyntaxList>(3);
        }
        return this._argumentList;
      default:
        return null;
    }
  }

}
export class IndirectScopedInvocationSyntaxNode extends ScopedInvocationSyntaxNode {

  protected _qualifier?: ExpressionSyntaxNode | NameSyntaxNode = undefined;
  protected _member?: ExpressionSyntaxNode = undefined;
  protected _argumentList?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get qualifier(): ExpressionSyntaxNode | NameSyntaxNode {
    if (this._qualifier === void 0) {
      let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._qualifier = node;
    }
    return this._qualifier;
  }
  public get doubleColon(): SyntaxToken {
    return new SyntaxToken((<IndirectScopedInvocationNode>this.node).doubleColon, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get openBrace(): SyntaxToken | null {
    let token = (<IndirectScopedInvocationNode>this.node).openBrace;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get member(): ExpressionSyntaxNode {
    if (this._member === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(3);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._member = node;
    }
    return this._member;
  }
  public get closeBrace(): SyntaxToken | null {
    let token = (<IndirectScopedInvocationNode>this.node).closeBrace;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(4), this.relativeIndexAt(4));
    }
    return null;
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<IndirectScopedInvocationNode>this.node).openParen, this, this.offsetAt(5), this.relativeIndexAt(5));
  }
  public get argumentList(): SyntaxList | null {
    if (this._argumentList === void 0) {
      this._argumentList = this.createChildNode<SyntaxList>(6);
    }
    return this._argumentList;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<IndirectScopedInvocationNode>this.node).closeParen, this, this.offsetAt(7), this.relativeIndexAt(7));
  }

  protected get count(): number {
    return 8;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitScopedInvocation(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitScopedInvocation(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._qualifier !== void 0 ? this._qualifier : null;
      case 3:
        return this._member !== void 0 ? this._member : null;
      case 6:
        return this._argumentList !== void 0 ? this._argumentList : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._qualifier === void 0) {
          let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._qualifier = node;
        }
        return this._qualifier;
      case 3:
        if (this._member === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(3);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._member = node;
        }
        return this._member;
      case 6:
        if (this._argumentList === void 0) {
          this._argumentList = this.createChildNode<SyntaxList>(6);
        }
        return this._argumentList;
      default:
        return null;
    }
  }

}
export class IndirectStringVariableSyntaxNode extends ExpressionSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get dollarOpenBrace(): SyntaxToken {
    return new SyntaxToken((<IndirectStringVariableNode>this.node).dollarOpenBrace, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<IndirectStringVariableNode>this.node).closeBrace, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitIndirectStringVariable(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitIndirectStringVariable(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class IndirectVariableSyntaxNode extends VariableSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get dollar(): SyntaxToken {
    return new SyntaxToken((<IndirectVariableNode>this.node).dollar, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openBrace(): SyntaxToken | null {
    let token = (<IndirectVariableNode>this.node).openBrace;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }
  public get closeBrace(): SyntaxToken | null {
    let token = (<IndirectVariableNode>this.node).closeBrace;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(3), this.relativeIndexAt(3));
    }
    return null;
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitIndirectVariable(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitIndirectVariable(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class InstanceOfSyntaxNode extends ExpressionSyntaxNode {

  protected _operand?: ExpressionSyntaxNode = undefined;
  protected _classNameOrReference?: ExpressionSyntaxNode | NameSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get operand(): ExpressionSyntaxNode {
    if (this._operand === void 0) {
      let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._operand = node;
    }
    return this._operand;
  }
  public get instanceOfKeyword(): SyntaxToken {
    return new SyntaxToken((<InstanceOfNode>this.node).instanceOfKeyword, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get classNameOrReference(): ExpressionSyntaxNode | NameSyntaxNode {
    if (this._classNameOrReference === void 0) {
      let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._classNameOrReference = node;
    }
    return this._classNameOrReference;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitInstanceOf(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitInstanceOf(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._operand !== void 0 ? this._operand : null;
      case 2:
        return this._classNameOrReference !== void 0 ? this._classNameOrReference : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._operand === void 0) {
          let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._operand = node;
        }
        return this._operand;
      case 2:
        if (this._classNameOrReference === void 0) {
          let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._classNameOrReference = node;
        }
        return this._classNameOrReference;
      default:
        return null;
    }
  }

}
export class InterfaceDeclarationSyntaxNode extends TypeDeclarationSyntaxNode {

  protected _baseInterfaces?: SyntaxList | null = undefined;
  protected _members?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get interfaceKeyword(): SyntaxToken {
    return new SyntaxToken((<InterfaceDeclarationNode>this.node).interfaceKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get identifier(): SyntaxToken {
    return new SyntaxToken((<InterfaceDeclarationNode>this.node).identifier, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get extendsKeyword(): SyntaxToken | null {
    let token = (<InterfaceDeclarationNode>this.node).extendsKeyword;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get baseInterfaces(): SyntaxList | null {
    if (this._baseInterfaces === void 0) {
      this._baseInterfaces = this.createChildNode<SyntaxList>(3);
    }
    return this._baseInterfaces;
  }
  public get openBrace(): SyntaxToken {
    return new SyntaxToken((<InterfaceDeclarationNode>this.node).openBrace, this, this.offsetAt(4), this.relativeIndexAt(4));
  }
  public get members(): SyntaxList | null {
    if (this._members === void 0) {
      this._members = this.createChildNode<SyntaxList>(5);
    }
    return this._members;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<InterfaceDeclarationNode>this.node).closeBrace, this, this.offsetAt(6), this.relativeIndexAt(6));
  }

  protected get count(): number {
    return 7;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitInterfaceDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitInterfaceDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 3:
        return this._baseInterfaces !== void 0 ? this._baseInterfaces : null;
      case 5:
        return this._members !== void 0 ? this._members : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 3:
        if (this._baseInterfaces === void 0) {
          this._baseInterfaces = this.createChildNode<SyntaxList>(3);
        }
        return this._baseInterfaces;
      case 5:
        if (this._members === void 0) {
          this._members = this.createChildNode<SyntaxList>(5);
        }
        return this._members;
      default:
        return null;
    }
  }

}
export class IsSetIntrinsicSyntaxNode extends IntrinsicSyntaxNode {

  protected _expressions?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get isSetKeyword(): SyntaxToken {
    return new SyntaxToken((<IsSetIntrinsicNode>this.node).isSetKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<IsSetIntrinsicNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get expressions(): SyntaxList {
    if (this._expressions === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expressions = node;
    }
    return this._expressions;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<IsSetIntrinsicNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitIsSetIntrinsic(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitIsSetIntrinsic(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expressions !== void 0 ? this._expressions : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expressions === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expressions = node;
        }
        return this._expressions;
      default:
        return null;
    }
  }

}
export class LabelSyntaxNode extends StatementSyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get label(): SyntaxToken {
    return new SyntaxToken((<LabelNode>this.node).label, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get colon(): SyntaxToken {
    return new SyntaxToken((<LabelNode>this.node).colon, this, this.offsetAt(1), this.relativeIndexAt(1));
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitLabel(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitLabel(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class LexicalVariableSyntaxNode extends VariableSyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get ampersand(): SyntaxToken | null {
    let token = (<LexicalVariableNode>this.node).ampersand;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(0), this.relativeIndexAt(0));
    }
    return null;
  }
  public get variable(): SyntaxToken {
    return new SyntaxToken((<LexicalVariableNode>this.node).variable, this, this.offsetAt(1), this.relativeIndexAt(1));
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitLexicalVariable(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitLexicalVariable(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class LiteralSyntaxNode extends ExpressionSyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get value(): SyntaxToken {
    return new SyntaxToken((<LiteralNode>this.node).value, this, this.offsetAt(0), this.relativeIndexAt(0));
  }

  protected get count(): number {
    return 1;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitLiteral(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitLiteral(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class LocalVariableSyntaxNode extends VariableSyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get variable(): SyntaxToken {
    return new SyntaxToken((<LocalVariableNode>this.node).variable, this, this.offsetAt(0), this.relativeIndexAt(0));
  }

  protected get count(): number {
    return 1;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitLocalVariable(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitLocalVariable(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class MethodDeclarationSyntaxNode extends StatementSyntaxNode {

  protected _modifiers?: SyntaxList | null = undefined;
  protected _parameters?: SyntaxList | null = undefined;
  protected _returnType?: NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null = undefined;
  protected _statements?: StatementBlockSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get modifiers(): SyntaxList | null {
    if (this._modifiers === void 0) {
      this._modifiers = this.createFirstChildNode<SyntaxList>();
    }
    return this._modifiers;
  }
  public get functionKeyword(): SyntaxToken {
    return new SyntaxToken((<MethodDeclarationNode>this.node).functionKeyword, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get ampersand(): SyntaxToken | null {
    let token = (<MethodDeclarationNode>this.node).ampersand;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get identifierOrKeyword(): SyntaxToken {
    return new SyntaxToken((<MethodDeclarationNode>this.node).identifierOrKeyword, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<MethodDeclarationNode>this.node).openParen, this, this.offsetAt(4), this.relativeIndexAt(4));
  }
  public get parameters(): SyntaxList | null {
    if (this._parameters === void 0) {
      this._parameters = this.createChildNode<SyntaxList>(5);
    }
    return this._parameters;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<MethodDeclarationNode>this.node).closeParen, this, this.offsetAt(6), this.relativeIndexAt(6));
  }
  public get colon(): SyntaxToken | null {
    let token = (<MethodDeclarationNode>this.node).colon;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(7), this.relativeIndexAt(7));
    }
    return null;
  }
  public get returnType(): NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null {
    if (this._returnType === void 0) {
      this._returnType = this.createChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>(8);
    }
    return this._returnType;
  }
  public get statements(): StatementBlockSyntaxNode | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<StatementBlockSyntaxNode>(9);
    }
    return this._statements;
  }
  public get semicolon(): SyntaxToken | null {
    let token = (<MethodDeclarationNode>this.node).semicolon;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(10), this.relativeIndexAt(10));
    }
    return null;
  }

  protected get count(): number {
    return 11;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitMethodDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitMethodDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._modifiers !== void 0 ? this._modifiers : null;
      case 5:
        return this._parameters !== void 0 ? this._parameters : null;
      case 8:
        return this._returnType !== void 0 ? this._returnType : null;
      case 9:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._modifiers === void 0) {
          this._modifiers = this.createFirstChildNode<SyntaxList>();
        }
        return this._modifiers;
      case 5:
        if (this._parameters === void 0) {
          this._parameters = this.createChildNode<SyntaxList>(5);
        }
        return this._parameters;
      case 8:
        if (this._returnType === void 0) {
          this._returnType = this.createChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>(8);
        }
        return this._returnType;
      case 9:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<StatementBlockSyntaxNode>(9);
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class NamedMemberAccessSyntaxNode extends MemberAccessSyntaxNode {

  protected _dereferencable?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get dereferencable(): ExpressionSyntaxNode {
    if (this._dereferencable === void 0) {
      let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._dereferencable = node;
    }
    return this._dereferencable;
  }
  public get objectOperator(): SyntaxToken {
    return new SyntaxToken((<NamedMemberAccessNode>this.node).objectOperator, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get member(): SyntaxToken {
    return new SyntaxToken((<NamedMemberAccessNode>this.node).member, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitMemberAccess(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitMemberAccess(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._dereferencable !== void 0 ? this._dereferencable : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._dereferencable === void 0) {
          let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._dereferencable = node;
        }
        return this._dereferencable;
      default:
        return null;
    }
  }

}
export class NamedMethodInvocationSyntaxNode extends MemberInvocationSyntaxNode {

  protected _dereferenceable?: ExpressionSyntaxNode = undefined;
  protected _argumentList?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get dereferenceable(): ExpressionSyntaxNode {
    if (this._dereferenceable === void 0) {
      let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._dereferenceable = node;
    }
    return this._dereferenceable;
  }
  public get objectOperator(): SyntaxToken {
    return new SyntaxToken((<NamedMethodInvocationNode>this.node).objectOperator, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get identifierOrKeyword(): SyntaxToken {
    return new SyntaxToken((<NamedMethodInvocationNode>this.node).identifierOrKeyword, this, this.offsetAt(2), this.relativeIndexAt(2));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<NamedMethodInvocationNode>this.node).openParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get argumentList(): SyntaxList | null {
    if (this._argumentList === void 0) {
      this._argumentList = this.createChildNode<SyntaxList>(4);
    }
    return this._argumentList;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<NamedMethodInvocationNode>this.node).closeParen, this, this.offsetAt(5), this.relativeIndexAt(5));
  }

  protected get count(): number {
    return 6;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitMethodInvocation(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitMethodInvocation(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._dereferenceable !== void 0 ? this._dereferenceable : null;
      case 4:
        return this._argumentList !== void 0 ? this._argumentList : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._dereferenceable === void 0) {
          let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._dereferenceable = node;
        }
        return this._dereferenceable;
      case 4:
        if (this._argumentList === void 0) {
          this._argumentList = this.createChildNode<SyntaxList>(4);
        }
        return this._argumentList;
      default:
        return null;
    }
  }

}
export class NamedObjectCreationSyntaxNode extends ObjectCreationSyntaxNode {

  protected _className?: NameSyntaxNode = undefined;
  protected _argumentList?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get newKeyword(): SyntaxToken {
    return new SyntaxToken((<NamedObjectCreationNode>this.node).newKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get className(): NameSyntaxNode {
    if (this._className === void 0) {
      let node: NameSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._className = node;
    }
    return this._className;
  }
  public get openParen(): SyntaxToken | null {
    let token = (<NamedObjectCreationNode>this.node).openParen;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get argumentList(): SyntaxList | null {
    if (this._argumentList === void 0) {
      this._argumentList = this.createChildNode<SyntaxList>(3);
    }
    return this._argumentList;
  }
  public get closeParen(): SyntaxToken | null {
    let token = (<NamedObjectCreationNode>this.node).closeParen;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(4), this.relativeIndexAt(4));
    }
    return null;
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitObjectCreation(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitObjectCreation(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._className !== void 0 ? this._className : null;
      case 3:
        return this._argumentList !== void 0 ? this._argumentList : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._className === void 0) {
          let node: NameSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._className = node;
        }
        return this._className;
      case 3:
        if (this._argumentList === void 0) {
          this._argumentList = this.createChildNode<SyntaxList>(3);
        }
        return this._argumentList;
      default:
        return null;
    }
  }

}
export class NamedScopedInvocationSyntaxNode extends ScopedInvocationSyntaxNode {

  protected _qualifier?: ExpressionSyntaxNode | NameSyntaxNode = undefined;
  protected _argumentList?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get qualifier(): ExpressionSyntaxNode | NameSyntaxNode {
    if (this._qualifier === void 0) {
      let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._qualifier = node;
    }
    return this._qualifier;
  }
  public get doubleColon(): SyntaxToken {
    return new SyntaxToken((<NamedScopedInvocationNode>this.node).doubleColon, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get member(): SyntaxToken {
    return new SyntaxToken((<NamedScopedInvocationNode>this.node).member, this, this.offsetAt(2), this.relativeIndexAt(2));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<NamedScopedInvocationNode>this.node).openParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get argumentList(): SyntaxList | null {
    if (this._argumentList === void 0) {
      this._argumentList = this.createChildNode<SyntaxList>(4);
    }
    return this._argumentList;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<NamedScopedInvocationNode>this.node).closeParen, this, this.offsetAt(5), this.relativeIndexAt(5));
  }

  protected get count(): number {
    return 6;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitScopedInvocation(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitScopedInvocation(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._qualifier !== void 0 ? this._qualifier : null;
      case 4:
        return this._argumentList !== void 0 ? this._argumentList : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._qualifier === void 0) {
          let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._qualifier = node;
        }
        return this._qualifier;
      case 4:
        if (this._argumentList === void 0) {
          this._argumentList = this.createChildNode<SyntaxList>(4);
        }
        return this._argumentList;
      default:
        return null;
    }
  }

}
export class NamedTraitAliasSyntaxNode extends TraitAliasSyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get methodName(): SyntaxToken {
    return new SyntaxToken((<NamedTraitAliasNode>this.node).methodName, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get asKeyword(): SyntaxToken {
    return new SyntaxToken((<NamedTraitAliasNode>this.node).asKeyword, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get modifier(): SyntaxToken | null {
    let token = (<NamedTraitAliasNode>this.node).modifier;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get alias(): SyntaxToken | null {
    let token = (<NamedTraitAliasNode>this.node).alias;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(3), this.relativeIndexAt(3));
    }
    return null;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<NamedTraitAliasNode>this.node).semicolon, this, this.offsetAt(4), this.relativeIndexAt(4));
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitTraitAlias(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitTraitAlias(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class NamedTypeSyntaxNode extends TypeSyntaxNode {

  protected _typeName?: NameSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get question(): SyntaxToken | null {
    let token = (<NamedTypeNode>this.node).question;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(0), this.relativeIndexAt(0));
    }
    return null;
  }
  public get typeName(): NameSyntaxNode {
    if (this._typeName === void 0) {
      let node: NameSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._typeName = node;
    }
    return this._typeName;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitType(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitType(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._typeName !== void 0 ? this._typeName : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._typeName === void 0) {
          let node: NameSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._typeName = node;
        }
        return this._typeName;
      default:
        return null;
    }
  }

}
export class NamespaceDeclarationSyntaxNode extends StatementSyntaxNode {

  protected _name?: NameSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get namespaceKeyword(): SyntaxToken {
    return new SyntaxToken((<NamespaceDeclarationNode>this.node).namespaceKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get name(): NameSyntaxNode {
    if (this._name === void 0) {
      let node: NameSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._name = node;
    }
    return this._name;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<NamespaceDeclarationNode>this.node).semicolon, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitNamespaceDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitNamespaceDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._name !== void 0 ? this._name : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._name === void 0) {
          let node: NameSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._name = node;
        }
        return this._name;
      default:
        return null;
    }
  }

}
export class NamespaceGroupDeclarationSyntaxNode extends StatementSyntaxNode {

  protected _name?: NameSyntaxNode | null = undefined;
  protected _statements?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get namespaceKeyword(): SyntaxToken {
    return new SyntaxToken((<NamespaceGroupDeclarationNode>this.node).namespaceKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get name(): NameSyntaxNode | null {
    if (this._name === void 0) {
      this._name = this.createChildNode<NameSyntaxNode>(1);
    }
    return this._name;
  }
  public get openBrace(): SyntaxToken {
    return new SyntaxToken((<NamespaceGroupDeclarationNode>this.node).openBrace, this, this.offsetAt(2), this.relativeIndexAt(2));
  }
  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<SyntaxList>(3);
    }
    return this._statements;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<NamespaceGroupDeclarationNode>this.node).closeBrace, this, this.offsetAt(4), this.relativeIndexAt(4));
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitNamespaceGroupDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitNamespaceGroupDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._name !== void 0 ? this._name : null;
      case 3:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._name === void 0) {
          this._name = this.createChildNode<NameSyntaxNode>(1);
        }
        return this._name;
      case 3:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<SyntaxList>(3);
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class PartiallyQualifiedNameSyntaxNode extends NameSyntaxNode {

  protected _namespaceName?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get namespaceName(): SyntaxList {
    if (this._namespaceName === void 0) {
      let node: SyntaxList | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._namespaceName = node;
    }
    return this._namespaceName;
  }

  protected get count(): number {
    return 1;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitPartiallyQualifiedName(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitPartiallyQualifiedName(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._namespaceName !== void 0 ? this._namespaceName : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._namespaceName === void 0) {
          let node: SyntaxList | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._namespaceName = node;
        }
        return this._namespaceName;
      default:
        return null;
    }
  }

}
export class PostfixUnarySyntaxNode extends ExpressionSyntaxNode {

  protected _operand?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get operand(): ExpressionSyntaxNode {
    if (this._operand === void 0) {
      let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._operand = node;
    }
    return this._operand;
  }
  public get operator(): SyntaxToken {
    return new SyntaxToken((<PostfixUnaryNode>this.node).operator, this, this.offsetAt(1), this.relativeIndexAt(1));
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitPostfixUnaryExpression(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitPostfixUnaryExpression(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._operand !== void 0 ? this._operand : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._operand === void 0) {
          let node: ExpressionSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._operand = node;
        }
        return this._operand;
      default:
        return null;
    }
  }

}
export class PredefinedTypeSyntaxNode extends TypeSyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get question(): SyntaxToken | null {
    let token = (<PredefinedTypeNode>this.node).question;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(0), this.relativeIndexAt(0));
    }
    return null;
  }
  public get keyword(): SyntaxToken {
    return new SyntaxToken((<PredefinedTypeNode>this.node).keyword, this, this.offsetAt(1), this.relativeIndexAt(1));
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitType(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitType(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class PrintIntrinsicSyntaxNode extends IntrinsicSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get printKeyword(): SyntaxToken {
    return new SyntaxToken((<PrintIntrinsicNode>this.node).printKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitPrintIntrinsic(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitPrintIntrinsic(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class PropertyDeclarationSyntaxNode extends StatementSyntaxNode {

  protected _modifiers?: SyntaxList = undefined;
  protected _type?: NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null = undefined;
  protected _properties?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get modifiers(): SyntaxList {
    if (this._modifiers === void 0) {
      let node: SyntaxList | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._modifiers = node;
    }
    return this._modifiers;
  }
  public get type(): NamedTypeSyntaxNode | PredefinedTypeSyntaxNode | null {
    if (this._type === void 0) {
      this._type = this.createChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>(1);
    }
    return this._type;
  }
  public get properties(): SyntaxList {
    if (this._properties === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._properties = node;
    }
    return this._properties;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<PropertyDeclarationNode>this.node).semicolon, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitPropertyDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitPropertyDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._modifiers !== void 0 ? this._modifiers : null;
      case 1:
        return this._type !== void 0 ? this._type : null;
      case 2:
        return this._properties !== void 0 ? this._properties : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._modifiers === void 0) {
          let node: SyntaxList | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._modifiers = node;
        }
        return this._modifiers;
      case 1:
        if (this._type === void 0) {
          this._type = this.createChildNode<NamedTypeSyntaxNode | PredefinedTypeSyntaxNode>(1);
        }
        return this._type;
      case 2:
        if (this._properties === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._properties = node;
        }
        return this._properties;
      default:
        return null;
    }
  }

}
export class ReferencedTraitAliasSyntaxNode extends TraitAliasSyntaxNode {

  protected _reference?: MethodReferenceSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get reference(): MethodReferenceSyntaxNode {
    if (this._reference === void 0) {
      let node: MethodReferenceSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._reference = node;
    }
    return this._reference;
  }
  public get asKeyword(): SyntaxToken {
    return new SyntaxToken((<ReferencedTraitAliasNode>this.node).asKeyword, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get modifier(): SyntaxToken | null {
    let token = (<ReferencedTraitAliasNode>this.node).modifier;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get alias(): SyntaxToken | null {
    let token = (<ReferencedTraitAliasNode>this.node).alias;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(3), this.relativeIndexAt(3));
    }
    return null;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<ReferencedTraitAliasNode>this.node).semicolon, this, this.offsetAt(4), this.relativeIndexAt(4));
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitTraitAlias(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitTraitAlias(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._reference !== void 0 ? this._reference : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._reference === void 0) {
          let node: MethodReferenceSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._reference = node;
        }
        return this._reference;
      default:
        return null;
    }
  }

}
export class RelativeNameSyntaxNode extends NameSyntaxNode {

  protected _namespaceName?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get namespaceKeyword(): SyntaxToken {
    return new SyntaxToken((<RelativeNameNode>this.node).namespaceKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get leadingBackslash(): SyntaxToken {
    return new SyntaxToken((<RelativeNameNode>this.node).leadingBackslash, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get namespaceName(): SyntaxList {
    if (this._namespaceName === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._namespaceName = node;
    }
    return this._namespaceName;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitRelativeName(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitRelativeName(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._namespaceName !== void 0 ? this._namespaceName : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._namespaceName === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._namespaceName = node;
        }
        return this._namespaceName;
      default:
        return null;
    }
  }

}
export class ReturnSyntaxNode extends JumpSyntaxNode {

  protected _expression?: ExpressionSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get returnKeyword(): SyntaxToken {
    return new SyntaxToken((<ReturnNode>this.node).returnKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get expression(): ExpressionSyntaxNode | null {
    if (this._expression === void 0) {
      this._expression = this.createChildNode<ExpressionSyntaxNode>(1);
    }
    return this._expression;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<ReturnNode>this.node).semicolon, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitReturn(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitReturn(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expression === void 0) {
          this._expression = this.createChildNode<ExpressionSyntaxNode>(1);
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class ScriptInclusionSyntaxNode extends IntrinsicSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get inclusionKeyword(): SyntaxToken {
    return new SyntaxToken((<ScriptInclusionNode>this.node).inclusionKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitScriptInclusion(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitScriptInclusion(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class ShellCommandTemplateSyntaxNode extends ExpressionSyntaxNode {

  protected _template?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get openBackQuote(): SyntaxToken {
    return new SyntaxToken((<ShellCommandTemplateNode>this.node).openBackQuote, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get template(): SyntaxList | null {
    if (this._template === void 0) {
      this._template = this.createChildNode<SyntaxList>(1);
    }
    return this._template;
  }
  public get closeBackQuote(): SyntaxToken {
    return new SyntaxToken((<ShellCommandTemplateNode>this.node).closeBackQuote, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitShellCommandTemplate(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitShellCommandTemplate(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._template !== void 0 ? this._template : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._template === void 0) {
          this._template = this.createChildNode<SyntaxList>(1);
        }
        return this._template;
      default:
        return null;
    }
  }

}
export class StatementBlockSyntaxNode extends StatementSyntaxNode {

  protected _statements?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get openBrace(): SyntaxToken {
    return new SyntaxToken((<StatementBlockNode>this.node).openBrace, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<SyntaxList>(1);
    }
    return this._statements;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<StatementBlockNode>this.node).closeBrace, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitStatementBlock(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitStatementBlock(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<SyntaxList>(1);
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class StaticSyntaxNode extends StatementSyntaxNode {

  protected _variables?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get staticKeyword(): SyntaxToken {
    return new SyntaxToken((<StaticNode>this.node).staticKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get variables(): SyntaxList {
    if (this._variables === void 0) {
      let node: SyntaxList | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._variables = node;
    }
    return this._variables;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<StaticNode>this.node).semicolon, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitStaticDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitStaticDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._variables !== void 0 ? this._variables : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._variables === void 0) {
          let node: SyntaxList | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._variables = node;
        }
        return this._variables;
      default:
        return null;
    }
  }

}
export class StaticPropertySyntaxNode extends ScopedAccessSyntaxNode {

  protected _qualifier?: ExpressionSyntaxNode | NameSyntaxNode = undefined;
  protected _member?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get qualifier(): ExpressionSyntaxNode | NameSyntaxNode {
    if (this._qualifier === void 0) {
      let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createFirstChildNode();
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._qualifier = node;
    }
    return this._qualifier;
  }
  public get doubleColon(): SyntaxToken {
    return new SyntaxToken((<StaticPropertyNode>this.node).doubleColon, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get member(): ExpressionSyntaxNode {
    if (this._member === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._member = node;
    }
    return this._member;
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitStaticProperty(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitStaticProperty(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        return this._qualifier !== void 0 ? this._qualifier : null;
      case 2:
        return this._member !== void 0 ? this._member : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 0:
        if (this._qualifier === void 0) {
          let node: ExpressionSyntaxNode | NameSyntaxNode | null = this.createFirstChildNode();
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._qualifier = node;
        }
        return this._qualifier;
      case 2:
        if (this._member === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._member = node;
        }
        return this._member;
      default:
        return null;
    }
  }

}
export class StringElementAccessSyntaxNode extends ExpressionSyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get variable(): SyntaxToken {
    return new SyntaxToken((<StringElementAccessNode>this.node).variable, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openBracket(): SyntaxToken {
    return new SyntaxToken((<StringElementAccessNode>this.node).openBracket, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get minus(): SyntaxToken | null {
    let token = (<StringElementAccessNode>this.node).minus;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get index(): SyntaxToken {
    return new SyntaxToken((<StringElementAccessNode>this.node).index, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get closeBracket(): SyntaxToken {
    return new SyntaxToken((<StringElementAccessNode>this.node).closeBracket, this, this.offsetAt(4), this.relativeIndexAt(4));
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitStringElementAccess(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitStringElementAccess(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class StringExpressionSyntaxNode extends ExpressionSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get openBrace(): SyntaxToken {
    return new SyntaxToken((<StringExpressionNode>this.node).openBrace, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<StringExpressionNode>this.node).closeBrace, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitStringExpression(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitStringExpression(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class StringTemplateSyntaxNode extends ExpressionSyntaxNode {

  protected _template?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get openQuote(): SyntaxToken {
    return new SyntaxToken((<StringTemplateNode>this.node).openQuote, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get template(): SyntaxList {
    if (this._template === void 0) {
      let node: SyntaxList | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._template = node;
    }
    return this._template;
  }
  public get closeQuote(): SyntaxToken {
    return new SyntaxToken((<StringTemplateNode>this.node).closeQuote, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitStringTemplate(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitStringTemplate(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._template !== void 0 ? this._template : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._template === void 0) {
          let node: SyntaxList | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._template = node;
        }
        return this._template;
      default:
        return null;
    }
  }

}
export class StringVariableSyntaxNode extends VariableSyntaxNode {

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get identifier(): SyntaxToken {
    return new SyntaxToken((<StringVariableNode>this.node).identifier, this, this.offsetAt(0), this.relativeIndexAt(0));
  }

  protected get count(): number {
    return 1;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitStringVariable(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitStringVariable(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      default:
        return null;
    }
  }

}
export class SwitchSyntaxNode extends SelectionSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;
  protected _caseClauses?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get switchKeyword(): SyntaxToken {
    return new SyntaxToken((<SwitchNode>this.node).switchKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<SwitchNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<SwitchNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get openBrace(): SyntaxToken {
    return new SyntaxToken((<SwitchNode>this.node).openBrace, this, this.offsetAt(4), this.relativeIndexAt(4));
  }
  public get caseSemicolon(): SyntaxToken | null {
    let token = (<SwitchNode>this.node).caseSemicolon;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(5), this.relativeIndexAt(5));
    }
    return null;
  }
  public get caseClauses(): SyntaxList | null {
    if (this._caseClauses === void 0) {
      this._caseClauses = this.createChildNode<SyntaxList>(6);
    }
    return this._caseClauses;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<SwitchNode>this.node).closeBrace, this, this.offsetAt(7), this.relativeIndexAt(7));
  }

  protected get count(): number {
    return 8;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitSwitch(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitSwitch(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expression !== void 0 ? this._expression : null;
      case 6:
        return this._caseClauses !== void 0 ? this._caseClauses : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      case 6:
        if (this._caseClauses === void 0) {
          this._caseClauses = this.createChildNode<SyntaxList>(6);
        }
        return this._caseClauses;
      default:
        return null;
    }
  }

}
export class SwitchBlockSyntaxNode extends SelectionSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;
  protected _caseClauses?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get switchKeyword(): SyntaxToken {
    return new SyntaxToken((<SwitchBlockNode>this.node).switchKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<SwitchBlockNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<SwitchBlockNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get colon(): SyntaxToken {
    return new SyntaxToken((<SwitchBlockNode>this.node).colon, this, this.offsetAt(4), this.relativeIndexAt(4));
  }
  public get caseSemicolon(): SyntaxToken | null {
    let token = (<SwitchBlockNode>this.node).caseSemicolon;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(5), this.relativeIndexAt(5));
    }
    return null;
  }
  public get caseClauses(): SyntaxList | null {
    if (this._caseClauses === void 0) {
      this._caseClauses = this.createChildNode<SyntaxList>(6);
    }
    return this._caseClauses;
  }
  public get endSwitch(): SyntaxToken {
    return new SyntaxToken((<SwitchBlockNode>this.node).endSwitch, this, this.offsetAt(7), this.relativeIndexAt(7));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<SwitchBlockNode>this.node).semicolon, this, this.offsetAt(8), this.relativeIndexAt(8));
  }

  protected get count(): number {
    return 9;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitSwitchBlock(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitSwitchBlock(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expression !== void 0 ? this._expression : null;
      case 6:
        return this._caseClauses !== void 0 ? this._caseClauses : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      case 6:
        if (this._caseClauses === void 0) {
          this._caseClauses = this.createChildNode<SyntaxList>(6);
        }
        return this._caseClauses;
      default:
        return null;
    }
  }

}
export class ThrowSyntaxNode extends StatementSyntaxNode {

  protected _expression?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get throwKeyword(): SyntaxToken {
    return new SyntaxToken((<ThrowNode>this.node).throwKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get expression(): ExpressionSyntaxNode {
    if (this._expression === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expression = node;
    }
    return this._expression;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<ThrowNode>this.node).semicolon, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitThrow(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitThrow(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._expression !== void 0 ? this._expression : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._expression === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expression = node;
        }
        return this._expression;
      default:
        return null;
    }
  }

}
export class TraitDeclarationSyntaxNode extends TypeDeclarationSyntaxNode {

  protected _members?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get traitKeyword(): SyntaxToken {
    return new SyntaxToken((<TraitDeclarationNode>this.node).traitKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get identifier(): SyntaxToken {
    return new SyntaxToken((<TraitDeclarationNode>this.node).identifier, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get openBrace(): SyntaxToken {
    return new SyntaxToken((<TraitDeclarationNode>this.node).openBrace, this, this.offsetAt(2), this.relativeIndexAt(2));
  }
  public get members(): SyntaxList | null {
    if (this._members === void 0) {
      this._members = this.createChildNode<SyntaxList>(3);
    }
    return this._members;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<TraitDeclarationNode>this.node).closeBrace, this, this.offsetAt(4), this.relativeIndexAt(4));
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitTraitDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitTraitDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 3:
        return this._members !== void 0 ? this._members : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 3:
        if (this._members === void 0) {
          this._members = this.createChildNode<SyntaxList>(3);
        }
        return this._members;
      default:
        return null;
    }
  }

}
export class TraitUseSyntaxNode extends StatementSyntaxNode {

  protected _traitNames?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get useKeyword(): SyntaxToken {
    return new SyntaxToken((<TraitUseNode>this.node).useKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get traitNames(): SyntaxList {
    if (this._traitNames === void 0) {
      let node: SyntaxList | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._traitNames = node;
    }
    return this._traitNames;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<TraitUseNode>this.node).semicolon, this, this.offsetAt(2), this.relativeIndexAt(2));
  }

  protected get count(): number {
    return 3;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitTraitUse(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitTraitUse(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._traitNames !== void 0 ? this._traitNames : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._traitNames === void 0) {
          let node: SyntaxList | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._traitNames = node;
        }
        return this._traitNames;
      default:
        return null;
    }
  }

}
export class TraitUseGroupSyntaxNode extends StatementSyntaxNode {

  protected _traitNames?: SyntaxList = undefined;
  protected _adaptations?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get useKeyword(): SyntaxToken {
    return new SyntaxToken((<TraitUseGroupNode>this.node).useKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get traitNames(): SyntaxList {
    if (this._traitNames === void 0) {
      let node: SyntaxList | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._traitNames = node;
    }
    return this._traitNames;
  }
  public get openBrace(): SyntaxToken {
    return new SyntaxToken((<TraitUseGroupNode>this.node).openBrace, this, this.offsetAt(2), this.relativeIndexAt(2));
  }
  public get adaptations(): SyntaxList | null {
    if (this._adaptations === void 0) {
      this._adaptations = this.createChildNode<SyntaxList>(3);
    }
    return this._adaptations;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<TraitUseGroupNode>this.node).closeBrace, this, this.offsetAt(4), this.relativeIndexAt(4));
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitTraitUseGroup(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitTraitUseGroup(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._traitNames !== void 0 ? this._traitNames : null;
      case 3:
        return this._adaptations !== void 0 ? this._adaptations : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._traitNames === void 0) {
          let node: SyntaxList | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._traitNames = node;
        }
        return this._traitNames;
      case 3:
        if (this._adaptations === void 0) {
          this._adaptations = this.createChildNode<SyntaxList>(3);
        }
        return this._adaptations;
      default:
        return null;
    }
  }

}
export class TrySyntaxNode extends StatementSyntaxNode {

  protected _statements?: StatementBlockSyntaxNode = undefined;
  protected _catchClauses?: SyntaxList | null = undefined;
  protected _finallyClause?: TryFinallySyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get tryKeyword(): SyntaxToken {
    return new SyntaxToken((<TryNode>this.node).tryKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get statements(): StatementBlockSyntaxNode {
    if (this._statements === void 0) {
      let node: StatementBlockSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statements = node;
    }
    return this._statements;
  }
  public get catchClauses(): SyntaxList | null {
    if (this._catchClauses === void 0) {
      this._catchClauses = this.createChildNode<SyntaxList>(2);
    }
    return this._catchClauses;
  }
  public get finallyClause(): TryFinallySyntaxNode | null {
    if (this._finallyClause === void 0) {
      this._finallyClause = this.createChildNode<TryFinallySyntaxNode>(3);
    }
    return this._finallyClause;
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitTry(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitTry(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._statements !== void 0 ? this._statements : null;
      case 2:
        return this._catchClauses !== void 0 ? this._catchClauses : null;
      case 3:
        return this._finallyClause !== void 0 ? this._finallyClause : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._statements === void 0) {
          let node: StatementBlockSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statements = node;
        }
        return this._statements;
      case 2:
        if (this._catchClauses === void 0) {
          this._catchClauses = this.createChildNode<SyntaxList>(2);
        }
        return this._catchClauses;
      case 3:
        if (this._finallyClause === void 0) {
          this._finallyClause = this.createChildNode<TryFinallySyntaxNode>(3);
        }
        return this._finallyClause;
      default:
        return null;
    }
  }

}
export class UnarySyntaxNode extends ExpressionSyntaxNode {

  protected _operand?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get operator(): SyntaxToken {
    return new SyntaxToken((<UnaryNode>this.node).operator, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get operand(): ExpressionSyntaxNode {
    if (this._operand === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._operand = node;
    }
    return this._operand;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitUnaryExpression(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitUnaryExpression(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._operand !== void 0 ? this._operand : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._operand === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._operand = node;
        }
        return this._operand;
      default:
        return null;
    }
  }

}
export class UnsetSyntaxNode extends StatementSyntaxNode {

  protected _expressionList?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get unsetKeyword(): SyntaxToken {
    return new SyntaxToken((<UnsetNode>this.node).unsetKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<UnsetNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get expressionList(): SyntaxList {
    if (this._expressionList === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._expressionList = node;
    }
    return this._expressionList;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<UnsetNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<UnsetNode>this.node).semicolon, this, this.offsetAt(4), this.relativeIndexAt(4));
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitUnset(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitUnset(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._expressionList !== void 0 ? this._expressionList : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._expressionList === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._expressionList = node;
        }
        return this._expressionList;
      default:
        return null;
    }
  }

}
export class UseDeclarationSyntaxNode extends StatementSyntaxNode {

  protected _declarations?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get useKeyword(): SyntaxToken {
    return new SyntaxToken((<UseDeclarationNode>this.node).useKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get useType(): SyntaxToken | null {
    let token = (<UseDeclarationNode>this.node).useType;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get declarations(): SyntaxList {
    if (this._declarations === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._declarations = node;
    }
    return this._declarations;
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<UseDeclarationNode>this.node).semicolon, this, this.offsetAt(3), this.relativeIndexAt(3));
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitUseDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitUseDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._declarations !== void 0 ? this._declarations : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._declarations === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._declarations = node;
        }
        return this._declarations;
      default:
        return null;
    }
  }

}
export class UseGroupDeclarationSyntaxNode extends StatementSyntaxNode {

  protected _rootName?: SyntaxList = undefined;
  protected _declarations?: SyntaxList = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get useKeyword(): SyntaxToken {
    return new SyntaxToken((<UseGroupDeclarationNode>this.node).useKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get useType(): SyntaxToken | null {
    let token = (<UseGroupDeclarationNode>this.node).useType;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(1), this.relativeIndexAt(1));
    }
    return null;
  }
  public get rootName(): SyntaxList {
    if (this._rootName === void 0) {
      let node: SyntaxList | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._rootName = node;
    }
    return this._rootName;
  }
  public get openBrace(): SyntaxToken {
    return new SyntaxToken((<UseGroupDeclarationNode>this.node).openBrace, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get declarations(): SyntaxList {
    if (this._declarations === void 0) {
      let node: SyntaxList | null = this.createChildNode(4);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._declarations = node;
    }
    return this._declarations;
  }
  public get closeBrace(): SyntaxToken {
    return new SyntaxToken((<UseGroupDeclarationNode>this.node).closeBrace, this, this.offsetAt(5), this.relativeIndexAt(5));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<UseGroupDeclarationNode>this.node).semicolon, this, this.offsetAt(6), this.relativeIndexAt(6));
  }

  protected get count(): number {
    return 7;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitUseGroupDeclaration(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitUseGroupDeclaration(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._rootName !== void 0 ? this._rootName : null;
      case 4:
        return this._declarations !== void 0 ? this._declarations : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._rootName === void 0) {
          let node: SyntaxList | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._rootName = node;
        }
        return this._rootName;
      case 4:
        if (this._declarations === void 0) {
          let node: SyntaxList | null = this.createChildNode(4);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._declarations = node;
        }
        return this._declarations;
      default:
        return null;
    }
  }

}
export class WhileSyntaxNode extends IterationSyntaxNode {

  protected _condition?: ExpressionSyntaxNode = undefined;
  protected _statement?: StatementSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get whileKeyword(): SyntaxToken {
    return new SyntaxToken((<WhileNode>this.node).whileKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<WhileNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get condition(): ExpressionSyntaxNode {
    if (this._condition === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._condition = node;
    }
    return this._condition;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<WhileNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get statement(): StatementSyntaxNode {
    if (this._statement === void 0) {
      let node: StatementSyntaxNode | null = this.createChildNode(4);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._statement = node;
    }
    return this._statement;
  }

  protected get count(): number {
    return 5;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitWhile(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitWhile(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._condition !== void 0 ? this._condition : null;
      case 4:
        return this._statement !== void 0 ? this._statement : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._condition === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._condition = node;
        }
        return this._condition;
      case 4:
        if (this._statement === void 0) {
          let node: StatementSyntaxNode | null = this.createChildNode(4);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._statement = node;
        }
        return this._statement;
      default:
        return null;
    }
  }

}
export class WhileBlockSyntaxNode extends IterationSyntaxNode {

  protected _condition?: ExpressionSyntaxNode = undefined;
  protected _statements?: SyntaxList | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get whileKeyword(): SyntaxToken {
    return new SyntaxToken((<WhileBlockNode>this.node).whileKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get openParen(): SyntaxToken {
    return new SyntaxToken((<WhileBlockNode>this.node).openParen, this, this.offsetAt(1), this.relativeIndexAt(1));
  }
  public get condition(): ExpressionSyntaxNode {
    if (this._condition === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(2);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._condition = node;
    }
    return this._condition;
  }
  public get closeParen(): SyntaxToken {
    return new SyntaxToken((<WhileBlockNode>this.node).closeParen, this, this.offsetAt(3), this.relativeIndexAt(3));
  }
  public get colon(): SyntaxToken {
    return new SyntaxToken((<WhileBlockNode>this.node).colon, this, this.offsetAt(4), this.relativeIndexAt(4));
  }
  public get statements(): SyntaxList | null {
    if (this._statements === void 0) {
      this._statements = this.createChildNode<SyntaxList>(5);
    }
    return this._statements;
  }
  public get endWhileKeyword(): SyntaxToken {
    return new SyntaxToken((<WhileBlockNode>this.node).endWhileKeyword, this, this.offsetAt(6), this.relativeIndexAt(6));
  }
  public get semicolon(): SyntaxToken {
    return new SyntaxToken((<WhileBlockNode>this.node).semicolon, this, this.offsetAt(7), this.relativeIndexAt(7));
  }

  protected get count(): number {
    return 8;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitWhileBlock(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitWhileBlock(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        return this._condition !== void 0 ? this._condition : null;
      case 5:
        return this._statements !== void 0 ? this._statements : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 2:
        if (this._condition === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(2);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._condition = node;
        }
        return this._condition;
      case 5:
        if (this._statements === void 0) {
          this._statements = this.createChildNode<SyntaxList>(5);
        }
        return this._statements;
      default:
        return null;
    }
  }

}
export class YieldSyntaxNode extends ExpressionSyntaxNode {

  protected _key?: ExpressionSyntaxNode | null = undefined;
  protected _value?: ExpressionSyntaxNode | null = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get yieldKeyword(): SyntaxToken {
    return new SyntaxToken((<YieldNode>this.node).yieldKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get key(): ExpressionSyntaxNode | null {
    if (this._key === void 0) {
      this._key = this.createChildNode<ExpressionSyntaxNode>(1);
    }
    return this._key;
  }
  public get doubleArrow(): SyntaxToken | null {
    let token = (<YieldNode>this.node).doubleArrow;
    if (token !== null) {
      return new SyntaxToken(token, this, this.offsetAt(2), this.relativeIndexAt(2));
    }
    return null;
  }
  public get value(): ExpressionSyntaxNode | null {
    if (this._value === void 0) {
      this._value = this.createChildNode<ExpressionSyntaxNode>(3);
    }
    return this._value;
  }

  protected get count(): number {
    return 4;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitYield(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitYield(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._key !== void 0 ? this._key : null;
      case 3:
        return this._value !== void 0 ? this._value : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._key === void 0) {
          this._key = this.createChildNode<ExpressionSyntaxNode>(1);
        }
        return this._key;
      case 3:
        if (this._value === void 0) {
          this._value = this.createChildNode<ExpressionSyntaxNode>(3);
        }
        return this._value;
      default:
        return null;
    }
  }

}
export class YieldFromSyntaxNode extends ExpressionSyntaxNode {

  protected _delegate?: ExpressionSyntaxNode = undefined;

  constructor(node: INode, parent: ISyntaxNode | null, offset: number) {
    super(node, parent, offset);
  }

  public get yieldFromKeyword(): SyntaxToken {
    return new SyntaxToken((<YieldFromNode>this.node).yieldFromKeyword, this, this.offsetAt(0), this.relativeIndexAt(0));
  }
  public get delegate(): ExpressionSyntaxNode {
    if (this._delegate === void 0) {
      let node: ExpressionSyntaxNode | null = this.createChildNode(1);
      if (!node) {
        throw new InvalidOperationException('Unable to create child node');
      }
      this._delegate = node;
    }
    return this._delegate;
  }

  protected get count(): number {
    return 2;
  }

  public accept(visitor: SyntaxVisitor): void {
    visitor.visitYieldFrom(this);
  }

  public acceptResult<T>(visitor: SyntaxTransform<T>): T {
    return visitor.visitYieldFrom(this);
  }

  protected childAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        return this._delegate !== void 0 ? this._delegate : null;
      default:
        return null;
    }
  }

  protected defineChildAt(index: number): SyntaxNodeBase | null {
    switch (index) {
      case 1:
        if (this._delegate === void 0) {
          let node: ExpressionSyntaxNode | null = this.createChildNode(1);
          if (!node) {
            throw new InvalidOperationException('Unable to create child node');
          }
          this._delegate = node;
        }
        return this._delegate;
      default:
        return null;
    }
  }

}
