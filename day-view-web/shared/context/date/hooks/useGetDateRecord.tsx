import { useQuery } from 'react-query';
import { getRecordInSubscribe } from '@/shared/api';
import { RecordInSubscribeParam, RecordRes } from '@/shared/types/api';
import { QueryKeys } from '@/shared/queryClient';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/shared/atom/global';
import useGetMyChannel from '@/shared/context/channel/hooks/useGetMyChannel';
import { useMemo } from 'react';
import { selectedYYMMAtom } from '@/state/calendar';
import { addZeroPad } from '@/shared/context/date/util';

const useGetDateRecord = ({ startDate, endDate }: RecordInSubscribeParam) => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);
  const isLogin = useRecoilValue(isLoginAtom);

  const { myActiveChannelIds } = useGetMyChannel();

  const { data: myRecodes, status } = useQuery(
    [QueryKeys.DATE, year.toString(), addZeroPad(month)],
    () => getRecordInSubscribe({ startDate, endDate }),
    {
      select: (data) => data?.data,
      refetchOnMount: true,
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
    if (!myRecodes || !myActiveChannelIds) return res;

    myRecodes.data
      .filter((record) => {
        return myActiveChannelIds?.includes(record.channelId);
      })
      .forEach((record) => {
        const { startDate, endDate, allDay } = record;
        setDateInHash(startDate, record, res);
      });
    return res;
  }, [myRecodes, myActiveChannelIds]);
};

export default useGetDateRecord;
