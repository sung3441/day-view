import { memo } from 'react';
import Modal from '@/shared/component/Organism/Modal';
import { useAnimationHandler } from '@/shared/hooks';
import { ModalProps } from './ModalRenderer';

const ModalGoogleCalendar = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('GoogleCalendar'));

  return (
    <Modal isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <Modal.Header>
        <Modal.Title>구글 캘린더 가져오기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Section>
          <Modal.SubTitle>구글 캘린더 목록</Modal.SubTitle>
          <select>
            <option></option>
          </select>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>연동할 채널 이름</Modal.SubTitle>
          <Modal.Input type="text" placeholder="이름을 입력하세요." />
        </Modal.Section>
      </Modal.Body>
      <Modal.Control>
        <Modal.Button variant="primary" onClick={modalClose}>
          취소
        </Modal.Button>
        <Modal.Button variant="accent">완료</Modal.Button>
      </Modal.Control>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalGoogleCalendar);
