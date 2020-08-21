let sisAa = 'test1';
let sisAb = 'test2';
let sisAc = window._elephizeIsServer ? sisAa : sisAb;
console.log(sisAb, sisAa, sisAc);
