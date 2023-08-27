import styled, { css } from 'styled-components';
import Channel from '../channel';
import DateSection from '../date';
import { useRecoilValue } from 'recoil';
import { useMemo } from 'react';
import {
  G_isOpenChannelAtom,
  G_isSearchOpenAtom,
  G_tabAtom,
} from '@/shared/component/Organism/Gnb/state';
import SearchResult from '../channelSearch';
import Category from '../category';
import Schedule from '../schedule';

const tabList = {
  월: <DateSection />,
  일정: <Schedule />,
  카테고리: <Category />,
};

const Calendar = () => {
  const isOpenChannel = useRecoilValue(G_isOpenChannelAtom);
  const isSearchOpen = useRecoilValue(G_isSearchOpenAtom);
  const tabLabel = useRecoilValue(G_tabAtom);
  const curTabElement = useMemo(() => tabList[tabLabel], [tabLabel]);

  return (
    <CalderWrap>
      <Channel />
      <TabWrap isOpenChannel={isOpenChannel}>
        {isSearchOpen ? <SearchResult /> : curTabElement}
      </TabWrap>
    </CalderWrap>
  );
};
export default Calendar;

const CalderWrap = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 100px);
`;

const TabWrap = styled.div<{ isOpenChannel: boolean }>`
  width: 100%;
  transition: all 0.3s ease-out 0.05s;
  ${({ isOpenChannel }) =>
    isOpenChannel &&
    css`
      transform: translateX(25%);
      width: 80%;
    `}
`;
