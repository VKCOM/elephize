import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';

export const tJsxExpression = (node: ts.JsxExpression, context: Context<Declaration>) => {
  if (shouldEscape(node.expression, context)) {
    return `\\${context.namespaces.builtins}\\IntrinsicElement::escape(` + renderNode(node.expression, context) + ')';
  }
  return renderNode(node.expression, context);
};

// Check if jsx expression should be html-escaped while rendering on server side
function shouldEscape(node: ts.Expression | undefined, context: Context<Declaration>) {
  if (!node) {
    return false;
  }

  if (ts.isLiteralExpression(node) || ts.isNumericLiteral(node) || ts.isStringLiteral(node)) {
    return false;
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword || node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  return true;
}

/*
  TODO
  Текущие проблемы:
  - Двойное экранирование для вложенных конструкций типа <Outer>{...map(() => <Cmp>{smth}</Cmp>)}</Outer>
  - Экранирование children - <Outer>{children}</Outer> - излишне.
  - Внутри строго текстовых нод не раскукоживаются utf-символы
   */
