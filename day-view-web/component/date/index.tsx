import { memo, WheelEvent } from 'react';
import CalendarDates from '@/component/date/Dates';
import styled from 'styled-components';
import DayLabels from '@/component/date/DayLabels';
import CalendarHeader from '@/component/date/DateHeader';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedYYMMAtom } from '@/state/calendar';
import { dayHeightAtom } from '@/shared/context/date/state';

interface Props {}

const Index = ({}: Props) => {
  const innerHeight = useRecoilValue(dayHeightAtom);
  const [selectedYYMM, setSelectedYYMM] = useRecoilState(selectedYYMMAtom);

  const handleMoveMonth = (flag: 'prev' | 'next') => {
    let { year, month } = selectedYYMM;
    month = flag === 'prev' ? --month : ++month;
    const d = new Date(year, month, 0);
    setSelectedYYMM({ year: d.getFullYear(), month: d.getMonth() + 1 });
  };

  const handleOnWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) return handleMoveMonth('next');
    return handleMoveMonth('prev');
  };

  return (
    <div onWheel={handleOnWheel}>
      <CalendarHeader handleMoveMonth={handleMoveMonth} />
      <MonthWrap innerHeight={innerHeight}>
        <DayLabels />
        <CalendarDates />
      </MonthWrap>
    </div>
  );
};

export default memo(Index);

const MonthWrap = styled.div<{ innerHeight: number }>`
  height: calc(100vh - 100px - 76px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px auto;
`;
