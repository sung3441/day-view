import { memo } from 'react';
import CalendarDates from '@/component/calendar/dateSection/Dates';
import styled, { css } from 'styled-components';
import DayLabels from '@/component/calendar/dateSection/DayLabels';
import CalendarHeader from '@/component/calendar/dateSection/DateHeader';
import { useRecoilValue } from 'recoil';
import { G_isOpenChannel } from '@/shared/atom/globalCalendar';
import { pixelToRemUnit } from '@/shared/util/common';

interface Props {}

const DateSection = ({}: Props) => {
  const isOpenChannel = useRecoilValue(G_isOpenChannel);
  return (
    <Wrap isOpenChannel={isOpenChannel}>
      <CalendarHeader />
      <MonthWrap>
        <DayLabels />
        <CalendarDates />
      </MonthWrap>
    </Wrap>
  );
};

export default memo(DateSection);

const Wrap = styled.div<{ isOpenChannel: boolean }>`
  width: 100%;
  transition: all 0.3s ease-out 0.05s;
  ${({ isOpenChannel }) =>
    isOpenChannel &&
    css`
      margin-left: ${pixelToRemUnit(373)};
    `}
`;

const MonthWrap = styled.div`
  height: calc(100vh - 100px - 76px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px;
`;
