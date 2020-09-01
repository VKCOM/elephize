import * as React from 'react';

/*
  Fix #0001: Unable to transpile arbitrary component.
  Error message: Call stack got out of bounds: this should not happen and probably is a bug in transpiler
  Reproduction: Happened when trying to transpile current checkbox component.
  Reason: Component has constant arrow function declared inside its body. Arrow functions and
          function expressions was not declared, so scope couldn't find node to bind to. Fixed decls.
 */

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

  return <label className={'CheckBox--disabled'}>
    <input {...nativeProps} className="CheckBox__input" id={id?.toString()} type="checkbox"
           checked={!!checked} name={name?.toString()} disabled={disabled} onChange={onChange} />
    <span className="CheckBox__indicator" aria-hidden={true} />
    {children}
  </label>;
};
