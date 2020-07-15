import * as ts from 'typescript';
import { customTypehints } from './customTypehintsList';

export function checkCustomTypehints(type: ts.Type, checker: ts.TypeChecker) {
  let typeNode = checker.typeToTypeNode(type);
  if (!typeNode) {
    return false;
  }

  if (type.isUnionOrIntersection()) {
    let typesToDrop: any[] = [];
    const foundTypes = type.types.map((t) => {
      let typeNode = checker.typeToTypeNode(t);
      if (!typeNode) {
        return t;
      }
      if (typeNode.kind === ts.SyntaxKind.TypeReference) {
        const sym = t.symbol || t.aliasSymbol;
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
      }
      return t;
    });

    return {foundTypes, typesToDrop};
  }
  return false;
}