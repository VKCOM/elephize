import * as React from 'react';

import { getFoo, getBar } from "./PathResolve";
import { getFoo as getFoo2 } from "./PathResolve/helpers";
import { PathResolveReactComponent1 } from "./PathResolveReact/index";
import { PathResolveReactComponent2 as LolKek } from "./PathResolveReact/Component";

getBar();
getFoo();
getFoo2();
getReact();
getReact2();

function getReact() {
    return <PathResolveReactComponent1 test={1} />
}

function getReact2() {
    return <LolKek />
}
