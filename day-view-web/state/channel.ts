import { atom } from 'recoil';

export const selectedChannelAtom = atom<string[]>({
  key: 'selectedChannelAtom',
  default: [],
});
