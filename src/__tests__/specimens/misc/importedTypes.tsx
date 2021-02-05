import * as React from 'react';
import { TestInterface } from "./exportedTypes";

// @elephizeTarget
export const ImportedTypesComponent = ({ lol, flex }: TestInterface & { flex: number }) => {
  return <div className="table-item--container" style={{ flex }}>{lol}</div>;
};
