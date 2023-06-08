import React, { memo } from 'react';
import Modal from '@/shared/component/modal';
import { CheckBox } from '@/shared/component/Molecule';
import { useModal } from '@/shared/hooks';

const ModalAddSchedule = () => {
  const { closeModal } = useModal();

  return (
    <Modal>
      <Modal.Body>
        <>
          <Modal.SubTitle>제목</Modal.SubTitle>
          <Modal.Input placeholder="제목을 입력하세요." />
        </>
        <>
          <Modal.SubTitle>날짜</Modal.SubTitle>
          <CheckBox id="allDay" label="종일" />
        </>
        <>
          <Modal.SubTitle>카테고리</Modal.SubTitle>
        </>
        <>
          <Modal.SubTitle>메모</Modal.SubTitle>
          <Modal.Textarea placeholder="메모를 입력하세요." />
        </>
      </Modal.Body>
      <Modal.Dim onClick={() => closeModal('AddSchedule')} />
    </Modal>
  );
};

export default memo(ModalAddSchedule);
