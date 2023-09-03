import { RecordRes } from '@/shared/types/api';
import useGetMyChannel from '@/shared/context/channel/hooks/useGetMyChannel';
import { useMemo } from 'react';

const useGetDateRecord = ({ data }: { data: RecordRes[] }) => {
  const { myActiveChannelIds } = useGetMyChannel();

  return useMemo(() => {
    const hashMapData = new Map<string, RecordRes[]>();
    if (!data || !myActiveChannelIds) return hashMapData;

    data
      .filter((record) => myActiveChannelIds?.includes(record.channelId))
      .forEach((record) => {
        const { startDate } = record;
        const key = startDate.slice(0, 10);
        hashMapData.has(key)
          ? hashMapData.get(key)?.push(record)
          : hashMapData.set(key, [record]);
      });
    return hashMapData;
  }, [data, myActiveChannelIds]);
};

export default useGetDateRecord;
