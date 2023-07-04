import React, { memo, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Modal from '@/shared/component/Organism/MODAL';
import { CheckBox } from '@/shared/component/Molecule';
import { ModalProps } from '@/component/modal/ModalRenderer';

import { addScheduleParamType } from '@/shared/types/api';
import { DateInput, Icon, Select, TimeInput } from '@/shared/component/Atom';
import { dateToDayjs, dayjsToDate } from '@/shared/util/dateConversion';
import useAddSchedule from './hooks/useAddSchedule';

import { useAnimationHandler } from '@/shared/hooks';
import useGetChannel from '@/component/calendar/hooks/useGetChannel';
import useValidation from '@/shared/hooks/useValidation';

const ModalAddSchedule = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('AddSchedule'));

  const [isChecked, setIsChecked] = useState(true);
  const { isValid, validate } = useValidation('empty');

  // ! TEST
  const [value, setValue] = useState<addScheduleParamType>({
    channelId: 1,
    title: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  const { mutate, status } = useAddSchedule();
  const { data: channels, status: channelStatus } = useGetChannel({
    selectType: 'MANAGE',
  });

  const handleChangeValue = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    switch (name as keyof Omit<addScheduleParamType, 'channelId'>) {
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
    field: keyof Pick<addScheduleParamType, 'startDate' | 'endDate'>
  ) => {
    const newDate = date as dayjs.Dayjs;
    const hour = newDate.hour();
    const minute = newDate.minute();

    switch (
      field as keyof Pick<addScheduleParamType, 'startDate' | 'endDate'>
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
    field: keyof Pick<addScheduleParamType, 'startDate' | 'endDate'>
  ) => {
    switch (
      field as keyof Pick<addScheduleParamType, 'startDate' | 'endDate'>
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
    mutate({ ...value });
    modalClose();
  };

  return (
    <Modal isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <S.Body>
        <S.Section>
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
              <Modal.Validation>제목을 입력해주세요.</Modal.Validation>
            )}
          </Modal.Wrapper>
        </S.Section>
        <S.Section>
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
              defaultChecked={isChecked}
              onClick={() => {
                setIsChecked(!isChecked);
              }}
            />
          </Modal.Wrapper>
        </S.Section>
        <S.Section>
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
        </S.Section>
        <S.Section>
          <Modal.SubTitle style={{ alignSelf: 'flex-start' }}>
            메모(선택)
          </Modal.SubTitle>
          <Modal.Textarea
            name="content"
            value={value.content}
            onChange={handleChangeValue}
            placeholder="메모를 입력하세요."
          />
        </S.Section>
      </S.Body>
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

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 78px;
`;

const S = {
  Body,
  Section,
};
