import * as React from 'react';
import { ReactContextConsumer } from './ReactContextConsumer';
import { Ctx1 } from './ReactContextSource';

// @elephizeTarget
export function ReactContextProvider() {
  const Ctx2 = React.createContext({ testInnerVal: 2 });
  return (<Ctx2.Provider value={{ testInnerVal: 3 }}>
    <Ctx1.Provider value={{ testVal: 4 }}>
      <ReactContextConsumer someprop={123} innerctx={Ctx2} />
    </Ctx1.Provider>
  </Ctx2.Provider>);
}
