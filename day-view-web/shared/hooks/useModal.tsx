import { useCallback } from 'react';
import { useRecoilCallback } from 'recoil';
import { ModalParams, ModalState, modalSelector } from '../atom/modalState';
import { ModalType } from '@/component/modal/ModalRenderer';
const useModal = () => {
  const setModal = useRecoilCallback(
    ({ set }) =>
      (modalType: ModalType, value: ModalState) => {
        set(modalSelector(modalType), value);
      },
    []
  );

  const openModal = useCallback(
    (modalType: ModalType, params: ModalParams = null) => {
      const value = { modalType, params };
      setModal(modalType, value);
    },
    [setModal]
  );

  const closeModal = useRecoilCallback(
    ({ reset }) =>
      (modalType: ModalType) => {
        reset(modalSelector(modalType));
      },
    []
  );

  return { openModal, closeModal };
};

export default useModal;
