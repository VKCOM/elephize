## Supported syntax and standard library functions

### Common restrictions

- Only .ts/.tsx files are supported in general.
- Type coverage in your code is considered to be enough to make proper choices when transpiling function calls and operators
  (e.g., to make choice between substr and array_slice depending on object type when calling .slice())
- Asynchronous code is not supported at all, as well as everything connected to event loop (because there is no event
  loop or any similar entity in backend code). Support of data fetching from remote sources may emerge eventually, now it's not possible though.
- Browser APIs (like DOM, WebWorkers, LocalStorage, etc.) are not supported.
- Classes and prototypes are not supported - we expect procedural code (with little bit of FP) as input. 
- `this` keyword is not supported either.
- CommonJS `require` is not supported: use `import`/`export` instead.
  
Other gotchas:
- Changing outer scope variables from inside closure is not supported - use pure functions in your .map/.reduce/etc calls.
- Exported identifiers (e.g. `export const ...`) should have explicit initializer to ensure type inference. This is required by internal
  magic related to cross-module interactions.
- Variables defined in module scope should have explicit initializer too.

### Typescript syntax support

In general, next statements and expressions are supported now:

- Operators:
  - Logical (including assignment)
  - Arithmetic (including assignment)
  - Ternary conditional operator
  - Rest and spread operators, including rest/spread in function signatures
- Conditionals: if/else, switch/case
- Loops: for, for-in, for-of, while, do-while
- Optional chaining: limited support
  - Object nested properties - supported
  - Array nested members - not supported
  - Computed properties access - not supported
  - Function call in the middle of a chain - not supported
  - Function call at the end of a chain - generally unsupported but may work in some cases
  - Stdlib function calls at the end of a chain are supported (e.g., .toString(), .map()/.reduce())
- Variable declarations: var, let, const
- Functions:
  - Named declarations (e.g. `function foo() {}`)
  - Functional expressions (including named ones like `const foo = function bar() {}`, but these names will not be kept in output code)
  - Arrow functions
- Template strings (except tagged ones)
- Enums: limited support
  - local and imported enums are generally supported
  - Private and computed names are not supported
  - Whole enumeration should be either fully defined (every key has a defined value), or fully undefined (to calculate values automatically).
- JSX: limited support
  - Intrinsic elements (<div>, <br />, etc)
  - Custom components (only dumb components with simple view logic are supported)
  - React fragments in short form (<> </>)
- Modules support
  - imports (including `import * as ...`)
  - `export` modifier support for functions and variables
  - Webpack-like path aliases are supported in import instructions

Note: unsupported syntax that does not make sense on backend side (like interfaces or type declarations) are silently ignored. Incorrect 
usage of supported elements leads to errors printed to the console.

#### Custom type hints

Some custom types in generated phpdoc can be forced used custom type hints. Just include `./node_modules/@vkontakte/elephize/types` in 
`typeRoots` part of your `tsconfig.json` to enable `int` and `mixed` type casts like this: `const a: int = 1`,
`let b: mixed = getSomeMiscVars()`. Note that custom typehints are still experimental, so you may encounter tooling 
failures (e.g. typescript-eslint/restrict-plus-operands rule do not understand custom typehints). 
  
### Conditional code rendering

If you need to separate client-side and server-side implementations from each other, you may use **special constant**
`window._elephizeIsServer`. Note that the constant only works when used in a ternary condition - this is intentional, aimed to reduce 
code divergence. It's recommended to use both `window._elephizeIsServer` constant and `importRules` configuration option, as
ignoring client-only imports can speed up the translation process greatly.

#### How it works?

When syntax construction like `window._elephizeIsServer ? serverCode : clientCode` is encountered, elephize ignores `clientCode` completely
and replaces the whole ternary expression with `serverCode` translation result. Note that you can't just ignore `serverCode` on client side, so
it will be included in client-side bundle. If this is unacceptable, you probably want to use `importRules` configuration option to replace 
server-side module implementation completely.

### Standard library support

The following methods and constants are supported at the moment:

- `Math`: all methods and constants.
- Strings: includes, indexOf, join, slice, split (including split by regexp), startsWith, substr, trim, replace (including replace by regexp, 
  but only with /i and /g flags supported).
- Arrays: filter, find, forEach, includes, indexOf, map, push, pop, reduce, slice, some, splice.
- Objects: hasOwnProperty.
- Misc: Object.keys, Array.isArray.

### React

React constraints:

- **Only the following import syntax is supported for React library:** `import * as React from 'react';`
- The following two ways are acceptable to use React hooks functions:
  - `const { useState: us } = React;`
  - `const st = React.useState;`
- Only react-hooks-based functional components are supported. **Class-based components are not supported** (and probably will never be).
- Only dumb components with simple view logic are supported. Presentational state is allowed, the less is the better, though. 
  ([What are smart and dumb components?](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43))

All event handlers in components are ignored during the translation, and then all [unused code is eliminated](./code-elimination.md).

### Notes about [kphp](https://github.com/VKCOM/kphp)

- Code generated with elephize is expected to be compiled with kphp without any extra modifications.
- It's recommended to avoid ambiguity in your types - chances are kphp will fail to compile ambiguously typed code.
- kphp can't process union/intersection types, so in general you shouldn't rely on such types.
  - Scalar types union should work.
  - `type | Array<...>`-like union will definitely NOT work.
  - Object-based unions and discriminated union types also won't work.
- kphp requires all types to be known during the compilation, so we can't recommend you to use complex functional code style, in particular -
  only very simple higher order functions may work with kphp.
- Note the custom type hints section above - it might help a lot with type inference.

#### Forced typecasts

As we all know, typescript code may have a strongly dynamic nature, so it may be difficult to infer conformant types on php side. 
Sometimes types may be lost half-way and be casted to `mixed`. For this case, we have some kind of unsafe cast to ensure proper typing on php
side without affecting the typescript side using special comments like `/* @elephizeTypecast TYPE */`. TYPE can be any of these: array, int, 
float, string, boolean. The comment should be placed right before the usage of variable identifier.

- Example input: `console.log(/* @elephizeTypecast array */ tca, /* @elephizeTypecast boolean */ tcb);`
- Example output: `\VK\Elephize\Builtins\Console::log((array) $tca, (bool) $tcb);`

Note that forced typecasts are considered **UNSAFE** in general, so you are responsible for their correct usage. When used incorrectly,
forced typecasts may cause your server and client code output to diverge, so e.g. React will rerender the whole mismatched component tree
making server-side rendering useless. Note the example of incorrect usage:

Client side:
```
const a = 4;
console.log(/* @elephizeTypecast array */ tca); // Note forced typecast to array
```
Server side after translation will have following lines:
```
$a = 4;
\VK\Elephize\Builtins\Console::log((array) $a);
```
Note the difference: in php side we cast integer to array, thus creating an array with single integer element. 
