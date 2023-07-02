import { Fragment, memo } from 'react';
import useGetSearch from '@/component/calendar/searchResult/hooks/useGetSearch';
import styled from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';
import SearchHeader from '@/component/calendar/searchResult/SearchHeader';
import SearchList from '@/component/calendar/searchResult/SearchList';

const SearchResult = () => {
  return (
    <Wrapper>
      <SearchHeader />
      <SearchList />
    </Wrapper>
  );
};

export default memo(SearchResult);

const Wrapper = styled.article`
  height: 100%;
  overflow-y: auto;
  padding: 0 ${pixelToRemUnit(80)};
`;
