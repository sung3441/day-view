import { useMutation, useQueryClient } from 'react-query';
import {
  createChannel,
  patchChannel,
  putChannel,
  subscribeChannel,
  unsubscribeChannel,
} from '@/shared/api';
import { QueryKeys } from '@/shared/queryClient';
import { ChannelSelectType } from '@/shared/types/api';

export const useCreateChannel = () => {
  const queryClient = useQueryClient();
  return useMutation(createChannel, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.CHANNEL, 'MANAGE']);
    },
  });
};

export const usePutChannel = () => {
  const queryClient = useQueryClient();
  return useMutation(putChannel, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.CHANNEL, 'MANAGE']);
    },
  });
};

export const usePatchChannel = (channelSelect: ChannelSelectType) => {
  const queryClient = useQueryClient();
  return useMutation(patchChannel, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.CHANNEL, channelSelect]);
      await queryClient.invalidateQueries([QueryKeys.DATE]);
    },
  });
};

export const useSubscribeChannel = () => {
  const queryClient = useQueryClient();
  return useMutation(subscribeChannel, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.SEARCH]);
    },
  });
};

export const useUnsubscribeChannel = () => {
  const queryClient = useQueryClient();
  return useMutation(unsubscribeChannel, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.SEARCH]);
    },
  });
};
