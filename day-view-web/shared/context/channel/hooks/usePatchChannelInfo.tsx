import { ChannelSelectType } from '@/shared/types/api';
import { usePatchChannel } from '@/shared/context/channel/hooks/usePostChannel';
import {
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useCallback,
} from 'react';
import { string } from 'prop-types';

const usePatchChannelInfo = (channelSelect: ChannelSelectType) => {
  const { mutate, status } = usePatchChannel(channelSelect);

  const handelMutateChannelInfo = useCallback(
    (channelId: number, color: string, showYn: boolean) => {
      mutate({ subscribeId: channelId, showYn: showYn, color });
    },
    []
  );

  return { handelMutateChannelInfo };
};
export default usePatchChannelInfo;
