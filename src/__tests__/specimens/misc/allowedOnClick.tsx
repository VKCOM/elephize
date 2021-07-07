// @elephizeTarget
export const AllowedGlobalClick = () => {
  // @ts-ignore
  return <div onClick="SomeGlobalVar.test()">test</div>;
};

// @elephizeTarget
export const AllowedGlobalClickVar = () => {
  const variable = 'SomeGlobalVar.test()';
  
  // @ts-ignore
  return <div onClick={variable}>test</div>;
};

const Listeners = {
  foo: 'SomeGlobalVar.foo()',
  bar: 'SomeGlobalVar.bar()',
}

// @elephizeTarget
export const AllowedGlobalClickVar2 = () => {
  const variable = Date.now() % 2 ? Listeners.foo : Listeners.bar;
  
  // @ts-ignore
  return <div onClick={variable}>test</div>;
};


// @elephizeTarget
export const AllowedGlobalClickVar3 = () => {
  const variable: 'foo' | 'bar' = 'foo';
  
  // @ts-ignore
  return <div onClick={variable}>test</div>;
};
