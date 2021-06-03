import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';

export const tJsxExpression = (node: ts.JsxExpression, context: Context<Declaration>) => {
  if (node.expression &&
    !ts.isLiteralExpression(node.expression) &&
    !ts.isNumericLiteral(node.expression) &&
    !ts.isStringLiteral(node.expression) &&
    node.expression.kind !== ts.SyntaxKind.TrueKeyword &&
    node.expression.kind !== ts.SyntaxKind.FalseKeyword
  ) {
    return `\\${context.namespaces.builtins}\\IntrinsicElement::escape(` + renderNode(node.expression, context) + ')';
  }

  /*
  TODO
  Текущие проблемы:
  - Двойное экранирование для вложенных конструкций типа <Outer>{...map(() => <Cmp>{smth}</Cmp>)}</Outer>
  - Экранирование children - <Outer>{children}</Outer> - излишне.
  - Внутри строго текстовых нод не раскукоживаются utf-символы
   */
  return renderNode(node.expression, context);
};
