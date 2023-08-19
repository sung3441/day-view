import React, { memo, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Modal from '../../shared/component/Organism/Modal';
import { CheckBox } from '@/shared/component/Molecule';
import { ModalProps } from '@/component/modal/ModalRenderer';

import { DateInput, Icon, Select, TimeInput } from '@/shared/component/Atom';
import { dateToDayjs, dayjsToDate } from '@/shared/util/dateConversion';
import useAddSchedule from './hooks/useAddSchedule';

import { useAnimationHandler } from '@/shared/hooks';
import useGetChannel from '@/shared/context/channel/hooks/useGetChannel';
import useValidation from '@/shared/hooks/useValidation';
import { AddScheduleParamType } from '@/shared/types/api';

const BODY_GAP = 22;
const SECTION_GAP = 34;

const ModalAddSchedule = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('AddSchedule'));

  // 종일 값
  const [isChecked, setIsChecked] = useState(true);

  const [value, setValue] = useState<AddScheduleParamType>({
    channelId: 1,
    title: '',
    content: '',
    startDate: new Date(),
    endDate: new Date(),
    recordImageUrl: '',
    allDay: true,
  });

  const { isValid, InvalidMessage, validate } = useValidation('empty');
  const { mutate, status } = useAddSchedule();
  const { data: channels, status: channelStatus } = useGetChannel({
    selectType: 'MANAGE',
  });

  useEffect(() => {
    // 초기 state값이 변경 되지 않아 초기 값 세팅
    if (channelStatus !== 'success' || !channels?.data?.length) return;
    setValue((prev) => ({
      ...prev,
      channelId: channels.data?.at(0)?.channelId ?? 1,
    }));
  }, [channelStatus, channels]);

  const handleChangeValue = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    switch (name as keyof AddScheduleParamType) {
      case 'title':
        validate(value);
        setValue((prev) => ({ ...prev, title: value }));
        break;
      case 'content':
        setValue((prev) => ({ ...prev, content: value }));
        break;
      case 'recordImageUrl':
        setValue((prev) => ({ ...prev, recordImageUrl: value }));
        break;
    }
  };

  /** hour, minute만 변경 */
  const handleChangeTime = (
    date: unknown,
    field: keyof Pick<AddScheduleParamType, 'startDate' | 'endDate'>
  ) => {
    const newDate = date as dayjs.Dayjs;
    const hour = newDate.hour();
    const minute = newDate.minute();

    switch (
      field as keyof Pick<AddScheduleParamType, 'startDate' | 'endDate'>
    ) {
      case 'startDate':
        setValue((prev) => ({
          ...prev,
          startDate: dayjsToDate(
            dateToDayjs(prev.startDate).hour(hour).minute(minute)
          ),
        }));
        break;
      case 'endDate':
        setValue((prev) => ({
          ...prev,
          endDate: dayjsToDate(
            dateToDayjs(prev.endDate).hour(hour).minute(minute)
          ),
        }));
        break;
    }
  };

  /** date 전체 변경 */
  const handleChangeDate = (
    date: unknown,
    field: keyof Pick<AddScheduleParamType, 'startDate' | 'endDate'>
  ) => {
    switch (
      field as keyof Pick<AddScheduleParamType, 'startDate' | 'endDate'>
    ) {
      case 'startDate':
        setValue((prev) => ({
          ...prev,
          startDate: dayjsToDate(date as dayjs.Dayjs),
        }));
        break;
      case 'endDate':
        setValue((prev) => ({
          ...prev,
          endDate: dayjsToDate(date as dayjs.Dayjs),
        }));
        break;
    }
  };

  const handleAddSchedule = () => {
    mutate({ ...value, allDay: isChecked });
    modalClose();
  };

  return (
    <Modal isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <Modal.Body gap={BODY_GAP}>
        <Modal.Section gap={SECTION_GAP}>
          <Modal.SubTitle>제목</Modal.SubTitle>
          <Modal.Wrapper>
            <Modal.Input
              placeholder="제목을 입력하세요."
              name="title"
              value={value.title}
              onChange={handleChangeValue}
              isValid={isValid}
            />
            {!isValid && (
              <Modal.InvalidText>{InvalidMessage}</Modal.InvalidText>
            )}
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section gap={SECTION_GAP}>
          <Modal.SubTitle style={{ alignSelf: 'flex-start' }}>
            날짜
          </Modal.SubTitle>
          <Modal.Wrapper style={{ gap: '6px' }}>
            {isChecked ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <DateInput
                  value={dateToDayjs(value.startDate)}
                  onChange={(newValue) =>
                    handleChangeDate(newValue, 'startDate')
                  }
                />
                <Icon type="sm_up" style={{ transform: 'rotate(90deg)' }} />
                <DateInput
                  value={dateToDayjs(value.endDate)}
                  onChange={(newValue) => handleChangeDate(newValue, 'endDate')}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <DateInput
                  style={{ marginRight: '18px' }}
                  value={dateToDayjs(value.startDate)}
                  onChange={(newValue) => {
                    setValue((prev) => ({
                      ...prev,
                      startDate: dayjsToDate(newValue as dayjs.Dayjs),
                      endDate: dayjsToDate(newValue as dayjs.Dayjs),
                    }));
                  }}
                />
                <TimeInput
                  format="HH:mm"
                  value={dateToDayjs(value.startDate)}
                  onChange={(newValue, context) => {
                    context.validationError !== 'invalidDate' &&
                      handleChangeTime(newValue, 'startDate');
                  }}
                />
                <Icon type="sm_up" style={{ transform: 'rotate(90deg)' }} />
                <TimeInput
                  format="HH:mm"
                  value={dateToDayjs(value.endDate)}
                  onChange={(newValue, context) => {
                    context.validationError !== 'invalidDate' &&
                      handleChangeTime(newValue, 'endDate');
                  }}
                />
              </div>
            )}
            <CheckBox
              id="allDay"
              label="종일"
              color="rgb(255, 131, 109)"
              defaultChecked={isChecked}
              onClick={() => {
                setIsChecked(!isChecked);
              }}
            />
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section gap={SECTION_GAP}>
          <Modal.SubTitle>카테고리</Modal.SubTitle>
          <Modal.Wrapper>
            <Select
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
            </Select>
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section gap={SECTION_GAP}>
          <Modal.SubTitle style={{ alignSelf: 'start' }}>
            메모(선택)
          </Modal.SubTitle>
          <Modal.Textarea
            name="content"
            value={value.content}
            onChange={handleChangeValue}
            placeholder="메모를 입력하세요."
          />
        </Modal.Section>
      </Modal.Body>
      <Modal.Control>
        <Modal.Button variant="primary" onClick={modalClose}>
          취소
        </Modal.Button>
        <Modal.Button
          variant="accent"
          onClick={handleAddSchedule}
          disabled={!isValid}
        >
          완료
        </Modal.Button>
      </Modal.Control>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalAddSchedule);
