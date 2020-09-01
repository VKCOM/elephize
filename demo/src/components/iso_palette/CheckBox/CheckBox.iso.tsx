import * as React from 'react';
import { classNames as cx } from '#utils/classnames';

type Props = {
  checked?: string | boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  id?: string | number;
  name?: string | number;
  onChange?: (name: React.ReactText, checked: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  className?: string;
};

// @elephizeTarget
export const CheckBox: React.FC<Props> = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(props.name || '', event.target.checked, event);
    }
  };

  const { children, checked, disabled, indeterminate, name, id, ...nativeProps } = props;
  const classNames = cx('CheckBox', nativeProps.className, {
    'CheckBox--disabled': !!disabled,
    'CheckBox--indeterminate': !!indeterminate,
  });

  return (
    <label className={classNames}>
      <input type="checkbox" {...nativeProps} className="CheckBox__input" id={id?.toString()}
        checked={!!checked} name={name?.toString()} disabled={disabled} onChange={onChange} />
      <span className="CheckBox__indicator" aria-hidden={true} />
      {children}
    </label>
  );
};
