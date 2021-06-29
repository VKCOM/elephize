import { getFoo, SOME_CONST } from "./PathResolve/index";
import { ReactPathResolveComponent } from "./PathResolveReact/index";

getFoo();

function render() {
  console.log(SOME_CONST);
  return <ReactPathResolveComponent></ReactPathResolveComponent>;
}