import { memo, useState } from 'react';

import Modal from '../../shared/component/Organism/Modal';
import { ModalProps } from '@/component/modal/ModalRenderer';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';

import { IconButton } from '@/shared/component/Molecule';
import useModalState from '@/shared/hooks/useModalState';
import { DateInput, Icon, Select, TimeInput } from '@/shared/component/Atom';
import useDeleteRecord from '@/shared/context/record/hooks/useDeleteRecord';

const ModalScheduleDetail = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ScheduleDetail'));

  const {
    recordId,
    clientX,
    clientY,
    title,
    content,
    recordImageUrl,
    startDate,
    endDate,
  } = useModalState('ScheduleDetail');

  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });

  const { mutate, status } = useDeleteRecord();

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Modal
      ref={ref}
      isShow={isShow}
      onAnimationEnd={handleOnAnimationEnd}
      clientX={clientX}
      clientY={clientY}
    >
      <Modal.Control gap={12}>
        <IconButton
          type="write"
          size="small"
          onClick={() => setIsEditMode(!isEditMode)}
        />
        <IconButton
          type="sm_trash"
          size="small"
          onClick={() => {
            if (!recordId) return;
            mutate(recordId);
            modalClose();
          }}
        />
        <IconButton type="close" size="small" onClick={modalClose} />
      </Modal.Control>
      <Modal.Body style={{ marginTop: '22px' }}>
        <Modal.Section gap={78}>
          <Modal.SubTitle>제목</Modal.SubTitle>
          <Modal.Wrapper>
            <Modal.Input name="title" value={title} disabled={!isEditMode} />
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
            <Select>
              <option></option>
              <option></option>
            </Select>
          </Modal.Wrapper>
        </Modal.Section>
        {content && (
          <Modal.Section style={{ alignItems: 'start' }}>
            <Modal.SubTitle>메모(선택)</Modal.SubTitle>
            <Modal.Textarea
              name="content"
              value={content}
              disabled={!isEditMode}
            />
          </Modal.Section>
        )}
      </Modal.Body>

      {!isEditMode ? (
        <Modal.Control
          style={{ flexDirection: 'column', alignItems: 'flex-end' }}
        >
          <div>
            <Modal.Divider />
          </div>
          <Modal.Button width={150} font="body3">
            미완료로 표시
          </Modal.Button>
        </Modal.Control>
      ) : (
        <Modal.Control>
          <Modal.Button variant="accent">완료</Modal.Button>
        </Modal.Control>
      )}
    </Modal>
  );
};

export default memo(ModalScheduleDetail);
