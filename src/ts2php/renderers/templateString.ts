import * as ts from 'typescript';
import { Declaration } from '../types';
import { escapeString } from '../utils/escapeString';
import { Context } from '../components/context';
import { renderNodes } from '../components/codegen/renderNodes';

export const tTemplateExpression = (node: ts.TemplateExpression, context: Context<Declaration>) => {
  return renderNodes([node.head, ...node.templateSpans], context).join(' . ');
};

export function tTemplateSpan(node: ts.TemplateSpan, context: Context<Declaration>) {
  const [expr, literal] = renderNodes([node.expression, node.literal], context);
  return `(${expr})` + (literal && literal !== '""' ? ' . ' + literal : '');
}

export function tTemplateStatic(node: ts.TemplateHead | ts.TemplateMiddle | ts.TemplateTail | ts.NoSubstitutionTemplateLiteral) {
  const str = escapeString(node.text);
  if (str) {
    return '"' + str + '"';
  }
  return '';
}
