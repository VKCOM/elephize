import { runBatch } from './runBatch';
import { log } from '../ts2php/utils/log';

test('ts2php.components', () => {
  return runBatch([__dirname, 'specimens'], [
    ['components', 'ReactSupport.tsx'],
    ['components', 'ReactSupport2.tsx'],
    ['components', 'BasicComponent.tsx'],
    ['components', 'BasicComponentWithProps.tsx'],
    ['components', 'BasicComponentWithViewLogic.tsx'],
    ['components', 'DummyComponent.tsx'],
    ['components', 'NestedComponent.tsx'],
    ['components', 'TypedComponent.tsx'],
    ['components', 'ComponentWithOuterFunction.tsx'],
    ['components', 'ComponentBinaryOperators.tsx'],
    ['components', 'TwoComponents.tsx'],
    ['components', 'NestedComponentWithDummyInProps.tsx'],
    ['components', 'InnerHtmlComponent.tsx'],

    ['fixes', 'CheckBox.tsx'],
  ], log);
});
