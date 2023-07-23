import { useInfiniteQuery } from 'react-query';
import { getSearchChannel } from '@/shared/api';
import {
  G_isSearchKeywordAtom,
  G_searchOrderOptionAtom,
} from '@/shared/component/Organism/GNB/state';
import { useRecoilValue } from 'recoil';

const PAGE_SIZE = 10;

const useGetSearch = () => {
  const keyword = useRecoilValue(G_isSearchKeywordAtom);
  const sort = useRecoilValue(G_searchOrderOptionAtom);

  return useInfiniteQuery(
    ['search', keyword, sort],
    async ({ pageParam = 1 }) => {
      const res = await getSearchChannel({
        keyword,
        order: sort,
        size: PAGE_SIZE,
        page: pageParam,
      });

      return {
        result: res?.data?.data?.content,
        totalPage: res?.data.data.totalElements,
        isLast: res?.data.data.last,
        nextPage: pageParam + 1,
      };
    },
    {
      refetchOnMount: false,
      staleTime: 0,
      cacheTime: 1000 * 60 * 5,
      enabled: !!sort,
      getNextPageParam: (lastPage) => {
        if (lastPage.isLast) return undefined;
        return lastPage.nextPage;
      },
    }
  );
};

export default useGetSearch;
