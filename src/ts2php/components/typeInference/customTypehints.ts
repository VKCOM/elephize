import * as ts from 'typescript';
import { customTypehints, mixedTypehintId } from './customTypehintsList';

export function checkCustomTypehints(type: ts.Type, checker: ts.TypeChecker) {
  let typeNode = checker.typeToTypeNode(type);
  if (!typeNode) {
    return false;
  }

  let typeRefs = traverseReferences(type, checker);
  if (typeRefs.length === 1 && typeRefs[0] === type) {
    return false;
  }

  if (typeRefs.some((t) => t.symbol?.escapedName === mixedTypehintId)) {
    return { foundTypes: ['mixed'], typesToDrop: [] };
  }

  let typesToDrop: any[] = [];
  const foundTypes = typeRefs.map((t) => {
    let typeNode = checker.typeToTypeNode(t);
    if (!typeNode) {
      return t;
    }

    const sym = t.symbol || t.aliasSymbol;
    if (!sym) {
      return t;
    }
    const decls = sym.getDeclarations() as ts.Declaration[];
    const [ifaceDecl] = decls.filter((d) => d.kind === ts.SyntaxKind.InterfaceDeclaration);
    if (!ifaceDecl) {
      return t;
    }
    const customType = customTypehints[(ifaceDecl as ts.InterfaceDeclaration).name.getText()];
    if (customType) {
      typesToDrop = typesToDrop.concat(customType.drop);
      return customType.replacement;
    }
    return t;
  });

  return {foundTypes, typesToDrop};
}

export function traverseReferences(type: ts.Type, checker: ts.TypeChecker): ts.Type[] {
  if (!type.isUnionOrIntersection()) {
    return [type];
  }

  let types: ts.Type[] = [];
  for (let t of type.types) {
    let typeNode = checker.typeToTypeNode(t);
    if (typeNode) {
      if (typeNode.kind === ts.SyntaxKind.TypeReference || typeNode.kind === ts.SyntaxKind.TypeAliasDeclaration) {
        types = types.concat(traverseReferences(t, checker));
      } else {
        types.push(t);
      }
    }
  }

  return types;
}