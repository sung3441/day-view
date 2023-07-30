import { atom } from 'recoil';
import { UserRes } from '@/shared/types/api';

type MswStatusType = null | 'server' | 'browser';

export const mswStatusAtom = atom<MswStatusType>({
  key: 'mswStatusAtom',
  default: null,
});
export const isLoginAtom = atom<boolean>({
  key: 'isLoginAtom',
  default: false,
});
