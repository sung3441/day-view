import { memo, useState } from 'react';
import Modal from '@/shared/component/Organism/MODAL';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import { ModalProps } from './ModalRenderer';
import { SearchBar } from '@/shared/component/Molecule';
import UserInfo from '@/shared/component/Molecule/UserInfo';

const ModalSubscriberManagement = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('SubscriberManagement'));

  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });

  return (
    <Modal ref={ref} isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <Modal.Header
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Modal.Title>임의 채널명</Modal.Title>
        <div>탭</div>
        <div>구독자에게 편집 권한을 설정하거나 해제할 수 있습니다.</div>
        <Modal.Input placeholder="이름을 입력하세요." />
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalSubscriberManagement);
