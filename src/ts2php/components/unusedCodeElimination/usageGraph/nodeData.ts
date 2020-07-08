import * as ts from 'typescript';
import { Scope } from './index';
import { sha1 } from '../../../utils/sha1';
import { Declaration, DeclFlag } from '../../../types';

export function insideComponent(scope: Scope<Declaration>) {
  while (scope) {
    if (scope.ownerNode?.data.isComponent) {
      return true;
    }
    scope = scope.parentScope!;
  }

  return false;
}

export function usedInNestedScope(decl: Declaration | undefined, declScope: Scope<Declaration>, currentScope: Scope<Declaration>): boolean {
  const flags = decl?.flags || 0;
  const noOtherFlags = !(flags & DeclFlag.External) && !(flags & DeclFlag.Local) && !(flags & DeclFlag.DereferencedImport) && !(flags & DeclFlag.HoistedToModule);
  return !!decl && !currentScope.isRoot() && declScope !== currentScope && noOtherFlags;
}

export function identifyAnonymousNode(node: ts.Node): string {
  return '_' + sha1(node.getText()).substr(0, 7);
}