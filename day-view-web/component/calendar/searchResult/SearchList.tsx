import { Fragment, memo } from 'react';
import SearchItem from '@/component/calendar/searchResult/SearchItme';
import useGetSearch from '@/component/calendar/searchResult/hooks/useGetSearch';
import InfiniteObserver from '@/shared/component/Atom/InfiniteObserver';

const SearchList = (props: any) => {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetSearch();

  return (
    <>
      {data?.pages.map(({ result }, index) => (
        <Fragment key={index}>
          {result?.map((item) => (
            //   TODO 추후 key값 변경 ->
            <SearchItem key={item.id} {...item} />
          ))}
        </Fragment>
      ))}
      <InfiniteObserver
        status={status}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
};

export default memo(SearchList);
