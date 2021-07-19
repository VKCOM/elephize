import { getFoo, SOME_CONST, getBar as getBuzz, getFoo2 } from "./PathResolve";
import { ReactPathResolveAnonymousModule, ReactPathResolveComponent, ReactPathResolveModule } from "./PathResolveReact";
import { ReactPathResolveAnonymousComponent, ReactPathResolveComponent as ReactPathResolveComponentDirect } from "./PathResolveReact/Component";
import { ReactPathResolveComponent as ReactPathResolveComponentAlias } from "#specimens/components/PathResolveReact";
import { getFoo3 } from "./PathResolve/helpers";

getFoo();
getFoo2();
getFoo3();
getBuzz();
console.log(SOME_CONST);

// @elephizeTarget
function render() {
  getFoo();
  getFoo2();
  getFoo3();
  getBuzz();
  console.log(SOME_CONST);
  
  return <>
    <ReactPathResolveModule />
    <ReactPathResolveAnonymousModule />
    <ReactPathResolveComponent />
    <ReactPathResolveAnonymousComponent />
    <ReactPathResolveComponentDirect />
    <ReactPathResolveComponentAlias />
  </>;
}