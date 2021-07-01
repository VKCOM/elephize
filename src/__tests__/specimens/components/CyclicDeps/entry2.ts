import { getCyclicEntry1 } from "./entry1";

export function getCyclicEntry2() {
  return '1';
}

export function getCyclicEntry3() {
  return getCyclicEntry1();
}