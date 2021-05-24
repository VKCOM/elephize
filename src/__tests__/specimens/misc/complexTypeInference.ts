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

console.log(
  ctyiaBoolArrFun([true, false]),
  ctyiaBoolDictFun({'a': true}),
  ctyiaMixedArrFun(['a', true]),
  ctyiaMixedDictFun({'a': true, 'b': 'a'}),
  ctyiaNumArrFun([1, 3, 4]),
  ctyiaNumDictFun({'a': 1}),
  ctyiaStringArrFun(['a', 'b']),
  ctyiaStringDictFun({'a': 'a', 'b': 'b'}),

  ctyiaBoolArrFun2([true, false]),
  ctyiaBoolDictFun2({'a': true}),
  ctyiaMixedArrFun2(['2', false]),
  ctyiaMixedDictFun2({'a': false, 'b': '2'}),
  ctyiaNumArrFun2([1, 3, 4]),
  ctyiaNumDictFun2({'a': 1}),
  ctyiaStringArrFun2(['kek', 'wow']),
  ctyiaStringDictFun2({'a': 'lol', 'b': 'kek'}),
);
