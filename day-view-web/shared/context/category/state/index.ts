import { atom } from 'recoil';

export const selectedCategoryIdAtom = atom<number>({
  key: 'selectedCategoryIdAtom',
  default: 0,
});
