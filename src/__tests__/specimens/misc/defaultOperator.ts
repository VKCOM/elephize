const doa = [1, 2, 3];
const dob = false;
const doc = dob || { a: true };
const dod = doa[5] || doa.length;
console.log(doc, dod);
