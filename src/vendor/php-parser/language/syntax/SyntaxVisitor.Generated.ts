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
  ExpressionSyntaxNode,
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
  IntrinsicSyntaxNode,
  InvocationSyntaxNode,
  IsSetIntrinsicSyntaxNode,
  IterationSyntaxNode,
  JumpSyntaxNode,
  LabelSyntaxNode,
  LexicalVariableSyntaxNode,
  ListDestructureSyntaxNode,
  ListDestructureElementSyntaxNode,
  LiteralSyntaxNode,
  LocalVariableSyntaxNode,
  MemberAccessSyntaxNode,
  MemberInvocationSyntaxNode,
  MethodDeclarationSyntaxNode,
  MethodReferenceSyntaxNode,
  NameSyntaxNode,
  NamedMemberAccessSyntaxNode,
  NamedMethodInvocationSyntaxNode,
  NamedObjectCreationSyntaxNode,
  NamedScopedInvocationSyntaxNode,
  NamedTraitAliasSyntaxNode,
  NamedTypeSyntaxNode,
  NamespaceDeclarationSyntaxNode,
  NamespaceGroupDeclarationSyntaxNode,
  ObjectCreationSyntaxNode,
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
  ScopedAccessSyntaxNode,
  ScopedInvocationSyntaxNode,
  ScriptInclusionSyntaxNode,
  SelectionSyntaxNode,
  ShellCommandTemplateSyntaxNode,
  StatementSyntaxNode,
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
  TraitAliasSyntaxNode,
  TraitDeclarationSyntaxNode,
  TraitPrecedenceSyntaxNode,
  TraitUseSyntaxNode,
  TraitUseGroupSyntaxNode,
  TrySyntaxNode,
  TryCatchSyntaxNode,
  TryFinallySyntaxNode,
  TypeSyntaxNode,
  TypeDeclarationSyntaxNode,
  UnarySyntaxNode,
  UnsetSyntaxNode,
  UseDeclarationSyntaxNode,
  UseElementSyntaxNode,
  UseGroupDeclarationSyntaxNode,
  VariableSyntaxNode,
  WhileSyntaxNode,
  WhileBlockSyntaxNode,
  YieldSyntaxNode,
  YieldFromSyntaxNode,
} from './SyntaxNode.Generated';
import { ISyntaxNode } from './ISyntaxNode';
import { ISyntaxToken } from './ISyntaxToken';
import { ISyntaxTrivia } from './ISyntaxTrivia';
import { ISyntaxVisitorAccess } from './ISyntaxVisitorAccess';
import { SourceTextSyntaxNode } from './SourceTextSyntaxNode';

export abstract class SyntaxVisitor {

  public defaultVisit(node: ISyntaxNode): void {
    // Does nothing.
  }

  public visit(node: ISyntaxVisitorAccess): void {
    node.accept(this);
  }

  public visitToken(token: ISyntaxToken): void {
    // Does nothing.
  }

  public visitTrivia(trivia: ISyntaxTrivia): void {
    // Does nothing.
  }

  public visitSourceText(node: SourceTextSyntaxNode): void {
    this.defaultVisit(node);
  }

