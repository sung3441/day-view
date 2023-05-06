import { atom } from 'recoil';

export const G_isOpenChannel = atom<boolean>({
  key: 'G_isOpenChannel',
  default: true,
});
