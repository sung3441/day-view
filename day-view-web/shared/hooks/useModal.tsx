import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { modalListAtom } from '../atom/modalState';
import { ModalType } from '@/component/modal/ModalRenderer';
import { useCallback } from 'react';

const useModal = () => {
  const setModalList = useSetRecoilState(modalListAtom);

  const openModal = useCallback(
    (modalType: ModalType) => {
      setModalList((modals) => [...modals, modalType]);
    },
    [setModalList]
  );

  const closeModal = useCallback(
    (modalType: ModalType) => {
      setModalList((modals) => modals.filter((modal) => modal !== modalType));
    },
    [setModalList]
  );

  // const openModal = useCallback((id: ModalType, params) => {}, []);

  // const closeModal = useRecoilCallback(
  //   ({ reset }) =>
  //     (id: ModalType) => {},
  //   []
  // );

  return { openModal, closeModal };
};

export default useModal;
