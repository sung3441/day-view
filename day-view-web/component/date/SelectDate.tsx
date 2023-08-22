import { memo, SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import CommonCalendar from '@/shared/component/Organism/CommonCalendar';
import { pixelToRemUnit } from '@/shared/styles/util';

type Props = {
  allDay: boolean;
};

const SelectDate = ({ allDay }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
    startTime: 0,
    endTime: 2359,
  });

  const openCalendar = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.cancelable = true;
    setIsOpen(true);
  };

  const onSelectDay = (sDate: string, eDate?: string) => {
    setDate({ ...date, startDate: sDate, endDate: eDate || '' });
  };

  const onChangeFn = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    let { name, valueAsNumber } = target;
    if (valueAsNumber > 2359) valueAsNumber = 2359;
    setDate({ ...date, [name]: valueAsNumber });
  };

  useEffect(() => {
    setDate({
      startDate: '',
      endDate: '',
      startTime: 0,
      endTime: 2359,
    });
  }, [allDay]);

  return (
    <Wrapper>
      <DayLabel onClick={(e) => openCalendar(e)}>
        {date.startDate ? date.startDate : '날짜선택'}
        {date.endDate && `~${date.endDate}`}
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
          <DateLabel
            type="number"
            minLength={4}
            name="startTime"
            value={date.startTime}
            onChange={onChangeFn}
          />
          <span>-</span>
          <DateLabel
            type="number"
            minLength={4}
            max={2359}
            name="endTime"
            value={date.endTime}
            onChange={onChangeFn}
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
  width: 35%;
  font-size: ${pixelToRemUnit(10)};
`;

const DateLabel = styled.input`
  width: 35%;
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
