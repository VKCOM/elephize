import { getCyclicEntry2 } from "./entry2";

export function getCyclicEntry1() {
  getCyclicEntry2();
}