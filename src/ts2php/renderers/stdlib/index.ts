import * as ts from 'typescript';
import { Declaration, ExpressionHook } from '../../types';
import { Context } from '../../components/context';
import { arrayFilter } from './arrayFilter';
import { arrayFind } from './arrayFind';
import { arrayForeach } from './arrayForEach';
import { arrayJoin } from './arrayJoin';
import { arrayMap } from './arrayMap';
import { arrayPop } from './arrayPop';
import { arrayPush } from './arrayPush';
import { arrayReduce } from './arrayReduce';
import { arraySome } from './arraySome';
import { arraySplice } from './arraySplice';
import { arrayStringIncludes } from './arrayStringIncludes';
import { arrayStringLastIndexOf } from './arrayStringLastIndexOf';
import { arrayStringIndexOf } from './arrayStringIndexOf';
import { arrayStringSlice } from './arrayStringSlice';
import { math } from './math';
import { toString } from './toString';
import { objectKeys } from './objectKeys';
import { typecastConstructors } from './typecastConstructors';
import { stringSplit } from './stringSplit';
import { stringStartsWith } from './stringStartsWith';
import { stringSubstr } from './stringSubstr';
import { stringTrim } from './stringTrim';
import { stringReplace } from './stringReplace';
import { arrayIsArray } from './arrayIsArray';
import { parse } from './parse';
import { Scope } from '../../components/unusedCodeElimination/usageGraph';
import { markUsedVars } from '../../components/unusedCodeElimination/varsUsage';
import { getLeftExpr } from '../../utils/ast';

const stdlibHooks: ExpressionHook[] = [
  arrayFilter, arrayFind, arrayForeach, arrayJoin, arrayMap,
  arrayPop, arrayPush, arrayReduce, arraySome, arraySplice,
  arrayStringIncludes, arrayStringLastIndexOf, arrayStringIndexOf, arrayStringSlice,
  math, objectKeys, toString, stringSplit, stringStartsWith, stringSubstr, stringTrim,
  stringReplace, arrayIsArray, typecastConstructors, parse
];

export const hookStdlib: ExpressionHook = (node: ts.CallExpression, context: Context<Declaration>) => {
  let result = undefined;

  let lExp = getLeftExpr(node.expression);
  if (!lExp) {
    return undefined; // will be checked in base callExpression handler
  }

  const usedVars = new Set<string>();
  const onUsage = (ident: string) => usedVars.add(ident);
  context.scope.addEventListener(Scope.EV_USAGE, onUsage);
  stdlibHooks.some((hook) => {
    usedVars.clear();
    result = hook(node, context);
    if (result !== undefined) {
      return true;
    }
  });

  context.scope.removeEventListener(Scope.EV_USAGE, onUsage);

  if (result) { // Don't do redundant work if there's no result
    markUsedVars(node, lExp, usedVars, context);
  }

  return result;
};
