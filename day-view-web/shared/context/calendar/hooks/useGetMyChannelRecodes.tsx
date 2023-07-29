import { ChannelSelectType } from '@/shared/types/api';
import useGetChannel from '@/shared/context/calendar/hooks/useGetChannel';
import { useMemo } from 'react';

const useGetMyChannelRecodes = () => {
  const { data: manageData } = useGetChannel({ selectType: 'MANAGE' });

  const mySubscribeChannel = useMemo(() => {
    if (!manageData) return [];
    return manageData;
  }, [manageData]);

  console.log('mySubscribeChannel', mySubscribeChannel);

  return { mySubscribeChannel };
};
export default useGetMyChannelRecodes;
