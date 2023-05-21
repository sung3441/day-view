import styled, { css } from 'styled-components';
import Channel from '@/component/calendar/channelSection';
import DateSection from '@/component/calendar/dateSection/DateSection';
import { useRecoilValue } from 'recoil';
import { G_isOpenChannelAtom, G_tabAtom } from '@/shared/atom/globalCalendar';
import { pixelToRemUnit } from '@/shared/styles/util';
import { useMemo } from 'react';
import Category from '../category';

const Calendar = () => {
  const isOpenChannel = useRecoilValue(G_isOpenChannelAtom);
  const tabLabel = useRecoilValue(G_tabAtom);

  const curTabElement = useMemo(() => {
    switch (tabLabel) {
      case '월':
        return <DateSection />;
      case '일정':
        return <div>ㅎㅇ2</div>;
      case '카테고리':
        return <Category />;
      default:
        return <DateSection />;
    }
  }, [tabLabel]);

  return (
    <CalderWrap>
      <Channel />
      <TabWrap isOpenChannel={isOpenChannel}>{curTabElement}</TabWrap>
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
