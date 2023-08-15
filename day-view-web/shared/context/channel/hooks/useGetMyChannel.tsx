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

  const data = useMemo(() => {
    if (!manageData || !subscribeData) return [];
    const manageChannelIds = selectChannelId(manageData?.data);
    const subscribeChannelIds = selectChannelId(subscribeData?.data);

    return [...manageChannelIds, ...subscribeChannelIds];
  }, [manageData, subscribeData]);

  return { data };
};
export default useGetMyChannel;
