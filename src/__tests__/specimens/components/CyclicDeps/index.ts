import { getCyclicEntry1 } from "./entry1";
import { getCyclicEntry2, getCyclicEntry3 } from "./entry2";

export function getIndex() {
  return getCyclicEntry3();
}

export {
  getCyclicEntry1,
  getCyclicEntry2,
  getCyclicEntry3,
}
