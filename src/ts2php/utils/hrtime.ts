export const getTimeMarker = () => {
  const hrt = process.hrtime();
  return `${hrt[0] * 1e9 + hrt[1]}`;
};
