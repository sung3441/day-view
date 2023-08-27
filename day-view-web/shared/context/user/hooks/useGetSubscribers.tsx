import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { getSubscribers } from '@/shared/api';

const useGetSubscribers = (channelId: number) => {
  return useQuery(
    [QueryKeys.CHANNEL, channelId],
    () => getSubscribers(channelId),
    {
      select: (data) => data!.data,
    }
  );
};

export default useGetSubscribers;
