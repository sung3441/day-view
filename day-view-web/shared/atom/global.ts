import { atom } from 'recoil';

type MswStatusType = null | 'server' | 'browser';

export const mswStatusAtom = atom<MswStatusType>({
  key: 'mswStatusAtom',
  default: null,
});
export const isLoginAtom = atom<boolean>({
  key: 'isLoginAtom',
  default: false,
});
