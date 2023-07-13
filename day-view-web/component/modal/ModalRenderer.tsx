import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';

import {
  ModalCreateChannel,
  ModalManageChannel,
  ModalAddSchedule,
  ModalScheduleDetail,
} from '@/component/modal';
import { useModal } from '@/shared/hooks';
import { modalListAtom } from '@/shared/atom/modalState';

export interface ModalProps {
  openModal: (modalType: ModalType) => void;
  closeModal: (modalType: ModalType) => void;
}

const modalComponents = {
  CreateChannel: ModalCreateChannel,
  ManageChannel: ModalManageChannel,
  AddSchedule: ModalAddSchedule,
  ScheduleDetail: ModalScheduleDetail,
} satisfies Record<
  string,
  React.MemoExoticComponent<(P: ModalProps) => React.ReactElement>
>;

export type ModalType = keyof typeof modalComponents;

const ModalRenderer = () => {
  const { openModal, closeModal } = useModal();
  const modalList = useRecoilValue(modalListAtom);

  const ref = useRef<Element | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    ref.current = document.querySelector<HTMLElement>('#portal');
  }, []);

  if (modalList.length === 0) return null;

  return isMounted && ref.current
    ? createPortal(
        modalList.map((modalType) => {
          const ModalComponent = modalComponents[modalType];

          return (
            <ModalComponent
              key={modalType}
              openModal={openModal}
              closeModal={closeModal}
            />
          );
        }),
        ref.current!
      )
    : null;
};

export default ModalRenderer;
