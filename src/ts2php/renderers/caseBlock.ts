import * as ts from 'typescript';
import { Declaration } from '../types';
import { Context } from '../components/context';
import { renderNodes } from '../components/codegen/renderNodes';

export const tCaseBlock = (node: ts.CaseBlock, context: Context<Declaration>) => renderNodes([...node.clauses], context).join('\n');
