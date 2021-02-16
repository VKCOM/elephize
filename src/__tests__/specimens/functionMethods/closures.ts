const artest = (b: number) => {
  let calledTimes = 0;
  const nested = (c: number) => {
    calledTimes += c;
    return calledTimes;
  };
  const nested2 = (c: number) => {
    return calledTimes + c;
  };
  return nested(b) + nested2(b);
};

console.log(artest(1));
