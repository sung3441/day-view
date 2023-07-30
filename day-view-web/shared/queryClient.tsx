import { QueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/shared/atom/global';

const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: 0,
            // suspense: true,
          },
        },
      });
    return client;
  };
})();
export default getClient;

type QueryKeysType = {
  MAIN: string;
  USER: string;
  CHANNEL: string;
  RECORD: string;
  SEARCH: string;
  RECORDS: string;
};

// ex 쿼리키를 중앙에서 관리
export const QueryKeys: Readonly<QueryKeysType> = {
  MAIN: 'MAIN',
  USER: 'USER',
  CHANNEL: 'CHANNEL',
  RECORD: 'RECORD',
  SEARCH: 'SEARCH',
  RECORDS: 'RECORDS',
};
