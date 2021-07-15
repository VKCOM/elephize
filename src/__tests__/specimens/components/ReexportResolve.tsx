import { getFoo, SOME_CONST, getBar as getBuzz, getFoo2 } from "./PathResolve";
import { ReactPathResolveComponent, ReactPathResolveModule } from "./PathResolveReact";
import { ReactPathResolveComponent as ReactPathResolveComponentDirect } from "./PathResolveReact/Component";

getFoo();
getFoo2();
getBuzz();
console.log(SOME_CONST);

// @elephizeTarget
function render() {
  getFoo();
  getBuzz();
  console.log(SOME_CONST);
  
  return <>
    <ReactPathResolveModule />
    <ReactPathResolveComponent />
    <ReactPathResolveComponentDirect />
  </>;
}