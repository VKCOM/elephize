import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNode } from '../components/codegen/renderNodes';

export const tAsExpression = (node: ts.AsExpression, context: Context<Declaration>) => renderNode(node.expression, context);
