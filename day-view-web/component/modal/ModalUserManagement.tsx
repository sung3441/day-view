import { useState } from 'react';
import Modal from '@/shared/component/Organism/MODAL';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import { ModalProps } from './ModalRenderer';

const ModalUserManagement = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ScheduleDetail'));

  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });

  return (
    <Modal ref={ref} isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <Modal.Body>
        <Modal.Section>
          <Modal.SubTitle>제목</Modal.SubTitle>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>날짜</Modal.SubTitle>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>카테고리</Modal.SubTitle>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>메모(선택)</Modal.SubTitle>
        </Modal.Section>
      </Modal.Body>
      <Modal.Dim />
    </Modal>
  );
};

export default ModalUserManagement;
