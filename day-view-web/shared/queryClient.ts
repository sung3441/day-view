import { QueryClient } from 'react-query';

export const getClient = (() => {
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

type QueryKeysType = {
  MAIN: string;
  USER: string;
  CHANNEL: string;
};

// ex 쿼리키를 중앙에서 관리
export const QueryKeys: Readonly<QueryKeysType> = {
  MAIN: 'MAIN',
  USER: 'USER',
  CHANNEL: 'CHANNEL',
};
