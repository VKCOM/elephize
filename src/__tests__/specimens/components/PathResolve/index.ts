import { getFoo, SOME_CONST, getFoo2 } from './helpers';

export function getBar() {
    return 'bar';
}

getFoo();

const t1 = 't1';
const t2 = 't2';
const t3 = 't3';

export {
    getFoo,
    getFoo2,
    SOME_CONST,
    t1,
    t2,
    t3
}