import { memo } from 'react';
import CalendarDates from '@/component/calendar/dateSection/Dates';
import styled from 'styled-components';
import DayLabels from '@/component/calendar/dateSection/DayLabels';
import CalendarHeader from '@/component/calendar/dateSection/DateHeader';

interface Props {}

const DateSection = ({}: Props) => {
  return (
    <>
      <CalendarHeader />
      <MonthWrap>
        <DayLabels />
        <CalendarDates />
      </MonthWrap>
    </>
  );
};

export default memo(DateSection);

const MonthWrap = styled.div`
  height: calc(100vh - 100px - 76px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px;
`;
