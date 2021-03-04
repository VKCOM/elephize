import * as React from 'react';

// @elephizeTarget
export const NullReturnInComponent = (props: { onClick: () => void; count: number }) => {
  if (props.count % 2) {
    return null;
  }

  return (
    <div>
      <p>You clicked {props.count} times</p>
      <button onClick={() => props.onClick()}>
        Click me
      </button>
    </div>
  );
};
