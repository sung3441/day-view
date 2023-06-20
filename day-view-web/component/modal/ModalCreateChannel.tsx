import { memo } from 'react';
import styled from 'styled-components';

import Modal from '@/shared/component/modal';
import { pixelToRemUnit } from '@/shared/styles/util';
import { ModalProps } from '@/component/modal/ModalRenderer';
import { useAnimationHandler } from '@/shared/hooks';

/**
 * 카테고리 생성
 */
const ModalCreateChannel = ({ closeModal }: ModalProps) => {
  const { isShow, handleIsShow, handelOnAnimationEnd } = useAnimationHandler(
    () => closeModal('CreateCategory')
  );

  return (
    <Modal isShow={isShow} onAnimationEnd={handelOnAnimationEnd}>
      <Modal.Header>
        <Modal.Title>새 카테고리 만들기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Section>
          <Modal.SubTitle>카테고리 이름</Modal.SubTitle>
          <Modal.Input placeholder="이름을 입력하세요." />
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>비공개</Modal.SubTitle>
          <WrapButton>
            <Modal.ToggleButton id="toggle" checked />
          </WrapButton>
        </Modal.Section>
      </Modal.Body>
      <Modal.Control>
        <Modal.Button variant="primary" onClick={() => handleIsShow()}>
          취소
        </Modal.Button>
        <Modal.Button variant="accent">완료</Modal.Button>
      </Modal.Control>
      <Modal.Dim onClick={() => handleIsShow} />
    </Modal>
  );
};

export default memo(ModalCreateChannel);

const WrapButton = styled.div`
  width: ${pixelToRemUnit(380)};
`;
