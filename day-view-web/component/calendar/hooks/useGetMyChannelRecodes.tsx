import { ChannelSelectType } from '@/shared/types/api';
import useGetChannel from '@/component/calendar/hooks/useGetChannel';
import { useMemo } from 'react';

const useGetMyChannelRecodes = () => {
  const { data: manageData } = useGetChannel({ selectType: 'MANAGE' });
  const { data: subscribeData } = useGetChannel({ selectType: 'SUBSCRIBE' });

  // console.log(manageData, subscribeData);

  const mySubscribeChannel = useMemo(() => {
    if (!subscribeData) return [];
  }, [subscribeData]);
};
export default useGetMyChannelRecodes;
