import * as fs from 'fs';
import { SyntaxWalker } from '../../../vendor/php-parser/language/syntax/SyntaxWalker';
import {
  ClassDeclarationSyntaxNode,
  MethodDeclarationSyntaxNode, NamespaceDeclarationSyntaxNode, ParameterSyntaxNode,
} from '../../../vendor/php-parser/language/syntax/SyntaxNode.Generated';
import { ISyntaxNode } from '../../../vendor/php-parser/language/syntax/ISyntaxNode';
import { ISyntaxToken } from '../../../vendor/php-parser/language/syntax/ISyntaxToken';
import { PhpSyntaxTree, TextSpan } from '../../../vendor/php-parser/main';

export class PhpParsedStruct extends SyntaxWalker {
  protected _className = '';
  protected _namespace = '';
  protected _src: string;
  protected _decls: { [key: string]: string } = {};
  protected _retvals: { [key: string]: string } = {};

  public constructor(protected _filename: string) {
    super();
    this._src = fs.readFileSync(this._filename, { encoding: 'utf-8' });
    const phpAst = PhpSyntaxTree.fromText(this._src);
    this.visit(phpAst.root);
  }

  public getDecl(name: string) {
    return this._decls[name];
  }

  public getRetval(name: string) {
    return this._retvals[name];
  }

  public getClassName() {
    return this._className;
  }

  public getNamespace() {
    return this._namespace;
  }

  protected _get(span?: TextSpan): string {
    if (!span) { return ''; }
    return this._src.slice(span.start, span.start + span.length);
  }

  public visitClassDeclaration(node: ClassDeclarationSyntaxNode) {
    this._className = this._get(node.identifier.span);
    super.visitClassDeclaration(node);
  }

  public visitNamespaceDeclaration(node: NamespaceDeclarationSyntaxNode) {
    this._namespace = this._get(node.name.span);
    super.visitNamespaceDeclaration(node);
  }

  public visitMethodDeclaration(node: MethodDeclarationSyntaxNode) {
    const mods = node.modifiers?.allChildren().map((c: ISyntaxNode | ISyntaxToken) => this._get(c.span)) || [];
    const name = this._get(node.identifierOrKeyword.span);
    for (const triv of (node.leadingTrivia || [])) {
      if (!this._get(triv.span).includes('@return')) {
        continue;
      }

      const matches = this._get(triv.span).match(/@return ([?a-z]+)/);
      if (matches) {
        this._retvals[name] = matches[1];
      }
    }
    if (mods.includes('public')) {
      const parameters = (node.parameters?.allChildren() || [])
        .filter((c) => !c.isToken);

      const args = parameters
        .map((c: ISyntaxNode | ISyntaxToken) => this._get(c.span)).join(', ') || '';

      const callableArgs = parameters
        .map((c: ParameterSyntaxNode) => {
          let r = '';
          if (c.ellipsis) {
            r += this._get(c.ellipsis.span);
          }

          r += this._get(c.variable.span);

          return r;
        });

      this._decls[name] = this._get(node.leadingTrivia?.span) + `public function ${name}(${args}) {
        return ${mods.includes('static') ? `${'\\' + this._namespace + '\\' + this._className}::` : '$this->_impl->'}${name}(${callableArgs});
      }\n`;
    }
    super.visitMethodDeclaration(node);
  }
}
