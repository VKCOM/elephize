const doa = [1, 2, 3];
const dob = false;
const doc = dob || { a: true };
const dod = doa[5] || doa.length;
const doe = dob || doa[5] || doc || dod;
console.log(doc, dod, doe);
