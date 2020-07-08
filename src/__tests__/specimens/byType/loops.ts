for (let i = 0; i < 3; i++) {
  console.log(i);
}

let obj = { a: 1, b: 2 };
for (let i in obj) {
  if (!obj.hasOwnProperty(i)) { // should check for existence of this!
    continue;
  }
  console.log(i);
}

let obj2 = [1, 2, 3];
for (let j of obj2) {
  console.log(j);
}

while (true) {
  console.log('kek!');
  if (obj) break;
}

do {
  console.log('lol!');
  if (obj) break;
} while (true);
