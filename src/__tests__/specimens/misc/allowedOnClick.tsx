// @elephizeTarget
export const AllowedGlobalClick = () => {
  // @ts-ignore
  return <div onClick="SomeGlobalVar.test()">test</div>;
};
