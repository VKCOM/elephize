import * as React from 'react';
import { classNames as cx } from '#utils/classnames';

interface Props extends React.ButtonHTMLAttributes<any> {
  overflow?: boolean;
  /** Внешний вид кнопки */
  appearance: 'primary' | 'negative' | 'positive' | 'secondary' | 'tertiary' | 'rounded' | 'mobile' | 'link';
  /** Размер кнопки */
  size: 'l' | 'm' | 's';
  /** Кнопка должна занимать всю доступную ширину */
  wide: boolean;
  /** Отключена ли кнопка, или нет (можно ли на неё кликать) */
  disabled: boolean;
  /** Содержимое перед контентом кнопки */
  before?: React.ReactElement;
}

// Непонятный костыль, не уверен что это корректно, что может прийти массив вообще
function getAppearanceClasses(appearance: string | string[]) {
  if (Array.isArray(appearance)) {
    return appearance.map((el) => `Button--${el}`);
  } else {
    return [`Button--${appearance}`];
  }
}

const buttonDefaultProps: Props = {
  appearance: 'primary',
  size: 'm',
  wide: false,
  disabled: false,
};

/**
 * @elephizeTarget
 * @param {object} inputProps
 * @constructor
 */
export const Button: React.FunctionComponent<Props> = (inputProps) => {
  const props = { ...buttonDefaultProps, ...inputProps };
  const { className, appearance, wide, overflow, size, before, ...nativeProps } = props;
  // 1) для того, чтобы disabled попал в nativeProps
  // 2) elephize резервирует children для имени на сервере, нужно писать именно так.
  const { disabled, children } = props;

  const classnames = cx(
    'Button',
    ...getAppearanceClasses(appearance),
    `Button--size-${size}`,
    {
      'Button--wide': wide,
      'Button--overflow': !!overflow,
      'Button--disabled': disabled,
    },
    className
  );

  return (
    <button {...nativeProps} className={classnames}>
      {before || null}
      {children}
    </button>
  );
};
