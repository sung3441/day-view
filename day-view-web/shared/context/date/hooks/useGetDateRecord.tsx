import { useQuery } from 'react-query';
import { getRecordInSubscribe } from '@/shared/api';
import { RecordInSubscribeParam } from '@/shared/types/api';
import { QueryKeys } from '@/shared/queryClient';

const useGetDateRecord = ({ startDate, endDate }: RecordInSubscribeParam) => {
  const res = useQuery(
    [QueryKeys.DATE, startDate, endDate],
    () => getRecordInSubscribe({ startDate, endDate }),
    {}
  );
  return res;
};

export default useGetDateRecord;