  public visitAnonymousClass(node: AnonymousClassSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitAnonymousFunction(node: AnonymousFunctionSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitAnonymousObjectCreation(node: AnonymousObjectCreationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitArgument(node: ArgumentSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitArray(node: ArraySyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitArrayElement(node: ArrayElementSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitArrowFunction(node: ArrowFunctionSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitAssignmentExpression(node: AssignmentSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitBinaryExpression(node: BinarySyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitBreak(node: BreakSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitClassConstant(node: ClassConstantSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitClassConstantDeclaration(node: ClassConstantDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitClassConstantElement(node: ClassConstantElementSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitClassDeclaration(node: ClassDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitClone(node: CloneSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitClosureUse(node: ClosureUseSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitConditionalExpression(node: ConditionalSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitConstant(node: ConstantSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitConstantDeclaration(node: ConstantDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitConstantElement(node: ConstantElementSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitContinue(node: ContinueSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitDeclare(node: DeclareSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitDeclareBlock(node: DeclareBlockSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitDestructuringAssignment(node: DestructuringAssignmentSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitDoWhile(node: DoWhileSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitEcho(node: EchoSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitElementAccess(node: ElementAccessSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitElse(node: ElseSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitElseBlock(node: ElseBlockSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitElseIf(node: ElseIfSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitElseIfBlock(node: ElseIfBlockSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitEmptyIntrinsic(node: EmptyIntrinsicSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitErrorControl(node: ErrorControlSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitEvalIntrinsic(node: EvalIntrinsicSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitExitIntrinsic(node: ExitIntrinsicSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitExpressionGroup(node: ExpressionGroupSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitExpressionStatement(node: ExpressionStatementSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitFlexibleHeredocElement(node: FlexibleHeredocElementSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitFlexibleHeredocTemplate(node: FlexibleHeredocTemplateSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitFor(node: ForSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitForBlock(node: ForBlockSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitForEach(node: ForEachSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitForEachBlock(node: ForEachBlockSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitFullyQualifiedName(node: FullyQualifiedNameSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitFunctionDeclaration(node: FunctionDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitFunctionInvocation(node: FunctionInvocationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitGlobalDeclaration(node: GlobalSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitGoTo(node: GoToSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitHaltCompiler(node: HaltCompilerSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitHeredocTemplate(node: HeredocTemplateSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitIf(node: IfSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitIfBlock(node: IfBlockSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitIncompleteMember(node: IncompleteMemberSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitIncompleteNamedTraitAdapatation(node: IncompleteNamedTraitAdaptationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitIncompleteReferencedTraitAdaptation(node: IncompleteReferencedTraitAdaptationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitMemberAccess(node: MemberAccessSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitMethodInvocation(node: MemberInvocationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitObjectCreation(node: ObjectCreationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitScopedInvocation(node: ScopedInvocationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitIndirectStringVariable(node: IndirectStringVariableSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitIndirectVariable(node: IndirectVariableSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitInstanceOf(node: InstanceOfSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitInterfaceDeclaration(node: InterfaceDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitIsSetIntrinsic(node: IsSetIntrinsicSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitLabel(node: LabelSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitLexicalVariable(node: LexicalVariableSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitListDestructure(node: ListDestructureSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitListDestructureElement(node: ListDestructureElementSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitLiteral(node: LiteralSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitLocalVariable(node: LocalVariableSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitMethodDeclaration(node: MethodDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitMethodReference(node: MethodReferenceSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitTraitAlias(node: TraitAliasSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitType(node: TypeSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitNamespaceDeclaration(node: NamespaceDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitNamespaceGroupDeclaration(node: NamespaceGroupDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitParameter(node: ParameterSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitPartiallyQualifiedName(node: PartiallyQualifiedNameSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitPostfixUnaryExpression(node: PostfixUnarySyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitPrintIntrinsic(node: PrintIntrinsicSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitPropertyDeclaration(node: PropertyDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitPropertyElement(node: PropertyElementSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitRelativeName(node: RelativeNameSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitReturn(node: ReturnSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitScriptInclusion(node: ScriptInclusionSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitShellCommandTemplate(node: ShellCommandTemplateSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitStatementBlock(node: StatementBlockSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitStaticDeclaration(node: StaticSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitStaticElement(node: StaticElementSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitStaticProperty(node: StaticPropertySyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitStringElementAccess(node: StringElementAccessSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitStringExpression(node: StringExpressionSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitStringTemplate(node: StringTemplateSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitStringVariable(node: StringVariableSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitSwitch(node: SwitchSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitSwitchBlock(node: SwitchBlockSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitSwitchCase(node: SwitchCaseSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitThrow(node: ThrowSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitTraitDeclaration(node: TraitDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitTraitPrecedence(node: TraitPrecedenceSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitTraitUse(node: TraitUseSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitTraitUseGroup(node: TraitUseGroupSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitTry(node: TrySyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitTryCatch(node: TryCatchSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitTryFinally(node: TryFinallySyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitUnaryExpression(node: UnarySyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitUnset(node: UnsetSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitUseDeclaration(node: UseDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitUseElement(node: UseElementSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitUseGroupDeclaration(node: UseGroupDeclarationSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitWhile(node: WhileSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitWhileBlock(node: WhileBlockSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitYield(node: YieldSyntaxNode): void {
    this.defaultVisit(node);
  }
  public visitYieldFrom(node: YieldFromSyntaxNode): void {
    this.defaultVisit(node);
  }

}
