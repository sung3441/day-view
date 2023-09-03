import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { getRecordInSubscribe } from '@/shared/api';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/shared/atom/global';

const useGetSchedule = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const isLogin = useRecoilValue(isLoginAtom);
  return useQuery(
    [QueryKeys.SCHEDULE, startDate, endDate],
    () => getRecordInSubscribe({ startDate, endDate }),
    {
      select: (data) => data?.data,
      refetchOnMount: true,
      enabled: isLogin,
    }
  );
};

export default useGetSchedule;
