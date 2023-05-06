import { atom } from 'recoil';

export type TabType = '월' | '일정' | '카테고리';
export const tabAtom = atom<TabType>({
  key: 'tabAtom',
  default: '월',
});
