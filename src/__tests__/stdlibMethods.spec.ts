import { runBatch } from './runBatch';

test('ts2php.stdlibMethods', () => {
  return runBatch([__dirname, 'specimens'], [
    ['arrayMethods', 'map.ts'],
    ['arrayMethods', 'reduce.ts'],
    ['arrayMethods', 'forEach.ts'],
    ['arrayMethods', 'filter.ts'],
    ['arrayMethods', 'some.ts'],
    ['arrayMethods', 'find.ts'],
    ['arrayMethods', 'indexOf.ts'],
    ['arrayMethods', 'pushPop.ts'],
    ['arrayMethods', 'slice.ts'],
    ['arrayMethods', 'splice.ts'],
    ['arrayMethods', 'includes.ts'],
    ['arrayMethods', 'isArray.ts'],
    ['stringMethods', 'strIndexOf.ts'],
    ['stringMethods', 'substr.ts'],
    ['stringMethods', 'strSlice.ts'],
    ['stringMethods', 'split.ts'],
    ['stringMethods', 'join.ts'],
    ['stringMethods', 'trim.ts'],
    ['stringMethods', 'startsWith.ts'],
    ['stringMethods', 'strIncludes.ts'],
    ['objectMethods', 'keys.ts'],
    ['objectMethods', 'defaultOperator.ts'],
    ['objectMethods', 'complexObjectFuncs.ts'],
    ['objectMethods', 'unusedVarsElimination.ts'],
    ['objectMethods', 'customIsomorphics.ts'],
    ['objectMethods', 'constructorTypeCast.ts'],
    ['mathMethods', 'basic.ts'],
    ['mathMethods', 'trigonometry.ts'],
    ['mathMethods', 'constants.ts'],
    ['functionMethods', 'closures.ts']
  ]);
});
