import { DefaultValue, atom, atomFamily, selectorFamily } from 'recoil';
import { ModalType } from '@/component/modal/ModalRenderer';

export type ModalParams = {
  clientX?: number;
  clientY?: number;
};

export type ModalState = {
  modalType: ModalType;
  params?: ModalParams;
};

export const modalListAtom = atom<ModalType[]>({
  key: 'modalList',
  default: [],
});

export const modalState = atomFamily<ModalState, ModalType>({
  key: 'modalState',
  default: (modalType: ModalType) => ({
    modalType,
    params: {},
  }),
});

export const modalSelector = selectorFamily({
  key: 'modalSelector',
  get:
    (modalType: ModalType) =>
    ({ get }) =>
      get(modalState(modalType)),
  set:
    (modalType: ModalType) =>
    ({ get, set, reset }, newValue) => {
      // reset
      if (newValue instanceof DefaultValue) {
        set(modalListAtom, (prev) =>
          prev.filter((modalId) => modalId !== modalType)
        );
        reset(modalState(modalType));
        return;
      }

      set(modalState(modalType), newValue);

      // modalList 중복제거
      if (
        get(modalListAtom).find((modalType) => modalType === newValue.modalType)
      )
        return;
      set(modalListAtom, (prev) => [...prev, newValue.modalType]);
    },
});
