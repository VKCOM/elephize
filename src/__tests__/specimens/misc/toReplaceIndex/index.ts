export const getFoo = (test: string, test2: string) => 'foo' + test + test2;
export const getTest1 = (test: string, test2: string = '') => 'foo' + test + test2;
export const getTest2 = (test: string = '', test2: string = '') => 'foo' + test + test2;
export const getTest3 = (test: string = '', test2: string = '', ...args) => 'foo' + test + test2 + args[0];
export const getTest4 = (test: string = '', test2: string, ...args) => 'foo' + test + test2 + args[0];
export const getTest5 = (test: string = '', test2: string = '', ...args) => 'foo' + test + test2 + args[0];
export const getBar = (test: string) => 'bar' + test;
export const classNames: (...args) => string = (..._args) => 'classNames';