import styled, { css } from 'styled-components';
import Channel from '@/component/calendar/channelSection';
import DateSection from '@/component/calendar/dateSection/DateSection';
import { pixelToRemUnit } from '@/shared/util/common';
import { useRecoilValue } from 'recoil';
import { G_isOpenChannel } from '@/shared/atom/globalCalendar';

const Calendar = () => {
  const isOpenChannel = useRecoilValue(G_isOpenChannel);

  return (
    <CalderWrap>
      <Channel />
      <TabWrap isOpenChannel={isOpenChannel}>
        <DateSection />
      </TabWrap>
    </CalderWrap>
  );
};
export default Calendar;

const CalderWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 100px);
`;

const TabWrap = styled.div<{ isOpenChannel: boolean }>`
  width: 100%;
  transition: all 0.3s ease-out 0.05s;
  ${({ isOpenChannel }) =>
    isOpenChannel &&
    css`
      margin-left: ${pixelToRemUnit(373)};
    `}
`;
