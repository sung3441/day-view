import { memo, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/shared/component/Organism/MODAL';
import { pixelToRemUnit } from '@/shared/styles/util';
import { ModalProps } from '@/component/modal/ModalRenderer';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import useValidation from '@/shared/hooks/useValidation';
import { VALIDATION_LENGTH } from '@/constants/validate';
import { IconButton } from '@/shared/component/Molecule';
import useModalState from '@/shared/hooks/useModalState';

const ModalScheduleDetail = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ScheduleDetail'));
  const ref = useOuterClick({ callback: modalClose });

  const { clientX, clientY } = useModalState('ScheduleDetail');

  return (
    <Modal
      isShow={isShow}
      onAnimationEnd={handleOnAnimationEnd}
      clientX={clientX}
      clientY={clientY}
    >
      <Modal.Control>
        <IconButton type="write" size="small" />
        <IconButton type="sm_trash" size="small" />
        <IconButton type="close" size="small" onClick={modalClose} />
      </Modal.Control>
      <Modal.Body>
        <Modal.Section>
          <Modal.SubTitle>제목</Modal.SubTitle>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>날짜</Modal.SubTitle>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>카테고리</Modal.SubTitle>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>메모(선택)</Modal.SubTitle>
        </Modal.Section>
      </Modal.Body>
    </Modal>
  );
};

export default memo(ModalScheduleDetail);
