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

  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Modal
      ref={ref}
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
            <Modal.Input name="title" disabled={!isEditMode} />
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>날짜</Modal.SubTitle>
          <Modal.Wrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DateInput disabled={!isEditMode} />
              <TimeInput disabled={!isEditMode} />
              <Icon type="sm_up" style={{ transform: 'rotate(90deg)' }} />
              <TimeInput disabled={!isEditMode} />
            </div>
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>카테고리</Modal.SubTitle>
          <Modal.Wrapper>
            {/* <Select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const channelId = parseInt(e.target.value);
                setValue((prev) => ({ ...prev, channelId }));
              }}
            >
              {channelStatus === 'success'
                ? channels?.data.map(({ channelId, name }) => (
                    <option key={channelId} value={channelId}>
                      {name}
                    </option>
                  ))
                : undefined}
            </Select> */}
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>메모(선택)</Modal.SubTitle>
          <Modal.Textarea name="content" disabled={!isEditMode} />
        </Modal.Section>
      </Modal.Body>
      <Modal.Control>
        {!isEditMode ? (
          <button>미완료로 표시</button>
        ) : (
          <Modal.Button variant="accent">완료</Modal.Button>
        )}
        <Modal.Divider />
      </Modal.Control>
    </Modal>
  );
};

export default memo(ModalScheduleDetail);
