import * as ts from 'typescript';
import { Context } from '../components/context';
import { snakify } from './pathsAndNames';
import { isTopLevel } from './isTopLevel';
import { Declaration } from '../types';

export type ElementDefinition = {
  identifier: ts.Identifier;
  initializer: string;
};

export const renderPattern = (
  placeholder: string,
  node: ts.Node,
  elements: Array<ElementDefinition | null>,
  identList: ts.Identifier[],
  context: Context<Declaration>
) => elements
  .filter<ElementDefinition>((el): el is ElementDefinition => !!el)
  .map((el) => {
    return {
      ...el,
      initializer: el.initializer.replace(/%placeholder%/g, `$${snakify(placeholder)}`)
    };
  })
  .map((el) => {
    identList.push(el.identifier);
    const ident = snakify(el.identifier.getText());
    if (isTopLevel(node, context)) { // Top-level declarations transform to properties and construction initializers
      context.moduleDescriptor.addProperty('$' + ident, 'public');
      context.moduleDescriptor.addStatement(`$this->${ident} = ${el.initializer};`);
      return null;
    } else {
      return `$${ident} = ${el.initializer}`;
    }
  })
  .filter<string>((el): el is string => !!el)
  .map((stmt) => stmt + ';')
  .join('\n');