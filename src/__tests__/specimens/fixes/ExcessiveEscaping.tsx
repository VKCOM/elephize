import * as React from 'react';

interface TextContainerProps {
  children: any;
  align?: string;
}

// @elephizeTarget
export const TextContainer = ({ children, align }: TextContainerProps) => {
  let classNames = ['content-text--container'];
  if (align) {
    classNames.push(`content-text--container__align-${align}`);
  }

  return (
    <div className={classNames.join(' ')}>
      {children}
    </div>
  );
};
