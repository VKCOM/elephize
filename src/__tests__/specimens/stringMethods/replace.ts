let arepl = '12:3:45';
let brepl = arepl.replace(':', '');
let crepl = arepl.replaceAll(':', '');
let drepl = arepl.replace(/[24]/i, 'test');
let erepl = arepl.replace(/[24]/ig, 'tst');
console.log(brepl, crepl, drepl, erepl);
