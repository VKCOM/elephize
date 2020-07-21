function test1(b: number) {
  let a = 1 + b;
  this.test111 = 1;
  return a;
}
console.log(test1(1));
