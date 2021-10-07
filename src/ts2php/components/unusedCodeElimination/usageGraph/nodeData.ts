import * as ts from 'typescript';
import { Scope } from './index';
import { sha1 } from '../../../utils/sha1';
import { Declaration } from '../../../types';

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
  const flags = decl?.flags || {};
  const noOtherFlags = !(flags.External) && !(flags.Local) && !(flags.DereferencedImport) && !(flags.HoistedToModule);
  return !!decl && !currentScope.isRoot() && declScope !== currentScope && noOtherFlags;
}

export function identifyAnonymousNode(node: ts.Node): string {
  return 'anon_' + sha1(node.getText()).substr(0, 7);
}
