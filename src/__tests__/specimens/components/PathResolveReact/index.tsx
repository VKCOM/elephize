import { ReactPathResolveComponent, ReactPathResolveAnonymousComponent } from './Component';

// @elephizeTarget
export function ReactPathResolveModule() {
  return <div>foo</div>;
}

// @elephizeTarget
export const ReactPathResolveAnonymousModule = () => {
  return <div>foo</div>;
}

export {
  ReactPathResolveComponent,
  ReactPathResolveAnonymousComponent
}