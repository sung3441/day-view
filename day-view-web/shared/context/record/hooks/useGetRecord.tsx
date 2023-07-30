import { useQuery } from 'react-query';
import { getRecordInChannel } from '@/shared/api';
import { QueryKeys } from '@/shared/queryClient';

const useGetRecord = (channelId: number) => {
  return useQuery(
    [QueryKeys.RECORDS, channelId],
    () => getRecordInChannel({ channelId }),
    {
      enabled: !!channelId,
      select: (data) => data!.data,
    }
  );
};

export default useGetRecord;
