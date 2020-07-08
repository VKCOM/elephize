import * as React from 'react';
const { useState } = React;

// @elephizeTarget
export const ComponentBinaryOperators = (props: { onClick: () => void; count: number; initialValue: string| undefined }) => {
  const [inputValue] = useState(props.initialValue || '');

  return (
    <div>
      <p>You clicked {props.count} times</p>
      <button onClick={() => props.onClick()}>
        Click me
      </button>
      {inputValue && <span className='someSpan'>{inputValue}</span>}
    </div>
  );
};
