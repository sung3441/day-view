import { atom } from 'recoil';
import CategoryHeader from '@/component/category/CategoryHeader';

export const selectedCategoryIdAtom = atom<number>({
  key: 'selectedCategoryIdAtom',
  default: 0,
});
