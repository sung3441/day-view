import { memo, WheelEvent } from 'react';
import CalendarDates from '@/component/calendar/dateSection/Dates';
import styled from 'styled-components';
import DayLabels from '@/component/calendar/dateSection/DayLabels';
import CalendarHeader from '@/component/calendar/dateSection/DateHeader';
import { useRecoilState } from 'recoil';
import { selectedYYMMAtom } from '@/state/calendar';

interface Props {}

const DateSection = ({}: Props) => {
  const [selectedYYMM, setSelectedYYMM] = useRecoilState(selectedYYMMAtom);

  const handleMoveMonth = (flag: 'prev' | 'next') => {
    let { year, month } = selectedYYMM;
    month = flag === 'prev' ? --month : ++month;
    const d = new Date(year, month, 0);
    setSelectedYYMM({ year: d.getFullYear(), month: d.getMonth() + 1 });
  };

  const handelOnWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) return handleMoveMonth('prev');
    return handleMoveMonth('next');
  };

  return (
    <div onWheel={(e) => handelOnWheel(e)}>
      <CalendarHeader handleMoveMonth={handleMoveMonth} />
      <MonthWrap>
        <DayLabels />
        <CalendarDates />
      </MonthWrap>
    </div>
  );
};

export default memo(DateSection);

const MonthWrap = styled.div`
  height: calc(100vh - 100px - 76px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px;
`;
