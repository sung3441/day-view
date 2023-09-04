import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { getSubscribers } from '@/shared/api';

const useGetSubscribers = (channelId: number) => {
  return useQuery(
    [QueryKeys.SUBSCRIBERS, channelId],
    () => getSubscribers(channelId),
    {
      enabled: true,
      select: (data) => ({
        count: data!.data.data.count,
        subscribers: data!.data.data.subscribers,
      }),
    }
  );
};

export default useGetSubscribers;
