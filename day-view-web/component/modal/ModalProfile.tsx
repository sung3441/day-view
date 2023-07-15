import Modal from '@/shared/component/Organism/MODAL';
import { memo } from 'react';
import { ModalProps } from '@/component/modal/ModalRenderer';
import { UserImage } from '@/shared/component/Atom';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import useModalState from '@/shared/hooks/useModalState';
import styled from 'styled-components';

const ModalProfile = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('Profile'));

  // TODO 프로필 주소, 이름, 이메일 연동, 모달창 위치조정
  const { clientX, clientY } = useModalState('Profile');
  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });

  return (
    <Modal
      ref={ref}
      isShow={isShow}
      onAnimationEnd={handleOnAnimationEnd}
      clientX={clientX}
      clientY={clientY}
    >
      <S.Layout>
        <UserImage src="" size="large" style={{ marginBottom: 40 }} />
        <Modal.Body gap={30} style={{ marginBottom: 30 }}>
          <Modal.Section gap={38}>
            <Modal.SubTitle>이름</Modal.SubTitle>
            <Modal.Input width={246} />
          </Modal.Section>
          <Modal.Section gap={38}>
            <Modal.SubTitle>이메일</Modal.SubTitle>
            <div>asd</div>
          </Modal.Section>
        </Modal.Body>
        <Modal.Control>
          <Modal.Button variant="secondary">로그아웃</Modal.Button>
          <Modal.Button variant="accent">완료</Modal.Button>
        </Modal.Control>
      </S.Layout>
    </Modal>
  );
};

export default memo(ModalProfile);

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const S = {
  Layout,
};
