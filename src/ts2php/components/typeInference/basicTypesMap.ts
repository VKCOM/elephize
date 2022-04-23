export const typeMap: { [key: string]: string } = {
  'number': 'float',
  'string': 'string',
  'boolean': 'boolean',
  'true': 'boolean',
  'false': 'boolean',
  'any': 'mixed',
};

// Force conventional type casts. For example `(bool)` type cast for boolean values (instead of `(boolean)`)
export const typeCastFuncForTypeMap = new Map<string, string>([
  ['boolean', 'bool'],
  ['float', 'float'],
  ['string', 'string'],
]);

export const typeCastFuncForType = (type: string): string | undefined => typeCastFuncForTypeMap.get(type);
