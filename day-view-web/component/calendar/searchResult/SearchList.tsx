import { Fragment, memo } from 'react';
import SearchItem from '@/component/calendar/searchResult/SearchItme';
import { InfiniteData } from 'react-query';
import { SearchItemType } from '@/shared/types/api';

interface Props {
  data:
    | InfiniteData<{
        result: SearchItemType[] | undefined;
        totalPage: number | undefined;
        isLast: boolean | undefined;
        nextPage: any;
      }>
    | undefined;
}

const SearchList = ({ data }: Props) => {
  return (
    <>
      {data?.pages.map(({ result }, index) => (
        <Fragment key={index}>
          {result?.map((item) => (
            //   TODO 추후 key값 변경 -> 현재 key 중복되어 있음?
            <SearchItem key={item.id} {...item} />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default memo(SearchList);
