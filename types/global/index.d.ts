/* eslint-disable @typescript-eslint/no-empty-interface,@typescript-eslint/camelcase,@typescript-eslint/class-name-casing */

// If you need to add more custom typehints,
// see also: components/typeInference/customTypehintsList.ts
// Use Typehint__Int as an example.

interface $__ElephizeTypehint__Int__$ {}
interface $__ElephizeTypehint__Mixed__$ {}
type $__ElephizeTypehint__Any__$ = number
| string
| bigint
| $__ElephizeTypehint__Any__$[]
| { [key: number]: $__ElephizeTypehint__Any__$; [key: string]: $__ElephizeTypehint__Any__$ }
| boolean
| symbol
| null
| undefined
| $__ElephizeTypehint__Mixed__$;

declare type mixed = $__ElephizeTypehint__Any__$;
declare type int = number & $__ElephizeTypehint__Int__$;
declare function parseInt(s: string, radix?: number): int;
