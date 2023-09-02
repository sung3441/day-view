import { memo, useEffect, useState } from 'react';

import Modal from '../../shared/component/Organism/Modal';
import { ModalProps } from '@/component/modal/ModalRenderer';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';

import { IconButton } from '@/shared/component/Molecule';
import useModalState from '@/shared/hooks/useModalState';
import { DateInput, Icon, TimeInput } from '@/shared/component/Atom';
import useDeleteRecord from '@/shared/context/record/hooks/useDeleteRecord';
import useValidation from '@/shared/hooks/useValidation';
import { PatchRecordParamType } from '@/shared/types/api';
import usePatchRecord from '@/shared/context/record/hooks/usePatchRecord';

const ModalScheduleDetail = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ScheduleDetail'));

  const {
    clientX,
    clientY,
    recordId = -1,
    title = '',
    content = '',
    complete = false,
    startDate = '',
    endDate = '',
    recordImageUrl = '',
    channelName = '',
  } = useModalState('ScheduleDetail');

  const [value, setValue] = useState<PatchRecordParamType>({
    recordId,
    title,
    content,
    complete,
    startDate,
    endDate,
    recordImageUrl,
  });

  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });

  const { mutate, status } = useDeleteRecord();
  const { mutate: patchRecord, status: patchStatus } = usePatchRecord();

  const [isEditMode, setIsEditMode] = useState(false);

  const { isValid, InvalidMessage, validate } = useValidation('empty');

  useEffect(() => {
    validate(title);
  }, [title, validate]);

  const handleChangeValue = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setValue((prevValue) => ({
      ...prevValue,
      [target.name]: target.value,
    }));
  };

  const handleChangeComplete = () => {
    const isComplete = !value.complete;
    patchRecord({ ...value, complete: isComplete });

    setValue((prev) => ({ ...prev, complete: isComplete }));
  };

  const handlePatchRecord = () => {
    patchRecord(value);
    modalClose();
  };

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
            <Modal.Input
              name="title"
              value={value.title}
              onChange={handleChangeValue}
              disabled={!isEditMode}
              isValid={isValid}
            />
            {!isValid && (
              <Modal.InvalidText>{InvalidMessage}</Modal.InvalidText>
            )}
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
            <div>{channelName}</div>
          </Modal.Wrapper>
        </Modal.Section>
        {content && (
          <Modal.Section style={{ alignItems: 'start' }}>
            <Modal.SubTitle>메모(선택)</Modal.SubTitle>
            <Modal.Textarea
              name="content"
              value={value.content}
              onChange={handleChangeValue}
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
          {value.complete ? (
            <Modal.Button
              width={150}
              font="body3"
              onClick={handleChangeComplete}
            >
              미완료로 표시
            </Modal.Button>
          ) : (
            <Modal.Button
              width={150}
              font="body3"
              onClick={handleChangeComplete}
            >
              완료로 표시
            </Modal.Button>
          )}
        </Modal.Control>
      ) : (
        <Modal.Control>
          <Modal.Button
            variant="accent"
            onClick={handlePatchRecord}
            disabled={!isValid}
          >
            완료
          </Modal.Button>
        </Modal.Control>
      )}
    </Modal>
  );
};

export default memo(ModalScheduleDetail);
