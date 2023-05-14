import { atom } from 'recoil';
import { TabType } from '@/shared/atom/tab';

export const G_isOpenChannel = atom<boolean>({
  key: 'G_isOpenChannel',
  default: true,
});
export const G_tabAtom = atom<TabType>({
  key: 'tabAtom',
  default: '월',
});
