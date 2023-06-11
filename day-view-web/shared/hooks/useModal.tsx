import { useCallback } from 'react';
import { useRecoilCallback } from 'recoil';
import { ModalParams, ModalState, modalSelector } from '../atom/modalState';
import { ModalType } from '@/component/modal/ModalRenderer';

const useModal = () => {
  const setModal = useRecoilCallback(
    ({ set }) =>
      (id: ModalType, value: ModalState) => {
        set(modalSelector(id), value);
      },
    []
  );

  const openModal = useCallback(
    (id: ModalType, params: ModalParams = null) => {
      const value = { id, params };
      setModal(id, value);
    },
    [setModal]
  );

  const closeModal = useRecoilCallback(
    ({ reset }) =>
      (id: ModalType) => {
        reset(modalSelector(id));
      },
    []
  );

  return { openModal, closeModal };
};

export default useModal;
