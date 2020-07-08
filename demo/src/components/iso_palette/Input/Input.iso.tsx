import * as React from 'react';
import { classNames as cx } from '#utils/classnames';

interface Props extends React.InputHTMLAttributes<any> {
  type: 'text' | 'password' | 'date' | 'datetime-local' | 'time' | 'month' | 'email' | 'number' | 'tel' | 'url' | 'hidden';
  alignment: 'left' | 'center' | 'right';
  initialValue: string;
}

const defaultProps: Props = {
  type: 'text',
  initialValue: '',
  alignment: 'left',
};

// @elephizeTarget
export const ControlledInput: React.FunctionComponent<Props> = (initialProps) => {
  const props = { ...defaultProps, ...initialProps };
  const { alignment, value, className, ...nativeProps } = props;
  const modifiers = {
    'Input--left': alignment === 'left',
    'Input--center': alignment === 'center',
    'Input--right': alignment === 'right'
  };

  const onChange = (e: React.ChangeEvent<any>) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const refCb = null;

  return (
    <input
      {...nativeProps}
      className={cx('Input', modifiers, className)}
      ref={refCb} // TODO: что делать с рефами? callback refs с присвоением в this тут явно не сработают!
      value={value}
      onChange={onChange}
    />
  );
};

// @elephizeTarget
export const StatefulInput: React.FunctionComponent<Props> = (initialProps) => {
  const { useState } = React;
  const props = { ...defaultProps, ...initialProps };
  const { alignment, initialValue, className, ...nativeProps } = props;
  const [inputValue, setInputValue] = useState(initialValue || '');
  const modifiers = {
    'Input--left': alignment === 'left',
    'Input--center': alignment === 'center',
    'Input--right': alignment === 'right'
  };

  const onChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const refCb = null;

  return (
    <input
      {...nativeProps}
      className={cx('Input', modifiers, className)}
      ref={refCb} // TODO: что делать с рефами? callback refs с присвоением в this тут явно не сработают!
      value={inputValue}
      onChange={onChange}
    />
  );
};

