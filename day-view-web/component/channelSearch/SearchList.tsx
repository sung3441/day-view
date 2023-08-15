import { Fragment, memo, useCallback } from 'react';
import SearchItem from '@/component/channelSearch/SearchItme';
import { InfiniteData } from 'react-query';
import { SearchItemType } from '@/shared/types/api';
import {
  useSubscribeChannel,
  useUnsubscribeChannel,
} from '@/shared/context/channel/hooks/usePostChannel';

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
  const { mutate: subscribeChannel } = useSubscribeChannel();
  const { mutate: unsubscribeChannel } = useUnsubscribeChannel();

  const handelSubscribe = useCallback((isSubscribe: boolean, id: number) => {
    if (isSubscribe) unsubscribeChannel(id);
    else subscribeChannel(id);
  }, []);

  return (
    <>
      {data?.pages.map(({ result }, index) => (
        <Fragment key={index}>
          {result?.map((item) => (
            //   TODO 추후 key값 변경 -> 현재 key 중복되어 있음?
            <SearchItem
              key={item.id}
              handelSubscribe={handelSubscribe}
              {...item}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default memo(SearchList);
