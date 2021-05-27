const ctyiaStringDictFun = (dict: { [key: string]: string }) => {
  return Object.keys(dict).length;
};

const ctyiaStringDictFun2 = (dict: { [key: string]: "kek" | "lol" | "wow" }) => {
  return Object.keys(dict).length;
};

const ctyiaBoolDictFun = (dict: { [key: string]: boolean }) => {
  return Object.keys(dict).length;
};

const ctyiaBoolDictFun2 = (dict: { [key: string]: true | false }) => {
  return Object.keys(dict).length;
};

const ctyiaNumDictFun = (dict: { [key: string]: number }) => {
  return Object.keys(dict).length;
};

const ctyiaNumDictFun2 = (dict: { [key: string]: 1 | 2 | 3 | 4 }) => {
  return Object.keys(dict).length;
};

const ctyiaMixedDictFun = (dict: { [key: string]: number|string|boolean }) => {
  return Object.keys(dict).length;
};

const ctyiaMixedDictFun2 = (dict: { [key: string]: 1 | "2" | false }) => {
  return Object.keys(dict).length;
};

const ctyiaStringArrFun = (dict: string[]) => {
  return Object.keys(dict).length;
};

const ctyiaStringArrFun2 = (dict: Array<"lol" | "kek" | "wow">) => {
  return Object.keys(dict).length;
};

const ctyiaBoolArrFun = (dict: boolean[]) => {
  return Object.keys(dict).length;
};

const ctyiaBoolArrFun2 = (dict: Array<true | false>) => {
  return Object.keys(dict).length;
};

const ctyiaNumArrFun = (dict: number[]) => {
  return Object.keys(dict).length;
};

const ctyiaNumArrFun2 = (dict: Array<1 | 2 | 3 | 4>) => {
  return Object.keys(dict).length;
};

const ctyiaMixedArrFun = (dict: Array<number|string|boolean>) => {
  return Object.keys(dict).length;
};

const ctyiaMixedArrFun2 = (dict: Array<1 | "2" | false>) => {
  return Object.keys(dict).length;
};

const ctyiaStringTupleFun = (dict: [string, string, string]) => {
  return Object.keys(dict).length;
};

const ctyiaStringTupleFun2 = (dict: ["lol" | "kek" | "wow", "lol" | "kek" | "wow", "lol" | "kek" | "wow"]) => {
  return Object.keys(dict).length;
};

const ctyiaBoolTupleFun = (dict: [boolean, boolean, boolean]) => {
  return Object.keys(dict).length;
};

const ctyiaBoolTupleFun2 = (dict: [true | false, true | false, true | false]) => {
  return Object.keys(dict).length;
};

const ctyiaNumTupleFun = (dict: [number, number, number]) => {
  return Object.keys(dict).length;
};

const ctyiaNumTupleFun2 = (dict: [1 | 2 | 3 | 4, 1 | 2 | 3 | 4, 1 | 2 | 3 | 4]) => {
  return Object.keys(dict).length;
};

const ctyiaMixedTupleFun = (dict: [number|string|boolean, number|string|boolean, number|string|boolean]) => {
  return Object.keys(dict).length;
};

const ctyiaMixedTupleFun2 = (dict: [1 | "2" | false, 1 | "2" | false, 1 | "2" | false]) => {
  return Object.keys(dict).length;
};

console.log(
  ctyiaBoolArrFun([true, false]),
  ctyiaBoolArrFun2([true, false]),
  ctyiaMixedArrFun(['a', true]),
  ctyiaMixedArrFun2(['2', false]),
  ctyiaNumArrFun([1, 3, 4]),
  ctyiaNumArrFun2([1, 3, 4]),
  ctyiaStringArrFun(['a', 'b']),
  ctyiaStringArrFun2(['kek', 'wow']),

  ctyiaBoolDictFun({'a': true}),
  ctyiaBoolDictFun2({'a': true}),
  ctyiaMixedDictFun({'a': true, 'b': 'a'}),
  ctyiaMixedDictFun2({'a': false, 'b': '2'}),
  ctyiaNumDictFun({'a': 1}),
  ctyiaNumDictFun2({'a': 1}),
  ctyiaStringDictFun({'a': 'a', 'b': 'b'}),
  ctyiaStringDictFun2({'a': 'lol', 'b': 'kek'}),

  ctyiaBoolTupleFun([true, false, false]),
  ctyiaBoolTupleFun2([true, false, false]),
  ctyiaMixedTupleFun(['true', true, 1]),
  ctyiaMixedTupleFun2(['2', false, 1]),
  ctyiaNumTupleFun([1, 2, 3]),
  ctyiaNumTupleFun2([1, 2, 3]),
  ctyiaStringTupleFun(['a', 'b', 'c']),
  ctyiaStringTupleFun2(['kek', 'wow', 'lol']),
);
