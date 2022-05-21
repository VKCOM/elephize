import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode, renderNodes } from '../components/codegen/renderNodes';
import { snakify } from '../utils/pathsAndNames';
import { getPhpPrimitiveType, getPhpPrimitiveTypeForFunc } from '../components/typeInference/basicTypes';

export const tClassDeclaration = (node: ts.ClassDeclaration, context: Context<Declaration>) => {
  const name = node.name?.escapedText.toString();
  if (!name) {
    throw new Error();
  }
  context.scope.addDeclaration(name, [], { dryRun: context.dryRun });
  const descriptor = context.registry.derivePlainClass(name, context.moduleDescriptor);
  if (!descriptor) {
    return '';
  }

  node.members.forEach((member) => {
    if (ts.isPropertyDeclaration(member)) {
      let mod: 'public' | 'protected' | 'private' = 'public';
      let isStatic = false;
      let isReadonly = false;
      for (let i of member.modifiers || []) {
        if (i.kind === ts.SyntaxKind.PrivateKeyword) {
          mod = 'private';
        } else if (i.kind === ts.SyntaxKind.ProtectedKeyword) {
          mod = 'protected';
        } else if (i.kind === ts.SyntaxKind.StaticKeyword) {
          isStatic = true;
        } else if (i.kind === ts.SyntaxKind.ReadonlyKeyword) {
          isReadonly = true;
        }
      }

      if (isStatic !== isReadonly) {
        throw new Error('Only static AND readonly fields are supported');
      }
      if (isStatic && isReadonly) {
        descriptor?.addStaticConst(member.name.getText(), renderNode(member.initializer, context), getPhpPrimitiveType(member.initializer!, context.checker, context.log));
      } else {
        descriptor?.addProperty(renderNode(member.name, context), getPhpPrimitiveType(member.initializer!, context.checker, context.log), mod);
      }
    }

    if (ts.isMethodDeclaration(member)) {
      let mod: 'public' | 'protected' | 'private' = 'public';
      for (let i of member.modifiers || []) {
        if (i.kind === ts.SyntaxKind.PrivateKeyword) {
          mod = 'private';
        } else if (i.kind === ts.SyntaxKind.ProtectedKeyword) {
          mod = 'protected';
        }
      }
      const previousDescriptor = context.moduleDescriptor;
      context.moduleDescriptor = descriptor;
      const expr = renderNode(member.body, context);
      const args = renderNodes(member.parameters.slice(), context);
      context.moduleDescriptor = previousDescriptor;
      descriptor?.addMethod(snakify(member.name.getText()), expr, args.join(', '), getPhpPrimitiveTypeForFunc(member, args, context.checker, context.log), mod);
    }
  });
  return '';
};
