/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */

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

interface Window {
  _elephizeIsServer?: boolean;
}

// Taken from TypeScript/lib/lib.esnext.string.d.ts of ts4.1, remove after upgrade
interface String {
  /**
   * Replace all instances of a substring in a string, using a regular expression or search string.
   * @param searchValue A string to search for.
   * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
   */
  replaceAll(searchValue: string | RegExp, replaceValue: string): string;

  /**
   * Replace all instances of a substring in a string, using a regular expression or search string.
   * @param searchValue A string to search for.
   * @param replacer A function that returns the replacement text.
   */
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
}
