import Modal from '@/shared/component/modal';
import { ModalOptions } from '@/shared/types/modal';

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
const ModalManageChannel = ({ isOpen, isDimmed = true }: ModalOptions) => {
  return (
    <Modal isOpen={isOpen} isDimmed={isDimmed}>
      <Modal.Body>
        <>
          <Modal.SubTitle>카테고리 이름</Modal.SubTitle>
          <Modal.Input placeholder="이름을 입력하세요." />
        </>
        <>
          <Modal.SubTitle>편집자 목록</Modal.SubTitle>
          <Modal.UserList users={testUsers.slice(0, 2)} />
        </>
        <>
          <Modal.SubTitle>구독자 목록</Modal.SubTitle>
          <Modal.UserList users={testUsers} />
        </>
      </Modal.Body>
      <Modal.Control>
        <Modal.Button>취소</Modal.Button>
        <Modal.Button>완료</Modal.Button>
      </Modal.Control>
    </Modal>
  );
};

export default ModalManageChannel;
