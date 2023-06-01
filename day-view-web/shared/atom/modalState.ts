import { atom } from 'recoil';
import { ModalType } from '@/component/modal/ModalRenderer';

export const modalListAtom = atom<ModalType[]>({
  key: 'modalList',
  default: [],
});
