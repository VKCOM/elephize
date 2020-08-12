import * as React from 'react';
// @ts-ignore
// @elephizeIgnore
import { getLang } from 'langs';

export const eit1 = '123';

// @elephizeTarget
export const ComponentIgnore = () => {
  return <div onClick={getLang('234')}>test</div>;
};
