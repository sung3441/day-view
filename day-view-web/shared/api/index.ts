import { Client } from '@/shared/axios';
import {
  ChannelRes,
  ChannelSelectType,
  Token,
  UserRes,
} from '@/shared/types/api';

export const getAccessToken = async () => {
  const res = await new Client('/api/v1/auth/refresh').get<Token>();
  console.log('getAccessToken', res);
  return res;
};

export const getUser = async () => {
  const res = await new Client('/api/members/me').get<UserRes>();
  console.log('getUser', res);
  return res;
};

export const getChannel = async (channelSelectType: ChannelSelectType) => {
  const res = await new Client(`/api/channels/${channelSelectType}`).get<
    ChannelRes[]
  >();
  console.log('getChannel', res);
  return res;
};
