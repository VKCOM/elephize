let ocpProp = 'sdf';
let ocp1 = { a: 123, [`${ocpProp}__asd`]: 321, [ocpProp]: 222, d: '123' };
console.log(ocp1);
