function dvf(a: number, b: number = 123, c: boolean = true) {
  console.log(a, b, c);
}

function dvdo({a, b = 123, c = true}: { a: number, b?: number, c?: boolean }) {
  console.log(a, b, c);
}

function dvda([a, b = 123, c = true]: [number, number?, boolean?]) {
  console.log(a, b, c);
}

console.log(dvf(1));
console.log(dvdo({ a: 1 }));
console.log(dvda([1]));
