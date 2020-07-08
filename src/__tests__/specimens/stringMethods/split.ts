let aspl = '12:3:45';
let bspl = aspl.split(':');
let cspl = aspl.split(':', 1);
let dspl = aspl.split(/[24]/i);
let espl = aspl.split(/[24]/i, 1);
console.log(bspl, cspl, dspl, espl);
