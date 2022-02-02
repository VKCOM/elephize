import * as React from 'react';
import { classNames as cx } from '#utils/classnames';
import { ctx } from '#iso_palette/Context';

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
export const Radio: React.FunctionComponent<React.InputHTMLAttributes<any>> = (inputProps) => {
  const props = { ...defaultProps, ...inputProps };
  const { useContext } = React;
  const context = useContext(ctx);

  const {
    className,
    children,
    ...nativeProps
  } = props;

  const classNames = cx(
    'Radio',
    className,
    { 'Radio--disabled': !!props.disabled },
  );

  return (
    <label className={classNames}>
      <input type="radio" className='Radio__input Radio__visuallyHidden' {...nativeProps} />
      <span className='Radio__control' />
      {context.label}
      {children && <span className='Radio__text'>{children}</span>}
    </label>
  );
};
