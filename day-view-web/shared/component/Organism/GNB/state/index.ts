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

export const G_isSearchOpenAtom = atom<boolean>({
  key: 'G_isSearchOpenAtom',
  default: false,
});

export const G_isSearchValueAtom = atom<string>({
  key: 'G_isSearchValueAtom',
  default: '',
});

export const G_searchSortOptionAtom = atom<'RECENT' | 'OLD' | 'SUBSCRIBER'>({
  key: 'G_searchSortOptionAtom',
  default: 'RECENT',
});
