import { atom } from 'recoil';
import CategoryHeader from '@/component/Category.tsx/CategoryHeader';

export const selectedCategoryIdAtom = atom<number>({
  key: 'selectedCategoryIdAtom',
  default: 0,
});
