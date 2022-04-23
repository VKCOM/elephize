
// Force 'boolean' in PHPDocs instead of 'bool'
const test1 = 1 as mixed|boolean;
const test2 = 1 as mixed|false;
const test3 = 1 as mixed|true;
const test4 = '' as string|boolean;
const test5 = '' as string|false;
const test6 = '' as string|true;
const test7 = true as mixed|boolean;

console.log(
  test1
  , test2
  , test3
  , test4
  , test5
  , test6
  , test7
);
