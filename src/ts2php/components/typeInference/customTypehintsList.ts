export const mixedTypehintId = '$__ElephizeTypehint__Mixed__$';

export const customTypehints: { [key: string]: { replacement: string; drop: string[] } } = {
  // Special one! Checked separately in the code.
  [mixedTypehintId]: {
    replacement: 'mixed',
    drop: ['var']
  },


  '$__ElephizeTypehint__Int__$': {
    replacement: 'int',
    drop: ['float']
  }
};