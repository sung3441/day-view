import Modal from '@/shared/component/modal';
import { pixelToRemUnit } from '@/shared/styles/util';
import { ModalOptions } from '@/shared/types/modal';
import styled from 'styled-components';

/**
 * TODO: Reafactor 🤔
 */

const ModalCreateChannel = ({ isOpen, isDimmed = true }: ModalOptions) => {
  return (
    <Modal isOpen={isOpen} isDimmed={isDimmed}>
      <Modal.Header>
        <Modal.Title>새 카테고리 만들기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <Modal.SubTitle>카테고리 이름</Modal.SubTitle>
          <Modal.Input placeholder="이름을 입력하세요." />
        </>
        <>
          <Modal.SubTitle>비공개</Modal.SubTitle>
          <WrapButton>
            <Modal.ToggleButton id="toggle" checked />
          </WrapButton>
        </>
      </Modal.Body>
      <Modal.Control>
        <Modal.Button variant="primary">취소</Modal.Button>
        <Modal.Button variant="accent">완료</Modal.Button>
      </Modal.Control>
    </Modal>
  );
};

export default ModalCreateChannel;

const WrapButton = styled.div`
  width: ${pixelToRemUnit(380)};
`;
