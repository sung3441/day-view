import { QueryClient } from 'react-query';

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
            enabled: false,
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
  MY_CHANNEL: string;
  RECORD: string;
  SEARCH: string;
  RECORDS: string;
  DATE: string;
};

// ex 쿼리키를 중앙에서 관리
export const QueryKeys: Readonly<QueryKeysType> = {
  MAIN: 'MAIN',
  USER: 'USER',
  CHANNEL: 'CHANNEL',
  RECORD: 'RECORD',
  SEARCH: 'SEARCH',
  RECORDS: 'RECORDS',
  DATE: 'DATE',
  MY_CHANNEL: 'MY_CHANNEL',
};
