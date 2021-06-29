import { getFoo } from './helpers';

export function getBar() {
    return 'bar';
}

getFoo();

const t1 = 't1';
const t2 = 't2';
const t3 = 't3';

export {
    getFoo,
    t1,
    t2,
    t3
}