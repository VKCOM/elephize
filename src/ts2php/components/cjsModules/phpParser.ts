import * as fs from 'fs';
import { SyntaxWalker } from '../../../vendor/php-parser/language/syntax/SyntaxWalker';
import {
  ClassDeclarationSyntaxNode,
  MethodDeclarationSyntaxNode
} from '../../../vendor/php-parser/language/syntax/SyntaxNode.Generated';
import { ISyntaxNode } from '../../../vendor/php-parser/language/syntax/ISyntaxNode';
import { ISyntaxToken } from '../../../vendor/php-parser/language/syntax/ISyntaxToken';
import { PhpSyntaxTree, TextSpan } from '../../../vendor/php-parser/main';

export class PhpParsedStruct extends SyntaxWalker {
  protected _className = '';
  protected _src: string;
  protected _decls: { [key: string]: string } = {};

  public constructor(protected _filename: string) {
    super();
    this._src = fs.readFileSync(this._filename, { encoding: 'utf-8' });
    const phpAst = PhpSyntaxTree.fromText(this._src);
    this.visit(phpAst.root);
  }

  public getDecl(name: string) {
    return this._decls[name];
  }

  public getClassName() {
    return this._className;
  }

  protected _get(span?: TextSpan): string {
    if (!span) return '';
    return this._src.slice(span.start, span.start + span.length);
  }

  public visitClassDeclaration(node: ClassDeclarationSyntaxNode) {
    this._className = this._get(node.identifier.span);
    super.visitClassDeclaration(node);
  }

  public visitMethodDeclaration(node: MethodDeclarationSyntaxNode) {
    const mods = node.modifiers?.allChildren().map((c: ISyntaxNode | ISyntaxToken) => this._get(c.span)) || [];
    if (mods.includes('public')) {
      const name = this._get(node.identifierOrKeyword.span);
      const args = node.parameters?.allChildren().map((c: ISyntaxNode | ISyntaxToken) => this._get(c.span)).join(', ') || '';
      this._decls[name] = this._get(node.leadingTrivia?.span) + `public function ${name}(${args}) {
        return ${mods.includes('static') ? `${this._className}::` : '$this->_impl->'}${name}(${args});
      }\n`;
    }
    super.visitMethodDeclaration(node);
  }
}