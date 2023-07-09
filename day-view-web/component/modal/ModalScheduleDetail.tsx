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
import { DateInput, Icon, Select, TimeInput } from '@/shared/component/Atom';

const ModalScheduleDetail = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ScheduleDetail'));

  const { clientX, clientY } = useModalState('ScheduleDetail');

  const [isEditMode, setIsEditMode] = useState(false);
  console.log('editMode', isEditMode);

  return (
    <Modal
      isShow={isShow}
      onAnimationEnd={handleOnAnimationEnd}
      clientX={clientX}
      clientY={clientY}
    >
      <Modal.Control>
        <IconButton
          type="write"
          size="small"
          onClick={() => setIsEditMode(!isEditMode)}
        />
        <IconButton type="sm_trash" size="small" />
        <IconButton type="close" size="small" onClick={modalClose} />
      </Modal.Control>
      <Modal.Body>
        <Modal.Section gap={78}>
          <Modal.SubTitle>제목</Modal.SubTitle>
          <Modal.Wrapper>
            <Modal.Input name="title" />
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>날짜</Modal.SubTitle>
          <Modal.Wrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DateInput />
              <TimeInput />
              <Icon type="sm_up" style={{ transform: 'rotate(90deg)' }} />
              <TimeInput />
            </div>
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>카테고리</Modal.SubTitle>
          <Modal.Wrapper>
            <select></select>
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>메모(선택)</Modal.SubTitle>
          <Modal.Textarea name="content" />
        </Modal.Section>
      </Modal.Body>
      <Modal.Divider />
      <Modal.Control>
        <button>asd</button>
      </Modal.Control>
    </Modal>
  );
};

export default memo(ModalScheduleDetail);
