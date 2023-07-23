import { ChannelSelectType } from '@/shared/types/api';
import { usePatchChannel } from '@/component/calendar/hooks/usePostChannel';
import { ChangeEvent, ChangeEventHandler } from 'react';
import { string } from 'prop-types';

const usePatchChannelInfo = (channelSelect: ChannelSelectType) => {
  const { mutate, status } = usePatchChannel(channelSelect);

  const handelMutateChannelInfo = (
    e: ChangeEvent<HTMLInputElement>,
    channelId: number,
    color: string
  ) => {
    mutate({ subscribeId: channelId, showYn: !e.target.checked, color });
  };

  return { handelMutateChannelInfo };
};
export default usePatchChannelInfo;
