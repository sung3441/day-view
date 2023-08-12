import { atom } from 'recoil';

export type TabType = '월' | '일정' | '카테고리';
export type SearchOrderType = 'RECENT' | 'OLD' | 'SUBSCRIBER';

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

export const G_isSearchKeywordAtom = atom<string>({
  key: 'G_isSearchValueAtom',
  default: '',
});

export const G_searchOrderOptionAtom = atom<SearchOrderType>({
  key: 'G_searchSortOptionAtom',
  default: 'RECENT',
});
