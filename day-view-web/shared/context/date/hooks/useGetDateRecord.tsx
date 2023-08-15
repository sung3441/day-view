import { useQuery } from 'react-query';
import { getRecordInSubscribe } from '@/shared/api';
import { RecordInSubscribeParam, RecordRes } from '@/shared/types/api';
import { QueryKeys } from '@/shared/queryClient';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/shared/atom/global';
import useGetMyChannel from '@/shared/context/channel/hooks/useGetMyChannel';
import { useMemo } from 'react';

const useGetDateRecord = ({ startDate, endDate }: RecordInSubscribeParam) => {
  const isLogin = useRecoilValue(isLoginAtom);

  const { data: myChannelIds } = useGetMyChannel();

  const { data: myRecodes, status } = useQuery(
    [QueryKeys.DATE, startDate, endDate],
    () => getRecordInSubscribe({ startDate, endDate }),
    {
      select: (data) => data?.data,
      enabled: isLogin,
    }
  );

  const setDateInHash = (
    date: string,
    recode: RecordRes,
    hash: Map<string, RecordRes[]>
  ) => {
    const key = date.slice(0, 10);
    hash.has(key) ? hash.get(key)?.push(recode) : hash.set(key, [recode]);
  };

  return useMemo(() => {
    const res = new Map<string, RecordRes[]>();
    if (!myRecodes || !myChannelIds) return res;

    myRecodes.data
      .filter((record) => {
        return myChannelIds?.includes(record.channelId);
      })
      .forEach((record) => {
        const { startDate, endDate, allDay } = record;
        if (!allDay) setDateInHash(endDate, record, res);
        setDateInHash(startDate, record, res);
      });
    return res;
  }, [myRecodes, myChannelIds]);
};

export default useGetDateRecord;
