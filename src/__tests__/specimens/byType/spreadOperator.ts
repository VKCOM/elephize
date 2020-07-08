const sso = [1, 2, 3, 4];
const ssb = [2, 3, ...sso, 6];
const sse = [4, 5, ...sso.map((c) => c * 2), 7];

const ssc = { a: 1, b: 2, c: 3 };
const ssd = {
  d: 4,
  ...ssc,
  e: 5
};
function ssff(...args: any[]) {
  return { ...args, ssd };
}
const ssf = {
  h: 6,
  ...ssff(),
  j: 8
};

const ssg = ssff(
  'Button',
  ...ssff('test'),
  'kek',
  {
    'lol': 1
  }
);

const ssgg = ssff(
  'Button',
  'kek',
  {
    'lol': 1
  },
  ...ssff('test')
);

console.log(sso, ssb, ssc, ssd, sse, ssf, ssg, ssgg);
