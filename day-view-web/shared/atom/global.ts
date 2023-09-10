import { atom } from 'recoil';
import { IS_NODE } from '@/shared/constant';

type MswStatusType = null | 'server' | 'browser';

export const mswStatusAtom = atom<MswStatusType>({
  key: 'mswStatusAtom',
  default: null,
});
export const isLoginAtom = atom<boolean>({
  key: 'isLoginAtom',
  default: false,
});

export const viewWidthAtom = atom<number>({
  key: 'viewWidthAtom',
  default: IS_NODE ? 0 : window.innerWidth,
});

export const isMobileViewAtom = atom<boolean>({
  key: 'isMobileViewAtom',
  default: false,
});
