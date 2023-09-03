import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { addZeroPad } from '@/shared/context/date/util';
import { getRecordInSubscribe } from '@/shared/api';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/shared/atom/global';
import { getRecordInSubscribeType } from '@/shared/context/date/type';

const useGetRecordInSubscribe = ({
  year,
  month,
  startDate,
  endDate,
}: getRecordInSubscribeType) => {
  const isLogin = useRecoilValue(isLoginAtom);
  return useQuery(
    [QueryKeys.DATE, year.toString(), addZeroPad(month)],
    () => getRecordInSubscribe({ startDate, endDate }),
    {
      select: (data) => data?.data,
      refetchOnMount: true,
      enabled: isLogin,
    }
  );
};

export default useGetRecordInSubscribe;
