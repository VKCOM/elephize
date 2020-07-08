import * as React from 'react';
interface Props {
  onClick: () => void;
  count: number;
  initialValue: string;
}

const defaultProps: Props = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => { return; },
  initialValue: '',
  count: 0,
};

// @elephizeTarget
export const FirstComponent: React.FunctionComponent<Props> = (initialProps) => {
  const props = { ...defaultProps, ...initialProps };
  const { onClick, count, initialValue } = props;

  const onClickReal = () => {
    if (initialValue !== '') {
      onClick();
    }
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={onClickReal}>
        Click me
      </button>
      <button onClick={onClickReal} disabled={true}>
        Click me
      </button>
    </div>
  );
};

// @elephizeTarget
export const SecondComponent: React.FunctionComponent<Props> = (initialProps) => {
  const props = { ...defaultProps, ...initialProps };
  const { onClick, count, initialValue } = props;

  const onClickReal = () => {
    if (initialValue !== '') {
      onClick();
    }
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={onClickReal}>
        Click me
      </button>
      <button onClick={onClickReal} disabled={true}>
        Click me
      </button>
    </div>
  );
};
