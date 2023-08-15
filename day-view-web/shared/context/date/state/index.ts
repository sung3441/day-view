import { atom } from 'recoil';

export const dayHeightAtom = atom<number>({
  key: 'dayHeightAtom',
  default: 0,
});
