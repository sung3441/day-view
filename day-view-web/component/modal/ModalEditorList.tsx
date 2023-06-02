import { Button, UserImage } from '@/shared/component/Atom';
import Modal from '@/shared/component/modal';

import { useModal } from '@/shared/hooks';
import { memo } from 'react';

const ModalEditorList = () => {
  const { closeModal } = useModal();

  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>편집자 목록</Modal.Title>
        <div>편집 권한을 해제할 수 있습니다.</div>
      </Modal.Header>
      <Modal.Body>
        <>
          <UserImage src="" />
          <div>name</div>
          <div>email</div>
          <Button variant="accent">해제</Button>
        </>
      </Modal.Body>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalEditorList);
