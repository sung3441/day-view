import Modal from '@/shared/component/modal';
import { ModalOptions } from '@/shared/types/modal';

/**
 * TODO: Reafactor 🤔
 */

const ModalCreateChannel = ({ isOpen, isDimmed = true }: ModalOptions) => {
  return (
    <Modal isOpen={isOpen} isDimmed={isDimmed}>
      <Modal.Header>
        <h2>새 카테고리 만들기</h2>
      </Modal.Header>
      <Modal.Body>
        <>
          <Modal.SubTitle>새 카테고리 이름</Modal.SubTitle>
          <Modal.Input placeholder="이름을 입력하세요." />
        </>
        <>
          <Modal.SubTitle>비공개</Modal.SubTitle>
          <Modal.ToggleButton id="toggle" checked />
        </>
      </Modal.Body>
      <Modal.Control>
        <Modal.Button>취소</Modal.Button>
        <Modal.Button>완료</Modal.Button>
      </Modal.Control>
    </Modal>
  );
};

export default ModalCreateChannel;
