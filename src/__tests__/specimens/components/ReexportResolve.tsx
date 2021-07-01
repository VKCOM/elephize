import { getFoo, SOME_CONST, getBar as getBuzz, getFoo2 } from "./PathResolve/index";
import { ReactPathResolveComponent } from "./PathResolveReact/index";

getFoo();
getFoo2();
getBuzz();
console.log(SOME_CONST);

// @elephizeTarget
function render() {
  getFoo();
  getBuzz();
  console.log(SOME_CONST);
  return <ReactPathResolveComponent></ReactPathResolveComponent>;
}