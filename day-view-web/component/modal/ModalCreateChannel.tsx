import { CSSProperties } from 'react';
import styled from 'styled-components';

import Modal from '@/shared/component/modal';
import { ModalOptions } from '@/shared/types/modal';
import { Button, ToggleButton } from '@/shared/component/Atom';

/**
 * TODO: Reafactor 🤔
 */
const ButtonStyle: CSSProperties = {
  backgroundColor: 'rgba(243, 243, 243, 1)',
};

const ModalCreateChannel = ({ isOpen, isDimmed = true }: ModalOptions) => {
  return (
    <Modal isOpen={isOpen} isDimmed={isDimmed}>
      <Modal.Header>
        <h2>새 카테고리 만들기</h2>
      </Modal.Header>
      <Modal.Body>
        <>
          <SubTitle>새 카테고리 이름</SubTitle>
          <Modal.Input placeholder="이름을 입력하세요." />
        </>
        <>
          <SubTitle>비공개</SubTitle>
          <ToggleButton id="toggle" checked />
        </>
      </Modal.Body>
      <Modal.Control>
        <Button style={ButtonStyle}>취소</Button>
        <Button style={ButtonStyle}>완료</Button>
      </Modal.Control>
    </Modal>
  );
};

export default ModalCreateChannel;

const SubTitle = styled.div`
  ${({ theme }) => theme.fonts.caption2};
  color: ${({ theme }) => theme.colors.G_700};
`;
