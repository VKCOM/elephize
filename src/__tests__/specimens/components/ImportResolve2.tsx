import { getBar } from "./PathResolve/index";
import { getTest } from "./PathResolve/tsx";
import { PathResolveReactComponent1, PathResolveReactComponent2 } from "./PathResolveReact";

getBar();
getTest();
getReact();
getReact2();

function getReact() {
    return <PathResolveReactComponent1 />
}

function getReact2() {
    return <PathResolveReactComponent2 />
}
