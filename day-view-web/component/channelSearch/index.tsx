import { memo } from 'react';
import useGetSearch from '@/component/channelSearch/hooks/useGetSearch';
import styled from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';
import SearchHeader from '@/component/channelSearch/SearchHeader';
import SearchList from '@/component/channelSearch/SearchList';
import InfiniteObserver from '@/shared/component/Atom/InfiniteObserver';

const SearchResult = () => {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetSearch();

  if (status !== 'success') return null;
  if (data?.pages?.at(0)?.result?.length === 0)
    return <EmptyWrapper>검색 결과가 없습니다.</EmptyWrapper>;
  return (
    <Wrapper>
      <SearchHeader />
      <SearchList data={data} />
      <InfiniteObserver
        status={status}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </Wrapper>
  );
};

export default memo(SearchResult);

const Wrapper = styled.article`
  height: 100%;
  overflow-y: auto;
  padding: 0 ${pixelToRemUnit(80)};
`;

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
