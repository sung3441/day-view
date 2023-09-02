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

  return useMemo(() => {
    const hashMapData = new Map<string, RecordRes[]>();
    if (!myRecodes || !myActiveChannelIds) return hashMapData;

    myRecodes.data
      .filter((record) => myActiveChannelIds?.includes(record.channelId))
      .forEach((record) => {
        const { startDate } = record;
        const key = startDate.slice(0, 10);
        hashMapData.has(key)
          ? hashMapData.get(key)?.push(record)
          : hashMapData.set(key, [record]);
      });
    return hashMapData;
  }, [myRecodes, myActiveChannelIds]);
};

export default useGetDateRecord;
