import { memo, SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import CommonCalendar from '@/shared/component/Organism/CommonCalendar';
import { addZeroPad, currentTime } from '@/shared/context/date/util';

type Props = {
  allDay: boolean;
  handelTimeChange: (data: any) => void;
};

const initDateValues = {
  startDate: '',
  endDate: '',
  startTime: currentTime(),
  endTime: '2359',
};

const splitYear = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${month}월 ${day}일`;
};

const SelectDate = ({ allDay, handelTimeChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(initDateValues);

  const openCalendar = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const onSelectDay = (sDate: string, eDate?: string) => {
    setDate({ ...date, startDate: sDate, endDate: eDate || '' });
  };

  const onChangeFn = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    let { name, valueAsNumber, value } = target;
    const numericValue = value.replace(/\D/g, '');
    setDate({ ...date, [name]: numericValue });
  };

  const onBlur = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    let value = target.value;
    if (!value) return;

    switch (value.length) {
      case 1:
        value = addZeroPad(value, 1, true);
        value = `0${value}`;
        break;
      case 2:
        value = addZeroPad(value, 2, true);
        break;
      case 3:
        value = addZeroPad(value, 1, true);
        break;
      default:
    }
    if (Number.parseInt(value) > 2359) value = '2359';
    setDate({ ...date, [target.name]: value });
  };

  useEffect(() => {
    setDate(initDateValues);
  }, [allDay]);

  useEffect(() => {
    handelTimeChange({ ...date });
  }, [date]);

  return (
    <Wrapper>
      <DayLabel onClick={(e) => openCalendar(e)}>
        <p> {date.startDate ? splitYear(date.startDate) : '날짜선택'}</p>
        <p> {date.endDate && `~ ${splitYear(date.endDate)}`}</p>
        {isOpen && (
          <CommonCalendar
            onlyStart={allDay}
            onSelectDay={onSelectDay}
            closeCalendar={() => setIsOpen(false)}
          />
        )}
      </DayLabel>
      {!allDay && (
        <>
          <TimeLabel
            type="string"
            name="startTime"
            value={date.startTime}
            onChange={onChangeFn}
            onBlur={onBlur}
            minLength={4}
            pattern="[0-9]*"
          />
          <span>-</span>
          <TimeLabel
            type="number"
            name="endTime"
            value={date.endTime}
            onChange={onChangeFn}
            onBlur={onBlur}
            minLength={4}
            pattern="[0-9]*"
          />
        </>
      )}
    </Wrapper>
  );
};

export default memo(SelectDate);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`;

const DayLabel = styled.div`
  position: relative;
  width: 40%;
  font-size: 100%;
  display: flex;
  flex-direction: column;
`;

const TimeLabel = styled.input`
  width: 30%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  appearance: none;
  -webkit-appearance: none;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
`;
