import * as React from 'react';

const defaultProps: React.InputHTMLAttributes<any> = {
  className: '',
  name: undefined,
  onChange: undefined,
  checked: undefined,
  defaultChecked: undefined,
  autoFocus: false,
  disabled: false,
  children: null,
};

// @elephizeTarget
export const InheritedProps: React.FunctionComponent<React.InputHTMLAttributes<any>> = (inputProps) => {
  const props = { ...defaultProps, ...inputProps };

  const {
    className,
    children,
    ...nativeProps
  } = props;

  return (
    <label>
      <input type="radio" className='Radio__input Radio__visuallyHidden' {...nativeProps} />
      <span className='Radio__control' />
      {children && <span className='Radio__text'>{children}</span>}
    </label>
  );
};
