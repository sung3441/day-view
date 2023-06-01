import styled from 'styled-components';
import Modal from '@/shared/component/modal';
import { pixelToRemUnit } from '@/shared/styles/util';
import { useModal } from '@/shared/hooks';
import { memo } from 'react';

const testUsers = [
  { id: '1', name: 'asd', src: 'a' },
  { id: '2', name: 'qwe', src: 'a' },
  { id: '3', name: 'hhaa', src: 'a' },
  { id: '4', name: 'hhasa', src: 'a' },
  { id: '5', name: 'hshaas', src: 'a' },
  { id: '6', name: 'Effsa', src: 'a' },
  { id: '7', name: 'ghea', src: 'a' },
  { id: '8', name: 'xzcv', src: 'a' },
  { id: '9', name: 'Gdhr', src: 'a' },
];

const ModalManageChannel = () => {
  const { closeModal } = useModal();

  return (
    <Modal isDimmed={true}>
      <Modal.Body gap={40}>
        <>
          <Modal.SubTitle>카테고리 이름</Modal.SubTitle>
          <Modal.Input placeholder="이름을 입력하세요." />
        </>
        <>
          <Modal.SubTitle>편집자 목록</Modal.SubTitle>
          <Wrap>
            <Modal.UserList users={testUsers.slice(0, 2)} />
          </Wrap>
        </>
        <>
          <Modal.SubTitle>구독자 목록</Modal.SubTitle>
          <Wrap>
            <Modal.UserList users={testUsers} />
          </Wrap>
        </>
      </Modal.Body>
      <Modal.Control>
        <Modal.Button variant="primary">삭제</Modal.Button>
        <Modal.Button
          variant="accent"
          onClick={() => closeModal('ManageCategory')}
        >
          수정
        </Modal.Button>
      </Modal.Control>
    </Modal>
  );
};

export default memo(ModalManageChannel);

const Wrap = styled.div`
  width: ${pixelToRemUnit(380)};
`;
