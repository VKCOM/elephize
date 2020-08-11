import * as React from 'react';
// @ts-ignore
import { getLang2 } from 'langs';
import { getSome } from './__toIgnore';

export const eit1 = '123';

// @elephizeTarget
export const ComponentIgnore = () => {
  return <div onClick={getLang2('234' + getSome())}>test</div>;
};
