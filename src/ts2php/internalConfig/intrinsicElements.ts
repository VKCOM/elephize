import { intrinsicElements as iel } from '../../../data/intrinsicElements';
export const intrinsicElements: { [key: string]: string[] } = {};
for (let i = 0; i < iel.length; i++) {
  intrinsicElements[iel[i].tagName] = iel[i].props;
}
