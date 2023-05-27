import { atom } from 'recoil';
import { ModalType } from '@/component/modal/ModalRenderer';

export const modalState = atom<ModalType>({
  key: 'modalState',
  default: '',
});
