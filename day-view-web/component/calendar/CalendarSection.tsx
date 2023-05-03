import { memo, useCallback, useEffect, useRef, useState } from 'react';
import CalendarDates from '@/component/calendar/CalendarDates';
import styled from 'styled-components';
import DayLabels from '@/component/calendar/DayLabels';
import CalendarHeader from '@/component/calendar/CalendarHeader';

interface Props {}

const CalendarSection = ({}: Props) => {
  return (
    <CalderWrap>
      <CalendarHeader />
      <MonthWrap>
        <DayLabels />
        <CalendarDates />
      </MonthWrap>
    </CalderWrap>
  );
};

export default memo(CalendarSection);

const CalderWrap = styled.div`
  //height: 100%;
  width: 100%;
`;

const MonthWrap = styled.div`
  width: 100%;
  height: calc(100vh - 100px - 76px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px;
  //grid-auto-rows: minmax(
  //  calc(100vh - 40px - 60px) / 7,
  //  calc(100vh - 40px - 60px) / 6
  //);
`;
