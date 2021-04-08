import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';
import { getPhpPrimitiveType } from '../components/typeInference/basicTypes';

export const tEnumDeclaration = (node: ts.EnumDeclaration, context: Context<Declaration>) => {
  const name = node.name.escapedText.toString();
  context.scope.addDeclaration(name, [], { dryRun: context.dryRun });
  const descriptor = context.registry.deriveEnumComponent(name, context.moduleDescriptor);
  if (!descriptor) {
    throw new Error();
  }

  let nextMemberValue = 0;
  let membersCount = 0;
  let assignedMembersCount = 0;

  node.members.forEach((member) => {
    if (member.name.kind !== ts.SyntaxKind.Identifier && member.name.kind !== ts.SyntaxKind.StringLiteral && member.name.kind !== ts.SyntaxKind.NumericLiteral) {
      context.log.error('Only constant keys are supported for enums', [], context.log.ctx(member));
      return;
    }

    membersCount++;
    if (member.initializer) {
      assignedMembersCount++;
    }

    let val = member.initializer && renderNode(member.initializer, context);

    const valInt: number = val ? parseInt(val, 10) : 0;
    if (val && val === valInt.toString()) {
      nextMemberValue = valInt + 1;
    } else if (val === undefined) {
      val = nextMemberValue.toString();
      nextMemberValue++;
    }

    descriptor.addStaticConst(
      member.name.getText()
        .replace(/^['"]|['"]$/g, '')
        .toUpperCase(),
      val,
      member.initializer ?
        getPhpPrimitiveType(member.initializer, context.checker, context.log) :
        'int'
    );
  });

  if (assignedMembersCount !== 0 && membersCount !== assignedMembersCount && context.dryRun) {
    context.log.error('Enum members must be either all assigned with values, or all unassigned.', [], context.log.ctx(node));
  }

  return '';
};
