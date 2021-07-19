import { getLang, getLangStatic } from './toReplace';
import { getFoo, getBar, classNames, getTest1, getTest2, getTest3, getTest4, getTest5 } from './toReplaceIndex';
let obj4 = { a: 1, b: 2 };
do {
  // @ts-ignore
  console.log(getLang('lol!'));
  console.log(getLangStatic('lol!'));
  console.log(getFoo('lol!'));
  console.log(getBar('lol!'));
  console.log(getTest1('lol!'));
  console.log(getTest2('lol!', 'lol!'));
  console.log(getTest3('lol!'));
  console.log(getTest4('lol!', 'lol!'));
  console.log(getTest5('lol!'));
  if (obj4) break;
} while (true);

// @elephizeTarget
function IsoComponent() {
  return (
    <div className={classNames('Test')}>
       {/* @ts-ignore */}
      <div className={['A', 'B', 'C']}></div>
    </div>
  )
}

function r() {
  return <IsoComponent />
}