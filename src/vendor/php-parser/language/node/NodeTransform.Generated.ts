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

export abstract class NodeTransform<T> {

  protected readonly defaultValue: T;

  constructor(defaultValue: T) {
    this.defaultValue = defaultValue;
  }

  public defaultVisit(node: Node): T {
    return this.defaultValue;
  }

  public visit(node: Node): T {
    return node.acceptResult(this);
  }

  public visitToken(token: Node): T {
    return this.defaultValue;
  }

  public visitTrivia(token: Node): T {
    return this.defaultValue;
  }

  public visitSourceText(node: SourceTextNode): T {
    return this.defaultVisit(node);
  }

  public visitAnonymousClass(node: AnonymousClassNode): T {
    return this.defaultVisit(node);
  }
  public visitAnonymousFunction(node: AnonymousFunctionNode): T {
    return this.defaultVisit(node);
  }
  public visitAnonymousObjectCreation(node: AnonymousObjectCreationNode): T {
    return this.defaultVisit(node);
  }
  public visitArgument(node: ArgumentNode): T {
    return this.defaultVisit(node);
  }
  public visitArray(node: ArrayNode): T {
    return this.defaultVisit(node);
  }
  public visitArrayElement(node: ArrayElementNode): T {
    return this.defaultVisit(node);
  }
  public visitArrowFunction(node: ArrowFunctionNode): T {
    return this.defaultVisit(node);
  }
  public visitAssignmentExpression(node: AssignmentNode): T {
    return this.defaultVisit(node);
  }
  public visitBinaryExpression(node: BinaryNode): T {
    return this.defaultVisit(node);
  }
  public visitBreak(node: BreakNode): T {
    return this.defaultVisit(node);
  }
  public visitClassConstant(node: ClassConstantNode): T {
    return this.defaultVisit(node);
  }
  public visitClassConstantDeclaration(node: ClassConstantDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitClassConstantElement(node: ClassConstantElementNode): T {
    return this.defaultVisit(node);
  }
  public visitClassDeclaration(node: ClassDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitClone(node: CloneNode): T {
    return this.defaultVisit(node);
  }
  public visitClosureUse(node: ClosureUseNode): T {
    return this.defaultVisit(node);
  }
  public visitConditionalExpression(node: ConditionalNode): T {
    return this.defaultVisit(node);
  }
  public visitConstant(node: ConstantNode): T {
    return this.defaultVisit(node);
  }
  public visitConstantDeclaration(node: ConstantDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitConstantElement(node: ConstantElementNode): T {
    return this.defaultVisit(node);
  }
  public visitContinue(node: ContinueNode): T {
    return this.defaultVisit(node);
  }
  public visitDeclare(node: DeclareNode): T {
    return this.defaultVisit(node);
  }
  public visitDeclareBlock(node: DeclareBlockNode): T {
    return this.defaultVisit(node);
  }
  public visitDestructuringAssignment(node: DestructuringAssignmentNode): T {
    return this.defaultVisit(node);
  }
  public visitDoWhile(node: DoWhileNode): T {
    return this.defaultVisit(node);
  }
  public visitEcho(node: EchoNode): T {
    return this.defaultVisit(node);
  }
  public visitElementAccess(node: ElementAccessNode): T {
    return this.defaultVisit(node);
  }
  public visitElse(node: ElseNode): T {
    return this.defaultVisit(node);
  }
  public visitElseBlock(node: ElseBlockNode): T {
    return this.defaultVisit(node);
  }
  public visitElseIf(node: ElseIfNode): T {
    return this.defaultVisit(node);
  }
  public visitElseIfBlock(node: ElseIfBlockNode): T {
    return this.defaultVisit(node);
  }
  public visitEmptyIntrinsic(node: EmptyIntrinsicNode): T {
    return this.defaultVisit(node);
  }
  public visitErrorControl(node: ErrorControlNode): T {
    return this.defaultVisit(node);
  }
  public visitEvalIntrinsic(node: EvalIntrinsicNode): T {
    return this.defaultVisit(node);
  }
  public visitExitIntrinsic(node: ExitIntrinsicNode): T {
    return this.defaultVisit(node);
  }
  public visitExpressionGroup(node: ExpressionGroupNode): T {
    return this.defaultVisit(node);
  }
  public visitExpressionStatement(node: ExpressionStatementNode): T {
    return this.defaultVisit(node);
  }
  public visitFlexibleHeredocElement(node: FlexibleHeredocElementNode): T {
    return this.defaultVisit(node);
  }
  public visitFlexibleHeredocTemplate(node: FlexibleHeredocTemplateNode): T {
    return this.defaultVisit(node);
  }
  public visitFor(node: ForNode): T {
    return this.defaultVisit(node);
  }
  public visitForBlock(node: ForBlockNode): T {
    return this.defaultVisit(node);
  }
  public visitForEach(node: ForEachNode): T {
    return this.defaultVisit(node);
  }
  public visitForEachBlock(node: ForEachBlockNode): T {
    return this.defaultVisit(node);
  }
  public visitFullyQualifiedName(node: FullyQualifiedNameNode): T {
    return this.defaultVisit(node);
  }
  public visitFunctionDeclaration(node: FunctionDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitFunctionInvocation(node: FunctionInvocationNode): T {
    return this.defaultVisit(node);
  }
  public visitGlobalDeclaration(node: GlobalNode): T {
    return this.defaultVisit(node);
  }
  public visitGoTo(node: GoToNode): T {
    return this.defaultVisit(node);
  }
  public visitHaltCompiler(node: HaltCompilerNode): T {
    return this.defaultVisit(node);
  }
  public visitHeredocTemplate(node: HeredocTemplateNode): T {
    return this.defaultVisit(node);
  }
  public visitIf(node: IfNode): T {
    return this.defaultVisit(node);
  }
  public visitIfBlock(node: IfBlockNode): T {
    return this.defaultVisit(node);
  }
  public visitIncompleteMember(node: IncompleteMemberNode): T {
    return this.defaultVisit(node);
  }
  public visitIncompleteNamedTraitAdapatation(node: IncompleteNamedTraitAdaptationNode): T {
    return this.defaultVisit(node);
  }
  public visitIncompleteReferencedTraitAdaptation(node: IncompleteReferencedTraitAdaptationNode): T {
    return this.defaultVisit(node);
  }
  public visitMemberAccess(node: MemberAccessNode): T {
    return this.defaultVisit(node);
  }
  public visitMethodInvocation(node: MemberInvocationNode): T {
    return this.defaultVisit(node);
  }
  public visitObjectCreation(node: ObjectCreationNode): T {
    return this.defaultVisit(node);
  }
  public visitScopedInvocation(node: ScopedInvocationNode): T {
    return this.defaultVisit(node);
  }
  public visitIndirectStringVariable(node: IndirectStringVariableNode): T {
    return this.defaultVisit(node);
  }
  public visitIndirectVariable(node: IndirectVariableNode): T {
    return this.defaultVisit(node);
  }
  public visitInstanceOf(node: InstanceOfNode): T {
    return this.defaultVisit(node);
  }
  public visitInterfaceDeclaration(node: InterfaceDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitIsSetIntrinsic(node: IsSetIntrinsicNode): T {
    return this.defaultVisit(node);
  }
  public visitLabel(node: LabelNode): T {
    return this.defaultVisit(node);
  }
  public visitLexicalVariable(node: LexicalVariableNode): T {
    return this.defaultVisit(node);
  }
  public visitListDestructure(node: ListDestructureNode): T {
    return this.defaultVisit(node);
  }
  public visitListDestructureElement(node: ListDestructureElementNode): T {
    return this.defaultVisit(node);
  }
  public visitLiteral(node: LiteralNode): T {
    return this.defaultVisit(node);
  }
  public visitLocalVariable(node: LocalVariableNode): T {
    return this.defaultVisit(node);
  }
  public visitMethodDeclaration(node: MethodDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitMethodReference(node: MethodReferenceNode): T {
    return this.defaultVisit(node);
  }
  public visitTraitAlias(node: TraitAliasNode): T {
    return this.defaultVisit(node);
  }
  public visitType(node: TypeNode): T {
    return this.defaultVisit(node);
  }
  public visitNamespaceDeclaration(node: NamespaceDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitNamespaceGroupDeclaration(node: NamespaceGroupDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitParameter(node: ParameterNode): T {
    return this.defaultVisit(node);
  }
  public visitPartiallyQualifiedName(node: PartiallyQualifiedNameNode): T {
    return this.defaultVisit(node);
  }
  public visitPostfixUnaryExpression(node: PostfixUnaryNode): T {
    return this.defaultVisit(node);
  }
  public visitPrintIntrinsic(node: PrintIntrinsicNode): T {
    return this.defaultVisit(node);
  }
  public visitPropertyDeclaration(node: PropertyDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitPropertyElement(node: PropertyElementNode): T {
    return this.defaultVisit(node);
  }
  public visitRelativeName(node: RelativeNameNode): T {
    return this.defaultVisit(node);
  }
  public visitReturn(node: ReturnNode): T {
    return this.defaultVisit(node);
  }
  public visitScriptInclusion(node: ScriptInclusionNode): T {
    return this.defaultVisit(node);
  }
  public visitShellCommandTemplate(node: ShellCommandTemplateNode): T {
    return this.defaultVisit(node);
  }
  public visitStatementBlock(node: StatementBlockNode): T {
    return this.defaultVisit(node);
  }
  public visitStaticDeclaration(node: StaticNode): T {
    return this.defaultVisit(node);
  }
  public visitStaticElement(node: StaticElementNode): T {
    return this.defaultVisit(node);
  }
  public visitStaticProperty(node: StaticPropertyNode): T {
    return this.defaultVisit(node);
  }
  public visitStringElementAccess(node: StringElementAccessNode): T {
    return this.defaultVisit(node);
  }
  public visitStringExpression(node: StringExpressionNode): T {
    return this.defaultVisit(node);
  }
  public visitStringTemplate(node: StringTemplateNode): T {
    return this.defaultVisit(node);
  }
  public visitStringVariable(node: StringVariableNode): T {
    return this.defaultVisit(node);
  }
  public visitSwitch(node: SwitchNode): T {
    return this.defaultVisit(node);
  }
  public visitSwitchBlock(node: SwitchBlockNode): T {
    return this.defaultVisit(node);
  }
  public visitSwitchCase(node: SwitchCaseNode): T {
    return this.defaultVisit(node);
  }
  public visitThrow(node: ThrowNode): T {
    return this.defaultVisit(node);
  }
  public visitTraitDeclaration(node: TraitDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitTraitPrecedence(node: TraitPrecedenceNode): T {
    return this.defaultVisit(node);
  }
  public visitTraitUse(node: TraitUseNode): T {
    return this.defaultVisit(node);
  }
  public visitTraitUseGroup(node: TraitUseGroupNode): T {
    return this.defaultVisit(node);
  }
  public visitTry(node: TryNode): T {
    return this.defaultVisit(node);
  }
  public visitTryCatch(node: TryCatchNode): T {
    return this.defaultVisit(node);
  }
  public visitTryFinally(node: TryFinallyNode): T {
    return this.defaultVisit(node);
  }
  public visitUnaryExpression(node: UnaryNode): T {
    return this.defaultVisit(node);
  }
  public visitUnset(node: UnsetNode): T {
    return this.defaultVisit(node);
  }
  public visitUseDeclaration(node: UseDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitUseElement(node: UseElementNode): T {
    return this.defaultVisit(node);
  }
  public visitUseGroupDeclaration(node: UseGroupDeclarationNode): T {
    return this.defaultVisit(node);
  }
  public visitWhile(node: WhileNode): T {
    return this.defaultVisit(node);
  }
  public visitWhileBlock(node: WhileBlockNode): T {
    return this.defaultVisit(node);
  }
  public visitYield(node: YieldNode): T {
    return this.defaultVisit(node);
  }
  public visitYieldFrom(node: YieldFromNode): T {
    return this.defaultVisit(node);
  }

}
