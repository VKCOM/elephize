import * as React from 'react';
import { Button } from '#iso_palette/Button/Button.iso';
import { StatefulInput } from '#iso_palette/Input/Input.iso';
import { Radio } from '#iso_palette/Radio/Radio.iso';
import { CheckBox } from '#iso_palette/CheckBox/CheckBox.iso';
import { ctx } from '#iso_palette/Context';

// @elephizeTarget
export const GenericIcon: React.FunctionComponent = () => {
  return <span>ico!</span>;
};

const armenian = `"&#1345;&#1381;&#1408;"`;

const injection = `<img src=x onerror=alert()>`;

// @elephizeTarget
export const CounterItemText = ({ children, ...rest }: React.PropsWithChildren<{ style?: React.CSSProperties, children: string }>) => {
  return <div className="counter-item--text" {...rest}>{children}</div>;
}

interface TextContainerProps {
  children: any;
  align?: string;
}

// @elephizeTarget
export const TextContainer = ({ children, align }: TextContainerProps) => {
  let classNames = ['content-text--container'];
  if (align) {
    classNames.push(`content-text--container__align-${align}`);
  }

  return (
    <div className={classNames.join(' ')}>
      {children}
    </div>
  );
};

const injection2 = `<script>alert()</script>🙃`;

// @elephizeTarget
export const App: React.FunctionComponent = () => {
  const { useState } = React;
  const [data/* , updateData */]: [{ [key: string]: number }, any] = useState({
    'Иванов И.И.': 25000,
    'Петров П.П.': 31000,
    'Сидоров С.С.': 40000
  });

  let [countClick, updateCountClick] = useState(0);

  function saveData() {
    console.log('Lol!');
    updateCountClick(countClick + 1);
  }

  return <div className={'elephize-test'}>
    <div className={'elephize-test-row'}>
      <span className={'elephize-test-title-head'}>ФИО</span>
      <span className={'elephize-test-title-head'}>Сумма</span>
      <span className={'elephize-test-title-head'}>Коэффициент</span>
      <span className={'elephize-test-title-head'}>Действия</span>
    </div>
    {window._elephizeIsServer ? <div>It's PHP!</div> : <div>It's JS!</div>}
    {countClick % 2 === 0 ? null : <div>Azaza</div>}

    {Object.keys(data).map((key: string, idx) => <div key={`id-${idx}`} className={'elephize-test-row'}>
      <span className={'elephize-test-title'}>Lol {key} kek</span>
      <span className={'elephize-test-number'}>
        <StatefulInput type={'number'} alignment={'left'} initialValue={data[key].toString()} />
      </span>
      <span className={'elephize-test-coeff'}>
        <ctx.Provider value={{ 'label': 'context! overridden' }}>
          <Radio name={'el-test'} value={'1'}>1x</Radio>
        </ctx.Provider>
        <Radio name={'el-test'} value={'2'}>2x</Radio>
        <Radio name={'el-test'} value={'3'}>3x</Radio>
        <CheckBox name={'test2'} />
      </span>
      <span className={'elephize-test-actions'} style={{ backgroundColor: '#a22', fontWeight: 'bold', marginTop: 12, WebkitTransition: 'all', msTransition: 'all' }}>
        <Button appearance={'primary'} size={'m'} wide={false} disabled={false} onClick={saveData}>
          Сохранить
        </Button>
        <Button appearance={'primary'} size={'m'} wide={false} disabled={false} before={<GenericIcon />}>
          Сохранить
        </Button>
      </span>
    </div>)}

    {injection}
    {armenian}
    <br />
    "&#1345;&#1381;&#1408;"
    <br />
    <input placeholder={'"&#1345;&#1381;&#1408;"'} />
    <input placeholder='"&#1345;&#1381;&#1408;"' />
    <br />
    <input placeholder={armenian} />
    <br />
    <TextContainer>
      <CounterItemText>{injection2}</CounterItemText>
    </TextContainer>
  </div>;
};
