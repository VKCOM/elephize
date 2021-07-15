import { getLang, getLangStatic } from './toReplace';
import { getFoo, getBar, classNames } from './toReplaceIndex';
let obj4 = { a: 1, b: 2 };
do {
  // @ts-ignore
  console.log(getLang('lol!'));
  console.log(getLangStatic('lol!'));
  console.log(getFoo('lol!'));
  console.log(getBar('lol!'));
  if (obj4) break;
} while (true);

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