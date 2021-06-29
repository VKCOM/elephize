import { getFoo, SOME_CONST } from "./PathResolve/index";
import { ReactPathResolveComponent } from "./PathResolveReact/index";

getFoo();
console.log(SOME_CONST);

// @elephizeTarget
function render() {
  getFoo();
  console.log(SOME_CONST);
  return <ReactPathResolveComponent></ReactPathResolveComponent>;
}