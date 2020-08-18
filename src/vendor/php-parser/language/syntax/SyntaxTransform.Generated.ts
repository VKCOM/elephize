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

export abstract class SyntaxTransform<T> {

  protected readonly defaultValue: T;

  constructor(defaultValue: T) {
    this.defaultValue = defaultValue;
  }

  public defaultVisit(node: ISyntaxNode): T {
    return this.defaultValue;
  }

  public visit(node: ISyntaxVisitorAccess): T {
    return node.acceptResult(this);
  }

  public visitToken(token: ISyntaxToken): T {
    return this.defaultValue;
  }

  public visitTrivia(trivia: ISyntaxTrivia): T {
    return this.defaultValue;
  }

  public visitSourceText(node: SourceTextSyntaxNode): T {
    return this.defaultVisit(node);
  }

  public visitAnonymousClass(node: AnonymousClassSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitAnonymousFunction(node: AnonymousFunctionSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitAnonymousObjectCreation(node: AnonymousObjectCreationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitArgument(node: ArgumentSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitArray(node: ArraySyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitArrayElement(node: ArrayElementSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitArrowFunction(node: ArrowFunctionSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitAssignmentExpression(node: AssignmentSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitBinaryExpression(node: BinarySyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitBreak(node: BreakSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitClassConstant(node: ClassConstantSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitClassConstantDeclaration(node: ClassConstantDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitClassConstantElement(node: ClassConstantElementSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitClassDeclaration(node: ClassDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitClone(node: CloneSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitClosureUse(node: ClosureUseSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitConditionalExpression(node: ConditionalSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitConstant(node: ConstantSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitConstantDeclaration(node: ConstantDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitConstantElement(node: ConstantElementSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitContinue(node: ContinueSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitDeclare(node: DeclareSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitDeclareBlock(node: DeclareBlockSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitDestructuringAssignment(node: DestructuringAssignmentSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitDoWhile(node: DoWhileSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitEcho(node: EchoSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitElementAccess(node: ElementAccessSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitElse(node: ElseSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitElseBlock(node: ElseBlockSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitElseIf(node: ElseIfSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitElseIfBlock(node: ElseIfBlockSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitEmptyIntrinsic(node: EmptyIntrinsicSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitErrorControl(node: ErrorControlSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitEvalIntrinsic(node: EvalIntrinsicSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitExitIntrinsic(node: ExitIntrinsicSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitExpressionGroup(node: ExpressionGroupSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitExpressionStatement(node: ExpressionStatementSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitFlexibleHeredocElement(node: FlexibleHeredocElementSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitFlexibleHeredocTemplate(node: FlexibleHeredocTemplateSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitFor(node: ForSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitForBlock(node: ForBlockSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitForEach(node: ForEachSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitForEachBlock(node: ForEachBlockSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitFullyQualifiedName(node: FullyQualifiedNameSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitFunctionDeclaration(node: FunctionDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitFunctionInvocation(node: FunctionInvocationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitGlobalDeclaration(node: GlobalSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitGoTo(node: GoToSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitHaltCompiler(node: HaltCompilerSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitHeredocTemplate(node: HeredocTemplateSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitIf(node: IfSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitIfBlock(node: IfBlockSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitIncompleteMember(node: IncompleteMemberSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitIncompleteNamedTraitAdapatation(node: IncompleteNamedTraitAdaptationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitIncompleteReferencedTraitAdaptation(node: IncompleteReferencedTraitAdaptationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitMemberAccess(node: MemberAccessSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitMethodInvocation(node: MemberInvocationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitObjectCreation(node: ObjectCreationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitScopedInvocation(node: ScopedInvocationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitIndirectStringVariable(node: IndirectStringVariableSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitIndirectVariable(node: IndirectVariableSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitInstanceOf(node: InstanceOfSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitInterfaceDeclaration(node: InterfaceDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitIsSetIntrinsic(node: IsSetIntrinsicSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitLabel(node: LabelSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitLexicalVariable(node: LexicalVariableSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitListDestructure(node: ListDestructureSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitListDestructureElement(node: ListDestructureElementSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitLiteral(node: LiteralSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitLocalVariable(node: LocalVariableSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitMethodDeclaration(node: MethodDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitMethodReference(node: MethodReferenceSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitTraitAlias(node: TraitAliasSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitType(node: TypeSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitNamespaceDeclaration(node: NamespaceDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitNamespaceGroupDeclaration(node: NamespaceGroupDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitParameter(node: ParameterSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitPartiallyQualifiedName(node: PartiallyQualifiedNameSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitPostfixUnaryExpression(node: PostfixUnarySyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitPrintIntrinsic(node: PrintIntrinsicSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitPropertyDeclaration(node: PropertyDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitPropertyElement(node: PropertyElementSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitRelativeName(node: RelativeNameSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitReturn(node: ReturnSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitScriptInclusion(node: ScriptInclusionSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitShellCommandTemplate(node: ShellCommandTemplateSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitStatementBlock(node: StatementBlockSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitStaticDeclaration(node: StaticSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitStaticElement(node: StaticElementSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitStaticProperty(node: StaticPropertySyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitStringElementAccess(node: StringElementAccessSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitStringExpression(node: StringExpressionSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitStringTemplate(node: StringTemplateSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitStringVariable(node: StringVariableSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitSwitch(node: SwitchSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitSwitchBlock(node: SwitchBlockSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitSwitchCase(node: SwitchCaseSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitThrow(node: ThrowSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitTraitDeclaration(node: TraitDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitTraitPrecedence(node: TraitPrecedenceSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitTraitUse(node: TraitUseSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitTraitUseGroup(node: TraitUseGroupSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitTry(node: TrySyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitTryCatch(node: TryCatchSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitTryFinally(node: TryFinallySyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitUnaryExpression(node: UnarySyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitUnset(node: UnsetSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitUseDeclaration(node: UseDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitUseElement(node: UseElementSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitUseGroupDeclaration(node: UseGroupDeclarationSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitWhile(node: WhileSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitWhileBlock(node: WhileBlockSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitYield(node: YieldSyntaxNode): T {
    return this.defaultVisit(node);
  }
  public visitYieldFrom(node: YieldFromSyntaxNode): T {
    return this.defaultVisit(node);
  }

}
