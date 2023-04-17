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
          },
        },
      });
    return client;
  };
})();

// ex 쿼리키를 중앙에서 관리
export const QueryKeys = {
  MAIN: 'MAIN',
  MAIN_DETAIL: (detail: string) => ['MAIN', detail],
};
