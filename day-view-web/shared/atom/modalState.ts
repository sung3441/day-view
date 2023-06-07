import { DefaultValue, atom, atomFamily, selectorFamily } from 'recoil';
import { ModalType } from '@/component/modal/ModalRenderer';

export const modalListAtom = atom<ModalType[]>({
  key: 'modalList',
  default: [],
});

export const modalState = atomFamily({
  key: 'modalState',
  default: (id: ModalType) => ({
    id,
    params: null,
  }),
});

export const modalSelector = selectorFamily({
  key: 'modalSelector',
  get:
    (id: ModalType) =>
    ({ get }) =>
      get(modalState(id)),
  set:
    (id: ModalType) =>
    ({ get, set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        set(modalListAtom, (prev) => prev.filter((modalId) => modalId !== id));
        reset(modalState(id));
        return;
      }

      set(modalState(id), newValue);

      if (get(modalListAtom).find((id) => id === newValue.id)) return;
      set(modalListAtom, (prev) => [...prev, newValue.id]);
    },
});
