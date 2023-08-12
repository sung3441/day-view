import { memo, useCallback, WheelEvent } from 'react';
import CalendarDates from '@/component/date/Dates';
import styled from 'styled-components';
import DayLabels from '@/component/date/DayLabels';
import CalendarHeader from '@/component/date/DateHeader';
import { useRecoilState } from 'recoil';
import { selectedYYMMAtom } from '@/state/calendar';

interface Props {}

const Index = ({}: Props) => {
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
      <MonthWrap>
        <DayLabels />
        <CalendarDates />
      </MonthWrap>
    </div>
  );
};

export default memo(Index);

const MonthWrap = styled.div`
  height: calc(100vh - 100px - 76px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px;
`;
