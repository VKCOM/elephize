// If you need to add more custom typehints,
// see also: components/typeInference/customTypehintsList.ts
declare interface ElephizeTypehintInt extends Number {
  ___int: true;
}
declare type int = number | ElephizeTypehintInt;
declare function parseInt(s: string, radix?: number): int;
