import { getFoo, SOME_CONST } from './helpers';

export function getBar() {
    return 'bar';
}

getFoo();

const t1 = 't1';
const t2 = 't2';
const t3 = 't3';

export {
    getFoo,
    SOME_CONST,
    t1,
    t2,
    t3
}