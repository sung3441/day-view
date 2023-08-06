import { useQuery } from 'react-query';
import { getRecordInChannel } from '@/shared/api';
import { QueryKeys } from '@/shared/queryClient';

type selectType = (data: any) => any;

const useGetRecord = (channelId: number, select?: selectType) => {
  return useQuery(
    [QueryKeys.RECORDS, channelId],
    () => getRecordInChannel({ channelId }),
    {
      enabled: !!channelId,
      select: (data) => {
        return select ? select(data) : data!.data;
      },
    }
  );
};

export default useGetRecord;
