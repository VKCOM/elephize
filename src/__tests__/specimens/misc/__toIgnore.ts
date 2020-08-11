// @ts-ignore
export const getSome = () => typeof <strng>'123' as string; // typename typo is intentional to make sure this file is not parsed at all!
