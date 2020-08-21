import * as React from 'react';
import { Button } from '#iso_palette/Button/Button.iso';
import { StatefulInput } from '#iso_palette/Input/Input.iso';
import { Radio } from '#iso_palette/Radio/Radio.iso';

// @elephizeTarget
export const App: React.FunctionComponent = () => {
  const { useState } = React;
  const [data/* , updateData */]: [{ [key: string]: number }, any] = useState({
    'Иванов И.И.': 25000,
    'Петров П.П.': 31000,
    'Сидоров С.С.': 40000
  });

  function saveData() {
    console.log('Lol!');
  }

  return <div className={'elephize-test'}>
    <div className={'elephize-test-row'}>
      <span className={'elephize-test-title-head'}>ФИО</span>
      <span className={'elephize-test-title-head'}>Сумма</span>
      <span className={'elephize-test-title-head'}>Коэффициент</span>
      <span className={'elephize-test-title-head'}>Действия</span>
    </div>
    {window._elephizeIsServer ? <div>It's PHP!</div> : <div>It's JS!</div>}

    {Object.keys(data).map((key, idx) => <div key={`id-${idx}`} className={'elephize-test-row'}>
      <span className={'elephize-test-title'}>Lol {key} kek</span>
      <span className={'elephize-test-number'}>
        <StatefulInput type={'number'} alignment={'left'} initialValue={data[key].toString()} />
      </span>
      <span className={'elephize-test-coeff'}>
        <Radio name={'el-test'} value={'1'}>1x</Radio>
        <Radio name={'el-test'} value={'2'}>2x</Radio>
        <Radio name={'el-test'} value={'3'}>3x</Radio>
      </span>
      <span className={'elephize-test-actions'}>
        <Button appearance={'primary'} size={'m'} wide={false} disabled={false} onClick={saveData}>
          Сохранить
        </Button>
      </span>
    </div>)}
  </div>;
};
