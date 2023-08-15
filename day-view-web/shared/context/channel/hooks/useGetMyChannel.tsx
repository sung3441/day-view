import { useQuery } from 'react-query';
import { getChannel } from '@/shared/api';
import { QueryKeys } from '@/shared/queryClient';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/shared/atom/global';
import { ChannelRes } from '@/shared/types/api';
import { useCallback } from 'react';

const useGetMyChannel = () => {
  const isLogin = useRecoilValue(isLoginAtom);

  const selectChannelId = useCallback((list: ChannelRes[] | undefined) => {
    if (!list) return [];
    return list
      .filter((channel) => channel.showYn)
      .map((channel) => channel.channelId);
  }, []);

  // TODO: 채널 정보를 useMemo로 변경 작업
  const { status, data } = useQuery(
    [QueryKeys.MY_CHANNEL],
    async () => {
      const res = await Promise.all([
        getChannel('MANAGE'),
        getChannel('SUBSCRIBE'),
      ]);
      const [manage, subscribe] = res;
      const manageChannelIds = selectChannelId(manage?.data.data);
      const subscribeChannelIds = selectChannelId(subscribe?.data.data);
      return [...manageChannelIds, ...subscribeChannelIds];
    },
    {
      enabled: isLogin,
      refetchOnMount: true,
    }
  );

  return { status, data };
};
export default useGetMyChannel;
