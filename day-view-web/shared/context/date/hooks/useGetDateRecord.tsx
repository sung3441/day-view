import { useQuery } from 'react-query';
import { getRecordInSubscribe } from '@/shared/api';
import { RecordInSubscribeParam } from '@/shared/types/api';
import { QueryKeys } from '@/shared/queryClient';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/shared/atom/global';

const useGetDateRecord = ({ startDate, endDate }: RecordInSubscribeParam) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const res = useQuery(
    [QueryKeys.DATE, startDate, endDate],
    () => getRecordInSubscribe({ startDate, endDate }),
    {
      enabled: isLogin,
    }
  );
  console.log('useGetDateRecord', res);
  return res;
};

export default useGetDateRecord;
