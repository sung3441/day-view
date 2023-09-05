import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { patchSubscribeInfo } from '@/shared/api';

const usePatchSubscribeInfo = (channelId: number) => {
  const queryClient = useQueryClient();

  return useMutation(patchSubscribeInfo, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.SUBSCRIBERS, channelId]);
    },
  });
};

export default usePatchSubscribeInfo;
