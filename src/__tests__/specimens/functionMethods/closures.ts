const artest = (b: number) => {
  let called = 0;
  const nested = (c: number) => {
    called += c;
    return called;
  };
  const nested2 = (c: number) => {
    return called + c;
  };
  return nested(b) + nested2(b);
};

console.log(artest(1));
