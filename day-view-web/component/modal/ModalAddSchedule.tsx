import React, { memo, useState } from 'react';
import styled from 'styled-components';
import Modal from '@/shared/component/modal';
import { CheckBox } from '@/shared/component/Molecule';
import { ModalProps } from '@/component/modal/ModalRenderer';
import { useAnimationHandler } from '@/shared/hooks';
import { getStyledThemProperty } from '@/shared/styles/util';
import { addScheduleParamType } from '@/shared/types/api';
import useAddSchedule from './hooks/useAddSchedule';

const ModalAddSchedule = ({ closeModal }: ModalProps) => {
  const { isShow, handleIsShow, handleOnAnimationEnd } = useAnimationHandler(
    () => closeModal('AddSchedule')
  );

  const [isChecked, setIsChecked] = useState(true);

  // ! TEST
  const [value, setValue] = useState<addScheduleParamType>({
    channelId: 1,
    title: '',
    startDate: new Date('2023-06-07T21:00:00'),
    endDate: new Date('2023-06-07T21:00:00'),
  });

  const { mutate, status } = useAddSchedule();

  const handleChangeValue = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    switch (name as keyof Omit<addScheduleParamType, 'channelId'>) {
      case 'title':
        setValue((prev) => ({ ...prev, title: value }));
        break;
      case 'content':
        setValue((prev) => ({ ...prev, content: value }));
        break;
      case 'startDate':
        break;
      case 'endDate':
        break;
      case 'recordImageUrl':
        break;
    }
  };

  const handleAddSchedule = () => {
    mutate({ ...value });
  };

  return (
    <Modal isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <S.Body>
        <S.Section>
          <Modal.SubTitle>제목</Modal.SubTitle>
          <Modal.Input
            placeholder="제목을 입력하세요."
            name="title"
            value={value.title}
            onChange={handleChangeValue}
          />
        </S.Section>
        <S.Section>
          <Modal.SubTitle>날짜</Modal.SubTitle>
          <S.Wrapper>
            {isChecked && (
              <>
                <S.Input type="date" min="1900-1-1" max="9999-12-31" />
                <S.Input type="date" min="1900-1-1" max="9999-12-31" />
              </>
            )}

            <CheckBox
              id="allDay"
              label="종일"
              defaultChecked={isChecked}
              onClick={() => {
                setIsChecked(!isChecked);
              }}
            />
          </S.Wrapper>
        </S.Section>
        <S.Section>
          <Modal.SubTitle>카테고리</Modal.SubTitle>
          <S.Wrapper>
            <S.Select>
              <option>내 일정</option>
            </S.Select>
          </S.Wrapper>
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
        <Modal.Button variant="primary" onClick={handleIsShow}>
          취소
        </Modal.Button>
        <Modal.Button variant="accent" onClick={handleAddSchedule}>
          완료
        </Modal.Button>
      </Modal.Control>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalAddSchedule);

const Body = styled.div<{ gap?: number }>`
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

const Select = styled.select`
  padding: 8px 18px;
  border: 1px solid ${getStyledThemProperty('colors', 'G_300')};
  border-radius: 7px;
`;
const Wrapper = styled.div`
  width: 380px;
`;
const Input = styled.input`
  width: 175px;
  height: 48px;
  padding: 8px 18px;
  /* White */
  background: #ffffff;
  /* G_300 */

  border: 1px solid ${getStyledThemProperty('colors', 'G_300')};
  border-radius: 7px;

  ${getStyledThemProperty('fonts', 'caption2')};
  color: ${getStyledThemProperty('colors', 'Black')};

  /* &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  } */
`;

const S = {
  Body,
  Section,
  Input,
  Select,
  Wrapper,
};
