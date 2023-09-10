import { DefaultValue, atom, atomFamily, selectorFamily } from 'recoil';
import { ModalType } from '@/component/modal/ModalRenderer';

export type ModalParams = Readonly<{
  clientX?: number;
  clientY?: number;

  // 공통
  title?: string;
  content?: string;

  // 채널
  channelId?: number;
  channelName?: string;
  name?: string;
  subscribeAuth?: string;
  channelType?: string;

  // 내정보
  memberId?: number;
  nickname?: string;
  email?: string;
  profileImageUrl?: string;

  // 일정
  recordId?: number;
  complete?: boolean;
  startDate?: string;
  endDate?: string;
  recordImageUrl?: string;
  allDay?: boolean;
}>;

export type ModalState = {
  modalType: ModalType;
  params?: ModalParams;
};

/** 렌더링 될 모달의 이름 배열 */
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
