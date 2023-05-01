import { memo, useCallback, useEffect, useRef, useState } from 'react';
import CalendarDates from '@/component/calendar/CalendarDates';
import styled from 'styled-components';
import DayLabels from '@/component/calendar/DayLabels';
import CalendarHeader from '@/component/calendar/CalendarHeader';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedDayAtom, selectedYYMMAtom, todayAtom } from '@/state/calendar';

interface Props {}

const CalendarSection = ({}: Props) => {
  const [selectedYYMM, setSelectedYYMM] = useRecoilState(selectedYYMMAtom);

  const handleMoveMonth = (flag: 'prev' | 'next') => {
    let { year, month } = selectedYYMM;
    month = flag === 'prev' ? --month : ++month;
    const d = new Date(year, month, 0);
    setSelectedYYMM({ year: d.getFullYear(), month: d.getMonth() + 1 });
  };

  return (
    <CalderWrap>
      <CalendarHeader
        selectedYYMM={selectedYYMM}
        handleMoveMonth={handleMoveMonth}
      />
      <MonthWrap>
        <DayLabels />
        <CalendarDates {...selectedYYMM} />
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
  height: calc(100vh - 40px - 60px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px;
  //grid-auto-rows: minmax(
  //  calc(100vh - 40px - 60px) / 7,
  //  calc(100vh - 40px - 60px) / 6
  //);
`;
