import * as React from 'react';

// @elephizeTarget
export const DummyComponent = (props: { onClick: () => void; count: number }) => {
  return (
    <div>
      <p>You clicked {props.count} times</p>
      <button onClick={() => props.onClick()}>
        Click me
      </button>
      <button onClick={() => props.onClick()} disabled={true}>
        Click me
      </button>
    </div>
  );
};
