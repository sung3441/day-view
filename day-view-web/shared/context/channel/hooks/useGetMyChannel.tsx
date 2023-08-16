import { ChannelRes } from '@/shared/types/api';
import { useCallback, useMemo } from 'react';
import useGetChannel from '@/shared/context/channel/hooks/useGetChannel';

const useGetMyChannel = () => {
  const { data: manageData } = useGetChannel({ selectType: 'MANAGE' });
  const { data: subscribeData } = useGetChannel({ selectType: 'SUBSCRIBE' });

  const selectChannelId = useCallback((list: ChannelRes[] | undefined) => {
    if (!list) return [];
    return list
      .filter((channel) => channel.showYn)
      .map((channel) => channel.channelId);
  }, []);

  const myChannelRecodes = useMemo(() => {
    if (!manageData?.data || !subscribeData?.data) return [];
    return [...manageData?.data, ...subscribeData.data];
  }, [manageData, subscribeData]);

  const myActiveChannelIds = useMemo(() => {
    if (!myChannelRecodes?.length) return [];
    return selectChannelId(myChannelRecodes);
  }, [myChannelRecodes]);

  return { myChannelRecodes, myActiveChannelIds };
};
export default useGetMyChannel;
