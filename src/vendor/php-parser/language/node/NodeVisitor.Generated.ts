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
  ExpressionNode,
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
  IntrinsicNode,
  InvocationNode,
  IsSetIntrinsicNode,
  IterationNode,
  JumpNode,
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
  SelectionNode,
  ShellCommandTemplateNode,
  StatementNode,
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
  VariableNode,
  WhileNode,
  WhileBlockNode,
  YieldNode,
  YieldFromNode,
} from './Node.Generated';
import { Node } from './Node';
import { SourceTextNode } from './SourceTextNode';

export abstract class NodeVisitor {

  public defaultVisit(node: Node): void {
    // Does nothing.
  }

  public visit(node: Node): void {
    node.accept(this);
  }

  public visitToken(token: Node): void {
    // this.defaultVisit(token);
  }

  public visitTrivia(trivia: Node): void {
    // this.defaultVisit(trivia);
  }

  public visitSourceText(node: SourceTextNode): void {
    this.defaultVisit(node);
  }

  public visitAnonymousClass(node: AnonymousClassNode): void {
    this.defaultVisit(node);
  }
  public visitAnonymousFunction(node: AnonymousFunctionNode): void {
    this.defaultVisit(node);
  }
  public visitAnonymousObjectCreation(node: AnonymousObjectCreationNode): void {
    this.defaultVisit(node);
  }
  public visitArgument(node: ArgumentNode): void {
    this.defaultVisit(node);
  }
  public visitArray(node: ArrayNode): void {
    this.defaultVisit(node);
  }
  public visitArrayElement(node: ArrayElementNode): void {
    this.defaultVisit(node);
  }
  public visitArrowFunction(node: ArrowFunctionNode): void {
    this.defaultVisit(node);
  }
  public visitAssignmentExpression(node: AssignmentNode): void {
    this.defaultVisit(node);
  }
  public visitBinaryExpression(node: BinaryNode): void {
    this.defaultVisit(node);
  }
  public visitBreak(node: BreakNode): void {
    this.defaultVisit(node);
  }
  public visitClassConstant(node: ClassConstantNode): void {
    this.defaultVisit(node);
  }
  public visitClassConstantDeclaration(node: ClassConstantDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitClassConstantElement(node: ClassConstantElementNode): void {
    this.defaultVisit(node);
  }
  public visitClassDeclaration(node: ClassDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitClone(node: CloneNode): void {
    this.defaultVisit(node);
  }
  public visitClosureUse(node: ClosureUseNode): void {
    this.defaultVisit(node);
  }
  public visitConditionalExpression(node: ConditionalNode): void {
    this.defaultVisit(node);
  }
  public visitConstant(node: ConstantNode): void {
    this.defaultVisit(node);
  }
  public visitConstantDeclaration(node: ConstantDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitConstantElement(node: ConstantElementNode): void {
    this.defaultVisit(node);
  }
  public visitContinue(node: ContinueNode): void {
    this.defaultVisit(node);
  }
  public visitDeclare(node: DeclareNode): void {
    this.defaultVisit(node);
  }
  public visitDeclareBlock(node: DeclareBlockNode): void {
    this.defaultVisit(node);
  }
  public visitDestructuringAssignment(node: DestructuringAssignmentNode): void {
    this.defaultVisit(node);
  }
  public visitDoWhile(node: DoWhileNode): void {
    this.defaultVisit(node);
  }
  public visitEcho(node: EchoNode): void {
    this.defaultVisit(node);
  }
  public visitElementAccess(node: ElementAccessNode): void {
    this.defaultVisit(node);
  }
  public visitElse(node: ElseNode): void {
    this.defaultVisit(node);
  }
  public visitElseBlock(node: ElseBlockNode): void {
    this.defaultVisit(node);
  }
  public visitElseIf(node: ElseIfNode): void {
    this.defaultVisit(node);
  }
  public visitElseIfBlock(node: ElseIfBlockNode): void {
    this.defaultVisit(node);
  }
  public visitEmptyIntrinsic(node: EmptyIntrinsicNode): void {
    this.defaultVisit(node);
  }
  public visitErrorControl(node: ErrorControlNode): void {
    this.defaultVisit(node);
  }
  public visitEvalIntrinsic(node: EvalIntrinsicNode): void {
    this.defaultVisit(node);
  }
  public visitExitIntrinsic(node: ExitIntrinsicNode): void {
    this.defaultVisit(node);
  }
  public visitExpressionGroup(node: ExpressionGroupNode): void {
    this.defaultVisit(node);
  }
  public visitExpressionStatement(node: ExpressionStatementNode): void {
    this.defaultVisit(node);
  }
  public visitFlexibleHeredocElement(node: FlexibleHeredocElementNode): void {
    this.defaultVisit(node);
  }
  public visitFlexibleHeredocTemplate(node: FlexibleHeredocTemplateNode): void {
    this.defaultVisit(node);
  }
  public visitFor(node: ForNode): void {
    this.defaultVisit(node);
  }
  public visitForBlock(node: ForBlockNode): void {
    this.defaultVisit(node);
  }
  public visitForEach(node: ForEachNode): void {
    this.defaultVisit(node);
  }
  public visitForEachBlock(node: ForEachBlockNode): void {
    this.defaultVisit(node);
  }
  public visitFullyQualifiedName(node: FullyQualifiedNameNode): void {
    this.defaultVisit(node);
  }
  public visitFunctionDeclaration(node: FunctionDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitFunctionInvocation(node: FunctionInvocationNode): void {
    this.defaultVisit(node);
  }
  public visitGlobalDeclaration(node: GlobalNode): void {
    this.defaultVisit(node);
  }
  public visitGoTo(node: GoToNode): void {
    this.defaultVisit(node);
  }
  public visitHaltCompiler(node: HaltCompilerNode): void {
    this.defaultVisit(node);
  }
  public visitHeredocTemplate(node: HeredocTemplateNode): void {
    this.defaultVisit(node);
  }
  public visitIf(node: IfNode): void {
    this.defaultVisit(node);
  }
  public visitIfBlock(node: IfBlockNode): void {
    this.defaultVisit(node);
  }
  public visitIncompleteMember(node: IncompleteMemberNode): void {
    this.defaultVisit(node);
  }
  public visitIncompleteNamedTraitAdapatation(node: IncompleteNamedTraitAdaptationNode): void {
    this.defaultVisit(node);
  }
  public visitIncompleteReferencedTraitAdaptation(node: IncompleteReferencedTraitAdaptationNode): void {
    this.defaultVisit(node);
  }
  public visitMemberAccess(node: MemberAccessNode): void {
    this.defaultVisit(node);
  }
  public visitMethodInvocation(node: MemberInvocationNode): void {
    this.defaultVisit(node);
  }
  public visitObjectCreation(node: ObjectCreationNode): void {
    this.defaultVisit(node);
  }
  public visitScopedInvocation(node: ScopedInvocationNode): void {
    this.defaultVisit(node);
  }
  public visitIndirectStringVariable(node: IndirectStringVariableNode): void {
    this.defaultVisit(node);
  }
  public visitIndirectVariable(node: IndirectVariableNode): void {
    this.defaultVisit(node);
  }
  public visitInstanceOf(node: InstanceOfNode): void {
    this.defaultVisit(node);
  }
  public visitInterfaceDeclaration(node: InterfaceDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitIsSetIntrinsic(node: IsSetIntrinsicNode): void {
    this.defaultVisit(node);
  }
  public visitLabel(node: LabelNode): void {
    this.defaultVisit(node);
  }
  public visitLexicalVariable(node: LexicalVariableNode): void {
    this.defaultVisit(node);
  }
  public visitListDestructure(node: ListDestructureNode): void {
    this.defaultVisit(node);
  }
  public visitListDestructureElement(node: ListDestructureElementNode): void {
    this.defaultVisit(node);
  }
  public visitLiteral(node: LiteralNode): void {
    this.defaultVisit(node);
  }
  public visitLocalVariable(node: LocalVariableNode): void {
    this.defaultVisit(node);
  }
  public visitMethodDeclaration(node: MethodDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitMethodReference(node: MethodReferenceNode): void {
    this.defaultVisit(node);
  }
  public visitTraitAlias(node: TraitAliasNode): void {
    this.defaultVisit(node);
  }
  public visitType(node: TypeNode): void {
    this.defaultVisit(node);
  }
  public visitNamespaceDeclaration(node: NamespaceDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitNamespaceGroupDeclaration(node: NamespaceGroupDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitParameter(node: ParameterNode): void {
    this.defaultVisit(node);
  }
  public visitPartiallyQualifiedName(node: PartiallyQualifiedNameNode): void {
    this.defaultVisit(node);
  }
  public visitPostfixUnaryExpression(node: PostfixUnaryNode): void {
    this.defaultVisit(node);
  }
  public visitPrintIntrinsic(node: PrintIntrinsicNode): void {
    this.defaultVisit(node);
  }
  public visitPropertyDeclaration(node: PropertyDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitPropertyElement(node: PropertyElementNode): void {
    this.defaultVisit(node);
  }
  public visitRelativeName(node: RelativeNameNode): void {
    this.defaultVisit(node);
  }
  public visitReturn(node: ReturnNode): void {
    this.defaultVisit(node);
  }
  public visitScriptInclusion(node: ScriptInclusionNode): void {
    this.defaultVisit(node);
  }
  public visitShellCommandTemplate(node: ShellCommandTemplateNode): void {
    this.defaultVisit(node);
  }
  public visitStatementBlock(node: StatementBlockNode): void {
    this.defaultVisit(node);
  }
  public visitStaticDeclaration(node: StaticNode): void {
    this.defaultVisit(node);
  }
  public visitStaticElement(node: StaticElementNode): void {
    this.defaultVisit(node);
  }
  public visitStaticProperty(node: StaticPropertyNode): void {
    this.defaultVisit(node);
  }
  public visitStringElementAccess(node: StringElementAccessNode): void {
    this.defaultVisit(node);
  }
  public visitStringExpression(node: StringExpressionNode): void {
    this.defaultVisit(node);
  }
  public visitStringTemplate(node: StringTemplateNode): void {
    this.defaultVisit(node);
  }
  public visitStringVariable(node: StringVariableNode): void {
    this.defaultVisit(node);
  }
  public visitSwitch(node: SwitchNode): void {
    this.defaultVisit(node);
  }
  public visitSwitchBlock(node: SwitchBlockNode): void {
    this.defaultVisit(node);
  }
  public visitSwitchCase(node: SwitchCaseNode): void {
    this.defaultVisit(node);
  }
  public visitThrow(node: ThrowNode): void {
    this.defaultVisit(node);
  }
  public visitTraitDeclaration(node: TraitDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitTraitPrecedence(node: TraitPrecedenceNode): void {
    this.defaultVisit(node);
  }
  public visitTraitUse(node: TraitUseNode): void {
    this.defaultVisit(node);
  }
  public visitTraitUseGroup(node: TraitUseGroupNode): void {
    this.defaultVisit(node);
  }
  public visitTry(node: TryNode): void {
    this.defaultVisit(node);
  }
  public visitTryCatch(node: TryCatchNode): void {
    this.defaultVisit(node);
  }
  public visitTryFinally(node: TryFinallyNode): void {
    this.defaultVisit(node);
  }
  public visitUnaryExpression(node: UnaryNode): void {
    this.defaultVisit(node);
  }
  public visitUnset(node: UnsetNode): void {
    this.defaultVisit(node);
  }
  public visitUseDeclaration(node: UseDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitUseElement(node: UseElementNode): void {
    this.defaultVisit(node);
  }
  public visitUseGroupDeclaration(node: UseGroupDeclarationNode): void {
    this.defaultVisit(node);
  }
  public visitWhile(node: WhileNode): void {
    this.defaultVisit(node);
  }
  public visitWhileBlock(node: WhileBlockNode): void {
    this.defaultVisit(node);
  }
  public visitYield(node: YieldNode): void {
    this.defaultVisit(node);
  }
  public visitYieldFrom(node: YieldFromNode): void {
    this.defaultVisit(node);
  }

}
