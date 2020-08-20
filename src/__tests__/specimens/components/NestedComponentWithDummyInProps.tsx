import * as React from 'react';
import { DummyComponent } from './DummyComponent';

const {useState} = React;

// @elephizeTarget
export function NestedComponentWithDummyInProps(props: { componentToRender: React.ReactElement}) {
  const [count, setCount] = useState(0);
  const onclick = () => {
    setCount(count + 1);
  };
  const arr = [1, 2, 3];
  return <div>{ props.componentToRender }
    <DummyComponent onClick={() => setCount(count + 1)} count={count} />
    {arr.map((val) => <DummyComponent key={val} onClick={onclick} count={count} />)}
  </div>;
}

export function test() {
  return <NestedComponentWithDummyInProps componentToRender={<DummyComponent onClick={() => {}} count={1} /> } />;
}
