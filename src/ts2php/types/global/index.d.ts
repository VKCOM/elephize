// If you need to add more custom typehints,
// see also: components/typeInference/customTypehintsList.ts
// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface ElephizeTypehintInt {}
declare type int = number & ElephizeTypehintInt;
declare function parseInt(s: string, radix?: number): int;
