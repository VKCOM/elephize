import * as rct from 'react';
import * as exp from './export';
import { test, test2 as t2 } from './export';
// @ts-ignore
import { test as test3 } from '#specimens/byType/export';

const f = rct.Fragment;
test();
test3();
exp.test();
let a = t2;
console.log(a, f);
