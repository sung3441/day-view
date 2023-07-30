import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';

import {
  ModalCreateChannel,
  ModalManageChannel,
  ModalAddSchedule,
  ModalScheduleDetail,
  ModalSubscriberManagement,
} from '@/component/modal';
import { useModal } from '@/shared/hooks';
import { modalListAtom } from '@/state/modalState';

export interface ModalProps {
  openModal: (modalType: ModalType) => void;
  closeModal: (modalType: ModalType) => void;
}

/**
 * 모달 컴포넌트는 반드시 메모이제이션 해야함
 */
const modalComponents = {
  CreateChannel: ModalCreateChannel,
  ManageChannel: ModalManageChannel,
  AddSchedule: ModalAddSchedule,
  ScheduleDetail: ModalScheduleDetail,
  SubscriberManagement: ModalSubscriberManagement,
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
