import { useMutation, useQueryClient } from 'react-query';
import { createChannel } from '@/shared/api';
import { QueryKeys } from '@/shared/queryClient';

const useCreateChannel = () => {
  const queryClient = useQueryClient();
  return useMutation(createChannel, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.CHANNEL, 'MANAGE']);
    },
  });
};

export default useCreateChannel;
