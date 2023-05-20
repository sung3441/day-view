import styled, { CSSProperties } from 'styled-components';

import Modal from '@/shared/component/modal';
import { ModalOptions } from '@/shared/types/modal';
import { Button } from '@/shared/component/Atom';
import UserList from './UserList';

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

/**
 * TODO: Reafactor 🤔
 */
const ButtonStyle: CSSProperties = {
  backgroundColor: 'rgba(243, 243, 243, 1)',
};

const ModalManageChannel = ({ isOpen, isDimmed = true }: ModalOptions) => {
  return (
    <Modal isOpen={isOpen} isDimmed={isDimmed}>
      <Modal.Body>
        <>
          <SubTitle>카테고리 이름</SubTitle>
          <Modal.Input placeholder="이름을 입력하세요." />
        </>
        <>
          <SubTitle>편집자 목록</SubTitle>
          <UserList users={testUsers.slice(0, 2)} />
        </>
        <>
          <SubTitle>구독자 목록</SubTitle>
          <UserList users={testUsers} />
        </>
      </Modal.Body>
      <Modal.Control>
        <Button style={ButtonStyle}>취소</Button>
        <Button style={ButtonStyle}>완료</Button>
      </Modal.Control>
    </Modal>
  );
};

export default ModalManageChannel;

const SubTitle = styled.div`
  ${({ theme }) => theme.fonts.caption2};
  color: ${({ theme }) => theme.colors.G_700};
`;
