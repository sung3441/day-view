import { atom } from 'recoil';

export type TabType = '월' | '일정' | '카테고리';

export const G_isOpenChannelAtom = atom<boolean>({
  key: 'G_isOpenChannelAtom',
  default: true,
});
export const G_tabAtom = atom<TabType>({
  key: 'tabAtom',
  default: '월',
});
